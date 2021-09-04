import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//IMPORTANT: reference the database
import database from '../utils/database';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Alert,
    ImageBackground,
} from 'react-native';
//CLINIC LIST
const ClinicSearchList = ({ navigation }) => {
    const [clinics, setClinics] = useState(database);
    const [search, setSearch] = useState('');
    const ClinicList = ({ data }) => {
        const renderItem = ({
            item: { name, postal_code: postalCode, latitude, longitude },
        }) => (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('RNLocator', {
                        lat: latitude,
                        lng: longitude,
                        nam: name,
                    })
                }
                style={Cstyles.item}
            //HERE IS THE PART WHERE NEED TO DEFINE FUNCTION FOR THE NAVIGATION
            //adding google maps
            >
                <Text style={Cstyles.title}>{name}</Text>
                <Text>{postalCode}</Text>
            </TouchableOpacity>
        );
        const renderEmpty = () => (
            <View style={Cstyles.empty}>
                <Text>No results...</Text>
            </View>
        );
        return (
            <View
                style={{
                    backgroundColor: "#ffffff",
                    flex: 1 }}>
                <FlatList
                    contentContainerStyle={Cstyles.list}
                    keyboardShouldPersistTaps={'always'}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item?.postal_code},${index}`}
                    ListEmptyComponent={renderEmpty}
                />
            </View>
        );
    };
    // const headerSearch = () => {
    //   return(
    //   <View style={Hstyles.container}>
    //     <View style={Hstyles.textInputContainer}>
    //       <TextInput
    //         placeholder="Search clinic..."
    //         placeholderTextColor="black"
    //         onChangeText={search=>setSearch(search)}
    //         value  = {search}
    //         autoFocus
    //         // onChangeText={(e)=>{console.log(e)}}
    //       />
    //     </View>
    //   </View>
    // )};
    useEffect(() => {
        if (search !== '') {
            setClinics(database.filter((clinic) => clinic.name.includes(search)));
        } else {
            setClinics(database);
        }
    }, [search]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={Hstyles.container}>
                <View style={Hstyles.textInputContainer}>
                    <TextInput
                        placeholder="Search clinic..."
                        placeholderTextColor="black"
                        onChangeText={(search) => setSearch(search)}
                        value={search}
                        style={{
                            fontSize: 20
                        }}
                    // autoFocus
                    // onChangeText={(e)=>{console.log(e)}}
                    />
                </View>
            </View>
            <ClinicList data={clinics} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ced4da'
    },
    bigHeader: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
const Cstyles = StyleSheet.create({
    list: {
        flexGrow: 1,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: '#ced4da',
        borderBottomWidth: 1,
        fontSize: 32,
    },
    title: {
        fontWeight: 'bold',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
const Hstyles = StyleSheet.create({
    container: {
        //minHeight: getNavBarHeight(),
        borderBottomWidth: 1,
        borderBottomColor: '#ced4da',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    textInputContainer: {
        borderRadius: 2,
        backgroundColor: '#ced4da',
        padding: 10,
    },
});
export default ClinicSearchList;
