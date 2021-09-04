// Boilerplate for building pages
// DO NOT EDIT/REMOVE ANY CODE FROM HERE, ONLY ADD

import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Platform,
    Dimensions, ActivityIndicator
} from "react-native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import Autocomplete from 'react-native-autocomplete-input';
import Toast from "react-native-toast-native";
import {errorStyle, successStyle} from "../StyleComponent";
import { TouchableHighlightBase } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function CreateAppointmentComponent({ navigation }) {

    const fromRNLocatorClinic = navigation.getParam('setClinic');
    const fromRNLocatorLongitude = navigation.getParam('setLong');
    const fromRNLocatorLatitude = navigation.getParam('setLat');

    const getBookedTimeSlots = async(clinicName, theDateSelected) => {

        if (clinicName === "Hello World") {
            clinicName = selectedValue.name
        }

        if (clinicName) {
            let res = await axios.post("http://10.0.2.2:3000/readTimeSlots",{
                "clinicName": clinicName
            }, {
                headers: {
                    contentType: "application/json"
                }
            })

            if (res.data.status === "empty") {
                setItems([
                    {label: '09:00', value: '09:00'},
                    {label: '10:00', value: '10:00'},
                    {label: '11:00', value: '11:00'},
                    {label: '12:00', value: '12:00'},
                    {label: '13:00', value: '13:00'},
                    {label: '14:00', value: '14:00'},
                    {label: '15:00', value: '15:00'},
                    {label: '16:00', value: '16:00'},
                    {label: '17:00', value: '17:00'},
                ])
            } else {
                /* iterate through all the keys, then extract the aDate and aTime
                    run this only if got clinicName, and got date selected,
                    then filter the aDates first and the corresponding aTime
                    setItems to whats left */

                let availableSlots = [
                    {label: '09:00', value: '09:00'},
                    {label: '10:00', value: '10:00'},
                    {label: '11:00', value: '11:00'},
                    {label: '12:00', value: '12:00'},
                    {label: '13:00', value: '13:00'},
                    {label: '14:00', value: '14:00'},
                    {label: '15:00', value: '15:00'},
                    {label: '16:00', value: '16:00'},
                    {label: '17:00', value: '17:00'},
                ]

                let availableSlotsIndices = [
                    '09:00', '10:00', '11:00',
                    '12:00', '13:00', '14:00',
                    '15:00', '16:00', '17:00'
                ]

                let tempDate = []
                let tempTime = []
                let indicesOfTime = []

                const data = res.data.data.bookedTimeSlots
                const keys = Object.keys(data)

                // console.log("-----------------")
                // console.log(date.toString().slice(4,16))
                // console.log(dateSelected)
                // console.log(theDateSelected)
                // console.log(data)
                //
                // console.log(keys)

                for (let i = 0; i < keys.length; i++) {
                    tempDate.push(data[keys[i]].aDate)
                    tempTime.push(data[keys[i]].aTime)
                }

                // console.log(theDateSelected)
                // console.log(tempDate)

                for (let i = 0; i < tempDate.length; i++) {
                    console.log(theDateSelected.toString().trim())
                    console.log(tempDate[i].toString().trim())
                    if (theDateSelected.toString().trim() === tempDate[i].toString().trim()) {
                        indicesOfTime.push(tempTime[i])
                    }
                }

                console.log("indices: "+indicesOfTime)

                for (let i = 0; i < indicesOfTime.length; i++) {
                    if (availableSlotsIndices.includes(indicesOfTime[i])) {
                        console.log(indicesOfTime[i])
                        let index = availableSlotsIndices.indexOf(indicesOfTime[i])
                        console.log(index)
                        availableSlots.splice(index, 1)
                        console.log(availableSlots)
                        availableSlotsIndices.splice(index, 1)
                    }
                }

                console.log(availableSlots)

                setItems(availableSlots)
            }
        }
        else {
            return null
        }
    }

    const [animate, setAnimate] = React.useState(true)

    const [clinicName, setClinicName] = React.useState("Hello World")

    // dateSelected, date

    const [dateSelected, setDateSelected] = React.useState("This date")

    const [timeSelected, setTimeSelected] = React.useState("This time")

    const [refresh, triggerRefresh] = React.useState(true)

    const create = navigation.getParam('create') === "true";

    const fromMap = navigation.getParam('fromMap') === "true";

    const [isPicked, setIsPicked] = useState(false)

    const [value, setValue] = React.useState(null);

    const [items, setItems] = React.useState([
        {label: '09:00', value: '09:00'},
        {label: '10:00', value: '10:00'},
        {label: '11:00', value: '11:00'},
        {label: '12:00', value: '12:00'},
        {label: '13:00', value: '13:00'},
        {label: '14:00', value: '14:00'},
        {label: '15:00', value: '15:00'},
        {label: '16:00', value: '16:00'},
        {label: '17:00', value: '17:00'},
        {label: ' ', value: ' '}, // or not the 17:00 cannot be selected
    ]);
    let controller;

    const [comments, setComments] = React.useState('');

    const clinicData = require('../../database/clinics_database.json')

    const [clinics, setClinic] = React.useState(clinicData);
    const [filteredClinic, setFilteredClinic] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState({});

    const today = new Date();
    const threeDaysAfter = today.setDate(today.getDate()+3);
    const today2 = new Date();
    //const [date, setDate] = React.useState(new Date(today2));
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const today3 = new Date();

    const onChange = async (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setIsPicked(true);
        console.log(currentDate.toString().slice(4,16))
        if (!create) {
            getBookedTimeSlots(clinicName, currentDate.toString().slice(4,16)).then(r=>{
                setAnimate(false)
            })
        }
        else {
            getBookedTimeSlots(clinicName, currentDate.toString().slice(4,16)).then(r=>{
                setAnimate(false)
            })
        }
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        { create ? setDate(new Date()) : setDate(new Date(dateSelected)) }
        showMode('date');
    };

    const findClinic = (query) => {
        //method called everytime when we change the value of the input
        if (query) {
            //making a case insensitive regular expression to get similar value from the film json
            const regex = new RegExp(`${query.trim()}`, 'i');
            //setting the filtered film array according the query from the input
            setFilteredClinic(clinics.filter((clinics) => clinics.name.search(regex) >= 0));
        } else {
            //if the query is null then return blank
            setFilteredClinic([]);
        }
    };


    /* Creating an appointment */
    const createAppointment = async() => {

        if (selectedValue.name && date && value){
            let userId = await AsyncStorage.getItem("userId")

            const res = await axios.post("http://10.0.2.2:3000/createAppointment", {
                "userId": userId,
                "clinicName": selectedValue.name,
                "date": date.toString().slice(4,16),
                "time": value,
                "others": comments,
                "clinicLong":selectedValue.longitude,
                "clinicLat":selectedValue.latitude
            }, {
                headers: {
                    contentType: "application/json"
                }
            })

            if (res.data.status === "success") {
                Toast.show("Success!", Toast.LONG, Toast.TOP, successStyle);
                setIsPicked(false)
                navigation.navigate('ConfirmAppointment')
            }

            else {
                Toast.show("Error... Something wrong happened!", Toast.LONG, Toast.TOP, errorStyle);
            }
        }

        else {
            Toast.show("Enter All Fields!", Toast.LONG, Toast.TOP, errorStyle);
        }

    }

    /* Confirm an edit to an appointment */
    const confirmAppointment = async() => {
        //const loggedInData = AsyncStorage.get("loggedInData")
        //const loggedInDataObject = JSON.parse(loggedInData)

        if (value == null) {
            let value = timeSelected
            if (date && value){
                let userId = await AsyncStorage.getItem("userId")
                const res = await axios.put("http://10.0.2.2:3000/updateAppointment", {
                    "userId": userId,
                    "date": date.toString().slice(4,16),
                    "time": value,
                    "others": comments,
                }, {
                    headers: {
                        contentType: "application/json"
                    }
                })

                if (res.data.message === "Success!") {
                    Toast.show("Success!", Toast.LONG, Toast.TOP, successStyle);
                    setIsPicked(false)
                    navigation.navigate('ConfirmAppointment')
                }

                else {
                    Toast.show("Error... Something wrong happened!", Toast.LONG, Toast.TOP, errorStyle);
                }
            }

            else {
                console.log("-----------")
                console.log(date)
                console.log(value)
                console.log(comments)
                Toast.show("Enter All Fields!", Toast.LONG, Toast.TOP, errorStyle);
            }
        }
        else {
            if (date && value){
                let userId = await AsyncStorage.getItem("userId")
                const res = await axios.put("http://10.0.2.2:3000/updateAppointment", {
                    "userId": userId,
                    "date": date.toString().slice(4,16),
                    "time": value,
                    "others": comments,
                }, {
                    headers: {
                        contentType: "application/json"
                    }
                })

                if (res.data.message === "Success!") {
                    Toast.show("Success!", Toast.LONG, Toast.TOP, successStyle);
                    setIsPicked(false)
                    navigation.navigate('ConfirmAppointment')
                }

                else {
                    Toast.show("Error... Something wrong happened!", Toast.LONG, Toast.TOP, errorStyle);
                }
            }

            else {
                console.log("-----------")
                console.log(date)
                console.log(value)
                console.log(comments)
                Toast.show("Enter All Fields!", Toast.LONG, Toast.TOP, errorStyle);
            }
        }

    }

    const DeleteAppointment = () => {
        setIsPicked(false)
        navigation.navigate('DeleteAppointment')
    }


    React.useEffect(() => {
        async function onLoad() {
            let loggedIn = await AsyncStorage.getItem("loggedIn")
            let token = await AsyncStorage.getItem("token")
            let userId = await AsyncStorage.getItem("userId")
            let res = await axios.get("http://10.0.2.2:3000/user/" + userId, {
                headers: {
                    "x-access-token": token
                }
            })

            const loggedInData = res.data.data.user

            const appointment = loggedInData.appointment

            if (appointment) {
                const res = await axios.get("http://10.0.2.2:3000/readAppointment/"
                    + userId)

                setClinicName(res.data.data.clinicName)
                setDateSelected(res.data.data.date)
                setTimeSelected(res.data.data.time)
                setComments(res.data.data.others)

            }

            if (fromRNLocatorClinic) {
                setClinicName(fromRNLocatorClinic)
                setSelectedValue({
                    name: fromRNLocatorClinic,
                    longitude: fromRNLocatorLongitude,
                    latitude: fromRNLocatorLatitude})
            }

            /*
            if (!create) {
                console.log("Editing...")
                let res = await axios.post("http://10.0.2.2:3000/readTimeSlots",{
                    "clinicName": clinicName
                }, {
                    headers: {
                        contentType: "application/json"
                    }
                })

                if (res.data.status === "empty") {
                    setItems([
                        {label: '09:00', value: '09:00'},
                        {label: '10:00', value: '10:00'},
                        {label: '11:00', value: '11:00'},
                        {label: '12:00', value: '12:00'},
                        {label: '13:00', value: '13:00'},
                        {label: '14:00', value: '14:00'},
                        {label: '15:00', value: '15:00'},
                        {label: '16:00', value: '16:00'},
                        {label: '17:00', value: '17:00'},
                    ])
                } else {
                    let availableSlots = [
                        {label: '09:00', value: '09:00'},
                        {label: '10:00', value: '10:00'},
                        {label: '11:00', value: '11:00'},
                        {label: '12:00', value: '12:00'},
                        {label: '13:00', value: '13:00'},
                        {label: '14:00', value: '14:00'},
                        {label: '15:00', value: '15:00'},
                        {label: '16:00', value: '16:00'},
                        {label: '17:00', value: '17:00'},
                    ]

                    let availableSlotsIndices = [
                        '09:00', '10:00', '11:00',
                        '12:00', '13:00', '14:00',
                        '15:00', '16:00', '17:00'
                    ]

                    let tempDate = []
                    let tempTime = []
                    let indicesOfTime = []

                    const data = res.data.data.bookedTimeSlots
                    const keys = Object.keys(data)

                    for (let i = 0; i < keys.length; i++) {
                        tempDate.push(data[keys[i]].aDate)
                        tempTime.push(data[keys[i]].aTime)
                    }

                    for (let i = 0; i < tempDate.length; i++) {
                        if (dateSelected.toString().trim() === tempDate[i].toString().trim()) {
                            indicesOfTime.push(tempTime[i])
                        }
                    }

                    console.log("indices: "+indicesOfTime)

                    for (let i = 0; i < indicesOfTime.length; i++) {
                        if (availableSlotsIndices.includes(indicesOfTime[i])) {
                            let index = availableSlotsIndices.indexOf(indicesOfTime[i])
                            availableSlots.splice(index, 1);
                        }
                    }

                    console.log(availableSlots)

                    setItems(availableSlots)
                }

            }
            */
            return null

        }

        onLoad().then(r=>{
            setAnimate(false)
        })

        const focus = navigation.addListener("didFocus", ()=>{
            triggerRefresh(!refresh)
        })

        return function cleanUp() {
            focus.remove()
        }

    })


    return (
        <View style={styles.bigContainer}>
            {animate &&
            <View style={[styles.activity, styles.horizontal]}>
                <ActivityIndicator size="large" color="#005DB3" animating={animate} />
                <Text style={{textAlign: "center", fontSize: 20}}>Loading</Text>
            </View>
            }
            <View style={styles.container}>


            <View style= {{
                height:50,
                width:350,
                justifyContent:"center",
                alignItems:"center",
                //marginTop:10,
                marginBottom:25,
                alignSelf:"center",
            }}>
                <Text style={styles.headertext}>
                    {create ? "Create Appointment": "Edit Appointment" }
                </Text>
            </View>
                {
                    (create && fromMap==false)?
                        <View style={{flexDirection: "row", flex: 1,
                            marginBottom:40
                        }}>
                            <View style={{flex: 1}}>
                                <Autocomplete
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    containerStyle={styles.autocompleteContainer}
                                    data={filteredClinic}
                                    //inputContainerStyle={{height: 100, backgroundColor: "#005DB3"}}
                                    listContainerStyle={{backgroundColor:"#cee8ff"}}
                                    listStyle={{backgroundColor:"#cee8ff", borderColor:"#cee8ff"}}
                                    defaultValue={

                                        JSON.stringify(selectedValue) === '{}' ? '' : selectedValue.name
                                    }
                                    onChangeText={(text) => {
                                        findClinic(text)
                                        if (!create) {
                                            getBookedTimeSlots(clinicName, date.toString().slice(4,16)).then(r=>{
                                                setAnimate(false)
                                            })
                                        }
                                        else {
                                            getBookedTimeSlots(clinicName, date.toString().slice(4,16)).then(r=>{
                                                setAnimate(false)
                                            })
                                        }
                                    }}
                                    placeholder="Enter the Clinic"
                                    renderItem={({item}) => (
                                        //you can change the view you want to show in suggestion from here
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedValue(item);
                                                setFilteredClinic([]);
                                                if (!create) {
                                                    getBookedTimeSlots(clinicName, date.toString().slice(4,16)).then(r=>{
                                                        setAnimate(false)
                                                    })
                                                }
                                                else {
                                                    getBookedTimeSlots(clinicName, date.toString().slice(4,16)).then(r=>{
                                                        setAnimate(false)
                                                    })
                                                }
                                            }}>
                                            <Text style={styles.itemText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor = {(item, index)=>index.toString()}
                                />
                            </View>
                            <View style={{
                                backgroundColor: "#005DB3",
                                padding: 8,
                                height:46,


                            }}>
                                <FontAwesomeIcon
                                    style={{
                                        color: "#ffffff",
                                    }}
                                    icon={ faSearch } size={30}
                                />
                            </View>
                        </View>
                        :
                        <View style={{
                            width: 370,
                            height:45,
                            borderRadius:5,
                            backgroundColor: "#cee8ff",
                            alignContent: "center",
                            alignSelf: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                textAlign: "center",
                                fontSize:20,
                                color:"#000000"
                            }}
                            >{clinicName}</Text>
                        </View>
                }

                <View
                    style={{
                        //marginBottom: 50,
                        marginTop: 30,
                        height:50,
                        //top:30,
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"center",
                        zIndex: 1,
                    }}>
                    <TouchableOpacity
                        onPress={showDatepicker}
                        style={styles.calendar}>
                        <Text
                            style={{color:"black",
                                fontSize:20,
                                marginTop:5}}>
                                    Date: { (create==false && isPicked==false) ? dateSelected : date.toString().slice(4,16)}
                                    {/* Date: {date.toISOString().slice(0,10)} */}
                                    </Text>
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
                        //marginBottom: 50,
                        marginTop: 25,
                        //alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        ...(Platform.OS !== 'android' && {
                            zIndex: 10
                        })
                    }}>

                    <DropDownPicker
                        disabled= {(create && !selectedValue.name) ? true : false}
                        items={items}
                        containerStyle={{height: 50, width:370}}
                        style={{ backgroundColor: '#CEE8FF', width: 370 }}
                        dropDownStyle={{ backgroundColor: 'white', width: 370 }}
                        placeholder={create ? "Select a time" : timeSelected}
                        controller={instance => controller = instance}
                        onChangeList={(items, callback) => {
                            new Promise((resolve, reject) => resolve(setItems(items)))
                                .then(() => callback())
                                .catch(() => {});

                        }}
                        onChangeItem={item => setValue(item.value)}
                        showArrow={false}
                        onOpen={()=>{
                            console.log(date.toString().slice(4,16))
                            console.log(dateSelected)
                            if (!create) {
                                getBookedTimeSlots(clinicName, dateSelected).then(r=>{
                                    setAnimate(false)
                                })
                            }
                            else {
                                getBookedTimeSlots(clinicName, date.toString().slice(4,16)).then(r=>{
                                    setAnimate(false)
                                })
                            }
                        }}
                    />


                </View>
                <View style={{
                    justifyContent: 'center', alignItems: 'center', marginTop: 15, zIndex: 1
                }}>
                    <View
                        style={{
                            backgroundColor:"#CEE8FF",
                            width:370,
                            height:150,
                            borderWidth: 1,
                            borderColor: "#d6d6d6",
                            borderRadius:5,
                            top:15
                        }}>
                        <TextInput
                            style={styles.textInput2}
                            onChangeText={text => setComments(text)}
                            placeholder={"Other Comments..."}
                            value={comments}
                        />
                    </View>
                </View>
            </View>

            <View
            style={{
                position:"absolute",
                left:0,
                bottom:0,
            }}>
                <Image
                    style={{
                        height: 155,
                        width: 155,
                    }}
                    source={require('../../assets/house.png')}
                />
            </View>
            {
                create ?
                    <View
                        style={{
                            flexDirection:"row",
                        }}
                    >
                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"center",
                                width:windowWidth/2,
                                backgroundColor: "transparent",
                                height: 190
                            }}>

                        </View>
                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"center",
                                width:windowWidth/2,
                                backgroundColor: "transparent",
                                height: 190
                            }}>

                            <TouchableOpacity
                                onPress={()=>createAppointment()}
                                style={{
                                    alignItems: "center",
                                    backgroundColor: "#005DB3",
                                    width: 150,
                                    height: 40,
                                    borderRadius: 10,
                                    marginTop: 120,
                                    //marginRight: 25
                                    //marginBottom:0
                                }}>
                                <Text
                                    style={{
                                        color:"white",
                                        fontSize:25,
                                        marginTop:3
                                    }}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View
                        style={{
                            flexDirection:"row",
                        }}
                    >
                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"center",
                                width:windowWidth/2,
                                backgroundColor: "transparent",
                                height: 190
                            }}>
                            <TouchableOpacity
                                onPress={()=>DeleteAppointment()}
                                style={{
                                    alignItems: "center",
                                    backgroundColor: "#005DB3",
                                    width: 150,
                                    height: 40,
                                    borderRadius: 10,
                                    marginTop: 120,
                                    //marginRight: 25
                                    //marginBottom:0
                                }}>
                                <Text
                                    style={{
                                        color:"white",
                                        fontSize:25,
                                        marginTop:3
                                    }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"center",
                                width:windowWidth/2,
                                backgroundColor: "transparent",
                                height: 190
                            }}>

                            <TouchableOpacity
                                onPress={()=>confirmAppointment()}
                                style={{
                                    alignItems: "center",
                                    backgroundColor: "#005DB3",
                                    width: 150,
                                    height: 40,
                                    borderRadius: 10,
                                    marginTop: 120,
                                    //marginRight: 25
                                    //marginBottom:0
                                }}>
                                <Text
                                    style={{
                                        color:"white",
                                        fontSize:25,
                                        marginTop:3
                                    }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }

        </View>
    )

}

