import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Header } from '../components/Header';
import { SousTitre } from '../components/SousTitre'
import { NomProjet } from '../components/NomProjet'
import * as firebase from 'firebase';

const styles = require('../style/Style');
require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];

export class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `AGPA`,
    headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
    headerStyle:{
        backgroundColor:'#46466E',
      },
    headerLeft: null,
    });
    
    state={
      dataCharged: false
    }

    componentWillMount=async()=>{
      try{
        let user = firebase.auth().currentUser;
        id = user.uid;
        firebase.database().ref(id).on('child_added',
          (data)=>{
            myKey.push(data.key)
            console.log(myKey)
            console.log(myKey.length);
            });
            
        firebase.database().ref(id).on('value',
          (data)=>{
            myUser=data.val()
            console.log(data.val())
            this.setState({dataCharged:true});
            }
          ); 
        }
        catch(error){
          console.log(error.ToString())
        }
      }
  
    displayData(){
      console.log("Projet : "+myUser[myKey[0]].titre);
    }

    listeProjet(){
      const liste = [];
      for (let iter = 0; iter < myKey.length; iter++){
        liste.push(
        <NomProjet nom={myUser[myKey[iter]].titre} navigation={this.props.navigation}/>
        );
      }
      return liste;
    }
  
  render() {
    return (
      <View> 
        {this.state.dataCharged&&
        <View>
          <SousTitre titre="Mes Projets"/>
          {this.listeProjet()}
        </View>||
        <View style={{marginTop:'30%',justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color="#DD105E"/>
          <Text>Chargement en cours...</Text>
        </View>
        }
      </View>
    );
  }
}