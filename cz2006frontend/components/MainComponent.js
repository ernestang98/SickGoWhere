import { createStackNavigator, Header, HeaderBackButton } from "react-navigation-stack";
import LoginComponent from "./AuthStack/LoginComponent";
import RegisterComponent from "./AuthStack/RegisterComponent";
import VerifyAccountComponent from "./AuthStack/VerifyAccountComponent";
import TemplateComponent from "./TemplateComponent";
import RnMapTestComponent from "./MapStack/RnMapTestComponent"
import ViewAppointmentComponent from "./AppointmentStack/ViewAppointmentComponent";
import MapboxTestComponent from "./MapStack/MapboxTestComponent";
import DashboardComponent from "./DashboardComponent";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React from "react";
import CreateAppointmentComponent from "./AppointmentStack/CreateAppointmentComponent";
import ConfirmAppointmentComponent from "./AppointmentStack/ConfirmAppointmentComponent";
import DeleteAppointmentComponent from "./AppointmentStack/DeleteAppointmentComponent";
import DeleteAppointmentConfirmComponent from "./AppointmentStack/DeleteAppointmentConfirmComponent";
import RNLocationComponent from "./MapStack/RNLocationComponent";
import ClinicSearchListComponent from "./MapStack/ClinicSearchList";
import NearestClinicComponent from "./MapStack/NearestClinicComponent";

/*
if have appointment:
Dashboard -> View Appointment
Dashboard -> Update Appointment (either delete or update)

if no appointment:
Dashboard -> Book Appointment

*/

const height = 55;

// const height = Header.HEIGHT;


// How to render your page:
// Step 1: Duplicate Template Component, rename, follow instructions, and create page
// Step 2: Import your component into this file
// Step 3: Under MainNavigator, root config, add your component, give it a name
// Step 4: Set inital route to the name of your component

let ScreenWidth = Dimensions.get("window").width;

const AuthStack = createStackNavigator({
    Dashboard: { screen: DashboardComponent, navigationOptions: { headerShown: false } },
    Login: { screen: LoginComponent, navigationOptions: {} },
    Register: { screen: RegisterComponent },
    VerifyAccount: { screen: VerifyAccountComponent },
    CreateAppointment: { screen: CreateAppointmentComponent },
    ConfirmAppointment: { screen: ConfirmAppointmentComponent, navigationOptions: { headerLeft: () => null } },
    ViewAppointment: { screen: ViewAppointmentComponent },
    DeleteAppointment: { screen: DeleteAppointmentComponent },
    DeleteAppointmentConfirm: {
        screen: DeleteAppointmentConfirmComponent, navigationOptions:
            { headerLeft: () => { return null } }
    },
    RNLocator: { screen: RNLocationComponent, navigationOptions: {} },
    ClinicSearchList: { screen: ClinicSearchListComponent, navigationOptions: {} },
    NearestClinicNearMe: { screen: NearestClinicComponent, navigationOptions: {} }
},
    {
        initialRouteName: 'Dashboard', // Default Dashboard
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
                            marginTop: 10,
                            justifyContent: "center",
                            alignContent: "center",
                            alignSelf: "center",
                            backgroundColor: "#005DB2",
                            width: 115,
                            height: 35
                        }}
                        // style={StyleSheet.absoluteFill}
                        source={require('../assets/sgwWhite.png')}
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

const MapStack = createStackNavigator({
    RNLocator: { screen: RNLocationComponent, navigationOptions: {} },
    ClinicSearchList: { screen: ClinicSearchListComponent, navigationOptions: {} },
    NearestClinic: { screen: NearestClinicComponent, navigationOptions: {} },
},
    {
        initialRouteName: 'NearestClinic',
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
                            marginTop: 10,
                            justifyContent: "center",
                            alignContent: "center",
                            alignSelf: "center",
                            backgroundColor: "#005DB2",
                            width: 115,
                            height: 35
                        }}
                        // style={StyleSheet.absoluteFill}
                        source={require('../assets/sgwWhite.png')}
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
        Test: MapStack,
        // Add your components here
    },
    {
        // Change the initial route name to render it
        initialRouteName: 'Auth',
    }
);

const MainComponent = createAppContainer(MainNavigator);

export default MainComponent
