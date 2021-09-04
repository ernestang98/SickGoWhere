import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import axios from "axios";
import {errorStyle, infoStyle, successStyle} from '../StyleComponent'
import Toast from 'react-native-toast-native';

function RegisterComponent({ navigation }) {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    let doRegister = async() => {
        if (!email || !password || !firstName || !lastName || !confirmPassword) {
            Toast.show("Enter all fields please!", Toast.LONG, Toast.TOP, errorStyle);
        }
        else {
            if (password !== confirmPassword) {
                Toast.show("Passwords does not match", Toast.LONG, Toast.TOP, errorStyle);
            } else {
                try {
                    const URL = "http://10.0.2.2:3000/signup"
                    await axios.post(URL, {
                        "password": password, "email": email ,
                        "lastName": lastName, "firstName": firstName
                    }, {
                        headers: {
                            contentType: "application/json"
                        }
                    })
                    Toast.show("Success!", Toast.LONG, Toast.TOP, successStyle);
                    navigation.navigate('VerifyAccount', {
                        email: email
                    })
                }
                catch (e) {
                    Toast.show("Email already registered!", Toast.LONG, Toast.TOP, errorStyle);
                }
            }
        }
    }

    return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <View
                            style={{
                                width: 270,
                                alignContent: "center",
                                alignSelf: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                style={ styles.logo }
                                source={ require('../../assets/sgwBlue.png') } />
                        </View>
                        <TextInput
                            style={ styles.textInput }
                            onChangeText={text => setFirstName(text)}
                            value={firstName}
                            placeholder={"First Name"}
                        />
                        <TextInput
                            style={ styles.textInput }
                            onChangeText={text => setLastName(text)}
                            value={lastName}
                            placeholder={"Last Name"}
                        />
                        <TextInput
                            style={ styles.textInput }
                            onChangeText={text => setEmail(text)}
                            value={email}
                            placeholder={"Email "}
                        />
                        <TextInput
                            style={ styles.textInput }
                            onChangeText={text => setPassword(text)}
                            value={password}
                            placeholder={"Password "}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={ styles.textInputLast }
                            onChangeText={text => setConfirmPassword(text)}
                            value={confirmPassword}
                            placeholder={"Confirm Password"}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            doRegister()
                        }
                        style={{
                            alignItems: "center",
                            backgroundColor: "#005DB3",
                            width: 100,
                            height: 40,
                            borderRadius: 10,
                            marginBottom: 30,
                            marginRight: 40,
                            position: "absolute",
                            bottom: 0,
                            right: 0
                        }}>
                        <Text style={{color: "white", fontSize: 20, marginTop: 6}}>Create</Text>
                    </TouchableOpacity>
                    <Image
                        style={ styles.house }
                        source={ require('../../assets/house.png') }
                    />
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
    logo: {
        height: 80,
        width: 270,
        marginBottom: 30,
        marginTop: 50
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
        height: 40,
        width: 340,
        borderColor: "#005DB3",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 15,
        fontSize: 15
    },
    textInputLast: {
        height: 40,
        width: 340,
        borderColor: "#005DB3",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 110,
        paddingLeft: 15,
        fontSize: 15
    }
});

export default RegisterComponent
