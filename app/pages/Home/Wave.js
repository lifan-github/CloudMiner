import React, {Component} from 'react';
import {
  View,
  Animated,
  Easing
} from "react-native";
import SVG, {Path, Defs, G, Use} from 'react-native-svg';

export default class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.animStart()
  }

  animStart() {
    Animated.timing(
      this.state.anim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }).start(finished => {
      this.state.anim.setValue(0);
      this.animStart();
    })
  }

  //波单元
  renderWaveCell(fill) {
    const {SVGH="15", SVGW=SCREEN_WIDTH * 2} = this.props;
    const path = `M0 ${SVGH} L0 ${SVGH/2} C0 ${SVGH/2} ${SVGW/4} 0 ${SVGW/2} ${SVGH/2} C${SVGW/2} ${SVGH/2} ${SVGW*3/4} ${SVGH} ${SVGW} ${SVGH/2} L${SVGW} ${SVGH}`;
    return (
      <SVG height={SVGH} width={SCREEN_WIDTH * 2}>
        <Defs>
          <G id="waveShape">
            <G>
              <Path
                d={path}
                fill={fill}
              />
            </G>
          </G>
        </Defs>
        <Use href="#waveShape" x="0" y="0"/>
      </SVG>
    )
  }

  //波层
  //zIndex === 0 为底下半透明层，zIndex === 1 为白色上层，
  renderWave(zIndex) {
    let fill = "rgba(0,0,0,0.1)";
    let container =  {
      flex: 1,
      left: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -2 * SCREEN_WIDTH],
      })
    };

    if (zIndex === 1) {
      fill = "#fff";
      container = {
        flex: 1,
        position: 'absolute',
        left: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-5 / 2 * SCREEN_WIDTH, -1 / 2 * SCREEN_WIDTH]
        })
      };
    }
    return (
      <Animated.View style={[container, {flexDirection: "row"}]}>
        { this.renderWaveCell(fill) }
        { this.renderWaveCell(fill) }
      </Animated.View>
    )
  }
  
  render() {
    return (
      <View>
        { this.renderWave(0) }
        { this.renderWave(1) }
      </View>
    );
  }
}
