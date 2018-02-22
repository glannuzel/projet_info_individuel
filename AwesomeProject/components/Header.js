import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';

const styles = require('../style/Style');

export class Header extends Component{
  render(){
    return (
      <View style={styles.header}>
        <Text style={styles.appName}>AfezjioPA</Text>
      </View>
    );
  }
}