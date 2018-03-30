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
import Sound from "react-native-sound";

export default class AudioPlayer extends Component {
  state = {
    activeIndex: 0,
    currentTime: 0,
    audioDuration: 0,
    controlIcon: "control-play"
  };

  componentWillMount() {
    this._createAudio();
  }

  componentDidMount() {}

  _createAudio = () => {
    Sound.setCategory("Playback");
    this.audio = new Sound("example.mp3", Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log("failed to load the sound", error);
        return;
      } else {
        let audioDuration = this.audio.getDuration();
        // audioDuration - 1;
        console.log("audioDuration: ", this._getDisplayTime(audioDuration));
        this.setState({
          audioDuration: audioDuration
        });
      }
    });
  };

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _renderItem = ({ item, index }) => {
    return <Text style={styles.itemText}>{item.content}</Text>;
  };

  _onSnapToItem = index => {
    this.setState({ activeIndex: index });
    if (!this.OnValueChange) {
      this.audio.setCurrentTime(AudioDoc[index].start);
    }
    this.OnValueChange = false;
  };

  _onValueChange = val => {
    AudioDoc.forEach((item, index) => {
      if (val < item.end && val >= item.start) {
        this.carousel.snapToItem(index);
      }
    });
    this.setState(prev => {
      return { currentTime: val };
    });
    this.audio.setCurrentTime(val);
    this.OnValueChange = true;
  };

  _getDisplayTime = val => {
    return val % 60 < 10
      ? Math.floor(val / 60) + ":0" + Math.floor(val % 60)
      : Math.floor(val / 60) + ":" + Math.round(val % 60);
  };

  _play = () => {
    if (this.audio.isLoaded()) {
      if (this.audio.isPlaying()) {
        this.audio.pause();
        this.setState({ controlIcon: "control-play" });
        this.audio.getCurrentTime((sec, isPlay) => {
          this.setState({ currentTime: sec });
        });
      } else {
        this.audio.play();
        this._counter();
        this.setState({ controlIcon: "control-pause" });
      }
    }
  };

  _counter = () =>
    setTimeout(() => {
      if (this.audio) {
        if (this.audio.isPlaying()) {
          this.audio.getCurrentTime((sec, isPlay) => {
            if (AudioDoc[this.state.activeIndex].end <= sec - 0.5) {
              this.carousel.snapToItem(this.state.activeIndex + 1);
            }
            this.setState({ currentTime: sec });
          });
          this._counter();
        } else {
          this.setState({ controlIcon: "control-play" });
        }
      }
    }, 200);

  render() {
    const {
      activeIndex,
      status,
      currentTime,
      audioDuration,
      controlIcon
    } = this.state;
    return (
      <View style={styles.container}>
        <Header title={"Play Audio"} onBack={this._goBack} />
        <SafeAreaView style={styles.body}>
          <View style={{}}>
            <Carousel
              ref={c => (this.carousel = c)}
              layout={"tinder"}
              data={AudioDoc}
              sliderWidth={window.width}
              itemWidth={window.width}
              renderItem={this._renderItem}
              onSnapToItem={this._onSnapToItem}
            />
          </View>
          <Pagination
            dotsLength={AudioDoc.length}
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
                  maximumValue={audioDuration}
                  value={currentTime}
                  step={1}
                  onValueChange={this._onValueChange}
                />
                <Text style={styles.timeText}>
                  {this._getDisplayTime(audioDuration)}
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
