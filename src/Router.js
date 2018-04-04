import React from "react";
import { StackNavigator } from "react-navigation";
import Home from "./views/Home";
import AudioPlayer from "./views/AudioPlayer";
import AnimatingView from "./views/AnimatingView";

const MainNavigation = StackNavigator(
  {
    Home: { screen: Home },
    AudioPlayer: { screen: AudioPlayer },
    AnimatingView: { screen: AnimatingView }
  },
  {
    headerMode: "none"
  }
);

export default MainNavigation;
