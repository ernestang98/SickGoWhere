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
    const [topFive, setTopFive] = useState([]);
    const distances = [];
    const five = [];

    // const onLoad = async() => {
    //     const permission = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     )
    //     console.log(permission)

    //     const live_current_location = await Geolocation.getCurrentPosition(
    //         (position) => {
    //             console.log(position)
    //         },
    //         (err) => {
    //             console.log(err);
    //         },
    //         {
    //             enableHighAccuracy: true,
    //             timeout: 10000,
    //         },
    //     );

    //     console.log(live_current_location)

    //     const rn_location_permission = await RNLocation.requestPermission({
    //         android: { detail: 'fine' },
    //     })

    //     if (rn_location_permission) {
    //         const loc = await RNLocation.getLatestLocation()
    //         if (loc) {
    //             setCurrLatitude(loc.latitude);
    //             setCurrLongitude(loc.longitude);
    //             const origin = { latitude: currLatitude, longitude: currLongitude };
    //             console.log(origin);

    //             const nearestClinics = (origin) => {

    //                 for (let i = 0; i < Object.keys(clinics).length; i++) {
    //                     const curr = clinics[i];
    //                     const distance = Math.sqrt(
    //                         Math.pow(origin.latitude - curr.latitude, 2) +
    //                         Math.pow(origin.longitude - curr.longitude, 2),
    //                     );
    //                     distances.push({
    //                         name: curr.name,
    //                         lat: curr.latitude,
    //                         lng: curr.longitude,
    //                         distance: distance,
    //                     });
    //                 }

    //                 const sortArray = () => {
    //                     const sorted = distances.sort((a, b) => a['distance'] - b['distance']);
    //                 };
    //                 sortArray();
    //                 for (var i = 0; i < 5; ++i) {
    //                     five.push(distances[i]);
    //                 }

    //             }
    //             nearestClinics(origin);
    //         }
    //         else {
    //             console.log("error...")
    //         }
    //     }
    //     else {
    //         console.log("error...")
    //     }
    // }

    // onLoad().then(r=>{})

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
    console.log(origin);

    const nearestClinics = (origin) => {

        const ratio = 2 * Math.PI * 3959 / 360 * 1.60934 * 1000
        for (var i = 0; i < Object.keys(clinics).length; i++) {
            const curr = clinics[i];
            const distance = ratio * Math.sqrt(Math.pow(origin.latitude - curr.latitude, 2) +
                Math.pow(((origin.longitude - curr.longitude)), 2),
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

    }

    nearestClinics(origin);
    // console.log(five)
    // setTopFive(nearestClinics(origin));
    // console.log(topFive);

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
                <Text>{Math.round(distance)} Meters</Text>
            </TouchableOpacity>
        );
        const renderEmpty = () => (
            <View style={Cstyles.empty}>
                <Text>No results...</Text>
            </View>
        );
        return (
            <ImageBackground
                source={require('../../assets/house1.png')}
                style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={Cstyles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item?.postal_code},${index}`}
                    ListEmptyComponent={renderEmpty}
                />
            </ImageBackground>
        );
    };

    let viewProperties;
    const makeInitial = () => {
        viewProperties = {
            latitude: currLatitude,
            longitude: currLongitude,
            latitudeDelta: Math.abs(parseFloat(five[4].lat) - currLatitude) * 3,
            longitudeDelta: Math.abs(parseFloat(five[4].lng) - currLongitude) * 3,
        }
    }

    makeInitial();

    const dest1 = { latitude: parseFloat(five[0].lat), longitude: parseFloat(five[0].lng) };
    const dest2 = { latitude: parseFloat(five[1].lat), longitude: parseFloat(five[1].lng) };
    const dest3 = { latitude: parseFloat(five[2].lat), longitude: parseFloat(five[2].lng) };
    const dest4 = { latitude: parseFloat(five[3].lat), longitude: parseFloat(five[3].lng) };
    const dest5 = { latitude: parseFloat(five[4].lat), longitude: parseFloat(five[4].lng) };

    const MakeMap = () => {
        return (
            <MapView style={styles.map} initialRegion={viewProperties}>
                <MapView.Marker pinColor={'blue'} coordinate={origin} />
                <MapView.Marker coordinate={dest1} />
                <MapView.Marker coordinate={dest2} />
                <MapView.Marker coordinate={dest3} />
                <MapView.Marker coordinate={dest4} />
                <MapView.Marker coordinate={dest5} />
            </MapView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.bigHeader}>Nearest Clinics:</Text>
            <MakeMap />
            <ClinicList data={five} />
        </SafeAreaView>
    );
}
let ScreenWidth = Dimensions.get('window').width;
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
    },
    map: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        // height: 0.6 * ScreenHeight,
        // width: 0.8 * ScreenWidth,
        height: 0.63 * ScreenWidth,
        width: 0.8 * ScreenWidth,
        alignItems: 'center',
        justifyContent: 'center',
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
