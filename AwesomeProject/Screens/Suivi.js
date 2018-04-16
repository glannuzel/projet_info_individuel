import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Alert, AppRegistry, Button, Image, Picker, TextInput } from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import AnimatedBar from 'react-native-animated-bar';
import { Jauge } from '../components/Jauge';
import * as firebase from 'firebase';
//import { Chart } from 'react-google-charts';
//import { ReactGantt } from 'gantt-for-react';


require('../ConnexionBD.js');
const myKey=new Array(0);
const myUser=[];
const essai=[];


export class Suivi extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.titre}`,
        headerTintColor : 'white',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle: { backgroundColor:'#46466E' },
        });
    
    state={
          dataCharged: false,
          affichagePicker: "tout",
          isTachesEnRetardDisplayed: true,
          isTachesUrgentesDisplayed: true,
          isTachesEnCoursDisplayed: true,
          isTachesAVenirDisplayed: false
    }
  

    componentWillMount=async()=>{
      this.setState({dataCharged:false});
      myUser=[];
      myKey=[];
      try{
          let user = firebase.auth().currentUser;
          id = this.props.navigation.state.params.id;
          let maRef = firebase.database().ref(user.uid).child(id);
          //console.log(id);
          maRef.orderByChild('dateFin').on('child_added',
          (data)=>{
              myKey.push(data.key)
              //console.log(myKey)
              //console.log(myKey.length);
          });
              
          maRef.orderByChild('dateFin').on('value',
          (data)=>{
              myUser=data.val()
              //console.log(data.val())
              this.setState({dataCharged:true});
            }
          ); 

          maRef.orderByChild('dateFin').on('child_removed',
          (data)=>{
              let index = myKey.indexOf(data.key);
              myKey.splice(index,1);
          //myKey.delete(data.key)
          //console.log(myKey)
          //console.log(myKey.length);
          });

          //essai=firebase.database().ref(user.uid).child(id).;
          //console.log(essai);
          }
          catch(error){
          console.log(error.ToString())
          }
      }

    jaugeTacheRetard(){
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 2; iter < myKey.length; iter++){
              if(myUser[myKey[iter]].ressource == "(moi)"){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateFinTache / (1000*3600*24)) < ajd && !myUser[myKey[iter]].fin){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
          }
          else{
            for (let iter = 2; iter < myKey.length; iter++){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateFinTache / (1000*3600*24)) < ajd && !myUser[myKey[iter]].fin){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
        
      }
      //console.log(liste.length)
      if(liste.length != 0){ 
        //console.log("c'est le cas");
        //this.setState({isTachesEnRetardEmpty:false});
      }
        //this.setState({isTachesEnRetardEmpty: false});}
      return liste;
    }

    jaugeTacheUrgente(){
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 2; iter < myKey.length; iter++){
              if(myUser[myKey[iter]].ressource == "(moi)"){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if ((Math.ceil(dateFinTache / (1000*3600*24)) <= ajd+3) && (Math.ceil(dateFinTache / (1000*3600*24))) >= ajd && !myUser[myKey[iter]].fin){                dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
          }
          else{
            for (let iter = 2; iter < myKey.length; iter++){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if ((Math.ceil(dateFinTache / (1000*3600*24)) <= ajd+3) && (Math.ceil(dateFinTache / (1000*3600*24))) >= ajd && !myUser[myKey[iter]].fin){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
        }
        console.log("TACHES URGENTES : ");
        console.log(myKey.length);
        //if(liste.length !== 0){ this.setState({isTachesUrgentesEmpty: false});}
      return liste;
    }

    jaugeTacheEnCours(){
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 2; iter < myKey.length; iter++){
              if(myUser[myKey[iter]].ressource == "(moi)"){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateFinTache / (1000*3600*24)) > ajd+3 && !myUser[myKey[iter]].fin){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
          }
          else{
            for (let iter = 2; iter < myKey.length; iter++){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateFinTache / (1000*3600*24)) > ajd+3 && !myUser[myKey[iter]].fin){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
        }
      //this.componentDidMount();
        //if(liste.length !== 0){ this.setState({isTachesEnCoursEmpty: false});}
      return liste;
    }

    jaugeTacheAVenir(){
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 2; iter < myKey.length; iter++){
              if(myUser[myKey[iter]].ressource == "(moi)"){
                dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateDebutTache / (1000*3600*24)) > ajd && !myUser[myKey[iter]].fin){
                  dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
          }
          else{
            for (let iter = 2; iter < myKey.length; iter++){
                dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateDebutTache / (1000*3600*24)) > ajd && !myUser[myKey[iter]].fin){
                  dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
        }
        //if(liste.length !== 0){ this.setState({isTachesEnCoursEmpty: false});}
      return liste;
    }



    render(){
        
        return (
            <ScrollView>

              <View>
                <Picker enabled={this.state.dataCharged}
                      selectedValue={this.state.affichagePicker}
                      onValueChange={(value) => {
                        this.setState({affichagePicker: value});
                        if(value === "mesTaches"){
                          this.setState({isTachesEnRetardDisplayed: true});
                          this.setState({isTachesUrgentesDisplayed: true});
                          this.setState({isTachesEnCoursDisplayed: true});
                          this.setState({isTachesAVenirDisplayed: false});
                          }
                        else{
                          if(value === "tout"){
                            this.setState({isTachesEnRetardDisplayed: true});
                            this.setState({isTachesUrgentesDisplayed: true});
                            this.setState({isTachesEnCoursDisplayed: true});
                            this.setState({isTachesAVenirDisplayed: false});
                          }
                          if(value == "retard"){
                            this.setState({isTachesEnRetardDisplayed: true});
                            this.setState({isTachesUrgentesDisplayed: false});
                            this.setState({isTachesEnCoursDisplayed: false});
                            this.setState({isTachesAVenirDisplayed: false});
                          }
                          if(value == "urgentes"){
                            this.setState({isTachesEnRetardDisplayed: false});
                            this.setState({isTachesUrgentesDisplayed: true});
                            this.setState({isTachesEnCoursDisplayed: false});
                            this.setState({isTachesAVenirDisplayed: false});
                          }
                          if(value == "aVenir"){
                            this.setState({isTachesEnRetardDisplayed: false});
                            this.setState({isTachesUrgentesDisplayed: false});
                            this.setState({isTachesEnCoursDisplayed: false});
                            this.setState({isTachesAVenirDisplayed: true});
                          }
                        }}}>
                  <Picker.Item label="Toutes les tâches en cours" value="tout" key={1} />
                  <Picker.Item label="Uniquement mes tâches" value="mesTaches" key={2} />
                  <Picker.Item label="Uniquement tâches en retard" value="retard" key={3} />
                  <Picker.Item label="Uniquement tâches urgentes" value="urgentes" key={4} />
                  <Picker.Item label="Tâches à venir" value="aVenir" key={5} />
                </Picker>
              </View>

              {this.state.dataCharged&&
              this.state.isTachesEnRetardDisplayed&&this.state.isTachesUrgentesDisplayed&&this.state.isTachesEnCoursDisplayed&&!this.state.isTachesAVenirDisplayed&&
              <View style={{marginBottom: 5}}>
                <View style={{marginBottom: 5}}>
                  <Text style={{margin: 10, fontSize: 20, color: "#46466E"}}>Tâches en retard</Text>
                    {this.jaugeTacheRetard()}
                </View>
                <View style={{marginBottom: 5}}>
                  <Text style={{margin: 10, fontSize: 20, color: "#46466E"}}>Tâches en urgentes</Text>
                    {this.jaugeTacheUrgente()}
                </View>
                <View style={{marginBottom: 5}}>
                  <Text style={{margin: 10, fontSize: 20, color: "#46466E"}}>Autres tâches en cours</Text>
                    {this.jaugeTacheEnCours()}
                </View>
              </View> ||

              this.state.dataCharged&&
              this.state.isTachesEnRetardDisplayed&&!this.state.isTachesUrgentesDisplayed&&!this.state.isTachesEnCoursDisplayed&&!this.state.isTachesAVenirDisplayed&&
              <View style={{marginBottom: 5}}>
                <View style={{marginBottom: 5}}>
                  <Text style={{margin: 10, fontSize: 20, color: "#46466E"}}>Tâches en retard</Text>
                    {this.jaugeTacheRetard()}
                </View>
              </View> ||

              this.state.dataCharged&&
              !this.state.isTachesEnRetardDisplayed&&this.state.isTachesUrgentesDisplayed&&!this.state.isTachesEnCoursDisplayed&&!this.state.isTachesAVenirDisplayed&&
              <View style={{marginBottom: 5}}>
                <View style={{marginBottom: 5}}>
                  <Text style={{margin: 10, fontSize: 20, color: "#46466E"}}>Tâches en urgentes</Text>
                    {this.jaugeTacheUrgente()}
                </View>
              </View> ||

              this.state.dataCharged&&
              !this.state.isTachesEnRetardDisplayed&&!this.state.isTachesUrgentesDisplayed&&!this.state.isTachesEnCoursDisplayed&&this.state.isTachesAVenirDisplayed&&
              <View style={{marginBottom: 5}}>
                <View style={{marginBottom: 5}}>
                  <Text style={{margin: 10, fontSize: 20, color: "#46466E"}}>Tâches à venir</Text>
                    {this.jaugeTacheAVenir()}
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