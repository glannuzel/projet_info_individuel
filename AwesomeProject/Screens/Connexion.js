import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, StyleSheet, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import * as firebase from 'firebase';


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
      static navigationOptions = {
        header:null
    };
    signUp=async()=>{
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
            this.props.navigation.navigate('Home');
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
        <View style={{flex: 1, backgroundColor: '#46466E'}}>

            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 24}}>CONNEXION</Text>
            </View>

            <View style={{flex: 2, margin: 15}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Adresse mail</Text>
                    <TextInput
                        style={{width:'75%', backgroundColor: '#8787A3', margin: 10, padding: 5, borderRadius: 5, color: 'white'}}
                        selectionColor='#46466E'
                        placeholder='Votre adresse e-mail'
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        onChangeText={
                        (text)=>{
                            adresseMail=text
                        }
                        }
                        />

                    <Text style={{color: 'white'}}>Mot de passe</Text>
                    <TextInput
                        style={{width:'75%', backgroundColor: '#8787A3', margin: 10, padding: 5, borderRadius: 5, color: 'white'}}
                        selectionColor='#46466E'
                        placeholder='Votre mot de passe'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={
                        (text)=>{
                            mdp=text
                        }
                        }
                        />
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}/>
                    <View style={{flex: 2}}>
                        <Button title='Sign in' color='#BDBDD7' onPress={()=>this.login()}/>
                    </View>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 2}}>
                        <Button title='Sign up' color='#DD105E' onPress={()=>this.signUp()}/>
                    </View>
                    <View style={{flex: 2}}/>
                </View>
            </View>
        </View>

    )
    }
}

/*
<Button title='mes infos' disabled={!this.state.login} onPress={()=>this.infos()}/>
                    <Button title='Display Data' disabled={!this.state.login} onPress={()=>this.displayData()}/>
                    <Button title='coucou' onPress={()=>this.coucou()}/>
*/