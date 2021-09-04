const User = require('../models/User');
const Verification = require('../models/Verification')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cryptoRandomString = require("crypto-random-string");
const sendMail = require("../services/sendMailService");


async function hashPassword(password) {
  return await bcrypt.hash(password, 1);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body
    if ( !firstName || !lastName || !password || !email ) {
      res
        .status(404)
        .json({
          status: "failure",
          data: {
            message: "All fields must be entered!"
          },
        })
    }
    else {
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res
            .status(404)
            .json({
              status: "failure",
              data: {
                message: "Email is already registered"
              },
            });

      const hashedPassword = await hashPassword(password);
      const newUser = new User({ email, password: hashedPassword, firstName, lastName });
      await newUser.save();
      // const baseUrl = req.protocol + "://" + req.get("host");
      const secretCode = cryptoRandomString({length: 6,});
      const newCode = new Verification({
        code: secretCode,
        email: email,
        type: "Verify"
      });
      await newCode.save();
      const data = {
          from: `App Administrator <ernestang98@gmail.com>`,
          to: email,
          subject: "SickGoWhere? Activation Code",
          // text: `Please use the following link within the next 10 minutes to activate your account on YOUR APP: ${baseUrl}/verify/${newUser._id}/${secretCode}`,
          html: `<p>Secret Code: ${secretCode}</p>`,
      };
      await sendMail.sendMail(data);
      res.json({
        status: "success",
        data: {
          newUser,
          message: "You have signed up successfully, please verify the email!"
        },
      });
    }
  } catch (error) {
    next(error)
  }
}

exports.verifyCode = async (req, res) => {
  try {
    const { code } = req.body

    const response = await Verification.findOne({
        code
    });

    if (!response) {
      res
      .status(404)
      .json({
        status: "failure",
        data: {
          message: "No Verification Code Found!"
        }
      });
    }
    else {
      await User.updateOne(
            { email: response.email },
            { status: "active" }
        );
      await Verification.deleteMany({ code: response.code });

      const user = await User.findOne({ email: response.email })

      const accessToken = await jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "100m"
      });

      res.json({
          status: "success",
          data: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            appointment: user.appointment,
            accessToken
          },
        });

    }
} catch (err) {
  console.log(err)
    res
    .status(404)
    .json({
      status: "failure",
      data: {
        message: "Something went wrong..."
      },
    });
  }
}

exports.resendCode = async (req, res) => {
  try {
    const { email } = req.body
    const response = await User.findOne({
        email,
    });

    if (!response) {
        res.sendStatus(401);
    } else {
        await Verification.deleteMany({ email: response.email, type: "Verify" });
        // const baseUrl = req.protocol + "://" + req.get("host");
        const secretCode = cryptoRandomString({length: 6,});
        const newCode = new Verification({
          code: secretCode,
          email: email,
          type: "Verify"
        });
        await newCode.save();
        const data = {
            from: `App Administrator <ernestang98@gmail.com>`,
            to: email,
            subject: "SickGoWhere? Activation Code",
            // html: `<p>Please use the following link within the next 10 minutes to activate your account on YOUR APP: <strong><a href="${baseUrl}/verify/${newUser._id}/${secretCode}" target="_blank">Activation Link</a></strong></p><br/><p>Secret Code: ${secretCode}</p>`,
            html: `<p>Secret Code: ${secretCode}</p>`,
        };
        await sendMail.sendMail(data);
        res.json({
          status: "success",
          data: {
            message: "You have signed up successfully, please verify the email!"
          },
        });
    }
} catch (err) {
  console.log(err)
    res
      .status(404)
      .json({
      status: "failure",
      data: {
        message: "Something went wrong..."
      },
    });
  }
}


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res
          .status(404)
          .json({
        status: "failure",
        data: {
          message: "Email and/or password incorrect!"
        }
      })
    }
    else {
      const validPassword = await validatePassword(password, user.password);
      if (!validPassword) {
        res
            .status(404)
            .json({
          status: "failure",
          data: {
            message: "Email and/or password incorrect!"
          }
        })
      }
      else {
        if (user.status === "pending") {
            res.json({
              status: "pending",
              data: {
                message: "Validate Account via email!"
              }
            })
          }
        else {
          const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET, {
            expiresIn: "100m"
          });
          await User.findByIdAndUpdate(user._id, { accessToken })
          res.json({
            status: "success",
            data: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              appointment: user.appointment,
              accessToken
            },
          })
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    status: "success",
    data: {
      users
    }
  });
}

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error('User does not exist'));
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const { role } = req.body
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, { role });
    const user = await User.findById(userId)
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      status: "success",
      data: {
        message: 'User has been deleted'
      }
    });
  } catch (error) {
    next(error)
  }
}
