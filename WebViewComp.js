/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  View,
  WebView,
  Text,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
  Linking,
  Platform
} from 'react-native';
import WKWebView from 'react-native-wkwebview-reborn';

const AppWebView = Platform.select({
  android: WebView,
  ios: WKWebView
})

export default class App extends Component<{}> {
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    title: 'Web View Container',
  };
  state = {
    isModalVisible: false
  };
  onMessageReceived=(event)=>{
    //alert('Message Received from web page:'+event.nativeEvent.data);
    //Alert.alert('Message', event.nativeEvent.data);
    let data = JSON.parse(event.nativeEvent.data);
    if (data.url && data.url.indexOf('.pdf') > -1) {
      this.setState({
        isModalVisible: true,
        url: data.url
      });
    }
  }
  onLoadingEnd=()=>{
    setTimeout(()=>{
      this.webView.postMessage('loaded');
    }, 1000);
    this.webView.postMessage('loaded');
    //alert('Loading end');
  }
  onModalWebViewLoadEnd = ()=>{
    this.setState({showLoader: false});
    Alert.alert('Load End');
  }
  onModalWebViewLoadStart = ()=>{
    this.setState({showLoader: true});
    Alert.alert('Load Start');
  }
  onNavigationStateChange = (webViewState) => {
     this.webViewState = webViewState;
     // if (webViewState.url !== this.state.url) {
     //    this.webView.stopLoading();
     //    Linking.openURL(webViewState.url);
     // }
  }
  onShouldStartLoadWithRequest = (navigator) => {
    this.navigator = navigator;
    if (navigator.url !== this.state.url) {
      this.webView.stopLoading();
      Linking.openURL(navigator.url);
      return false;
    }
    return true;
  }
  render() {
    const source={uri: this.props.navigation.state.params.url};
    const script = this.props.navigation.state.params.script;
    return (
        
        <View style={{flex: 1}}>

          <View style={{flex:.9}}>
            <AppWebView 
              source={ source }
              ref = { elt => { this.webView = elt;} }
              onMessage={ this.onMessageReceived }
              onLoadEnd={ this.onLoadingEnd }
              injectedJavaScript={script}
              javaScriptEnabledAndroid={true}
              style={{ paddingTop: 30 }}>
            </AppWebView>
          </View>
          <View style={{flex: .1}}>
            {this.state.isModalVisible && <Modal
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
              <View style={{flex: .1}}>
                <TouchableHighlight
                   style={styles.goButton}
                   onPress={()=>{this.setState({isModalVisible:false})}}
                  >
                    <Text> Close</Text>
                </TouchableHighlight>
              </View>
              <View style={{flex:.9}}>
                <AppWebView
                  source={{uri: this.state.url}}
                  style={{ paddingTop: 30 }}
                  injectedJavaScript={script}
                  ref={ele => {this.webView = ele;} }
                  javaScriptEnabledAndroid={true}
                  onMessage={ this.onMessageReceived }
                  onLoadEnd={this.onModalWebViewLoadEnd}
                  onNavigationStateChange={this.onNavigationStateChange}
                  onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                  onLoadStart={this.onModalWebViewLoadStart}>
                </AppWebView>
              </View>
            </Modal>}
          </View>
          {
            this.state.showLoader && <ActivityIndicator color='white' size='small' />
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({

});
