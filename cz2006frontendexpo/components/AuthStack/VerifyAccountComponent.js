import React from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function VerifyAccountComponent({navigation}) {

    const email = navigation.getParam('email');

    const [code, setCode] = React.useState('');

    const doResend = async() => {
        if (!email) alert("Error something went wrong!")
        else {
            const URL = "http://localhost:3000/resend"
            const res = await axios.post(URL, { "email": email }, {
                headers: {
                    contentType: "application/json"
                }
            })
            alert(res.data.status)
        }
    }

    const doVerify = async() => {
        if (!code) alert("Enter code!")
        else {
            const URL = "http://localhost:3000/verify"
            const res = await axios.post(URL, { "code": code }, {
                headers: {
                    contentType: "application/json"
                }
            })
            if (res.data.status === "failure") alert(res.data.data.message)
            else {
                alert("Success!")
                console.log(res.data.data)
                await AsyncStorage.setItem("loggedIn", true)
                await AsyncStorage.setItem("loggedInData", JSON.stringify(res.data.data))
                navigation.navigate('Dashboard')
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
