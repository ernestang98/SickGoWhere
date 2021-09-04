// Boilerplate for building pages
// DO NOT EDIT/REMOVE ANY CODE FROM HERE, ONLY ADD

import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faSearch, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

function DashboardComponent({ navigation }) {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isBooked, setIsBooked] = React.useState(false);
    const [name, setName] = React.useState('');
    const [search, setSearch] = React.useState('')
    const [refresh, triggerRefresh] = React.useState(true)

    let doLogout = async() => {
        await AsyncStorage.setItem("loggedIn", '')
        await AsyncStorage.setItem("loggedInData", '')
        await AsyncStorage.setItem("pendingEmail", '')
        setIsLoggedIn(false)
        setIsBooked(false)
        setName('')
    }

    React.useEffect(() => {
        async function onLoad() {

            try {
                const loggedIn = await AsyncStorage.getItem("loggedIn")
                const loggedInData = await AsyncStorage.getItem("loggedInData")
                const loggedInDataObject = JSON.parse(loggedInData)

                if (loggedIn.toString() === "true") {
                    setIsLoggedIn(true)
                    setIsBooked(loggedInDataObject.appointment)
                    setName(loggedInDataObject.firstName)
                }
                else {
                    setIsLoggedIn(false)
                    setIsBooked(false)
                    setName('')
                }
            } catch (e) {
                console.log(e)
            }

        }
        onLoad().then(r => {console.log(r)})

        const focus = navigation.addListener("didFocus", ()=>{
            triggerRefresh(!refresh)
        })

        return function cleanUp() {
            focus.remove()
        }

    })

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(255,255,255,1)', '#3491E8']}
                style={styles.background}
                locations={[0.3, 1]}
            />
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
                        paddingBottom: 48,
                        borderBottomColor: "#005DB3",
                        borderBottomWidth: 2,
                    }}
                    icon={ faSearch } size={24} />
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
            }}>
                <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Find Nearest Clinic</Text>
            </TouchableOpacity>
            {
                isLoggedIn
                    ?
                    (!isBooked ?
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
                            }}>
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
                            }}>
                                <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Update Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    <TouchableOpacity 
                    onPress = {()=>navigation.navigate('CreateAppointment')}
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
    }
});

export default DashboardComponent
