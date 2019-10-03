/*

  Created by Shubham Singla on 2 October
  Email: Shubhamsinglars@gmail.com

*/

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';
import CircularSlider from './src/components/CircularSlider'
import LinearGradient from 'react-native-linear-gradient';

const totalDays = 28;
const keyDaysArray = [4, 17, 25]
const dialerSize = 280;
const centerProfileImageSize = dialerSize/2;
const centerProfileImageOuterCircleSize = centerProfileImageSize+30;

class App extends Component{

  constructor(props){
    super(props)
    var day = (new Date()).getDate()%29;
    var slider = day*360/totalDays
    this.state = {
      day: day,
      slider: slider,
    }
  }

  updateSliderValue = function(value){
    this.setState({slider:value})
  }.bind(this)

  updateDayChange = function(day){
    this.setState({day: day})
  }.bind(this)

  getRandomDescription = function(day){
    var index = day%4;
    var dummyDataArray = [
      `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word`,

      `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as nec`,

      `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now us`,

      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch`
    ];
    return dummyDataArray[index]
  }

  renderInnerDailerProfile = function(){
    return(
      <Image style={{width: centerProfileImageSize, height: centerProfileImageSize, borderRadius: centerProfileImageSize/2, borderWidth: 2, borderColor: 'white'}} source={{uri: 'http://placeimg.com/100/100/profile?id=2'}} />
    )
  }.bind(this)

  render(){
    var {day} = this.state;
    var isKeyDay = keyDaysArray.indexOf(day) != -1;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#e3e3e3'}}>
        <View style={{flex: 1, backgroundColor: '#e3e3e3'}}>

          {/* Dialer */}
          <View style={{flex: 6, alignItems: 'center', justifyContent: 'center'}}>
          <CircularSlider
            width={dialerSize}
            height={dialerSize}
            meterColor='#c1d6e3'
            textColor='#fff'
            totalDays={28}
            onDaysChange={this.updateDayChange}
            value={this.state.slider}
            onValueChange={this.updateSliderValue}
              >
              {isKeyDay && (
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['green', 'pink', 'orange']} style={{width: centerProfileImageOuterCircleSize, height: centerProfileImageOuterCircleSize, borderRadius: centerProfileImageOuterCircleSize/2, justifyContent: 'center', alignItems: 'center'}}>
                  {this.renderInnerDailerProfile()}
                </LinearGradient>
              )}
              {!isKeyDay && (
                <View style={{width: centerProfileImageOuterCircleSize, height: centerProfileImageOuterCircleSize, borderRadius: centerProfileImageOuterCircleSize/2, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center'}}>
                  {this.renderInnerDailerProfile()}
                </View>
              )}
            </CircularSlider>
          </View>

          {/* Card */}
          <View style={{flex: 4, alignItems: 'center', justifyContent: 'flex-end'}}>
            <View style={[
              styles.cardStyle,
              isKeyDay? styles.cardStyleKeyDay: []
            ]}>
              <Image style={{width: 60, height: 60, borderRadius: 30, backgroundColor: 'gray', marginTop: -30-20, marginBottom: 10, borderWidth: 1, borderColor: 'white'}} source={{uri: 'http://placeimg.com/100/100/profile?id='+day}} />
              <Text style={{color: 'white', fontSize: 20}}>OCT {day == 0? totalDays: day}</Text>
              <ScrollView ScrollIndicator={false} style={{marginTop: 15}}>
                <Text style={{color: 'white'}}>{this.getRandomDescription(day)}</Text>
              </ScrollView>
            </View>
          </View>

        </View>
      </SafeAreaView>
    );
  }

};

const styles = StyleSheet.create({
  cardStyle: {width: '80%', height: '100%', maxHeight: 220, backgroundColor: '#586777', borderRadius: 10, alignItems: 'center', padding: 20},
  cardStyleKeyDay: {backgroundColor: 'skyblue'}
});

export default App;
