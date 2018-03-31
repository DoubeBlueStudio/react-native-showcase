import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Slider
} from "react-native";
import { Icon, window, color, AudioDoc } from "../utils";
import { Header } from "../components";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Vedio from "react-native-video";

export default class AudioPlayer extends Component {
  state = {
    finish: false,
    isPause: true,
    activeIndex: 0,
    currentTime: 0,
    controlIcon: "control-play"
  };

  componentWillMount() {}

  componentWillUnmount() {}

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _renderItem = ({ item, index }) => {
    return <Text style={styles.itemText}>{item.content}</Text>;
  };

  _onSnapToItem = index => {
    this.setState({ activeIndex: index });
    if (!this.OnValueChange) {
      this.player.seek(AudioDoc.meta[index].start);
    }
    this.OnValueChange = false;
  };

  _onValueChange = val => {
    AudioDoc.meta.forEach((item, index) => {
      if (val < item.end && val >= item.start) {
        this.OnValueChange = true;
        this.carousel.snapToItem(index);
      }
    });
    this.setState({ currentTime: val });
    this.player.seek(val);
  };

  _getDisplayTime = val => {
    return val % 60 < 10
      ? Math.floor(val / 60) + ":0" + Math.floor(val % 60)
      : Math.floor(val / 60) + ":" + Math.round(val % 60);
  };

  _audioOnLoad = info => {};

  _audioOnEnd = info => {
    this.setState({ isPause: true, controlIcon: "control-play", finish: true });
  };

  _audioOnProgress = info => {
    if (info.currentTime >= AudioDoc.meta[this.state.activeIndex].end - 0.05) {
      this.OnValueChange = true;
      this.carousel.snapToNext();
    }
    this.setState({ currentTime: info.currentTime });
  };

  _play = () => {
    if (this.state.finish) {
      this.player.seek(0);
      this.carousel.snapToItem(0);
    }
    this.setState(({ isPause }) => {
      return {
        isPause: !isPause,
        controlIcon: !isPause ? "control-play" : "control-pause"
      };
    });
  };

  render() {
    const { activeIndex, isPause, currentTime, controlIcon } = this.state;
    return (
      <View style={styles.container}>
        <Header title={"Play Audio"} onBack={this._goBack} />
        <SafeAreaView style={styles.body}>
          <View style={{ height: window.height / 2 }}>
            <Carousel
              ref={c => (this.carousel = c)}
              data={AudioDoc.meta}
              sliderWidth={window.width}
              itemWidth={window.width}
              renderItem={this._renderItem}
              onSnapToItem={this._onSnapToItem}
            />
          </View>
          <Pagination
            dotsLength={AudioDoc.meta.length}
            activeDotIndex={activeIndex}
            dotStyle={styles.dot}
            inactiveDotOpacity={0.3}
            inactiveDotScale={0.6}
            containerStyle={styles.pagination}
          />
          <View style={styles.controlContainer}>
            <View style={styles.controlPanel}>
              <View style={styles.sliderContainer}>
                <Text style={styles.timeText}>
                  {this._getDisplayTime(currentTime)}
                </Text>
                <Slider
                  style={styles.slider}
                  minimumTrackTintColor={color.submain}
                  maximumTrackTintColor={color.grey}
                  disabled={false}
                  minimumValue={0}
                  maximumValue={AudioDoc.duration}
                  value={currentTime}
                  step={1}
                  onValueChange={this._onValueChange}
                />
                <Text style={styles.timeText}>
                  {this._getDisplayTime(AudioDoc.duration)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.playContainer}
                onPress={this._play}
              >
                <Icon name={controlIcon} size={40} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <Vedio
          ref={v => {
            this.player = v;
          }}
          source={AudioDoc.source}
          paused={isPause}
          playInBackground={false}
          onLoad={this._audioOnLoad}
          onEnd={this._audioOnEnd}
          onProgress={this._audioOnProgress}
          progressUpdateInterval={100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  controlContainer: { flex: 1, justifyContent: "flex-end" },
  controlPanel: {
    width: window.width,
    paddingVertical: 20,
    alignItems: "center"
  },
  playContainer: { padding: 20, marginTop: 10 },
  timeText: { width: 40, textAlign: "center", color: "white" },
  sliderContainer: {
    flexDirection: "row",
    width: window.width - 20,
    alignItems: "center"
  },
  slider: {
    flex: 1,
    marginHorizontal: 10
  },
  pagination: { backgroundColor: "transparent" },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color.light
  },
  itemText: {
    width: window.width,
    height: window.height / 2,
    lineHeight: 36,
    padding: 20,
    textAlign: "justify",
    fontSize: 18,
    color: "white",
    backgroundColor: color.dark
  },
  body: { flex: 1 },
  container: { flex: 1, backgroundColor: color.dark }
});
