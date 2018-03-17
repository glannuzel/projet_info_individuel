import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Header } from '../components/Header';
import { SousTitre } from '../components/SousTitre'
import { NomProjet } from '../components/NomProjet'

const styles = require('../style/Style');

export class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `AGPA`,
    headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
    headerStyle:{
        backgroundColor:'#46466E',
      },
    });
  
  
  render() {
    return (
      <View>
        <SousTitre titre="Projets en cours"/>
        <NomProjet nom="Projet informatique de 2A" navigation={this.props.navigation}/>
        <NomProjet nom="Projet transpromo" navigation={this.props.navigation}/>
        <SousTitre titre="Projets achevés"/>
      </View>
    );
  }
}