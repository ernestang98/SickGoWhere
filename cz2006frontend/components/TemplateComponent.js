// Boilerplate for building pages
// DO NOT EDIT/REMOVE ANY CODE FROM HERE, ONLY ADD

import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {Defs, LinearGradient, Rect, Stop, Svg} from "react-native-svg";

function TemplateComponent() {
    return (
        <View style={styles.container}>
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
    }
});

export default TemplateComponent