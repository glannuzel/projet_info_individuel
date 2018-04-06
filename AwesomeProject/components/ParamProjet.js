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

require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];
const styles = require('../style/Style');

export class ParamProjet extends React.Component{
  constructor(props){
    super(props);
  }

  state = {
    nomProjet: "",
    ressource: "",
    isOpenedNom : false,
    isOpenedRessource : false,
  }; 

  _openNomProjet = () => {
      if(this.state.isOpenedNom){
        this.setState({isOpenedNom: false});
      }
      else{
        this.setState({isOpenedNom: true});
      }
  }

  _openRessource = () => {
    if(this.state.isOpenedRessource){
        this.setState({isOpenedRessource: false});
      }
      else{
        this.setState({isOpenedRessource: true});
      }
}

  _enregistrerNom=async()=>{
    //if(this.state.login){
        //let user = firebase.auth().currentUser;
        //id = user.uid;
        let user = firebase.auth().currentUser;
        id = this.props.id;
        let obj={
        titre: `${this.state.titre}`,
        description: `${this.state.description}`,
        dateDebut: this.state.dateDebut,
        dateFin: this.state.dateFin,
        avancement: 0,
        fin: false
        }
        firebase.database().ref(user.uid).child(id).push(obj);
        console.log("ajout");
        this.props.ouvert();
        this.props.rechargerBD();
   // }
  }

  _enregistrerRessources=async() =>{}

  _supprimerRessources=async() =>{}


  _updateNomProjet = (text) => this.setState({nomProjet: `${text}`});

  _listeRessources(){
    const ressourcesAssociees = [];
    console.log(this.props.ressources);
    for (i = 0; i < this.props.ressources.length; i++) {
      ressourcesAssociees.push(
        <Text> {this.props.ressources[i]} </Text>
      );
    }
    return ressourcesAssociees;
  }

  render(){
      return (
        <ScrollView>

            <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this._openNomProjet()}>
                <View style={{paddingRight : 10, backgroundColor: "#E0E0E0"}} >
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 6, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{margin: 5, color: "#777777", fontSize: 16}}>Modifier le nom du projet</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            {this.state.isOpenedNom&&
                            <Icon name="expand-more" size={25} color="#777777"/> ||
                            <Icon name="chevron-right" size={25} color="#777777"/>
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>

            {this.state.isOpenedNom&&
                <View>
                    <TextInput style={styles.nomProjet} placeholder="Nom du projet..." selectionColor='#46466E'
                        value={this.props.nomProjet}
                        onChangeText={(text) => this._updateNomProjet(text)}
                        maxLength={30}/>
                </View>
            }

            <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this._openRessource()}>
                <View style={{paddingRight : 10, backgroundColor: "#E0E0E0"}} >
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 6, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{margin: 5, color: "#777777", fontSize: 16}}>Gérer les ressources</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        {this.state.isOpenedRessource&&
                            <Icon name="expand-more" size={25} color="#777777"/> ||
                            <Icon name="chevron-right" size={25} color="#777777"/>
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
            
            {this.state.isOpenedRessource&&
                <View>
                    {this._listeRessources()}
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 6, alignItems: 'flex-start', justifyContent: 'center'}}>
                            <TextInput style={styles.nomProjet} placeholder="Nom du projet..." selectionColor='#46466E'
                                value={this.props.nomProjet}
                                onChangeText={(text) => this._updateNomProjet(text)}
                                maxLength={30}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Icon name='add-box' size={20} color="#EF7E56"/>
                        </View>
                    </View>
                </View>
            }

            <Button title="Enregistrer les modifications" onPress={()=>{}}/>

            <Button title="Supprimer le projet" onPress={()=>{Alert.alert(
                    "Supprimer le projet",
                    `Souhaitez-vous vraiment supprimer le projet "${this.props.nom}" ?`,
                    [
                      {text: 'Supprimer le projet', onPress: () => console.log('suppression')},
                      {text: 'Annuler', style: 'cancel', onPress: () => this.props.ouvert()}
                    ],
                    {cancelable: false}
                    )}}/>

        </ScrollView>

        );
    }
}