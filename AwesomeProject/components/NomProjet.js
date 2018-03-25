import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';

const styles = require('../style/Style');

export class NomProjet extends React.Component{
  constructor(props){
    super(props);
  }
  //_onPressText() {
    //this.props.navigation.navigate('Details', {titre: 'WHATEVER'})
    //this.props.navigation.navigate('Details');
  //}
  
  render(){
    return(
      <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this.props.navigation.navigate('Details', {titre: `${this.props.nom}`, id: `${this.props.numero}`})}>
        <View style={styles.backgroundProjet} >
          <Text style={styles.nomProjet}>{this.props.numero}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}