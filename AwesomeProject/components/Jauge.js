import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput, CheckBox } from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import AnimatedBar from "react-native-animated-bar";
import FlipCard from 'react-native-flip-card';

const styles = require('../style/Style');

export class Jauge extends React.Component{
    constructor(props){
      super(props);
    }

    couleurJauge(){
        let couleur;
        if(this.props.dateFin > Date.now())
        {
            couleur= "#8787A3";
        }
        else{
            if(this.props.dateFin === Date.now()){
                couleur="#EF7E56";
            }
            else{
                couleur="#DD105E";
            }
        }
        return couleur;
    }

    couleurTexte(){
        let couleur;
        if(this.props.dateFin > Date.now())
        {
            couleur= "#46466E";
        }
        else{
            if(this.props.dateFin === Date.now()){
                couleur="#EF7E56";
            }
            else{
                couleur="#DD105E";
            }
        }
        return couleur;
    }

    Retard(){
        let indication;
        if(this.props.dateFin > Date.now())
        {
            let timeDiff = Math.abs(this.props.dateFin - Date.now());
            let diffDays = Math.ceil(timeDiff / (1000*3600*24));
            indication = "Echéance dans : " + diffDays + " jour(s)";
        }
        if(this.props.dateFin === Date.now())
        {
            indication = "Echéance aujourd'hui !";
        }
        if(this.props.dateFin < Date.now())
        {
            let timeDiff = Math.abs(this.props.dateFin - Date.now());
            let diffDays = Math.ceil(timeDiff / (1000*3600*24));
            indication = "Retard de : " + diffDays + " jour(s)";
        }
        return indication;
    }
    
    render(){
      return(
        <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 20, justifyContent: "space-around"}}>
            <FlipCard style={styles.flipcard}
            friction={10}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}>
            <View>
                <Text>{this.props.nomTache}</Text>
                <AnimatedBar
                    progress={this.props.tauxChargement}
                    height={null}
                    borderColor="#BDBDD7"
                    barColor={this.couleurJauge()}
                    borderRadius={20}
                    borderWidth={0}
                    animate={false}>
                      <View style={{flexDirection: "row",justifyContent: "center", alignItems: "center"}}>
                        <Text style={{ fontSize: 15, backgroundColor: "transparent", color: "#FFF"}}>
                          {this.props.tauxChargement * 100}%
                        </Text>
                      </View>
                </AnimatedBar>
            </View>
            <View style={styles.backflipcard}>
                    <Text style={{color: '#8787A3'}}>{this.props.description}</Text>
                    <Text style={{color: this.couleurTexte()}}>{this.Retard()}</Text>  
            </View>
            </FlipCard>
        </View>

      )
    }
  }