// DO NOT CHANGE/EDIT THIS FILE >:(

import React from 'react';
import { StyleSheet, View} from 'react-native';
import MainContainer from "./components/MainComponent";
import Toast from 'react-native-toast-message';

export default function App() {
  return (
      <View style={styles.container}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <MainContainer/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
