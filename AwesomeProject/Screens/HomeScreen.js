import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MenuProvider, renderers } from 'react-native-popup-menu';
import { Header } from '../components/Header';
import { SousTitre } from '../components/SousTitre';
import { NomProjet } from '../components/NomProjet';
import { AjoutProjet } from '../components/AjoutProjet';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import * as firebase from 'firebase';

const styles = require('../style/Style');
require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];

export class HomeScreen extends React.Component {

  state={
    dataCharged: false,
    //isOpened: true,
    nomProjet: ''
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
          {text: 'Annuler', onPress: ()=>console.log('annuler déco'), style: 'cancel'}
        ],
        {cancelable: false}
      )
      }}>
      <Icon size={26} color="white" name="exit-to-app" />
      </TouchableOpacity>
      </View>
    });
    
    componentWillMount=async()=>{
      myKey=[];
      myUser=[];
      try{
        let user = firebase.auth().currentUser;
        id = user.uid;
        firebase.database().ref(id).on('child_added',
          (data)=>{
            myKey.push(data.key)
            //console.log(myKey)
            //console.log(myKey.length);
            });
          
            firebase.database().ref(id).on('child_removed',
            (data)=>{
            let index = myKey.indexOf(data.key);
            myKey.splice(index,1);
        });
            
        firebase.database().ref(id).on('value',
          (data)=>{
            myUser=data.val()
            //console.log(data.val())
            this.setState({dataCharged:true});
            }
          ); 
        }
        catch(error){
          console.log(error.ToString())
        }
      }
      
    openMenu(){
      console.log("ouverture");
      this.setState({isOpened:true});
    }
    
    closeMenu(){
      console.log("fermeture");
      this.setState({isOpened:false});
    }
      
    displayData(){
      console.log("Projet : "+myUser[myKey[0]].titre);
    }

    logOut(){
      firebase.auth().signOut();
      this.props.navigation.navigate('Connexion');
    }

    listeProjet(){
      const liste = [];
      for (let iter = 0; iter < myKey.length; iter++){
        //console.log(myUser[myKey[iter]].ressources);
        liste.push(
        <NomProjet nom={myUser[myKey[iter]].nomProjet} ressource={myUser[myKey[iter]].ressources} numero={myKey[iter]} navigation={this.props.navigation} />
        );
      }
      return liste;
    }

    _updateNomProjet = (text) => this.setState({nomProjet: `${text}`});

    ajouterProjet=async()=>{
      //if(this.state.login){
          let user = firebase.auth().currentUser;
          id = user.uid;
          let ressources = [];
          let obj={
          nomProjet: `${this.state.nomProjet}`,
          ressources: ["(moi)"]
          }
          firebase.database().ref(id).push(obj);
          //Alert.alert(`${this.state.nomProjet}`);
          console.log("ajout projet");
     // }
    }
  
  render() {
    return (
        <ScrollView>
          <View> 
            {this.state.dataCharged&&
            <View>
              <SousTitre titre="Mes Projets"/>
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

/*
<MenuProvider>
<Menu opened={this.state.isOpened}
                  onBackdropPress={() => this.closeMenu()}
                  onSelect={value => alert(`Selected number: ${value}`)}>
                    <MenuTrigger children={this.headerRight} onPress={this.openMenu}/>
                      <MenuOptions>
                        <MenuOption value={1} text='coucou' onSelect={() => this.closeMenu()}/>
                        <MenuOption value={2} onSelect={() => this.logOut()}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex:1}}><Icon size={20} color="grey" name="exit-to-app"/></View>
                          <View style={{flex:3}}><Text>Se déconnecter</Text></View>
                        </View>
                        </MenuOption>
                      </MenuOptions>
                </Menu>
</MenuProvider>
*/