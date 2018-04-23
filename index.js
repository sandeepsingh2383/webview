import { AppRegistry } from 'react-native';
import App from './App';
import WebViewComp from './WebViewComp';
import {
  StackNavigator,
} from 'react-navigation';

export const AwesomeProject = StackNavigator({
  App: { screen: App },
  WebViewComp: { screen: WebViewComp }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
