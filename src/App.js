import React, { PureComponent } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import Router from "./Router";

export default class App extends PureComponent {
  state = {};
  render() {
    const screenProps = {};
    return (
      <View style={{ flex: 1 }}>
        <Router screenProps={screenProps} />
      </View>
    );
  }
}
