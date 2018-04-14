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

/*
const GanttComponent = React.createClass({
    tasks: function() {
      let names = [
        ["Redesign website", [0, 7]],
        ["Write new content", [1, 4]],
        ["Apply new styles", [3, 6]],
        ["Review", [7, 7]],
        ["Deploy", [8, 9]],
        ["Go Live!", [10, 10]]
      ];
  
      let tasks = names.map(function(name, i) {
        let today = new Date();
        let start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        let end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        start.setDate(today.getDate() + name[1][0]);
        end.setDate(today.getDate() + name[1][1]);
        return {
          start: start,
          end: end,
          name: name[0],
          id: "Task " + i,
          progress: parseInt(Math.random() * 100, 10)
        }
      });
      tasks[1].dependencies = "Task 0";
      tasks[2].dependencies = "Task 1, Task 0";
      tasks[3].dependencies = "Task 2";
      tasks[5].dependencies = "Task 4";
  
      tasks[0].custom_class = "bar-milestone";
      tasks[0].progress = 60;
      return tasks;
    }(),
    getInitialState: function() {
      return {
        viewMode: 'Day',
        tasks: this.tasks,
        scrollOffsets:{
          'Quarter Day': 10,
          'Half Day': 4,
          'Day': 10,
          'Week': 2,
          'Month': 1
        }
      };
    },

    componentDidMount: function() {
      setInterval(function() {
        this.setState({
          viewMode: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'][parseInt(Math.random() * 5 + 1) - 1],
          tasks: this.tasks.slice(0, parseInt(Math.random() * 4 + 1))
        });
      }.bind(this), 5000)
    },

    customPopupHtml: function(task) {
      const end_date = task._end.format('MMM D');
      return (
        <View class="details-container">
          <Text>${task.name}</Text>
          <Text>Expected to finish by ${end_date}</Text>
          <Text>${task.progress}% completed!</Text>
        </View>
      );
    },

    render: function() {
      return (
        <View className='examples'>
          <View className='parent'>
            <Text> render ReactGantt Component </Text>
            <View style={{overflow: 'scroll'}}>
              <ReactGantt tasks={this.state.tasks} 
                          viewMode={this.state.viewMode} 
                          customPopupHtml={this.customPopupHtml} 
                          scrollOffsets={this.state.scrollOffsets}
                          />
            </View>
          </View>
        </View>
      );
    }
  });
  
  export default GanttComponent;
*/

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

    /*
    rechargerBD=async()=>{
      this.setState({dataCharged:false});
      myUser=[];
      myKey=[];
      try{
          let user = firebase.auth().currentUser;
          id = this.props.navigation.state.params.id;
          firebase.database().ref(user.uid).child(id).on('child_added',
          (data)=>{
              myKey.push(data.key)
              });
              
          firebase.database().ref(user.uid).child(id).on('value',
          (data)=>{
              myUser=data.val()
              this.setState({dataCharged:true});
              }
          ); 
          }
      catch(error){
      console.log(error.ToString())
      }
    }
    */

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