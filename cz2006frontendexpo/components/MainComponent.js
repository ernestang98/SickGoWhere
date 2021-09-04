import {createStackNavigator, Header, HeaderBackButton} from "react-navigation-stack";
import LoginComponent from "./AuthStack/LoginComponent";
import RegisterComponent from "./AuthStack/RegisterComponent";
import VerifyAccountComponent from "./AuthStack/VerifyAccountComponent";
import TemplateComponent from "./TemplateComponent";
import DashboardComponent from "./DashboardComponent";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from "react";
import AppointmentComponent from "./AuthStack/AppointmentComponent";

const height = 80;

// const height = Header.HEIGHT;


// How to render your page:
// Step 1: Duplicate Template Component, rename, follow instructions, and create page
// Step 2: Import your component into this file
// Step 3: Under MainNavigator, root config, add your component, give it a name
// Step 4: Set inital route to the name of your component

let ScreenWidth = Dimensions.get("window").width;

const AuthStack = createStackNavigator({
        Dashboard: { screen: DashboardComponent, navigationOptions: { headerShown: false }},
        Login: { screen: LoginComponent, navigationOptions: { headerShown: false }},
        Register: { screen: RegisterComponent },
        VerifyAccount: { screen: VerifyAccountComponent},
        CreateAppointment: { screen: AppointmentComponent},
    },
    {
        initialRouteName: 'Dashboard',
        // headerMode: "float",
        defaultNavigationOptions: {
            headerTintColor: "#ffffff",
            headerLayoutPreset: "center",
            headerBackground: () =>
                <View style={{
                    backgroundColor: "#005DB2",
                    height: height

                }}>
                    <Image
                        style={{
                            marginTop: 15,
                            justifyContent: "center",
                            alignContent: "center",
                            alignSelf: "center",
                            backgroundColor: "#005DB2",
                            width: 185,
                            height: 55
                        }}
                        // style={StyleSheet.absoluteFill}
                        source={ require('../assets/sgwWhite.png') }
                        // source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
                    />
                </View>
            ,
            title: '',
            headerStyle: {
                backgroundColor: "#005DB2",
            },
            headerTitleStyle: {
                fontSize: 18
            },
            gestureEnabled: true,
            gestureDirection: "horizontal"
        }
    }
);


const MainNavigator = createSwitchNavigator(
    {
        Auth: AuthStack,
        Test: AppointmentComponent

        // Add your components here
    },
    {
        // Change the initial route name to render it
        initialRouteName: 'Test',
    }
);

const MainComponent = createAppContainer(MainNavigator);

export default MainComponent
