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
    isOpened: true,
    nomProjet: ''
  }

  static navigationOptions = ({ navigation }) => ({
    title: `AGPA`,
    headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
    headerStyle:{
        backgroundColor:'#46466E',
      },
    headerLeft: null,
    headerRight: <TouchableOpacity onPress={this.closeMenu}><Icon size={24} color="white" name="more-vert" /></TouchableOpacity>
    });
    
    componentWillMount=async()=>{
      try{
        let user = firebase.auth().currentUser;
        id = user.uid;
        firebase.database().ref(id).on('child_added',
          (data)=>{
            myKey.push(data.key)
            //console.log(myKey)
            //console.log(myKey.length);
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
        liste.push(
        <NomProjet nom={myUser[myKey[iter]].nomProjet} numero={myKey[iter]} navigation={this.props.navigation} />
        );
      }
      return liste;
    }

    _updateNomProjet = (text) => this.setState({nomProjet: `${text}`});

    ajouterProjet=async()=>{
      //if(this.state.login){
          let user = firebase.auth().currentUser;
          id = user.uid;
          let obj={
          nomProjet: `${this.state.nomProjet}`,
          }
          firebase.database().ref(id).push(obj);
          //Alert.alert(`${this.state.nomProjet}`);
          console.log("ajout projet");
     // }
    }
  
  render() {
    return (
      <MenuProvider>
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
                        maxLength={30}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Button title="Ajouter" onPress={()=>this.ajouterProjet()} color="#EF7E56" />
                    </View>
                </View>
              </View>
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
              
            </View>||
            <View style={{marginTop:'30%',justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size="large" color="#DD105E"/>
              <Text>Chargement en cours...</Text>
            </View>
            }
          </View>
        </ScrollView>
      </MenuProvider>
    );
  }
}