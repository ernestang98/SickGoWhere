// Boilerplate for building pages
// DO NOT EDIT/REMOVE ANY CODE FROM HERE, ONLY ADD

import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faSearch, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {Defs, LinearGradient, Rect, Stop, Svg} from "react-native-svg";
import axios from "axios";

let ScreenWidth = Dimensions.get("window").width;

/* Done: View Appointment, Edit Appointment */
function DashboardComponent({ navigation }) {

    const [animate, setAnimate] = React.useState(true)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isBooked, setIsBooked] = React.useState(false);
    const [name, setName] = React.useState('');
    const [search, setSearch] = React.useState('')
    const [refresh, triggerRefresh] = React.useState(true)

    let doLogout = async() => {
        await AsyncStorage.setItem("loggedIn", '')
        await AsyncStorage.setItem("userId", '')
        await AsyncStorage.setItem("token", '')
        await AsyncStorage.setItem("pendingEmail", '')
        setIsLoggedIn(false)
        setIsBooked(false)
        setName('')
    }

    React.useEffect(() => {

        async function onLoad() {

            try {
                let loggedIn = await AsyncStorage.getItem("loggedIn")
                let token = await AsyncStorage.getItem("token")
                let userId = await AsyncStorage.getItem("userId")

                let res = await axios.get("http://10.0.2.2:3000/user/" + userId, {
                    headers: {
                        "x-access-token": token
                    }
                })
                const loggedInData = res.data.data.user

                if (loggedIn === null || loggedIn === "") {
                    loggedIn = "false"
                }

                if (loggedIn.toString() === "true") {
                    setIsLoggedIn(true)
                    console.log(JSON.stringify(loggedInData.appointment))
                    setIsBooked(loggedInData.appointment)
                    setName(loggedInData.firstName)
                }
                else {
                    setIsLoggedIn(false)
                    setIsBooked(false)
                    setName('')
                }
            } catch (e) {
                console.log("error: " + e)
            }

        }
        onLoad().then(r => {setAnimate(false)})

        const focus = navigation.addListener("didFocus", ()=>{
            triggerRefresh(!refresh)
        })

        return function cleanUp() {
            focus.remove()
        }

    })

    return (
        <View style={styles.container}>
            {animate &&
            <View style={[styles.activity, styles.horizontal]}>
                <ActivityIndicator size="large" color="#005DB3" animating={animate} />
                <Text style={{textAlign: "center", fontSize: 20}}>Loading</Text>
            </View>
            }
            <View style={StyleSheet.absoluteFillObject}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <LinearGradient id="grad" x1="50%" y1="20%" x2="50%" y2="100%">
                            <Stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#3491E8" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>

                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                </Svg>
            </View>

            {
                isLoggedIn ?
                    <View>
                        <Text style={ styles.welcome }>Hi, {name
                            ?
                            (name.trim().toLowerCase().charAt(0).toUpperCase() + name.trim().toLowerCase().slice(1))
                            : "User98"}</Text>
                        <View>
                            <TouchableOpacity style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                            }}
                              onPress={()=>doLogout()}
                            >
                                <FontAwesomeIcon
                                    style={{
                                        color: "#3491E8"
                                    }}
                                    icon={ faSignOutAlt } size={24} />
                                <Text style={{
                                    color: "#3491E8",
                                    fontSize: 20,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>LOGOUT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={ styles.welcome }>Login</Text>
                    </TouchableOpacity>
            }

            <View style={styles.searchSection}>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('ClinicSearchList')
                    }}
                    style={{
                        // backgroundColor: "#c17373",
                        width: 350,
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <TextInput
                        style={ styles.textInput }
                        onChangeText={text => setSearch(text)}
                        value={search}
                        placeholder={"Search"}
                    />
                    <FontAwesomeIcon
                        style={{
                            right: 10,
                            color: "#000000",
                            paddingBottom: 57.5,
                            borderBottomColor: "#005DB3",
                            borderBottomWidth: 2,
                        }}
                        icon={ faSearch } size={24} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
            style={{
                alignItems: "center",
                backgroundColor: "#005DB3",
                padding: 10,
                width: 320,
                height: 40,
                borderRadius: 10,
                marginBottom: 10
            }}
            onPress={() => {
                navigation.navigate("NearestClinicNearMe")
            }}
            >
                <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Find Nearest Clinic</Text>
            </TouchableOpacity>
            {
                isLoggedIn
                    ?
                    (!isBooked ?
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate('CreateAppointment', {
                            create: "true",
                            fromMap:"false"})}}

                        style={{
                            alignItems: "center",
                            backgroundColor: "#005DB3",
                            padding: 10,
                            width: 320,
                            height: 40,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                        >
                            <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Book Appointment</Text>
                        </TouchableOpacity>
                        :
                        <View>
                            <TouchableOpacity style={{
                                alignItems: "center",
                                backgroundColor: "#005DB3",
                                padding: 10,
                                width: 320,
                                height: 40,
                                borderRadius: 10,
                                marginBottom: 10
                            }}
                                              onPress={()=>{navigation.navigate('ViewAppointment')}}
                            >
                                <Text style={{color: "white", fontSize: 20, marginTop: -3}}>View Appointment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                alignItems: "center",
                                backgroundColor: "#005DB3",
                                padding: 10,
                                width: 320,
                                height: 40,
                                borderRadius: 10,
                                marginBottom: 10
                            }}
                                              onPress={()=>{navigation.navigate('CreateAppointment', {
                                                  create: "false",
                                                  fromMap:"false"
                                              })}}
                            >
                                <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Edit Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    <TouchableOpacity
                    onPress = {()=>navigation.navigate('Login')}
                    style={{
                        alignItems: "center",
                        backgroundColor: "#005DB3",
                        padding: 10,
                        width: 320,
                        height: 40,
                        borderRadius: 10,
                        marginBottom: 10
                    }}>
                        <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Book Appointment</Text>
                    </TouchableOpacity>
            }
            {/*<TouchableOpacity*/}
            {/*    onPress={()=>navigation.navigate('CreateAppointment', {*/}
            {/*        create: "true"*/}
            {/*    })}*/}
            {/*>*/}
            {/*    <Text>Test</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    );
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: ScreenHeight,
        zIndex: -1
    },
    welcome: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#005DB2"
    },
    textInput: {
        height: 50,
        width: 300,
        borderColor: "#005DB3",
        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        fontSize: 20
    },
    activity: {
        flex: 1,
        justifyContent: "center",
        position:"absolute",
        backgroundColor: "#ffffff",
        zIndex: 10,
        width: ScreenWidth,
        height: ScreenHeight,
    },

    horizontal: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 10
    }

});

export default DashboardComponent
