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
const myKey=new Array(0);
const mesTachesFinies=[];
const mesTachesFiniesKey=[];
const mesTachesEnCours=[];
const mesTachesEnCoursKey=[];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  }
});

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

  componentWillMount=async()=>{
    this.setState({dataCharged:false});
      mesTachesFinies=[];
      mesTachesFiniesKey=[];
      mesTachesEnCours=[];
      mesTachesEnCoursKey=[];
      try{
          let user = firebase.auth().currentUser;
          id = this.props.navigation.state.params.id;
          let maRef = firebase.database().ref(user.uid).child(id);
          //console.log(id);
          maRef.orderByChild('fin').equalTo(true).on('child_added',
          (data)=>{
            mesTachesFiniesKey.push(data.key)
              //console.log(myKey)
              //console.log(myKey.length);
          });
              
          maRef.orderByChild('fin').equalTo(true).on('value',
          (data)=>{
            mesTachesFinies=data.val()
              //console.log(data.val())
              this.setState({dataCharged:true});
            }
          ); 
          
          maRef.orderByChild('fin').equalTo(false).on('child_added',
          (data)=>{
            mesTachesEnCoursKey.push(data.key)
              //console.log(myKey)
              //console.log(myKey.length);
          });
              
          maRef.orderByChild('fin').equalTo(false).on('value',
          (data)=>{
              mesTachesEnCours=data.val()
              //console.log(data.val())
              this.setState({dataCharged:true});
            }
          ); 
          console.log(mesTachesFiniesKey.length);
          console.log(mesTachesEnCoursKey.length);
          }
          catch(error){
          console.log(error.ToString())
          }
  }

  render() {
    const chart_wh = 100;
    const series = [mesTachesFiniesKey.length, mesTachesEnCoursKey.length];
    const sliceColor = ['#DD105E', '#46466E'];
    //const series = [1, 2, 3, 4, 5]
    //const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
 
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          
          <Text style={styles.title}>Doughnut</Text>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.5}
            coverFill={'#FFF'}
          />
        </View>
      </ScrollView>
    );
  }
}

/*<StatusBar
            hidden={false}
          />
          <Text style={styles.title}>Basic</Text>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
          />
          */