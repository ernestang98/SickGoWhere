// Boilerplate for building pages
// DO NOT EDIT/REMOVE ANY CODE FROM HERE, ONLY ADD

import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function TemplateComponent() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(255,255,255,1)', '#3491E8']}
                style={styles.background}
                locations={[0.3, 1]}
            />
            <Text>Hello World</Text>
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
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: ScreenHeight,
        zIndex: -1
    }
});

export default TemplateComponent
