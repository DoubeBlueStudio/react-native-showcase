import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View
} from "react-native";
import { Icon, window, color } from "../utils";

export default class Header extends PureComponent {
  state = {};
  render() {
    const { onBack, title } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.leftCell}>
          {onBack ? (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Icon name={"arrow-left"} size={20} color={color.dark} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.middleCell}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ flex: 1 }}>{}</View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  middleCell: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  title: { fontSize: 24, color: color.dark },
  backButton: {
    height: 45,
    width: 45,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  leftCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  container: {
    height: Platform.OS === "ios" ? 75 : 55,
    width: window.width,
    backgroundColor: color.light,
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
    flexDirection: "row",
    zIndex: 10
  }
});
