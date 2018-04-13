import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Image, Button, TextInput, Modal} from 'react-native';
import { ActivityIndicator, ScrollView, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import { NomRessource } from './NomRessource';
import { MenuProvider, renderers } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Toast from 'react-native-simple-toast';

require('../ConnexionBD.js');
const styles = require('../style/Style');

export class AjoutRessource extends React.Component{
  constructor(props){
    super(props);
  }

  state = {
    nomRessource: "",
  }; 

  _updateRessource = (text) => this.setState({nomRessource: `${text}`});

  _enregistrerRessource=async() =>{
    let user = firebase.auth().currentUser;
    id = this.props.id;
    let nouvellesRessources = this.props.ressources;
    nouvellesRessources.push(this.state.nomRessource);
    firebase.database().ref(user.uid).child(id).child("ressources").set(nouvellesRessources);
  }

  componentDidMount=async() =>{
      this.setState({nomRessource: ""});
  }

  render(){
      return (
        <View style={{flexDirection: 'row', backgroundColor: '#EEEEEE', borderRadius: 3, marginTop: 5}}>
            <View style={{flex: 5, justifyContent: 'center', color: '#46466E', paddingLeft: 5}}>
                    <TextInput style={styles.nomProjet} placeholder="Nom de la ressource..." selectionColor='#46466E'
                                    onChangeText={(text) => this._updateRessource(text)}
                                    maxLength={15}
                                    ref={input => { this.textInput = input}}/>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight style={{borderRadius: 20, padding: 5}} underlayColor='#D7D7D7' onPress={() => {this._enregistrerRessource(); this.textInput.clear(); Toast.show('Ressource ajoutée');}}>
                    <Icon name='add' size={20} color="#46466E"/>
                </TouchableHighlight>
            </View>
        </View>
        );
    }
}