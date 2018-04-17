import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Alert, AppRegistry, Button, Image, Picker,  StatusBar, StyleSheet, TextInput } from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import AnimatedBar from 'react-native-animated-bar';
import { Jauge } from '../components/Jauge';
import PieChart from 'react-native-pie-chart';
import * as firebase from 'firebase';


require('../ConnexionBD.js');
const styles = require('../style/Style');
const myKey=new Array(0);
//const mesTachesFinies=[];
const mesTachesFiniesKey=[];
const mesTachesAVenirKey=[];
const mesTachesEnCoursKey=[];
const lesTaches=[];
const lesTachesKey=[];
const mesRessources=[];
const mesRessourcesKey=[];
const mesCouleurs=['#DD105E', '#46466E','#EF7E56','#8787A3','#BDBDD7'];
let couleurGraphe=[];


export class Kpi extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.titre}`,
        headerTintColor : 'white',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle: { backgroundColor:'#46466E' },
        });

  state={
    dataCharged: false
  }

  constructor(props) {
    super(props);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  componentWillMount=async()=>{
    this.setState({dataCharged:false});
      //mesTachesFinies=[];
      mesTachesFiniesKey=[];
      mesTachesAVenirKey=[];
      mesTachesEnCoursKey=[];
      lesNombresDeTaches=[];
      mesRessources=[];
      mesRessourcesKey=[];
      dates=[];
      couleurGraphe=[];

      try{
          let user = firebase.auth().currentUser;
          id = this.props.navigation.state.params.id;
          let maRef = firebase.database().ref(user.uid).child(id);

          //Récupération des taches finies
          maRef.orderByChild('fin').equalTo(true).on('child_added',
          (data)=>{
            mesTachesFiniesKey.push(data.key);
          });
          maRef.orderByChild('fin').equalTo(true).on('child_removed',
          (data)=>{
            mesTachesFiniesKey.pop();
          });
          /*
          maRef.orderByChild('fin').equalTo(true).on('value',
          (data)=>{
            mesTachesFinies=data.val()              
            }
          ); 
          */

          //Récupération des tâches non achevées
          maRef.orderByChild('fin').equalTo(false).on('child_added',
          (data)=>{
            let dateDebut = new Date(data.child('dateDebut').val());
            let debut = Math.ceil(dateDebut / (1000*3600*24));
            let ajd = Math.ceil(Date.now() / (1000*3600*24));
            if (debut<=ajd){
              mesTachesEnCoursKey.push(data.key);
            }
            else{
              mesTachesAVenirKey.push(data.key);
            }
            
          });  
          maRef.orderByChild('fin').equalTo(false).on('child_removed',
          (data)=>{
            mesTachesEnCoursKey.pop();
          });
          /*
          maRef.orderByChild('fin').equalTo(false).on('value',
          (data)=>{
              mesTachesEnCours=data.val()
            }
          );
          */

          //Récupération des ressources
          maRef.child('ressources').on('child_added',
          (data)=>{
            mesRessourcesKey.push(data.key)
          });  
          maRef.child('ressources').on('child_removed',
          (data)=>{
            let index = mesRessourcesKey.indexOf(data.key);
            mesRessourcesKey.splice(index,1);
          });  
          maRef.child('ressources').on('value',
          (data)=>{
              mesRessources=data.val()
            }
          );

          //Récupération des tâches ordonnées par ressource
          for(i=0;i<mesRessourcesKey.length;i++)
          {
            let maRessource = mesRessources[i];
            let numberOfTasks = 0;
            //if(maRessource=="(moi)"){ maRessource = "";}
            maRef.orderByChild('ressource').equalTo(`${maRessource}`).on('child_added',
            (data)=>{
                if(data.child("fin").val() == false){
                  numberOfTasks = numberOfTasks+1;
                }
            });
            lesNombresDeTaches.push(numberOfTasks);
            if(couleurGraphe.length <= mesCouleurs.length){
                couleurGraphe.push(mesCouleurs[i]);
            }
            else{
                couleurGraphe.push(this.getRandomColor());
            }
            
          }
          //console.log(lesNombresDeTaches);

          if(mesTachesEnCoursKey.length!=0 || mesTachesFiniesKey.length!=0){
            this.setState({dataCharged: true});
          }

          }

          catch(error){
          console.log(error.ToString())
          }
  }

  lesressources(){
    const liste=[];
    //console.log(couleurGraphe.length);
    for (i=0; i<couleurGraphe.length;i++)
    {
      liste.push(
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}/>
        <View style={{flex: 1, backgroundColor: `${couleurGraphe[i]}`, margin: 2}}/>
        <View style={{flex:1}}/>
        <View style={{flex: 7}}>
          <Text>{mesRessources[i]} : {lesNombresDeTaches[i]}</Text>
        </View>
      </View>
      )
    }
    return liste;
  }

  lesEtatsTaches(){
    const liste=[];
    liste.push(
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}/>
        <View style={{flex: 1, backgroundColor: '#DD105E', margin: 2}}/>
        <View style={{flex:1}}/>
        <View style={{flex: 7}}>
          <Text>Tâches terminées : {mesTachesFiniesKey.length}</Text>
        </View>
      </View>);
      liste.push(
        <View style={{flexDirection: 'row'}}>
          <View style={{flex:1}}/>
          <View style={{flex: 1, backgroundColor: '#46466E', margin: 2}}/>
          <View style={{flex:1}}/>
          <View style={{flex: 7}}>
            <Text>Tâches en cours : { mesTachesEnCoursKey.length}</Text>
          </View>
        </View>);
      liste.push(
        <View style={{flexDirection: 'row'}}>
          <View style={{flex:1}}/>
          <View style={{flex: 1, backgroundColor: '#8787A3', margin: 2}}/>
          <View style={{flex:1}}/>
          <View style={{flex: 7}}>
            <Text>Tâches à venir : { mesTachesAVenirKey.length}</Text>
          </View>
        </View>);
    return liste;
  }


  render() {
    const chart_wh = 100;
    const series = [mesTachesFiniesKey.length, mesTachesEnCoursKey.length, mesTachesAVenirKey.length];
    const sliceColor = ['#DD105E', '#46466E', '#8787A3'];
    //const series = [1, 2, 3, 4, 5]
    //const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
 
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
        {!this.state.dataCharged &&
          <View/> ||
          <View>
            <Text style={styles.enTete}>Evolution du Projet</Text>
            <View style={styles.elementIndicateur}>
                <View style={styles.positionGraphe}>
                  <PieChart
                    chart_wh={chart_wh}
                    series={series}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.5}
                    coverFill={'#FFF'}
                  />
                </View>
                <View style={{flex: 3}}>
                {this.lesEtatsTaches()}
                </View>
              </View>
            <Text style={styles.enTete}>Répartition des tâches non achevées</Text>
            <View style={styles.elementIndicateur}>
              <View style={styles.positionGraphe}>
                <PieChart
                  chart_wh={chart_wh}
                  series={lesNombresDeTaches}
                  sliceColor={couleurGraphe}
                  doughnut={true}
                  coverRadius={0.5}
                  coverFill={'#FFF'}
                />
              </View>
              <View style={{flex: 3}}>
                {this.lesressources()}
              </View>
            </View>
          </View>
          }
        </View>
      </ScrollView>
    );
  }
}
