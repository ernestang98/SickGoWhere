// DO NOT CHANGE/EDIT THIS FILE >:(

import React from 'react';
import { StyleSheet, View} from 'react-native';
import MainContainer from "./components/MainComponent";

export default function App() {
  return (
      <View style={styles.container}>
        <MainContainer/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
