/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

jest.mock('react-native-toast-native', () => 'Toast');

// it('renders correctly', () => {
//   const { getByText , getByPlaceholderText} = render(<App />);
// });

import 'react-native';
import LoginComponent from '../components/AuthStack/LoginComponent'
import RegisterComponent from '../components/AuthStack/RegisterComponent'
import CreateAppointmentComponent from '../components/AppointmentStack/CreateAppointmentComponent'
import MainComponent from '../components/MainComponent'
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

import { cleanup, fireEvent, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

afterEach(cleanup);

afterAll((done) => {
  done();
});

describe("loginTest", () => {
  it('input correct email and password', (done) => {
    // const { getByText , getByPlaceholderText, queryByText} = render(<LoginComponent />);

    // const textInput = getByPlaceholderText('Email')
    // const passwordInput = getByPlaceholderText('Password')


    // const createButton = getByText('Log in');

    // const createdEmailText = 'sheryl_gtyinn@hotmail.com';
    // const createdPassword = "(test)";


    // fireEvent.changeText(textInput, createdEmailText);
    // fireEvent.changeText(passwordInput, createdPassword);
    // fireEvent.press(createButton);



    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const textInput = getByPlaceholderText('Email')
    //const newheader = findByPlaceholderText('Email')
    //expect(newheader).toBeTruthy();
    const passwordInput = getByPlaceholderText('Password')


    const createButton = getByText('Log in');

    const createdEmailText = 'sheryl_gtyinn@hotmail.com';
    const createdPassword = "(test)";


    fireEvent.changeText(textInput, createdEmailText);
    fireEvent.changeText(passwordInput, createdPassword);
    fireEvent.press(createButton);

    const newHeader = findByText('Hi, Bloop');
    expect(newHeader).toBeTruthy();

    done()
  });


  it('input email and no password', (done) => {
    // const { getByText , getByPlaceholderText} = render(<LoginComponent />);

    // const textInput = getByPlaceholderText('Email')
    // const passwordInput = getByPlaceholderText('Password')


    // const createButton = getByText('Log in');

    // const createdEmailText = 'sheryl_gtyinn@hotmail.com';


    // fireEvent.changeText(textInput, createdEmailText);
    // fireEvent.press(createButton);

    // const errorMessage = getByText('Enter all fields please!')
    //expect(errorMessage).not.toBeNull();


    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const textInput = getByPlaceholderText('Email')
    //const newheader = findByPlaceholderText('Email')
    //expect(newheader).toBeTruthy();
    //const passwordInput = getByPlaceholderText('Password')


    const createButton = getByText('Log in');

    const createdEmailText = 'sheryl_gtyinn@hotmail.com';
    //const createdPassword = "(test)";


    fireEvent.changeText(textInput, createdEmailText);
    //fireEvent.changeText(passwordInput, createdPassword);
    fireEvent.press(createButton);

    const newHeader = queryByText('Hi, Bloop');
    expect(newHeader).toBeNull();

    done()

  });


  it('input password and no email', (done) => {

    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    //const textInput = getByPlaceholderText('Email')
    //const newheader = findByPlaceholderText('Email')
    //expect(newheader).toBeTruthy();
    const passwordInput = getByPlaceholderText('Password')


    const createButton = getByText('Log in');

    //const createdEmailText = 'sheryl_gtyinn@hotmail.com';
    const createdPassword = "(test)";


    //fireEvent.changeText(textInput, createdEmailText);
    fireEvent.changeText(passwordInput, createdPassword);
    fireEvent.press(createButton);

    const newHeader = queryByText('Hi, Bloop');
    expect(newHeader).toBeNull();

    done()

  });


  it('input correct email and wrong password', (done) => {

    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const textInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')


    const createButton = getByText('Log in');

    const createdEmailText = 'sheryl_gtyinn@hotmail.com';
    const createdPassword = "wrongpassword";


    fireEvent.changeText(textInput, createdEmailText);
    fireEvent.changeText(passwordInput, createdPassword);
    fireEvent.press(createButton);

    const newHeader = queryByText('Hi, Bloop');
    expect(newHeader).toBeNull();

    done()

  })



  it('input wrong email and correct password', (done) => {

    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const textInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')


    const createButton = getByText('Log in');

    const createdEmailText = 'wrongemail@hotmail.com';
    const createdPassword = "(test)";


    fireEvent.changeText(textInput, createdEmailText);
    fireEvent.changeText(passwordInput, createdPassword);
    fireEvent.press(createButton);

    const newHeader = queryByText('Hi, Bloop');
    expect(newHeader).toBeNull();

    done()

  })
})


describe('registerTest', () => {
  // it('input correct personal details', (done) => {
  //   const component = (
  //     <NavigationContainer>
  //       <MainComponent />
  //     </NavigationContainer>
  //   );

  //   const {findByText, getByPlaceholderText, getByText, queryByText, getAllByPlaceholderText} = render(component);

  //   const button = getByText('Login')
  //   expect(button).toBeTruthy();
  //   fireEvent.press(button);

  //   const signupbutton = getByText('SIGN UP')
  //   expect(signupbutton).toBeTruthy();
  //   fireEvent.press(signupbutton);

  //   const FNInput = getByPlaceholderText('First Name')
  //   const LNInput = getByPlaceholderText('Last Name')
  //   const EmailInput = getByPlaceholderText('Email ')
  //   const PasswordInput = getByPlaceholderText('Password ')
  //   const CfmPasswordInput = getByPlaceholderText('Confirm Password')

  //   const createButton = getByText('Create');

  //   const createdFNText = 'Sam';
  //   const createdLNText = 'Ng';
  //   const createdEmailText = 'newuser@hotmail.com';
  //   const createdPassword = "(test)";
  //   const cfmPassword = "(test)";

  //   fireEvent.changeText(FNInput, createdFNText);
  //   fireEvent.changeText(LNInput, createdLNText);
  //   fireEvent.changeText(EmailInput, createdEmailText);
  //   fireEvent.changeText(PasswordInput, createdPassword);
  //   fireEvent.changeText(CfmPasswordInput, cfmPassword);
  //   fireEvent.press(createButton);


  //   const newHeader = queryByText('Enter Code:');
  //   expect(newHeader).toBeNull();
  //   done()
  // })


  it('input correct credentials but already has an account', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, getAllByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const signupbutton = getByText('SIGN UP')
    expect(signupbutton).toBeTruthy();
    fireEvent.press(signupbutton);

    const FNInput = getByPlaceholderText('First Name')
    const LNInput = getByPlaceholderText('Last Name')
    const EmailInput = getByPlaceholderText('Email ')
    const PasswordInput = getByPlaceholderText('Password ')
    const CfmPasswordInput = getByPlaceholderText('Confirm Password')

    const createButton = getByText('Create');

    const createdFNText = 'Sheryl';
    const createdLNText = 'G';
    const createdEmailText = 'sheryl_gtyinn@hotmail.com';
    const createdPassword = "(test)";
    const cfmPassword = "(test)";

    fireEvent.changeText(FNInput, createdFNText);
    fireEvent.changeText(LNInput, createdLNText);
    fireEvent.changeText(EmailInput, createdEmailText);
    fireEvent.changeText(PasswordInput, createdPassword);
    fireEvent.changeText(CfmPasswordInput, cfmPassword);
    fireEvent.press(createButton);


    const newHeader = queryByText('Enter Code:');
    expect(newHeader).toBeNull();
    done()


  })



  it('input correct credentials but passwords do not match', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const signupbutton = getByText('SIGN UP')
    expect(signupbutton).toBeTruthy();
    fireEvent.press(signupbutton);

    const FNInput = getByPlaceholderText('First Name')
    const LNInput = getByPlaceholderText('Last Name')
    const EmailInput = getByPlaceholderText('Email ')
    const PasswordInput = getByPlaceholderText('Password ')
    const CfmPasswordInput = getByPlaceholderText('Confirm Password')

    const createButton = getByText('Create');

    const createdFNText = 'Sam';
    const createdLNText = 'Ng';
    const createdEmailText = 'newuser@hotmail.com';
    const createdPassword = "(test)";
    const cfmPassword = "test";

    fireEvent.changeText(FNInput, createdFNText);
    fireEvent.changeText(LNInput, createdLNText);
    fireEvent.changeText(EmailInput, createdEmailText);
    fireEvent.changeText(PasswordInput, createdPassword);
    fireEvent.changeText(CfmPasswordInput, cfmPassword);
    fireEvent.press(createButton);


    const newHeader = queryByText('Enter Code:');
    expect(newHeader).toBeNull();
    done()


  })


  it('input correct credentials and no first name', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const signupbutton = getByText('SIGN UP')
    expect(signupbutton).toBeTruthy();
    fireEvent.press(signupbutton);

    const LNInput = getByPlaceholderText('Last Name')
    const EmailInput = getByPlaceholderText('Email ')
    const PasswordInput = getByPlaceholderText('Password ')
    const CfmPasswordInput = getByPlaceholderText('Confirm Password')

    const createButton = getByText('Create');

    const createdLNText = 'Ng';
    const createdEmailText = 'newuser@hotmail.com';
    const createdPassword = "(test)";
    const cfmPassword = "(test)";

    fireEvent.changeText(LNInput, createdLNText);
    fireEvent.changeText(EmailInput, createdEmailText);
    fireEvent.changeText(PasswordInput, createdPassword);
    fireEvent.changeText(CfmPasswordInput, cfmPassword);
    fireEvent.press(createButton);


    const newHeader = queryByText('Enter Code:');
    expect(newHeader).toBeNull();
    done()


  })



  it('input correct credentials and no last name', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const signupbutton = getByText('SIGN UP')
    expect(signupbutton).toBeTruthy();
    fireEvent.press(signupbutton);

    const FNInput = getByPlaceholderText('First Name')
    const EmailInput = getByPlaceholderText('Email ')
    const PasswordInput = getByPlaceholderText('Password ')
    const CfmPasswordInput = getByPlaceholderText('Confirm Password')

    const createButton = getByText('Create');

    const createdFNText = 'Sam';
    const createdEmailText = 'newuser@hotmail.com';
    const createdPassword = "(test)";
    const cfmPassword = "(test)";

    fireEvent.changeText(FNInput, createdFNText);
    fireEvent.changeText(EmailInput, createdEmailText);
    fireEvent.changeText(PasswordInput, createdPassword);
    fireEvent.changeText(CfmPasswordInput, cfmPassword);
    fireEvent.press(createButton);


    const newHeader = queryByText('Enter Code:');
    expect(newHeader).toBeNull();
    done()


  })







  it('input correct credentials and no email', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const signupbutton = getByText('SIGN UP')
    expect(signupbutton).toBeTruthy();
    fireEvent.press(signupbutton);

    const FNInput = getByPlaceholderText('First Name')
    const LNInput = getByPlaceholderText('Last Name')
    const PasswordInput = getByPlaceholderText('Password ')
    const CfmPasswordInput = getByPlaceholderText('Confirm Password')

    const createButton = getByText('Create');

    const createdFNText = 'Sam';
    const createdLNText = 'Ng';
    const createdPassword = "(test)";
    const cfmPassword = "(test)";

    fireEvent.changeText(FNInput, createdFNText);
    fireEvent.changeText(LNInput, createdLNText);
    fireEvent.changeText(PasswordInput, createdPassword);
    fireEvent.changeText(CfmPasswordInput, cfmPassword);
    fireEvent.press(createButton);


    const newHeader = queryByText('Enter Code:');
    expect(newHeader).toBeNull();
    done()


  })



  it('input correct credentials and no passwords', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const signupbutton = getByText('SIGN UP')
    expect(signupbutton).toBeTruthy();
    fireEvent.press(signupbutton);

    const FNInput = getByPlaceholderText('First Name')
    const LNInput = getByPlaceholderText('Last Name')
    const EmailInput = getByPlaceholderText('Email ')
    const CfmPasswordInput = getByPlaceholderText('Confirm Password')

    const createButton = getByText('Create');

    const createdFNText = 'Sam';
    const createdLNText = 'Ng';
    const createdEmailText = 'newuser@hotmail.com';
    const cfmPassword = "(test)";

    fireEvent.changeText(FNInput, createdFNText);
    fireEvent.changeText(LNInput, createdLNText);
    fireEvent.changeText(EmailInput, createdEmailText);
    fireEvent.changeText(CfmPasswordInput, cfmPassword);
    fireEvent.press(createButton);


    const newHeader = queryByText('Enter Code:');
    expect(newHeader).toBeNull();
    done()


  })



  it('input correct credentials and no confirm password', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const button = getByText('Login')
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const signupbutton = getByText('SIGN UP')
    expect(signupbutton).toBeTruthy();
    fireEvent.press(signupbutton);

    const FNInput = getByPlaceholderText('First Name')
    const LNInput = getByPlaceholderText('Last Name')
    const EmailInput = getByPlaceholderText('Email ')
    const PasswordInput = getByPlaceholderText('Password ')

    const createButton = getByText('Create');

    const createdFNText = 'Sam';
    const createdLNText = 'Ng';
    const createdEmailText = 'newuser@hotmail.com';
    const createdPassword = "(test)";

    fireEvent.changeText(FNInput, createdFNText);
    fireEvent.changeText(LNInput, createdLNText);
    fireEvent.changeText(EmailInput, createdEmailText);
    fireEvent.changeText(PasswordInput, createdPassword);
    fireEvent.press(createButton);


    const newHeader = queryByText('Enter Code:');
    expect(newHeader).toBeNull();
    done()


  })
})



