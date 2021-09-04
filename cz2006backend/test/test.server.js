let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let crypto = require("crypto");
const mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);

describe('Connection of server', () => {

    /**
     * Test the connection of server
     */
    describe("GET /", () => {
        it("It should GET Hello World", (done) => {
            chai.request(server)
                .get("/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.be.eq("Hello World");
                    done();
                });
        });

    });

    /**
     * Test error for not configured routes
     */
    describe("GET /error", () => {
        it("It should GET an error", (done) => {
            chai.request(server)
                .get("/error")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });

});

describe('Authentication API', () => {

    describe("POST /login with verified and valid credentials", function() {

        this.timeout(15000);

        it("It should log into server successfully", (done) => {

            const loginDetails = {
                email: "ernestang98@gmail.com",
                password: "ernest"
            };

            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("success");
                    done();
                });
        });

    });

    describe("POST /login with verified but invalid credentials", () => {
        it("Correct email, wrong password. It should log into server unsuccessfully",
            (done) => {

            const loginDetails = {
                email: "ernestang98@gmail.com",
                password: "wrong one"
            };

            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message").eq("Email and/or password incorrect!")
                    done()
                });
        });

        it("Wrong email, wrong password. It should log into server unsuccessfully",
            (done) => {

            const loginDetails = {
                email: "wrong one",
                password: "wrong one"
            };

            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message").eq("Email and/or password incorrect!")
                    done()
                });
        });

        it("Wrong email, correct password. It should log into server unsuccessfully",
            (done) => {

            const loginDetails = {
                email: "wrong one",
                password: "ernest"
            };

            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message").eq("Email and/or password incorrect!")
                    done()
                });
        });

    });

    describe("POST /login with unverified but valid credentials", () => {

        it("Correct password, correct username: It should log into server unsuccessfully",
            (done) => {

            const loginDetails = {
                email: "myofficialemail1998@gmail.com",
                password: "ernest"
            };

            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("pending");
                    response.body.should.have.property('data')
                        .that.has.property("message").eq("Validate Account via email!")
                    done()
                });
        });
    })

    describe("POST /login with unverified and invalid credentials", () => {

        it("Correct email, wrong password. It should log into server unsuccessfully",
            (done) => {

            const loginDetails = {
                email: "ernestang98@gmail.com",
                password: "wrong one"
            };

            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message").eq("Email and/or password incorrect!")
                    done()
                });
        });

        it("Wrong email, wrong username: It should log into server unsuccessfully",
            (done) => {

            const loginDetails = {
                email: "wrong one",
                password: "wrong one"
            };

            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message").eq("Email and/or password incorrect!")
                    done()
                });
        });

        it("Wrong email and correct password: It should log into server unsuccessfully",
            (done) => {

            const loginDetails = {
                email: "wrong one",
                password: "ernest"
            };

            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message").eq("Email and/or password incorrect!")
                    done()
                });
        });

    })

    describe("POST /signup with valid inputs", function() {

        this.timeout(15000);

        const email = crypto.randomBytes(20).toString('hex');
        const firstName = crypto.randomBytes(20).toString('hex');
        const lastName = crypto.randomBytes(20).toString('hex');

        it("It should create an account successfully", (done) => {
            const signUpDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email + "@gmail.com",
                password: "ernest"
            };

            chai.request(server)
                .post("/signup")
                .send(signUpDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("success");
                    response.body.should.have.property('data')
                        .that.has.property("message")
                        .eq("You have signed up successfully, please verify the email!")
                    done()
                });
        });
    })

    describe("POST /signup with invalid inputs", function() {

        this.timeout(15000);

        const id = crypto.randomBytes(20).toString('hex');

        it("Empty inputs: It should return an error", (done) => {
            const signUpDetails = {
                firstName: "Ernest",
                email: id + "@gmail.com",
                password: "ernest"
            };

            chai.request(server)
                .post("/signup")
                .send(signUpDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message")
                        .eq("All fields must be entered!")
                    done()
                });
        });

        it("Already registered email: It should return an error", (done) => {
            const signUpDetails = {
                firstName: "Ernest",
                lastName: "ang",
                email: "ernestang98@gmail.com",
                password: "ernest"
            };

            chai.request(server)
                .post("/signup")
                .send(signUpDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message")
                        .eq("Email is already registered")
                    done()
                });
        });

    })

});

