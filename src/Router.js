import React from "react";
import { StackNavigator } from "react-navigation";
import Home from "./views/Home";
import AudioPlayer from "./views/AudioPlayer";

const MainNavigation = StackNavigator(
  { Home: { screen: Home }, AudioPlayer: { screen: AudioPlayer } },
  {
    headerMode: "none"
  }
);

export default MainNavigation;
