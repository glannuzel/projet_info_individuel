import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Image, Button, TextInput, Modal} from 'react-native';
import { ActivityIndicator, ScrollView, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tache } from '../components/Tache';
import * as firebase from 'firebase';
import { AjoutTache } from '../components/AjoutTache';
import { MenuProvider, renderers } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Toast from 'react-native-simple-toast';

require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];
const styles = require('../style/Style');

export class NomRessource extends React.Component{
  constructor(props){
    super(props);
  }

  state = {
  }; 

  _supprimerRessource=async() =>{
    let user = firebase.auth().currentUser;
    id = this.props.id;
    let nouvellesRessources = this.props.ressources;
    nouvellesRessources.splice(this.props.numero,1);
    console.log(id);
    firebase.database().ref(user.uid).child(id).child("ressources").set(nouvellesRessources);
    console.log("ajout");
    this.props.ouvert(); 
  }

  render(){
      return (
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 5, alignItems: 'flex-start', justifyContent: 'center', color: '#46466E', margin: 10}}>
                <Text> {this.props.ressources[this.props.numero]} </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this._supprimerRessource()}>
                    <Icon name='close' size={20} color="#EF7E56"/>
                </TouchableHighlight>
            </View>
        </View>
        );
    }
}