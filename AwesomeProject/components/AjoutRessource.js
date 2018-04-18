import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, TextInput } from 'react-native';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';

require('../ConnexionBD.js');
const styles = require('../style/Style');

//Champ pour ajouter une ressource
export class AjoutRessource extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        nomRessource: "", //nom de la ressource
        couleurChamp: "#EEEEEE", //couleur du champ de saisie
        couleurPlaceholder: "#CCCCCC" //couleur du placeholder du champ
    }; 

    //Mettre à jour le statenomRessource
    _updateRessource = (text) => this.setState({nomRessource: `${text}`});

    //Ajouter la ressource à la base de données
    _enregistrerRessource=async() =>{
        //Vérifier que le champ est rempli
        if(this.state.nomRessource){
            let user = firebase.auth().currentUser;
            id = this.props.id;
            let nouvellesRessources = this.props.ressources;
            nouvellesRessources.push(this.state.nomRessource);
            firebase.database().ref(user.uid).child(id).child("ressources").set(nouvellesRessources);
            this.setState({couleurChamp: '#EEEEEE'});
            this.setState({couleurPlaceholder: '#CCCCCC'});
        }
        //Sinon prévenir l'utilisateur
        else {
            this.setState({couleurChamp: '#F4CCCC'});
            this.setState({couleurPlaceholder: '#DD105E'});
            Alert.alert(
                "Nom manquant",
                "Vous devez donner un nom à la ressource pour l'ajouter.",
                [
                {text: 'Ok', style: 'cancel'}
                ],
                {cancelable: false}
            );
        }
    }

    render(){
        return (
            <View style={{flexDirection: 'row', backgroundColor: this.state.couleurChamp, borderRadius: 3, marginTop: 5}}>
                <View style={{flex: 5, justifyContent: 'center', color: '#46466E', paddingLeft: 5}}>
                        <TextInput style={styles.nomProjet} placeholder="Nom de la ressource..." placeholderTextColor={this.state.couleurPlaceholder} selectionColor='#46466E'
                                        onChangeText={(text) => this._updateRessource(text)}
                                        maxLength={15}
                                        ref={input => { this.textInput = input}}/>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableHighlight style={{borderRadius: 20, padding: 5}} underlayColor='#D7D7D7' 
                        onPress={() => {this._enregistrerRessource(); this.textInput.clear(); Toast.show('Ressource ajoutée');}}>
                        <Icon name='add' size={20} color="#46466E"/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}