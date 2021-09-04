// Boilerplate for building pages
// DO NOT EDIT/REMOVE ANY CODE FROM HERE, ONLY ADD

import React from 'react';
import { View, StyleSheet, Dimensions, Image, StatusBar, TextInput, TouchableOpacity, Text, Button, Platform} from "react-native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function AppointmentComponent() {
    const [clinicName, setClinicName] = React.useState('');
    const [comments, setComments] = React.useState('');

    const today = new Date();
    const threeDaysAfter = today.setDate(today.getDate()+3);
    const today2 = new Date();

    const [date, setDate] = React.useState(new Date(today2));
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const today3 = new Date();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const getAllClinics = async() => {
        const URL = "https://cz2006api.herokuapp.com/api/getAll"
        const res = await axios.get(URL)
        const allClinics = res.data.data
        const allClinicsNames = allClinics.map(item=>{
            return item.Name
        })
    }

    const createAppointment = async() => {
        if (!clinicName || !comments || !date) {
            alert("Enter all fields!")
        }
        else {
            const URL = "http://localhost:3000/createAppointment"
            const loggedInData = await AsyncStorage.getItem("loggedInData")
            const loggedInDataObject = JSON.parse(loggedInData)
            const res = await axios.post(URL, {
                "userId": loggedInDataObject.userId.toString(),
                "clinicName": clinicName,
                "date": date.toISOString().slice(0,10),
                "time": date.toISOString().slice(11,16),
                "others": comments
            }, {
                headers: {
                    contentType: "application/json"
                }
            })
            alert(res.data.data.message)
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>


                <View
                style={{
                    height:50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap:"wrap",
                    marginTop:-250}}
                >
                    <TextInput
                        style={styles.textInput}
                        onChangeText={test => setClinicName(test)}
                        placeholder={"Clinic Name"}
                        value={clinicName}
                    />

                    <FontAwesomeIcon
                        style={{
                            right: 10,
                            color: "#000000",
                            paddingBottom: 48,
                            borderBottomColor: "#005DB3",
                            borderBottomWidth: 2,
                        }}
                        icon={ faSearch } size={30}
                    />

                </View>


                <View
                    style={{
                        height:50,
                        top:50,
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"center",
                    }}>
                    <TouchableOpacity
                        onPress={showDatepicker}
                        style={styles.calendar}>
                        <Text
                            style={{color:"black",
                            fontSize:20,
                            marginTop:5}}>Date: {date.toISOString().slice(0,10)}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={showDatepicker}
                        style={styles.calendarSmall}
                    >
                        <Image
                            source={require('../../assets/calendaricon.png')}
                            style={styles.image}>

                        </Image>
                    </TouchableOpacity>
                </View>




                <View
                    style={{
                        height:50,
                        top:80,
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"center",
                    }}>
                    <TouchableOpacity
                        onPress={showTimepicker}
                        style={styles.calendar}>
                        <Text
                            style={{color:"black",
                            fontSize:20,
                            marginTop:5}}>Time: {date.toISOString().slice(11,16)}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={showTimepicker}
                        style={styles.calendarSmall}
                    >
                        <Image
                            source={require('../../assets/calendaricon.png')}
                            style={styles.image}>

                        </Image>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date(threeDaysAfter)}
                    minimumDate={new Date(today3)}
                    minuteInterval={15}
                    />
                )}


                    <View
                        style={{
                            backgroundColor:"#CEE8FF",
                            width:350,
                            height:150,
                            borderRadius:10,
                            top:130,

                        }}>
                        <TextInput
                            style={styles.textInput2}
                            onChangeText={text => setComments(text)}
                            placeholder={"Other Comments"}
                            value={comments}
                        />
                    </View>


                <TouchableOpacity
                    onPress={()=> console.log("Confirm")}
                    style={{
                        alignItems: "center",
                        backgroundColor: "#005DB3",
                        width: 150,
                        height: 40,
                        borderRadius: 10,
                        marginBottom: 30,
                        marginRight: 40,
                        position: "absolute",
                        bottom: 0,
                        right: 0
                    }}>
                    <Text
                        style={{color:"white",
                        fontSize:25,
                        marginTop:3}}>Confirm</Text>
                </TouchableOpacity>


                <Image
                    style={styles.house}
                    source={require('../../assets/house.png')}
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
        height: ScreenHeight -80
    },
    house: {
        position: 'absolute',
        height: 155,
        width: 155,
        bottom: 0,
        left: 0,
        zIndex: -1
    },
    calendar:{
        alignItems:"center",
        width:300,
        height:40,
        borderRadius:10,
        borderColor: "#005DB3",
        borderWidth: 2,
    },
    calendarSmall:{
        alignItems:"center",
        backgroundColor: "#005DB3",
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    image:{
        top:3,
        height:30,
        width:30,
    },
    textShown:{
        fontSize:20,
    },
    textInput: {
        height: 50,
        width: 300,
        borderColor: "#005DB3",
        borderBottomWidth: 2,
        borderRadius: 10,
        //marginTop: 100,
        //marginBottom: 10,
        paddingLeft: 15,
        fontSize: 30
    },
    textInput2: {
        height: 50,
        width: 300,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25
    }
});

export default AppointmentComponent
