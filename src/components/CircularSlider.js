/*

  Created by Shubham Singla on 2 October
  Email: Shubhamsinglars@gmail.com

*/

import React,{Component} from 'react'
import {PanResponder,View} from 'react-native'
import Svg,{Path,Circle,G,TSpan,TextPath,Text as SvgText} from 'react-native-svg'
import PropTypes from 'prop-types'

var dayString = '';

class CircularSlider extends Component {

  constructor(props){
    super(props);
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
    this.cartesianToPolar = this.cartesianToPolar.bind(this)
    this.polarToCartesian = this.polarToCartesian.bind(this)
    const {width,height} = props
    const smallestSide = (Math.min(width,height))
    this.state = {
      cx: width/2,
      cy: height/2,
      r: (smallestSide/2)*0.85,
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove
    })

    //////////////////////////////////////////
    // This code is used to create slider/dialer numbers (like 1, 2, 3...)
    // I didn't find any good solution for now to make ti proper align but I can try some more tries on it in the future
    var {value, totalDays} = props;
    var day = Math.floor(value/(360/totalDays));
    var dayStringArray = []
    for(var i=0; i<=totalDays; i++){
      var temp = (7 + day + i)%(totalDays+1);
      if(temp == 0){
        continue;
      }
      dayStringArray.push(temp)
    }
    dayString = dayStringArray.join(' ')
    ///////////////////////////////////////

  }

  polarToCartesian(angle){
    const {cx,cy,r} = this.state
        , a = (angle-90) * Math.PI / 180.0
        , x = cx + (r * Math.cos(a))
        , y = cy + (r * Math.sin(a))
    return {x,y}
  }

  cartesianToPolar(x,y){
    const {cx,cy} = this.state
    var exactAngle = Math.round((Math.atan((y-cy)/(x-cx)))/(Math.PI/180) + ((x>cx) ? 90 : 270));
    var oneDayAngle = 360/this.props.totalDays;
    var day = parseInt(exactAngle/oneDayAngle);
    this.props.onDaysChange(day);
    var roundOffAngle = day*oneDayAngle;
    return roundOffAngle
  }

  handlePanResponderMove({nativeEvent:{locationX,locationY}}){
    this.props.onValueChange(this.cartesianToPolar(locationX,locationY))
  }

  render(){
    const {totalDays,width,height,value,meterColor,textColor,onValueChange} = this.props
        , {cx,cy,r} = this.state
        , startCoord = this.polarToCartesian(0)
        , endCoord = this.polarToCartesian(value)
    var totalPathLength = 2*Math.PI*(width/2);
    var totalPieceLength = totalPathLength/totalDays;
    return (
    <View>
      <View style={{position: 'absolute', width: width, height: height, justifyContent: 'center', alignItems: 'center' }}>
        {this.props.children}
      </View>
      <Svg width={width} height={height} {...this._panResponder.panHandlers}>
        <G id="circle">
          <Circle cx={cx} cy={cy} r={r} stroke='#eee' strokeWidth={0.5} fill='none'/>
        </G>
        <Path stroke={meterColor} strokeWidth={10} fill='none'
        d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value>180?1:0} 1 ${endCoord.x} ${endCoord.y}`}/>
        <Circle x={endCoord.x-7.5} y={endCoord.y-7.5} cx={7.5} cy={7.5} r={10} fill={meterColor} />
        {/* Text */}
        <SvgText fill="#000" fontSize="10" wordSpacing="14" lengthAdjust="spacingAndGlyphs">
          <TextPath href="#circle">
          {dayString}
          </TextPath>
        </SvgText>
      </Svg>
    </View>
    )
  }
}

CircularSlider.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  meterColor: PropTypes.string,
  textColor: PropTypes.string,
  totalDays: PropTypes.number,
  onDaysChange: PropTypes.func,
  value: PropTypes.number,
  onValueChange: PropTypes.func,
}

export default CircularSlider
