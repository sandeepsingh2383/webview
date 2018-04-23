/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {script} from './InjectedScript';
import {Alert, AppState} from 'react-native';
import Modal from 'react-native-modal';
import PrivacySnapshot from 'react-native-privacy-snapshot';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Picker,
  WebView
} from 'react-native';



let counter = 0;
let inActiveCounter = 0;
let backgroundCounter = 0;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  static navigationOptions = {
    title: 'Home Screen',
  };
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://wwwqa.ayco.com/login',
      isModalVisible: false,
      appState: AppState.currentState
    }
  }
  componentWillMount(){
    PrivacySnapshot && PrivacySnapshot.enabled(true);
  }
  componentWillUnmount(){
    PrivacySnapshot && PrivacySnapshot.enabled(false);
  }
  componentDidMount(){
    AppState.addEventListener('change', ()=>{
      counter++;
      if (AppState.currentState === 'inactive'){
        inActiveCounter++;
      }
      if (AppState.currentState === 'background'){
        backgroundCounter++;
      }
      this.setState({appState: AppState.currentState});
    });
  }
  onGoButtonClick(){
    //this.setState({isModalVisible: true});
    this.props.navigation.navigate('WebViewComp', {url: this.state.url, script: script});
  }
  render() {
    const source={uri: 'https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf'};
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Type the URL here!"
          onChangeText={(text) => this.setState({url:text})}
          style={styles.inputText}
        >
        </TextInput>
        <Text>State - {counter}</Text>
        <Text>inactive - {inActiveCounter}</Text>
        <Text>background - {backgroundCounter}</Text>
        <TouchableHighlight
         style={styles.goButton}
         onPress={this.onGoButtonClick.bind(this)}
        >
          <Text> Go To</Text>
        </TouchableHighlight>
        <Text style={styles.largeText}>{this.state.url} </Text>
        <Text>Options Menu</Text>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <View style={{flex: 1}}>
          <View style={{flex:.9}}>
            <Modal
              isVisible={this.state.isModalVisible}
              backdropColor={'red'}
              backdropOpacity={1}
              animationIn={'zoomInDown'}
              animationOut={'zoomOutUp'}
              animationInTiming={1000}
              animationOutTiming={1000}
              backdropTransitionInTiming={1000}
              backdropTransitionOutTiming={1000}
            >
              <TouchableHighlight
                 style={styles.goButton}
                 onPress={()=>{this.setState({isModalVisible:false})}}
                >
                  <Text> Close</Text>
              </TouchableHighlight>
              <View style={{flex:1}}>
                <WebView 
                  source={ source }
                  style={{ paddingTop: 30 }}
                  scalesPageTpFit={false}>
                </WebView>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  goButton:{
    backgroundColor: '#5bc0de',
    padding: 12
  },
  inputText:{
    width:300,
    fontSize: 18
  },
  largeText:{
    fontSize: 22
  }
});