describe('Appointment API', () => {

    describe("POST /createAppointment with invalid inputs", function() {

        it("No such userId: It should return an error", (done) => {
            const createAppointment = {
                userId: mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
                clinicName: "Ernest Clinic",
                clinicLong: 999,
                clinicLat: 999,
                date: "99-99-9999",
                time: "99:99",
                others: "NILL"
            };

            chai.request(server)
                .post("/createAppointment")
                .send(createAppointment)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("Failure");
                    response.body.should.have.property('data')
                        .that.has.property("message")
                        .eq("No user found!")
                    done()
                });
        });

        it("UserId already have booking: It should return an error", (done) => {
            const createAppointment = {
                userId: mongoose.Types.ObjectId("6066abb68728e8129b54bb03"),
                clinicName: "Ernest Clinic",
                clinicLong: 999,
                clinicLat: 999,
                date: "99-99-9999",
                time: "99:99",
                others: "NILL"
            };

            chai.request(server)
                .post("/createAppointment")
                .send(createAppointment)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("failure");
                    response.body.should.have.property('data')
                        .that.has.property("message")
                        .eq("You already booked an appointment!")
                    done()
                });
        });

    })

    describe("POST /createAppointment with valid inputs", function() {

        this.timeout(15000);

        const deleteAppointment = {
            userId: "60669b419f52add2216dc188"
        }

        afterEach((done) => {
            chai.request(server)
                .delete("/deleteAppointment")
                .send(deleteAppointment)
                .end((err, response) => {
                    response.body.should.have.property('message')
                        .eq("success")
                })

            done()
        })

        it("It should be successful", (done) => {

            const createAppointment = {
                userId: mongoose.Types.ObjectId("60669b419f52add2216dc188"),
                clinicName: "Ernest Clinic",
                clinicLong: 999,
                clinicLat: 999,
                date: "99-99-9999",
                time: "99:99",
                others: "NILL"
            };

            chai.request(server)
                .post("/createAppointment")
                .send(createAppointment)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("success");
                    response.body.should.have.property('data')
                        .that.has.property("message")
                        .eq("Appointment Booked!")
                    done()
                });

        });

    })

    describe("GET /readAppointment with valid inputs", function() {

        this.timeout(15000);

        const deleteAppointment = {
            userId: mongoose.Types.ObjectId("60669b419f52add2216dc188")
        }

        const createAppointment = {
            userId: mongoose.Types.ObjectId("60669b419f52add2216dc188"),
            clinicName: "Ernest Clinic",
            clinicLong: 999,
            clinicLat: 999,
            date: "99-99-9999",
            time: "99:99",
            others: "NILL"
        };

        beforeEach((done) => {
            chai.request(server)
                .post("/createAppointment")
                .send(createAppointment)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    done()
                });
        })

        afterEach((done) => {
            chai.request(server)
                .delete("/deleteAppointment")
                .send(deleteAppointment)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    done()
                })
        })

        it("It should be successful", (done) => {
            chai.request(server)
                .get("/readAppointment/60669b419f52add2216dc188")
                .end((err, response) => {
                    response.body.should.be.a('object');
                    // response.body.should.have.property('data')
                    done()
                })
        });

    })

    describe("GET /readAppointment with invalid inputs", function() {

        it("It should be successful", (done) => {
            chai.request(server)
                .get("/readAppointment/60669b419f52addasdasd2216dc180")
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('message')
                    done()
                })
        });

    })

    describe("POST /readTimeSlots", function() {

        const clinic = {
            clinicName: "Chen Family Clinic"
        };

        const clinicErr = {
            clinicName: "Chen Family Clinicc"
        };

        it("It should be successful", (done) => {
            chai.request(server)
                .post("/readTimeSlots")
                .send(clinic)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("notEmpty")
                    done()
                })
        });

        it("It should be successful", (done) => {
            chai.request(server)
                .post("/readTimeSlots")
                .send(clinicErr)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq("empty")
                    done()
                })
        });

    })

    describe("PUT /updateAppoint with invalid inputs", function() {

        const invalid1 = {
            userId: "afkygasdfiukyagsdkfuaygsd",
            date: "Apr 1 2020",
            time: "10:00",
            others: "Change"
        };

        const invalid2 = {
            date: "Apr 1 2020",
            time: "10:00",
            others: "Change"
        };

        it("It should be unsuccessful", (done) => {
            chai.request(server)
                .put("/updateAppointment")
                .send(invalid1)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq("failure")
                    done()
                })
        });

        it("It should be unsuccessful", (done) => {
            chai.request(server)
                .post("/updateAppointment")
                .send(invalid2)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    done()
                })
        });

    })

    describe("PUT /updateAppoint with valid inputs", function() {

        const invalid1 = {
            userId: "60694a038b51e750b04a7664",
            date: "Apr 1 2020",
            time: "10:00",
            others: "Change"
        };

        it("It should be successful", (done) => {
            chai.request(server)
                .put("/updateAppointment")
                .send(invalid1)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq("Success!")
                    done()
                })
        });

    })


    describe("DELETE /deleteAppointment with valid inputs", function() {

        this.timeout(15000);

        const createAppointment = {
            userId: mongoose.Types.ObjectId("606abc0ae5ebf42060182510"),
            clinicName: "Ernest Clinic",
            clinicLong: 999,
            clinicLat: 999,
            date: "99-99-9999",
            time: "99:99",
            others: "NILL"
        };

        beforeEach((done) => {
            chai.request(server)
                .post("/createAppointment")
                .send(createAppointment)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    done()
                });
        })

        it("It should be successful", (done) => {

            const deleteAppointment = {
                userId: "606abc0ae5ebf42060182510"
            }

            chai.request(server)
                .delete("/deleteAppointment")
                .send(deleteAppointment)
                .end((err, response) => {
                    response.body.should.have.property('message')
                        .eq("success")
                    done()
                })
        });

    })

    describe("DELETE /deleteAppointment with invalid inputs", function() {

        this.timeout(15000);


        it("It should be unsuccessful", (done) => {

            const deleteAppointment = {
                userId: "60669b41asdfhsdfgka9f52add2216dc188"
            }

            chai.request(server)
                .delete("/deleteAppointment")
                .send(deleteAppointment)
                .end((err, response) => {
                    response.body.should.have.property('message')
                        .eq("failure")
                    done()
                })
        });

        it("It should be unsuccessful", (done) => {

            chai.request(server)
                .delete("/deleteAppointment")
                .end((err, response) => {
                    response.body.should.have.property('message')
                        .eq("failure")
                    done()
                })
        });

    })


})
