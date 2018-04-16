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
          isTachesEnRetardEmpty: true,
          isTachesUrgentesEmpty: true,
          isTachesEnCoursEmpty: true
    }
/*
    componentWillUpdate=async(nextProps, nextState) =>{
      console.log("dans componentwillupdate");
      let user = firebase.auth().currentUser;
      id = this.props.navigation.state.params.id;
      let maRef = firebase.database().ref(user.uid).child(id);
      maRef.orderByChild('dateFin').on('child_removed',
      ()=>{
          console.log("dans le removed");
          console.log(myKey.length);
          this.setState({dataCharged: false});
      });
      if (nextState.dataCharged == true && this.state.dataCharged == false) {
        console.log("condition validée");
        this.rechargerBD();
      }
      let user = firebase.auth().currentUser;
      id = this.props.navigation.state.params.id;
      let maRef = firebase.database().ref(user.uid).child(id);
      console.log(myKey.length);
      maRef.orderByChild('dateFin').on('child_removed',
      (data)=>{
          console.log("dans le removed");
          this.componentWillMount();
          //myKey.delete(data.key)
          //console.log(myKey)
          //console.log(myKey.length);
      });
      if (nextState.dataCharged == true && this.state.dataCharged == false) {
        console.log("condition validée");
        this.componentWillMount();
      }
     
    }
     */

    
    componentDidMount(){
      console.log("dans componentDidMount");
      //this.setState({dataCharged: false});
    }

    componentWillMount=async()=>{
      console.log("dans component will mount");
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

      _mesTaches=async()=>{
        this.setState({dataCharged: false});
        myUser=[];
        myKey=[];
        try{
            let user = firebase.auth().currentUser;
            id = this.props.navigation.state.params.id;
            //console.log(id);
            firebase.database().ref(user.uid).child(id).orderByChild("ressource").equalTo("").on('child_added',
            (data)=>{
                myKey.push(data.key)
                //console.log(myKey)
                //console.log(myKey.length);
                }
              );
                
            firebase.database().ref(user.uid).child(id).orderByChild("ressource").equalTo("").on('value',
            (data)=>{
                myUser=data.val()
                //console.log(data.val())
                this.setState({dataCharged:true});
                }
            ); 
            //essai=firebase.database().ref(user.uid).child(id).;
            //console.log(essai);
            }
            catch(error){
            console.log(error.ToString())
            }
        }

    
    rechargerBD=async()=>{
      this.setState({dataCharged:false});
      console.log("dans rechargerBD");
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
          //essai=firebase.database().ref(user.uid).child(id).;
          //console.log(essai);
          }
          catch(error){
          console.log(error.ToString())
          }
        }

    jaugeTacheRetard(){
      //this.setState({dataCharged: false});
      //this.rechargerBD();
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "tout"){
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
        if(this.state.affichagePicker === "mesTaches"){
          for (let iter = 0; iter < myKey.length; iter++){
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
      //this.setState({dataCharged: false});
      //this.rechargerBD();
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "tout"){
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
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 0; iter < myKey.length; iter++){
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
        console.log("TACHES URGENTES : ");
        console.log(myKey.length);
        //if(liste.length !== 0){ this.setState({isTachesUrgentesEmpty: false});}
      return liste;
    }

    jaugeTacheEnCours(){
      //this.setState({dataCharged: false});
      //this.rechargerBD();
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "tout"){
            for (let iter = 1; iter < myKey.length; iter++){
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
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 0; iter < myKey.length; iter++){
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

    render(){
        
        return (
            <ScrollView>

              <View>
                <Picker enabled={this.state.dataCharged}
                      selectedValue={this.state.affichagePicker}
                      onValueChange={(value) => {
                        this.setState({affichagePicker: value});
                        if(value === "mesTaches"){
                          this._mesTaches();}
                        else{
                          if(value === "tout"){
                            this.componentWillMount();
                          }
                        }}}>
                  <Picker.Item label="Tout afficher" value="tout" key={1} />
                  <Picker.Item label="Afficher uniquement mes tâches" value="mesTaches" key={2} />
                </Picker>
              </View>

              {this.state.dataCharged&&
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
                  
                  <Text style={{margin: 10, fontSize: 20, color: "#46466E"}}>Tâches en cours</Text>
                  
                    {this.jaugeTacheEnCours()}
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

    /*
    <View style={{flex: 1}}>
                <ProgressBarClassic progress={20} label="un label"/>
              </View>
              <View style={{flex: 1}}>
                <ProgressBarClassic progress={40} color="#111111" label="autre chose"/>
              </View>
              <View style={{flex: 1}}>
                <ProgressBarClassic progress={10} label="une tâche"/>
              </View>
              */