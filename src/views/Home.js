import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Icon, window, color, Feature } from "../utils";
import { Header } from "../components";

export default class Home extends Component {
  state = {};

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.listitem}
        onPress={() => this._goTo(item.routeName)}
      >
        <Text style={styles.listitemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  _goTo = routeName => {
    this.props.navigation.navigate(routeName);
  };

  render() {
    console.log("Feature: ", Feature);
    return (
      <View style={styles.container}>
        <Header title={"Showcase"} />
        <SafeAreaView style={styles.body}>
          <FlatList
            data={Feature}
            extraData={this.state}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={this._renderItem}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: { flex: 1 },
  container: { flex: 1, backgroundColor: color.light },
  listitemText: { fontSize: 20, fontWeight: "700" },
  listitem: {
    width: "100%",
    paddingVertical: 25,
    backgroundColor: "white",
    borderColor: color.grey,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
