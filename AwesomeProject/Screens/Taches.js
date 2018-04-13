import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Image, TextInput, Modal} from 'react-native';
import { Button } from 'react-native-elements';
import { ActivityIndicator, ScrollView, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tache } from '../components/Tache';
import * as firebase from 'firebase';
import { AjoutTache } from '../components/AjoutTache';
import { MenuProvider, renderers } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

 
//const BarreNavigation = require('../components/BarreNavigation');
require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];
const myRessources=[];
const myRessourcesKey=[];
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
        myRessources=[];
        myRessourcesKey=[];
    try{
        let user = firebase.auth().currentUser;
        id = this.props.navigation.state.params.id;
        //console.log(id);

        //Récupération des tâches non achevées
        firebase.database().ref(user.uid).child(id).orderByChild('fin').equalTo(false).on('child_added',
        (data)=>{
            myKey.push(data.key)
            //console.log(myKey)
            //console.log(myKey.length);
            });
            
        firebase.database().ref(user.uid).child(id).orderByChild('fin').equalTo(false).on('value',
        (data)=>{
            myUser=data.val()
            //console.log(data.val())
            this.setState({dataCharged:true});
            }
        ); 

        //Récupération des ressources associées à un projet
        firebase.database().ref(user.uid).child(id).child('ressources').on('child_added',
        (data)=>{
            myRessourcesKey.push(data.key);
            //console.log(myRessourcesKey);
            });
            
        firebase.database().ref(user.uid).child(id).child('ressources').on('value',
        (data)=>{
            myRessources=data.val();
            //console.log(data.val());
            //Indiquer que le chargement des données est achevé :
            this.setState({dataCharged:true});
            }
        ); 
        console.log(myRessources);
        //console.log(myRessources[myRessourcesKey]);
        }
        catch(error){
        console.log(error.ToString())
        }
    }

    listeTaches(){
        const liste = [];
        if (this.state.dataCharged){
        for (let iter = 0; iter < myKey.length; iter++){
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
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                    <View style={{flexDirection: 'row', alignItems: 'center', margin: 0, backgroundColor: "#E0E0E0"}}>
                        <View style={{flex: 3}}/>
                        <View style={{flex: 1, padding: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TouchableHighlight underlayColor="#D7D7D7" onPress={()=>this.setModalVisible(false)}>
                                <Icon name='close' color="#46466E" size={30}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <ScrollView style={{marginTop: 10}}>
                        <AjoutTache 
                            id={this.props.navigation.state.params.id} 
                            ressources={myRessources}
                            ouvert={()=>this.setModalVisible(false)} 
                            rechargerBD={()=>this.componentWillMount()}/>
                    </ScrollView>
                </Modal>
                <View style={{marginTop: 12}}>
                    <Button raised title='AJOUTER UNE TACHE' iconRight={{name: 'add-circle'}} backgroundColor="#EF7E56" onPress={()=>this.setModalVisible(true)}/>
                </View>
                <View style={{width: '100%', marginTop: 10}}>
                    {this.listeTaches()}
                </View>
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


/*
<MenuProvider><View style={{paddingRight: 10}}><TouchableOpacity onPress={()=>{
            if(this.state.menuOpened){this.setState({menuOpened: false});}
            else{this.setState({menuOpened: true});}}}>
            <Menu opened={this.state.menuOpened}
            onBackdropPress={() => this.setState({menuOpened: false})}
            onSelect={value => alert(`Selected number: ${value}`)}>
              <MenuTrigger children={this.headerRight} onPress={this.openMenu}/>
                <MenuOptions>
                  <MenuOption value={1} text='coucou' onSelect={() => console.log('coucou')}/>
                  <MenuOption value={2} onSelect={() => console.log('deco')}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}><Icon size={20} color="grey" name="exit-to-app"/></View>
                    <View style={{flex:3}}><Text>Se déconnecter</Text></View>
                  </View>
                  </MenuOption>
                </MenuOptions>
          </Menu>
            <Icon size={26} color="white" name="more-vert" />
            </TouchableOpacity>
            </View></MenuProvider>
            */