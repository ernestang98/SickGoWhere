import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

let ScreenWidth = Dimensions.get("window").width;

function ViewAppointmentComponent({navigation}) {

    const [animate, setAnimate] = React.useState(true)

    const [clinicName, setClinicName] = React.useState("")

    const [long, setLong] = React.useState("")

    const [lat, setLat] = React.useState("")

    const [date, setDate] = React.useState("")

    const [time, setTime] = React.useState("")

    const [refresh, triggerRefresh] = React.useState(true)

    React.useEffect(() => {

        async function onLoad() {
            let userId = await AsyncStorage.getItem("userId")
            const res = await axios.get("http://10.0.2.2:3000/readAppointment/" + userId)
            console.log(res.data)
            setClinicName(res.data.data.clinicName)
            setDate(res.data.data.date)
            setTime(res.data.data.time)
            setAnimate(false)
            setLat(res.data.latitude)
            setLong(res.data.longitude)
        }

        try {
            onLoad().then(r=>{})
        }
        catch (e) {

        }

        const focus = navigation.addListener("didFocus", ()=>{
            triggerRefresh(!refresh)
        })

        return function cleanUp() {
            focus.remove()
        }

    })

    return (
        <View style={styles.container}>
            {animate &&
            <View style={[styles.activity, styles.horizontal]}>
                <ActivityIndicator size="large" color="#005DB3" animating={animate} />
                <Text style={{textAlign: "center", fontSize: 20}}>Loading</Text>
            </View>
            }
            <View
                style={{
                    height:0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
            </View>

            <View style={styles.text}>
                <Text
                    style={{
                        color:"black",
                        fontSize:26,
                        fontWeight:"bold",
                    }}>Next Appointment:</Text>

            </View>

            <View style={styles.text2}>
                <Text style={{
                    color:"#005DB3",
                    fontSize:30,
                    fontWeight:"bold",
                    textAlign:"center"
                }}>{clinicName ? clinicName : "Hello World"}</Text>

            </View>

            <View style={styles.text2}>
                <Text style={{
                    color:"#005DB3",
                    fontSize:30,
                    fontWeight:"bold",
                }}>{date ? date : "DD-MM-YYYY"} | {time ? time : "HHMM"}</Text>

            </View>

            <View
                style={{
                    flexDirection:"row",
                    top:-50
                }}>

                <TouchableOpacity
                    //onPress={()=> console.log("Direction")}
                    onPress={() => {
                        console.log(lat)
                        navigation.navigate('RNLocator', { lat: lat, lng: long, nam: clinicName })
                    }
                    }
                    style={{
                        paddingRight:40
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems:"center",
                        marginTop:80,
                        width: 130,
                        height:40,
                        backgroundColor:"#005DB3",
                        borderRadius:10,

                    }}>

                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                color: "white",
                                paddingLeft: 5,
                                paddingRight: 5
                            }}
                        >Directions</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                        onPress = {()=>navigation.navigate('Dashboard')}
                    >
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems:"center",
                            marginTop:80,
                            width: 130,
                            height:40,
                            backgroundColor:"#005DB3",
                            borderRadius:10,
                        }}>

                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    color: "white",
                                    paddingLeft: 5,
                                    paddingRight: 5
                                }}
                            >Home</Text>
                        </View>
                    </TouchableOpacity>
            </View>



            <Image
                    style={styles.house}
                    source={require('../../assets/house.png')}
             />
        </View>

    )
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: ScreenHeight -80,
    },
    house: {
        position: 'absolute',
        height: 155,
        width: 155,
        bottom: 0,
        left: 0,
        zIndex: -1
    },
    text:{
        height:70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text2:{
        height:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    activity: {
        flex: 1,
        justifyContent: "center",
        position:"absolute",
        backgroundColor: "#ffffff",
        zIndex: 10,
        width: ScreenWidth,
        height: ScreenHeight,
    },

    horizontal: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 10
    }

});

export default ViewAppointmentComponent
