import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, StyleSheet, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import * as firebase from 'firebase';


require('../ConnexionBD.js');
//const adresseMail="glannuzel@ensc.fr";
//const mdp="123456";
const adresseMail="";
const mdp="";
const user=[];
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
                await firebase.auth().createUserWithEmailAndPassword(adresseMail, mdp);
                this.setState({login:true})
                console.log("Account created");
            }
            catch (error) {
                if(error.toString() == "Error: The email address is badly formatted."){
                    alert("Le format de l'adresse e-mail est incorrect.")
                }
                if(error.toString() == "Error: Password should be at least 6 characters"){
                    alert("Le mot de passe doit contenir au moins 6 caractères.")
                }
                if(error.toString() == "Error: The email address is already in use by another account."){
                    alert("Un compte est déjà associé à cette adresse e-mail.");
                }
                console.log(error.toString())
            }
        }
        else{
            alert('Veuillez remplir tous les champs.');
        }
      }
    

    login=async()=> {
        try {
            await firebase.auth().signInWithEmailAndPassword(adresseMail, mdp);
            this.setState({login:true});
            // Navigation vers la page des projets
            this.props.navigation.navigate('Home');
            console.log("Logged In!");
        }
        catch (error) {
            if(error.toString() == "Error: The password is invalid or the user does not have a password."){
                alert("Le mot de passe est invalide.");
            }
            if(error.toString() == "Error: The email address is badly formatted."){
                alert("Le format de l'adresse e-mail est incorrect.")
            }
            if(error.toString() == "Error: There is no user record corresponding to this identifier. The user may have been deleted."){
                alert("Utilisateur inconnu. L'adresse e-mail est erronée ou l'utilisateur n'existe pas.")
            }
            //alert(error.toString());
            console.log(error.toString())
        }
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