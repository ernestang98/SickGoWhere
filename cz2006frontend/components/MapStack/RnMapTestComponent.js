// Boilerplate for building pages
// DO NOT EDIT/REMOVE ANY CODE FROM HERE, ONLY ADD
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import MapView from 'react-native-maps';
function RnMapTestComponent() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
}
let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
});
export default RnMapTestComponent