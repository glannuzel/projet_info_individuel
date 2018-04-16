import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Image, Button, TextInput, Modal} from 'react-native';
import { ActivityIndicator, ScrollView, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import { NomRessource } from './NomRessource';
import { AjoutRessource } from './AjoutRessource';
import { MenuProvider, renderers } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Toast from 'react-native-simple-toast';

require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];
const styles = require('../style/Style');

export class ParamProjet extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        nomProjet: `${this.props.nomProjet}`,
        isOpenedNom : false, //Ouverture et fermeture de l'onglet nom du projet
        isOpenedRessource : false, //Ouverture et fermeture de l'onglet ressources
        isOpenedSupp : false, //Ouverture et fermeture de l'onglet suppression du projet
    }; 

    //Inversion du state isOpenedNom
    _openNomProjet = () => {
        if(this.state.isOpenedNom){
            this.setState({isOpenedNom: false});
        }
        else{
            this.setState({isOpenedNom: true});
        }
    }

    //Inversion du state isOpenedRessource
    _openRessource = () => {
        if(this.state.isOpenedRessource){
            this.setState({isOpenedRessource: false});
        }
        else{
            this.setState({isOpenedRessource: true});
        }
    }

    //Inversion du state isOpenedSupp
    _openSupprimer = () => {
        if(this.state.isOpenedSupp){
            this.setState({isOpenedSupp: false});
            }
            else{
            this.setState({isOpenedSupp: true});
            }
    }

    //Changement du nom du projet dans la base de données
    _enregistrerNom=async()=>{
        let user = firebase.auth().currentUser;
        id = this.props.id;
        firebase.database().ref(user.uid).child(id).child("nomProjet").set(this.state.nomProjet);
    }
  
    //Suppression du projet de la base de données
    _supprimerProjet=async()=>{
        let user = firebase.auth().currentUser;
        id = this.props.id;
        firebase.database().ref(user.uid).child(id).remove();
        this.props.ouvert(); 
    }

    //Mise à jour du nom du projet dans le state nomProjet
    _updateNomProjet = (text) => this.setState({nomProjet: `${text}`});

    //Lister toutes les ressources associées au projet
    //Première ressource mise à part pour empêcher sa suppression
    _listeRessources(){
        const ressourcesAssociees = [];
        ressourcesAssociees.push(
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', color: '#46466E', margin: 10}}>
                    <Text> {this.props.ressources[0]} </Text>
                </View>
            </View>);
        for (i = 1; i < this.props.ressources.length; i++) {
            ressourcesAssociees.push(
                <NomRessource numero={i} ressources={this.props.ressources} id={this.props.id}/>
            );
        }
        return ressourcesAssociees;
    }

    render(){
        return (
            <ScrollView>
                
                <View style={{marginBottom: 10}}>
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
                        <View style={{backgroundColor: '#EEEEEE', borderRadius: 3, margin: 10}}>
                            <TextInput style={styles.nomProjet} placeholder="Nom du projet..." selectionColor='#46466E'
                                value={this.state.nomProjet}
                                onChangeText={(text) => this._updateNomProjet(text)}
                                maxLength={30}/>
                        </View>
                        <View style={{margin: 15}}>
                            <Button title="Enregistrer" onPress={()=>{this._enregistrerNom(); Toast.show('Nom du projet modifié');}} color="#EF7E56"/>
                        </View>
                    </View>
                    }
                </View>

                <View style={{marginBottom: 10}}>
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
                        <View style={{flex: 1, margin: 10}}>
                            {this._listeRessources()}
                            <AjoutRessource ressources={this.props.ressources} id={this.props.id}/>
                        </View>
                    }
                </View>

                <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this._openSupprimer()}>
                    <View style={{paddingRight : 10, backgroundColor: "#E0E0E0"}} >
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 6, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={{margin: 5, color: "#777777", fontSize: 16}}>Supprimer le projet</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            {this.state.isOpenedSupp&&
                                <Icon name="expand-more" size={25} color="#777777"/> ||
                                <Icon name="chevron-right" size={25} color="#777777"/>
                                }
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                
                {this.state.isOpenedSupp&&
                    <View style={{flex: 1, margin: 15}}>
                        <Button title="Supprimer le projet" color="#DD105E" onPress={()=>{Alert.alert(
                                "Supprimer le projet",
                                `Souhaitez-vous vraiment supprimer le projet "${this.props.nomProjet}" ?`,
                                [
                                {text: 'Supprimer le projet', onPress: () => this._supprimerProjet()},
                                {text: 'Annuler', style: 'cancel'}
                                ],
                                {cancelable: false}
                                )}}/>
                    </View>
                }

            </ScrollView>
        );
    }
}