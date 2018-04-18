import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import { HomeScreen } from './Screens/HomeScreen';
import BarreNavigation from './Screens/BarreNavigation';
import { Connexion } from './Screens/Connexion';
import * as firebase from 'firebase';

const RootStack = StackNavigator({
  Connexion: {
    screen: Connexion,
  },
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: BarreNavigation,
  },
}, {
    initialRouteName: 'Connexion',
  }
);

export default class App extends React.Component{
  render(){
    return <RootStack/>;
  }
}
