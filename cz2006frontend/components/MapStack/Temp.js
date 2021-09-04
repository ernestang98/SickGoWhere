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
    SafeAreaView,
    ImageBackground,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Component, useState, useEffect, useRef } from 'react';
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNLocation from 'react-native-location';
import Geolocation from 'react-native-geolocation-service';
import database from '../utils/database';
function NearestClinicComponent({ navigation }) {
    const [currLatitude, setCurrLatitude] = useState(0);
    const [currLongitude, setCurrLongitude] = useState(0);
    const [clinics, setClinics] = useState(database);
    const distances = [];
    const five = [];
    const [topFive, setTopFive] = useState([]);

    useEffect(() => {

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
        // console.log(origin)

        for (var i = 0; i < Object.keys(clinics).length; i++) {
            const curr = clinics[i];
            const distance = Math.sqrt(
                Math.pow(origin.latitude - curr.latitude, 2) +
                Math.pow(origin.longitude - curr.longitude, 2),
            );
            distances.push({
                name: curr.name,
                lat: curr.latitude,
                lng: curr.longitude,
                distance: distance,
            });
        }

        const sortArray = () => {
            const sorted = distances.sort((a, b) => a['distance'] - b['distance']);
        };
        sortArray();
        for (var i = 0; i < 5; ++i) {
            five.push(distances[i]);
        }
        // console.log(five)
        setTopFive(five);
        console.log(topFive);

        const focus = navigation.addListener("didFocus", () => {
            triggerRefresh(!refresh)
        })

        return function cleanUp() {
            focus.remove()
        }

    });
    // console.log(topFive);

    /* not used */
    const GOOGLE_MAP_APIKEY = 'AIzaSyB_19dTg8HCPuL1atfAUUqsbgdEsn9fp70';
    const ClinicList = ({ data }) => {
        const renderItem = ({ item: { name, lat, lng, distance } }) => (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('RNLocator', { lat: lat, lng: lng, nam: name })
                }
                style={Cstyles.item}
            //HERE IS THE PART WHERE NEED TO DEFINE FUNCTION FOR THE NAVIGATION
            //adding google maps
            >
                <Text style={Cstyles.title}>{name}</Text>
                <Text>{distance}</Text>
            </TouchableOpacity>
        );
        const renderEmpty = () => (
            <View style={Cstyles.empty}>
                <Text>No results...</Text>
            </View>
        );
        return (
            <View
                style={{
                    backgroundColor: "#ffffff",
                    flex: 1
                }}>
                <FlatList
                    contentContainerStyle={Cstyles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item?.postal_code},${index}`}
                    ListEmptyComponent={renderEmpty}
                />
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.bigHeader}>Nearest Clinics:</Text>
            <ClinicList data={topFive} />
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                }}>
                <Image
                    style={{
                        height: 155,
                        width: 155,
                    }}
                    source={require('../../assets/house.png')}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    bigHeader: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'white',
        marginTop: "10%"
    },
});
const Cstyles = StyleSheet.create({
    list: {
        flexGrow: 1,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: '#ced4da',
        borderBottomWidth: 1,
    },
    title: {
        fontWeight: 'bold',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
const Hstyles = StyleSheet.create({
    container: {
        //minHeight: getNavBarHeight(),
        borderBottomWidth: 1,
        borderBottomColor: '#ced4da',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    textInputContainer: {
        borderRadius: 2,
        backgroundColor: '#ced4da',
        padding: 10,
    },
});
export default NearestClinicComponent;
