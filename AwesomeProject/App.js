import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Header } from './components/Header';
import { HomeScreen } from './Screens/HomeScreen';
import BarreNavigation from './Screens/BarreNavigation';
import { DescTacheScreen } from './Screens/DescTacheScreen';
//import DateTimePickerTester from './components/DateTimePicker';
/*
import { DetailsScreen } from './Screens/DetailsScreen';
import { DescTacheScreen } from './Screens/DescTacheScreen';
import { Taches } from './Screens/Taches';
import { Suivi } from './Screens/Suivi';
import { Kpi } from './Screens/Kpi';
*/
const styles = require('./style/Style');

/*
const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DescTacheScreen,
  },
  Taches: {
    screen: Taches,
  },
  Suivi: {
    screen: Suivi,
  },
  KPI: {
    screen: Kpi
  },
},
  {
    initialRouteName: 'Home',
  }
);
*/

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: BarreNavigation,
  },
  AjoutTache: {
    screen: DescTacheScreen,
  }
}, {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component{
  render(){
    return <RootStack/>;
  }
}
