import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Alert, Button, TextInput} from 'react-native';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NomProjet } from '../components/NomProjet';
import * as firebase from 'firebase';

const styles = require('../style/Style');
require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];

export class HomeScreen extends React.Component {

  state={
    dataCharged: false, //chargement des données effectué
    nomProjet: '', //nom du projet dans le champ d'ajout
    firstRender: true, //premier affichage du render
  }

  static navigationOptions = ({ navigation }) => ({
    title: `AGPA`,
    headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
    headerStyle:{
        backgroundColor:'#46466E',
      },
    headerLeft: null,
    headerRight: <View style={{paddingRight: 10}}><TouchableOpacity onPress={()=>{
      Alert.alert(
        'Déconnexion',
        'Etes-vous sûr de vouloir vous déconnecter ?',
        [
          {text: 'Se déconnecter', onPress: ()=>{firebase.auth().signOut();
            navigation.navigate('Connexion');}},
          {text: 'Annuler', style: 'cancel'}
        ],
        {cancelable: false}
      )
      }}>
      <Icon size={26} color="white" name="exit-to-app" />
      </TouchableOpacity>
      </View>
    });
    
    //Fonction appelée avec la première génération du render()
    componentWillMount=async()=>{
      myKey=[];
      myUser=[];
      try{
        let user = firebase.auth().currentUser; //ref de l'utilisateur
        id = user.uid; //id de l'utilisateur

        //Récupération des id projets et écoute sur les projets ajoutés
        firebase.database().ref(id).on('child_added',
          (data)=>{
            //Récupérer l'id des projets ajoutés
            myKey.push(data.key)
            });
        
        //Ecoute sur les éventuels éventuels enfants retirés
        firebase.database().ref(id).on('child_removed',
            (data)=>{
            //Retirer l'idée des projets retirés
            let index = myKey.indexOf(data.key);
            myKey.splice(index,1);
        });
        
        //Récupération des valeurs projets et écoute sur les modifications
        firebase.database().ref(id).on('value',
          (data)=>{
            //Modifier la valeur des projets modifiés
            myUser=data.val()
            this.setState({dataCharged:true});
            }
          ); 
        }
        catch(error){
          console.log(error.ToString())
        }
    }
      
    //Fonction listant les projets de l'utilisateur
    listeProjet(){
      const liste = [];
      for (let iter = 0; iter < myKey.length; iter++){
        liste.push(
        <NomProjet nom={myUser[myKey[iter]].nomProjet} ressource={myUser[myKey[iter]].ressources} numero={myKey[iter]} navigation={this.props.navigation} />
        );
      }
      return liste;
    }

    //Mise à jour du nom du projet dans le champ d'ajout
    _updateNomProjet = (text) => this.setState({nomProjet: `${text}`});

    //Ajout d'un nouveau projet dans la base de données
    ajouterProjet=async()=>{
      //Vérifier qu'un titre est écrit
      if(this.state.nomProjet){
          let user = firebase.auth().currentUser;
          id = user.uid;
          let ressources = [];
          let obj={
          nomProjet: `${this.state.nomProjet}`,
          ressources: ["(moi)"]
          }
          firebase.database().ref(id).push(obj);
      }
      //Sinon en informer l'utilisateur
      else {
        Alert.alert(
          "Titre manquant",
          "Vous devez donner un nom à votre projet.",
          [
          {text: 'Ok', style: 'cancel'}
          ],
          {cancelable: false}
          )
      }
    }

    //Message à la première connexion
    bienvenue(){
      Alert.alert(
        "Bienvenue sur AGPA !",
        "Merci d'avoir créé un compte. \nVous pouvez désormais commencer à gérer vos projets.",
        [
        {text: 'Ok', style: 'cancel'}
        ],
        {cancelable: false}
        )
        this.setState({firstRender: false});
    }
  
  render() {
    return (
        <ScrollView>
          <View> 
            
            {this.props.navigation.state.params.firstConnexion&&this.state.firstRender&&
            this.bienvenue()}

            {this.state.dataCharged&&
            <View>
              <View style={styles.sousTitre}>
                  <Text style={styles.sousTitreTexte}>Mes Projets</Text>
              </View>
              {this.listeProjet()}
              <View style={styles.backgroundProjetAdd} >
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        <TextInput style={styles.nomProjet} placeholder="Ajouter un projet..." selectionColor='#46466E'
                        onChangeText={(text) => this._updateNomProjet(text)}
                        maxLength={30}
                        ref={input => { this.textInput = input}}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Button title="Ajouter" onPress={()=>{this.ajouterProjet(); this.textInput.clear();}} color="#EF7E56" />
                    </View>
                </View>
              </View>
            </View>||

            <View style={{marginTop:'30%', justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size="large" color="#DD105E"/>
              <Text>Chargement en cours...</Text>
            </View>
            }
          </View>
        </ScrollView>
      
    );
  }
}