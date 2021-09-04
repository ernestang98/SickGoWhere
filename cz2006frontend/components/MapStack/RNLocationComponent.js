// Boilerplate for building pages
// DO NOT EDIT/REMOVE ANY CODE FROM HERE, ONLY ADD
import React from 'react';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Text,
    Button,
    Platform,
    Alert,
    FlatList,
    PermissionsAndroid,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Component, useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNLocation from 'react-native-location';
import Geolocation, { watchPosition } from 'react-native-geolocation-service';
import getDirections from 'react-native-google-maps-directions';
import Toast from "react-native-toast-native";
import { errorStyle } from "../StyleComponent";
import { LogBox } from 'react-native';
function RNLocationComponent({ navigation }) {
    const [refresh, triggerRefresh] = React.useState(true)
    const longitude = parseFloat(navigation.getParam('lng'));
    const latitude = parseFloat(navigation.getParam('lat'));
    const clinicname = navigation.getParam('nam');
    const [currLatitude, setCurrLatitude] = useState(0);
    const [currLongitude, setCurrLongitude] = useState(0);
    const [DurationByBus, setDurationByBus] = useState(0);
    const [DurationByFoot, setDurationByFoot] = useState(0);
    const [DurationByCar, setDurationByCar] = useState(0);

    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(r => { });

    Geolocation.getCurrentPosition(
        (position) => { },
        (err) => {
            console.log(err);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
        },
    );

    RNLocation.requestPermission({
        android: { detail: 'fine' },
    }).then((granted) => {
        if (granted) {
            RNLocation.getLatestLocation().then((loc) => {
                setCurrLatitude(loc.latitude);
                setCurrLongitude(loc.longitude);
            });
        }
    });
    const origin = { latitude: currLatitude, longitude: currLongitude };


    // Change destination to clinic lat and long
    const destination = { latitude: latitude, longitude: longitude };
    const middle = {
        latitude: (origin.latitude + destination.latitude) / 2,
        longitude: (origin.longitude + destination.longitude) / 2,
        latitudeDelta: Math.abs(destination.latitude - origin.latitude) * 1.25,
        longitudeDelta: Math.abs(destination.longitude - origin.longitude) * 1.25,
    };

    const ThreeWay = () => {
        return (
            <MapView style={styles.map} initialRegion={middle}>
                <MapView.Marker coordinate={origin} />
                <MapView.Marker coordinate={destination} />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAP_APIKEY}
                    strokeWidth={3}
                    strokeColor="#00000000"
                    mode="TRANSIT"
                    onReady={(result) => {
                        setDurationByBus(Math.ceil(result.duration));
                    }}
                    onError={(errorMessage) => {
                        console.log(origin);
                        console.log(destination);
                    }}
                />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAP_APIKEY}
                    strokeWidth={3}
                    strokeColor="blue"
                    mode="WALKING"
                    onReady={(result) => {
                        setDurationByFoot(Math.ceil(result.duration));
                    }}
                />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAP_APIKEY}
                    strokeWidth={3}
                    strokeColor="#00000000"
                    mode="DRIVING"
                    onReady={(result) => {
                        setDurationByCar(Math.ceil(result.duration));
                    }}
                />
            </MapView>
        );
    };

    // // Change destination to clinic lat and long
    // const destination = { latitude: latitude, longitude: longitude };
    // const middle = {
    //     latitude: (origin.latitude + destination.latitude) / 2,
    //     longitude: (origin.longitude + destination.longitude) / 2,
    //     latitudeDelta: Math.abs(destination.latitude - origin.latitude) * 1.25,
    //     longitudeDelta: Math.abs(destination.longitude - origin.longitude) * 1.25,
    // };

    LogBox.ignoreAllLogs(true);

    const GOOGLE_MAP_APIKEY = 'AIzaSyB_19dTg8HCPuL1atfAUUqsbgdEsn9fp70';
    const handleGetDirections = (modeOfTravel) => {
        const data = {
            source: {
                latitude: origin.latitude,
                longitude: origin.longitude,
            },
            destination: {
                latitude: destination.latitude,
                longitude: destination.longitude,
            },
            params: [
                {
                    key: 'travelmode',
                    value: modeOfTravel,
                },
                {
                    key: 'dir_action',
                    value: 'navigate',
                },
            ],
        };
        getDirections(data);
    };

    return (
        <ScrollView style={{
            backgroundColor: "#ffffff"
        }}>
            <View>
                <Text style={styles.bigHeader}>Directions</Text>
                <Text style={styles.smallHeader}>{clinicname}</Text>
                <ThreeWay />
                <TouchableOpacity
                    onPress={() => handleGetDirections('driving')}
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'gray',
                        width: 0.85 * ScreenWidth,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 5,
                        height: 35,
                        borderRadius: 10,
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.Car}
                            source={require('../../assets/Car.png')} />
                        <Text
                            style={{
                                marginRight: 25,
                                flex: 1,
                                color: 'white',
                                fontSize: 20,
                                marginTop: 6,
                                textAlign: 'right',
                            }}>
                            {DurationByCar} Min
            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleGetDirections('transit')}
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'gray',
                        width: 0.85 * ScreenWidth,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 5,
                        height: 35,
                        borderRadius: 10,
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.Bus}
                            source={require('../../assets/Bus.png')} />
                        <Text
                            style={{
                                marginRight: 25,
                                flex: 1,
                                color: 'white',
                                fontSize: 20,
                                marginTop: 6,
                                textAlign: 'right',
                            }}>
                            {DurationByBus} Min
            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleGetDirections('walking')}
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'gray',
                        width: 0.85 * ScreenWidth,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 5,
                        height: 35,
                        borderRadius: 10,
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.Foot}
                            source={require('../../assets/Walking.png')} />
                        <Text
                            style={{
                                marginRight: 25,
                                flex: 1,
                                color: 'white',
                                fontSize: 20,
                                marginTop: 6,
                                textAlign: 'right',
                            }}>
                            {DurationByFoot} Min
            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => {
                        let loggedIn = await AsyncStorage.getItem("loggedIn")
                        let token = await AsyncStorage.getItem("token")
                        let userId = await AsyncStorage.getItem("userId")

                        if (loggedIn === null) { navigation.navigate('Login') }
                        else {
                            try {
                                let res = await axios.get("http://10.0.2.2:3000/user/" + userId, {
                                    headers: {
                                        "x-access-token": token
                                    }
                                })
                                const loggedInData = res.data.data.user



                                if (loggedInData.appointment) {
                                    Toast.show("Already have booking!", Toast.LONG, Toast.TOP, errorStyle);
                                } else {
                                    navigation.navigate('CreateAppointment', {
                                        create: "true",
                                        setClinic: clinicname,
                                        setLong: longitude,
                                        setLat: latitude,
                                        fromMap: "true",
                                    })
                                }
                            }
                            catch (e) {
                                Toast.show("Something went wrong...", Toast.LONG, Toast.TOP, errorStyle)
                            }
                        }
                    }}
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#005DB3',
                        width: 100,
                        height: 40,
                        borderRadius: 10,
                        marginBottom: 30,
                        marginRight: 40,
                        marginTop: 10,
                        marginLeft: 30,
                        bottom: 0,
                        right: 0,
                    }}>
                    <Text style={{ color: 'white', fontSize: 20, marginTop: 6 }}>Book</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    Foot: {
        height: 30,
        width: 30,
        marginTop: 3,
        marginLeft: 33,
    },
    Car: {
        height: 40,
        width: 66,
        marginTop: 0,
        marginLeft: 15,
    },
    Bus: {
        height: 50,
        width: 66,
        marginTop: -5,
        marginLeft: 15,
    },
    bigHeader: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'white',
        marginTop: "10%"
    },
    buttonStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'space-around',
        padding: 20,
        borderRadius: 20,
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    searchbar: {},
    bigHeader: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    smallHeader: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    map: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        // height: 0.6 * ScreenHeight,
        // width: 0.8 * ScreenWidth,
        height: 0.8 * ScreenWidth,
        width: 0.8 * ScreenWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default RNLocationComponent;
