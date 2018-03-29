import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Icon, window, color } from "../utils";
import { Header } from "../components";
import { Player, MediaStates } from "react-native-audio-toolkit";

export default class AudioPlayer extends Component {
  state = {};

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title={"Play Audio"} onBack={this._goBack} />
        <SafeAreaView style={styles.body}>
          <View style={{ flex: 3 }}>{}</View>
          <View style={{ flex: 1 }}>{}</View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: { flex: 1 },
  container: { flex: 1, backgroundColor: color.dark }
});
