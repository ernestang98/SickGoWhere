import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

function DeleteAppointmentConfirmComponent({navigation}) {

    const clinicName = navigation.getParam('clinicName');

    const date = navigation.getParam('date');

    const time = navigation.getParam('time');

    return (
        <View style={styles.container}>
            <View
                style={{
                    height:50,
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
                        fontSize:30,
                        fontWeight:"bold",
                    }}>Appointment Cancelled!</Text>

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

            <View style={styles.text3}>
                <Text style={{
                    color:"black",
                    fontSize:20,
                    textAlign:"center"
                }}>You can make another appointment {"\n"} on the home page</Text>

            </View>

           <View
                style={{
                    flexDirection:"row",
                    top:-50
                }}>

                <TouchableOpacity
                        onPress = {()=>navigation.navigate('Dashboard')}
                    >
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems:"center",
                            marginTop:70,
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

    text3:{
        height:80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default DeleteAppointmentConfirmComponent