describe('createApptTest', () => {

  it('Cannot access booking without logging in', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const createApptHeader = getByText('Book Appointment');
    expect(createApptHeader).toBeTruthy();
    fireEvent.press(createApptHeader);

    const loginButton = getByText("Log in");
    expect(loginButton).toBeTruthy();

    done();
  })

  it('Can access booking after logging in', (done) => {
    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

    const createApptHeader = getByText('Book Appointment');
    expect(createApptHeader).toBeTruthy();
    fireEvent.press(createApptHeader);

    const loginButton = getByText("Log in");
    expect(loginButton).toBeTruthy();

    const EmailInput = getByPlaceholderText('Email')
    const PasswordInput = getByPlaceholderText('Password')

    const createdEmailText = 'sheryl_gtyinn@hotmail.com';
    const createdPassword = "(test)";

    fireEvent.changeText(EmailInput, createdEmailText);
    fireEvent.changeText(PasswordInput, createdPassword);
    fireEvent.press(loginButton);

    const bookButton = getByText('Book Appointment');
    expect(bookButton).toBeTruthy();

    done();
  })

  // it('Can book with clinic, date and time', async (done) => {

  //   jest.setTimeout(30000);

  //   const component = (
  //     <NavigationContainer>
  //       <MainComponent />
  //     </NavigationContainer>
  //   );

  //   const { findByText, getByPlaceholderText, getByText, queryByText, findByPlaceholderText } = render(component);

  //   const createApptHeader = getByText('Book Appointment');
  //   expect(createApptHeader).toBeTruthy();
  //   fireEvent.press(createApptHeader);

  //   const loginButton = getByText("Log in");
  //   expect(loginButton).toBeTruthy();

  //   const EmailInput = getByPlaceholderText('Email')
  //   const PasswordInput = getByPlaceholderText('Password')

  //   const createdEmailText = 'sheryl_gtyinn@hotmail.com';
  //   const createdPassword = "(test)";

  //   fireEvent.changeText(EmailInput, createdEmailText);
  //   fireEvent.changeText(PasswordInput, createdPassword);
  //   fireEvent.press(loginButton);

  //   const bookButton = getByText('Book Appointment');
  //   expect(bookButton).toBeTruthy();
  //   fireEvent.press(bookButton);

  //   const ClinicInput = getByPlaceholderText('Enter the Clinic')

  //   const DOWN_ARROW = { keyCode: 40 };
  //   const getSelectItem = (getByPlaceholderText, getByText) => async (selectLabel, itemText) => {
  //     fireEvent.keyDown(getByPlaceholderText(selectLabel), DOWN_ARROW);
  //     await waitForElement(() => getByText(itemText));
  //     fireEvent.press(getByText(itemText));
  //   }
  //   const selectItem = getSelectItem(getByPlaceholderText, getByText);

  //   const clinicName = 'Chen Family Clinic';
  //   await selectItem('Select a time', '09:00');

  //   fireEvent.changeText(ClinicInput, clinicName);
  //   const createButton = getByText('Create');
  //   expect(createButton).toBeTruthy();
  //   fireEvent.press(createButton);

  //   const confirmationMessage = getByText("Appointment Confirmed!");
  //   expect(confirmationMessage).toBeTruthy();

  //   done();
  // })

})

