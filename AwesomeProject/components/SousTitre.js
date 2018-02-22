import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';

const styles = require('../style/Style');

export class SousTitre extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={styles.sousTitre}>
        <Text style={styles.sousTitreTexte}>{this.props.titre}</Text>
      </View>
    )
  }
}