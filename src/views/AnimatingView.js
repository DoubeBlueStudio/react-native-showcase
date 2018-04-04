import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon, window, color, AudioDoc } from "../utils";
import { Header } from "../components";

export default class AnimatingView extends Component {
  state = {
    animation: "none",
    isShow: false
  };

  componentWillMount = () => {};

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _animateIt = () => {
    const height = this.aniV.props.isShow ? 0 : 60;
    const width = this.aniR.props.isShow ? 60 : window.width - 20;
    this.aniV.transitionTo({ height: height });
    this.aniR.transitionTo({ width: width });
    this.setState({ isShow: !this.aniV.props.isShow });
  };

  render() {
    const { isShow } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header title={"Animating View"} onBack={this._goBack} />
        <SafeAreaView style={{ flex: 1 }}>
          <Animatable.View
            ref={a => {
              this.aniV = a;
            }}
            style={styles.aniBlock}
            isShow={isShow}
          >
            {}
          </Animatable.View>
          <TouchableOpacity style={styles.button} onPress={this._animateIt}>
            <Text style={styles.buttontext}>{"Animate it !"}</Text>
          </TouchableOpacity>
          <Animatable.View
            ref={a => {
              this.aniR = a;
            }}
            style={styles.aniRound}
            isShow={isShow}
          >
            <Icon name={"ghost"} size={25} color={color.light} />
          </Animatable.View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aniRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.info,
    marginVertical: 10,
    marginHorizontal: 10
  },
  aniBlock: {
    width: window.width,
    height: 0,
    backgroundColor: color.primary
  },
  buttontext: { color: color.light, fontSize: 20 },
  button: {
    width: 150,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.submain,
    alignSelf: "center",
    marginTop: 10
  }
});
