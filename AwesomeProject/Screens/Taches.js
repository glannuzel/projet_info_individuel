import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Image, TextInput, Modal} from 'react-native';
import { Button } from 'react-native-elements';
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
        //console.log(id);
        firebase.database().ref(user.uid).child(id).on('child_added',
        (data)=>{
            myKey.push(data.key)
            //console.log(myKey)
            //console.log(myKey.length);
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
            <Tache numeroProjet={this.props.navigation.state.params.id} numeroTache={myKey[iter]} nom={myUser[myKey[iter]].titre} description={myUser[myKey[iter]].description} dateFin={dateFinBienEcrite} tauxAvancement={myUser[myKey[iter]].avancement} rechargerBD={()=>this.componentWillMount()}/>
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
            <View style={{flex: 1, flexDirection: 'column', margin: 0}}>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                    <View style={{flexDirection: 'row', alignContent: 'center', margin: 0}}>
                        <View style={{flex: 3}}/>
                        <View style={{flex: 1, alignContent: 'center'}}>
                            <Button icon={{name: 'close', color: "#46466E", size: 30}} backgroundColor="white" onPress={()=>this.setModalVisible(false)}/>
                        </View>
                    </View>
                    <View>
                        <AjoutTache id={this.props.navigation.state.params.id} ouvert={()=>this.setModalVisible(false)} rechargerBD={()=>this.componentWillMount()}/>
                    </View>
                    <View>
                        <Button title="REVENIR AUX TACHES" onPress={()=>this.setModalVisible(false)} backgroundColor="#EF7E56" borderRadius={2}/>
                    </View>
                </Modal>
                <View style={{marginTop: 12, marginLeft: 20, marginRight: 20}}>
                    <Button raised title='AJOUTER UNE TACHE' iconRight={{name: 'add-circle'}} backgroundColor="#EF7E56" onPress={()=>this.setModalVisible(true)}/>
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