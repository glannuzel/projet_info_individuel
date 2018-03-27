import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput, Modal} from 'react-native';
import { ActivityIndicator, ScrollView, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tache } from '../components/Tache';
import * as firebase from 'firebase';
import { AjoutTache } from '../components/AjoutTache';


//const BarreNavigation = require('../components/BarreNavigation');
require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];
const semaine = new Array("Dim.", "Lun.","Mar.", "Mer.","Jeu.", "Ven.", "Sam.");

export class Taches extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.titre}`,
        id: `${navigation.state.params.id}`,
        headerTintColor : 'white',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle: { backgroundColor:'#46466E' },
        });

    state={
        dataCharged: false,
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    componentWillMount=async()=>{
        myUser=[];
        myKey=[];
    try{
        let user = firebase.auth().currentUser;
        id = this.props.navigation.state.params.id;
        console.log(id);
        firebase.database().ref(user.uid).child(id).on('child_added',
        (data)=>{
            myKey.push(data.key)
            //console.log(myKey)
            console.log(myKey.length);
            });
            
        firebase.database().ref(user.uid).child(id).on('value',
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
    listeTaches(){
        const liste = [];
        if (this.state.dataCharged){
        for (let iter = 0; iter < myKey.length-1; iter++){
            dateFinTache = new Date(myUser[myKey[iter]].dateFin);
            dateFinBienEcrite = semaine[dateFinTache.getDay()] + " " + dateFinTache.getDate()+ "/" + (dateFinTache.getMonth()+1) + "/" + dateFinTache.getFullYear();
            liste.push(
            <Tache nom={myUser[myKey[iter]].titre} description={myUser[myKey[iter]].description} dateFin={dateFinBienEcrite} />
            );
        }
    }
      return liste;
    }

    render() {
        const { navigate } = this.props.navigation;
      return (
        <ScrollView>
            {this.state.dataCharged&&
            <View style={{
                flex: 1, flexDirection: 'column'}}>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                    <AjoutTache id={this.props.navigation.state.params.id} ouvert={()=>this.setModalVisible(false)} rechargerBD={()=>this.componentWillMount()}/>
                    <View style={{marginTop: 15}}>
                        <Button title="Revenir aux tâches" onPress={()=>this.setModalVisible(false)} color="#DD105E"/>
                    </View>
                </Modal>
                <View style={{marginTop: 12}}>
                    <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this.setModalVisible(true)} >
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 2, textAlign: 'right', textAlignVertical: 'center', padding: 10, color: '#46466E'}}>Ajouter une tâche ... </Text>
                            <View style={{flex: 1, paddingTop: 10}}><Icon size={20} color="#EF7E56" name="add-circle"/></View>
                        </View>
                    </TouchableHighlight>
                </View>
                {this.listeTaches()}
            </View> ||
            <View style={{marginTop:'30%',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#DD105E"/>
            <Text>Chargement en cours...</Text>
          </View>
          }
        </ScrollView>
      );
    }
}

//this.props.navigation.navigate('AjoutTache', {titre: "Ajouter une tâche", id: `${this.props.navigation.state.params.id}`})}