let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    bigContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
        paddingTop: 0,
        backgroundColor: '#ffffff',
        padding: 8,
    },
    container: {
        backgroundColor: '#ffffff',
        //position: "absolute",
        height: 500,
        width: windowWidth-10,
        flex: 1,
        padding: 16,
        marginTop: 20,
        flexDirection: "column",
        alignItems: "flex-start",
        zIndex: 1,
    },
    headertext:{
        fontSize:35,
        color:"#005DB3",
        fontWeight:"bold"
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        borderWidth: 2,
        borderColor: "#005db3",
        backgroundColor: "#005db3",
        zIndex: 5,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
        backgroundColor: '#cee8ff',
        borderBottomColor:"#d0d3cf",
        borderBottomWidth:1,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
    },
    calendar:{
        alignItems:"center",
        width:325,
        height:45,
        borderRadius: 0,
        borderColor: "#005DB3",
        borderWidth: 2,
        backgroundColor:"#cee8ff"
    },
    calendarSmall:{
        alignItems:"center",
        backgroundColor: "#005DB3",
        width: 45,
        height: 45,
        borderRadius: 0,
        marginRight: 2
    },
    image:{
        top:6,
        height:30,
        width:30,
    },

    activity: {
        flex: 1,
        justifyContent: "center",
        position:"absolute",
        backgroundColor: "#ffffff",
        zIndex: 10,
        width: windowWidth,
        height: ScreenHeight,
    },

    horizontal: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 10
    }
});

export default CreateAppointmentComponent
