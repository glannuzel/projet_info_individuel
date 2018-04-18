import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import PieChart from 'react-native-pie-chart';
import * as firebase from 'firebase';


require('../ConnexionBD.js');
const styles = require('../style/Style');
const myKey=new Array(0);
const mesTachesFiniesKey=[]; //tableau des id des tâches finies
const mesTachesAVenirKey=[]; //tableau des id des tâches à venir
const mesTachesEnCoursKey=[]; //tableau des id des tâches en cours
const mesRessources=[]; //tableau des ressources
const mesRessourcesKey=[]; //tableau des id des ressources
const mesCouleurs=['#DD105E', '#46466E','#EF7E56','#8787A3','#BDBDD7']; //tableau des couleurs de la charte graphique
let couleurGraphe=[]; //tableau des couleurs pour le graphique

//Ecran contenant les indicateurs
export class Kpi extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.titre}`,
        headerTintColor : 'white',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle: { backgroundColor:'#46466E' },
        });

  state={
    dataCharged: false, //chargement des données achevé
  }

  constructor(props) {
    super(props);
  }

  //Fonction permettant d'obtenir une couleur aléatoire
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //Fonction appelé avant le premier render()
  componentWillMount=async()=>{
      this.setState({dataCharged:false});
      mesTachesFiniesKey=[];
      mesTachesAVenirKey=[];
      mesTachesEnCoursKey=[];
      lesNombresDeTaches=[];
      mesRessources=[];
      mesRessourcesKey=[];
      dates=[];
      couleurGraphe=[];

      try{
          let user = firebase.auth().currentUser; //ref de l'utilisateur
          id = this.props.navigation.state.params.id; //id dur projet concerné
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

          //Afficher quelque chose uniquement s'il y a des tâches
          if(mesTachesEnCoursKey.length!=0 || mesTachesFiniesKey.length!=0){
            this.setState({dataCharged: true});
          }

          }

          catch(error){
            console.log(error.ToString())
          }
  }

  //liste des ressources avec légende
  lesressources(){
    const liste=[];
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

  //légende du graphe 1 d'état des tâches
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
    //Données du graphe 1 :
    const series = [mesTachesFiniesKey.length, mesTachesEnCoursKey.length, mesTachesAVenirKey.length];
    //Couleurs du graphe 1 :
    const sliceColor = ['#DD105E', '#46466E', '#8787A3'];
 
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
