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

  _supprimerRessource=async() =>{
    let user = firebase.auth().currentUser;
    id = this.props.id;
    console.log(this.props.ressources[this.props.numero]);

    //Récupération de toutes les tâches attribuées à la ressource
    firebase.database().ref(user.uid).child(id).orderByChild("ressource").equalTo(`${this.props.ressources[this.props.numero]}`).on('child_added',
    (data)=>{
        myKey.push(data.key); }
    );
    console.log(myKey.length);
    console.log(myKey);
    let i=0;

    //Suppression de ces tâches de la base des données
    while (i<myKey.length)
    {
        firebase.database().ref(user.uid).child(id).child(myKey[i]).remove();
        i=i+1;
    }

    //Suppression de la ressource de la liste des ressources
    let nouvellesRessources = this.props.ressources;
    nouvellesRessources.splice(this.props.numero,1);
    //Suppression de la ressource de la base de données
    firebase.database().ref(user.uid).child(id).child("ressources").set(nouvellesRessources);
  }

  render(){
      return (
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 5, alignItems: 'flex-start', justifyContent: 'center', color: '#46466E', margin: 10}}>
                <Text> {this.props.ressources[this.props.numero]} </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight style={{borderRadius: 20, padding: 5}} underlayColor='#D7D7D7' onPress={() =>{Alert.alert(
                            "Supprimer la ressource",
                            `Souhaitez-vous vraiment supprimer la ressource "${this.props.ressources[this.props.numero]}" ?\n\nNote : toutes les tâches associées à cette ressource seront également supprimées`,
                            [
                            {text: 'Annuler', style: 'cancel'},
                            {text: 'Supprimer la ressource', onPress: () => {this._supprimerRessource();  Toast.show('Ressource supprimée');}}                            
                            ],
                            {cancelable: false}
                            )}}>
                    <Icon name='close' size={20} color="#EF7E56"/>
                </TouchableHighlight>
            </View>
        </View>
        );
    }
}