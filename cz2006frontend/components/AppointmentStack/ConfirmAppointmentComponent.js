import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faCheckSquare, faHome, faRoute } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ScreenWidth = Dimensions.get('window').width;

// Need to hide the back button!
function ConfirmAppointmentComponent({navigation}) {

    const [animate, setAnimate] = React.useState(true)

    //const clinicName = navigation.getParam('clinicName');

    //const appointmentDate = navigation.getParam('appointmentDate');

    //const appointmentTime = navigation.getParam('appointmentTime');

    const [clinicName, setClinicName] = React.useState("")

    const [date, setDateSelected] = React.useState("")

    const [time, setTimeSelected] = React.useState("")

    const [refresh, triggerRefresh] = React.useState(true)

    React.useEffect(() => {

        async function onLoad() {
            let userId = await AsyncStorage.getItem("userId")
            const res = await axios.get("http://10.0.2.2:3000/readAppointment/" + userId)
            setClinicName(res.data.data.clinicName)
            setDateSelected(res.data.data.date)
            setTimeSelected(res.data.data.time)
            //setAnimate(false)
        }

        try {
            onLoad().then(r=>{setAnimate(false)})
        }
        catch (e) {
            console.log(e)
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
                    height:100,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <FontAwesomeIcon
                    style={{
                        color: "#005DB3",
                    }}
                    icon={ faCheckSquare } size={90}
                />
            </View>

            <View style={styles.text}>
                <Text
                    style={{
                        color:"black",
                        fontSize:30,
                    }}>Appointment Confirmed!</Text>

            </View>

            <View style={styles.text}>
                <Text style={{
                    color:"#005DB3",
                    fontSize:30,
                    fontWeight:"bold",
                    textAlign:"center"
                }}>{clinicName ? clinicName : "Clinic Name"}</Text>

            </View>

            <View style={styles.text}>
                <Text style={{
                    color:"#005DB3",
                    fontSize:30,
                    fontWeight:"bold",


                }}>{date ? date : "2021-03-14"} | {time ? time : "0000HRS"} </Text>
            </View>

            <View style={styles.text2}>
                <Text style={{
                    color:"black",
                    fontSize:20,
                    textAlign:"center"
                }}>Please arrive 10 minutes before your appointment timing.</Text>

            </View>

           <View
                style={{
                    flexDirection:"row",
                    top:-50
                }}>

                <TouchableOpacity
                    onPress = {()=>navigation.navigate('CreateAppointment', {
                        //clinicName:clinicName,
                        create: "false",
                        fromMap:"false"
                    })}
                    style={{
                        paddingRight:80
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems:"center",
                        marginTop:80,
                        width: 100,
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
                        >Edit</Text>
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
                            width: 100,
                            height:40,
                            backgroundColor:"#005DB3",
                            borderRadius:10,
                        }}>
                            <FontAwesomeIcon
                                style={{
                                    color: "white"
                                }}
                                icon={ faHome } size={22} />
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
        height:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth:2,
        // borderColor:"black"
    },
    text2:{
        height:80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth:2,
        // borderColor:"black"
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

export default ConfirmAppointmentComponent
