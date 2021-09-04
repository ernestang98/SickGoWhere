import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


function LoginComponent({ navigation }) {

    const [email, setEmail] = React.useState('');

    const [password, setPassword] = React.useState('');

    const [checkbox, setCheckBox] = React.useState(false);

    let doLogin = async() => {
        if (!email || !password) {
            alert("Enter all fields!")
        }
        else {
            const URL = "http://localhost:3000/login"
            const res = await axios.post(URL, { "password": password, "email": email }, {
                headers: {
                    contentType: "application/json"
                }
            })
            if (res.data.status === "success") {
                alert("Success!")
                await AsyncStorage.setItem("loggedIn", true)
                await AsyncStorage.setItem("loggedInData", JSON.stringify(res.data.data))
                navigation.navigate('Dashboard')
            } else if (res.data.status === "pending") {
                await AsyncStorage.setItem("pendingEmail", email)
                alert("Verify Account")
                navigation.navigate('VerifyAccount', {
                    email: email
                })
            } else {
                alert("Wrong Username/Password")
            }

        }
    }

    return (
        <View style={styles.container}>
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
            <Text
                style={{ textAlign: "left", width: 320, fontSize: 20, fontWeight: "bold" }}>Login</Text>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(255,255,255,1)', '#3491E8']}
                style={styles.background}
                locations={[0.3, 1]}
            />
            <TextInput
                style={ styles.textInput }
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={"Email"}
            />
            <TextInput
                style={ styles.textInput }
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder={"Password"}
                secureTextEntry={true}
            />
            <View style={{marginBottom: 20}}>
                <View
                    style={{position: "absolute", top: -10, left: -10, zIndex: 2}}
                >
                    <CheckBox
                        checked={checkbox}
                        onPress={()=>setCheckBox(!checkbox)}
                        uncheckedColor={"#005DB3"}
                        checkedColor={"#005DB3"}
                    />
                </View>
                <View>
                    <Text style={{fontSize: 12, paddingLeft: 40, width: 330, paddingTop: 9}}>Remember me</Text>
                </View>
            </View>
            <TouchableOpacity style={{
                alignItems: "center",
                backgroundColor: "#005DB3",
                padding: 10,
                width: 320,
                height: 40,
                borderRadius: 10,
                marginBottom: 10
            }}
            onPress={() => doLogin()}
            >
                <Text style={{color: "white", fontSize: 20, marginTop: -3}}>Log in</Text>
            </TouchableOpacity>
            <View style={{flexDirection: "row",
                width: 320,
                justifyContent: "space-between",
                paddingTop: 10
            }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 18
                    }}
                >Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            textTransform: "uppercase",
                            color: "#005DB3"
                        }}
                    >SIGN UP</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Dashboard')}
                >
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop:80,
                        width: 330
                    }}>
                        <FontAwesomeIcon
                            style={{
                                color: "#c8dfff"
                            }}
                            icon={ faHome } size={24} />
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                color: "#c8dfff",
                                paddingLeft: 5,
                                paddingRight: 5
                            }}
                        >Home</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#be2f2f',
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
    logo: {
        height: 80,
        width: 270,
        marginBottom: 30,
        marginTop: 50
    },
    textInput: {
        height: 50,
        width: 320,
        borderColor: "#005DB3",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        fontSize: 20
    }
});

export default LoginComponent