describe("MapTesting", () => {

  it('NearestClinics returns a list of 5 clinics', (done) => {

    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { getByText, getAllByText } = render(component);

    const button = getByText('Find Nearest Clinic');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const Rows = getAllByText(/Meters/);    // Regex for partial match
    expect(Rows.length).toBe(5);

    done();
  });

  it('Clinics are clickable', (done) => {

    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { getByText, getAllByText } = render(component);

    const button = getByText('Find Nearest Clinic');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const button2 = getAllByText(/Meters/)[0];    // Regex for partial match
    expect(button2).toBeTruthy();

    done();
  });

  it('RNLocator has 3 modes of transport', (done) => {

    global.fetch = jest.fn(() => Promise.resolve());

    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { getByText, getAllByText } = render(component);

    const button = getByText('Find Nearest Clinic');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const button2 = getAllByText(/Meters/)[0];
    expect(button2).toBeTruthy();
    fireEvent.press(button2);

    const Rows = getAllByText(/Min/);    // Regex for partial match
    expect(Rows.length).toBe(3);

    done();
  });

  it('RNLocator has 3 modes of transport', (done) => {

    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { getByText, getAllByText } = render(component);

    const button = getByText('Find Nearest Clinic');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const button2 = getAllByText(/Meters/)[0];
    expect(button2).toBeTruthy();
    fireEvent.press(button2);

    const button3 = getAllByText(/Min/)[0];    // Regex for partial match
    expect(button3).toBeTruthy();

    done();
  });

  it('Cannot book without logging in', async (done) => {

    const component = (
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    );

    const { getByText, getAllByText, findByText, debug } = render(component);

    const button = getByText('Find Nearest Clinic');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const button2 = getAllByText(/Meters/)[0];
    expect(button2).toBeTruthy();
    fireEvent.press(button2);

    const button3 = getByText("Book");
    expect(button3).toBeTruthy();
    fireEvent.press(button3);

    const loginButton = await findByText("Log in");
    expect(loginButton).toBeTruthy();

    done();
  });

})