import React from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {errorStyle, infoStyle, successStyle} from '../StyleComponent'
import Toast from 'react-native-toast-native';

function VerifyAccountComponent({navigation}) {

    const email = navigation.getParam('email');

    const [code, setCode] = React.useState('');

    const doResend = async() => {
        if (!email) Toast.show("Error something went wrong!", Toast.LONG, Toast.TOP, errorStyle);
        else {
            const URL = "http://10.0.2.2:3000/resend"
            const res = await axios.post(URL, { "email": email }, {
                headers: {
                    contentType: "application/json"
                }
            })
            Toast.show(res.data.status, Toast.LONG, Toast.TOP, errorStyle);
        }
    }

    const doVerify = async() => {
        if (!code) Toast.show("Enter code!", Toast.LONG, Toast.TOP, errorStyle);
        else {
            try {
                const URL = "http://10.0.2.2:3000/verify"
                const res = await axios.post(URL, { "code": code }, {
                    headers: {
                        contentType: "application/json"
                    }
                })
                Toast.show(res.data.status, Toast.LONG, Toast.TOP, errorStyle);
                await AsyncStorage.setItem("loggedIn", "true")
                await AsyncStorage.setItem("userId", res.data.data.id)
                await AsyncStorage.setItem("token", res.data.data.accessToken)
                navigation.navigate('Dashboard')
            }
            catch (e) {
                Toast.show("Something went wrong...", Toast.LONG, Toast.TOP, errorStyle)
            }
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text
                    style={{
                        width: 330,
                        fontSize: 20,
                        textAlign: "center",
                        marginBottom: 15
                    }}
                >A verification code has been sent to {email ? email : "your email"}.</Text>
                <Text
                    style={{
                        width: 330,
                        fontSize: 20,
                        textAlign: "left"
                    }}
                >Enter Code: </Text>
                <Image
                    style={ styles.house }
                    source={ require('../../assets/house.png') }
                />
                <TextInput
                    style={ styles.textInput }
                    onChangeText={text => setCode(text)}
                    value={code}
                    placeholder={"Code"}
                />
                <View
                    style={{
                        width: 340,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            backgroundColor: "#005DB3",
                            padding: 10,
                            width: 150,
                            height: 40,
                            borderRadius: 10,
                            marginBottom: 10
                        }}

                        onPress={()=>doResend()}

                    >
                        <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Resend Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            backgroundColor: "#005DB3",
                            padding: 10,
                            width: 100,
                            height: 40,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                        onPress={() =>
                            doVerify()
                        }
                    >
                        <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: ScreenHeight - 80
    },
    house: {
        position: 'absolute',
        height: 155,
        width: 155,
        bottom: 0,
        left: 0,
        zIndex: -1
    },
    textInput: {
        height: 45,
        width: 340,
        borderColor: "#005DB3",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 35,
        paddingLeft: 15,
        fontSize: 20
    },
});

export default VerifyAccountComponent
