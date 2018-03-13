import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, StyleSheet, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    }
  })

require('../ConnexionBD.js');
const adresseMail="glannuzel@ensc.fr";
const mdp="123456";
const id="KU2entkOqKYXHLKqDu4p5DJeKvz2";
const user=new Array(0);
const myUser=[];

export class Connexion extends React.Component {
    state={
        login:false
      }
    signIn=async()=>{
        if(adresseMail&&mdp){
            try {
            await firebase.auth()
                .createUserWithEmailAndPassword(adresseMail, mdp);
            this.setState({login:true})
            console.log("Account created");

            } catch (error) {
                console.log(error.toString())
            }
        }
        else{
            console.log('pas ok')
        }
      }
    login=async()=> {
    
    try {
        await firebase.auth()
            .signInWithEmailAndPassword(adresseMail, mdp);
            this.setState({login:true})
        console.log("Logged In!");

        // Navigate to the Home page

    } catch (error) {
        console.log(error.toString())
    }

    }
    infos=async()=>{
    if(this.state.login){
        let user = firebase.auth().currentUser;
        id = user.uid;
        let obj={
        name:'quentin',
        mdp:'coucou'
        }
        firebase.database().ref(id).push(obj)
    }
    }
    displayData=async()=>{
    firebase.database().ref(id).on('child_added',
    (data)=>{
        user.push(data.key)
        console.log(user)
        });
        firebase.database().ref(id).on('value',
        (data)=>{
        myUser=data.val()
        console.log(data.val())
        }
        )
        alert('ok')
    }
    coucou(){
    console.log("coucou"+myUser[user[0]].name);
    }
    render(){
    return (
        <View style={styles.container}>
        <TextInput
            style={{width:'50%',height:'5%'}}
            placeholder='email'
            onChangeText={
            (text)=>{
                adresseMail=text
            }
            }
            />
        <TextInput
            style={{width:'50%',height:'5%'}}
            placeholder='mdp'
            onChangeText={
            (text)=>{
                mdp=text
            }
            }
            />
        <Button title='Sign in' onPress={()=>this.signIn()}/>
        <Button title='Sign up' onPress={()=>this.login()}/>
        <Button title='mes infos' disabled={!this.state.login} onPress={()=>this.infos()}/>
        <Button title='Display Data' disabled={!this.state.login} onPress={()=>this.displayData()}/>
        <Button title='coucou' onPress={()=>this.coucou()}/>
        </View>

    )
    }
}