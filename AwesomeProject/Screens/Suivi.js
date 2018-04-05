import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput } from 'react-native';
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
    }

    componentWillMount=async()=>{
      myUser=[];
      myKey=[];
      try{
          let user = firebase.auth().currentUser;
          id = this.props.navigation.state.params.id;
          //console.log(id);
          firebase.database().ref(user.uid).child(id).orderByChild('dateFin').on('child_added',
          (data)=>{
              myKey.push(data.key)
              //console.log(myKey)
              //console.log(myKey.length);
              });
              
          firebase.database().ref(user.uid).child(id).orderByChild('dateFin').on('value',
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

    jaugeTache(){
      //this.setState({dataCharged: false});
      //this.rechargerBD();
      const liste = [];
        if (this.state.dataCharged){
        for (let iter = 1; iter < myKey.length; iter++){
            dateFinTache = new Date(myUser[myKey[iter]].dateFin);
            dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
            liste.push(
              <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} nomTache={myUser[myKey[iter]].titre}/>
            );
          }
        }
      return liste;
    }

    render(){
        return (
            <ScrollView>
              {this.state.dataCharged&&
              this.jaugeTache() ||
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