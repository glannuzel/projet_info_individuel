import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput } from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import AnimatedBar from "react-native-animated-bar";

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
    
    render(){
      return(
        <View style={{flex: 1, paddingTop: 30, paddingHorizontal: 30, justifyContent: "space-around"}}>
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
        </View>
      )
    }
  }