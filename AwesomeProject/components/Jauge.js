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

    /*
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
*/
    couleurJaugeDuree(){
        let couleur;
        if(this.avancementDuree() === 1)
        {
            couleur= "#DD105E";
        }
        else{
            if(this.avancementDuree() >= 0.8){
                couleur="#EF7E56";
            }
            else{
                couleur="#8787A3";
            }
        }
        return couleur;
    }

    couleurTexte(){
        let couleur;
        let fin = Math.ceil(this.props.dateFin / (1000*3600*24));
        let ajd = Math.ceil(Date.now() / (1000*3600*24));
        if(fin > ajd)
        {
            couleur= "#46466E";
        }
        else{
            if(fin === ajd){
                couleur="#EF7E56";
            }
            else{
                couleur="#DD105E";
            }
        }
        return couleur;
    }

    dureeTache(){
        let duree;
        //console.log(this.props.dateDebut);
        let timeDiff = Math.abs(this.props.dateFin - this.props.dateDebut);
        //console.log(timeDiff);
        duree = Math.ceil(timeDiff / (1000*3600*24));
        //console.log(duree);
        return duree;
    }

    dureeRestante(){
        let duree;
        let fin = Math.ceil(this.props.dateFin / (1000*3600*24));
        let ajd = Math.ceil(Date.now() / (1000*3600*24));
        if(fin > ajd){
            duree = Math.abs(fin - ajd);
        }
        else{
            duree = 0;
        }
        return duree;
    }

    avancementDuree(){
        let avancement;
        let timeDiff = Math.abs(this.props.dateFin - this.props.dateDebut);
        let diffDaysTache = Math.ceil(timeDiff / (1000*3600*24));
        let avancementDiff = Math.abs(this.props.dateDebut - Date.now());
        let diffDaysAvancement = Math.ceil(avancementDiff / (1000*3600*24));
        if (diffDaysAvancement >= diffDaysTache){
            avancement = 1;
        }
        else{
            avancement = diffDaysAvancement / diffDaysTache;
        }
        return avancement;
    }

    Retard(){
        let indication;
        let ajd = Math.ceil(Date.now()/(1000*3600*24));
        let dateFinTache = Math.ceil(this.props.dateFin / (1000*3600*24));
        if(dateFinTache > ajd)
        {
            let timeDiff = Math.abs(dateFinTache - ajd);
            indication = "Echéance dans : " + timeDiff + " jour(s)";
        }
        if(dateFinTache === ajd)
        {
            indication = "Echéance aujourd'hui !";
        }
        if(dateFinTache < ajd)
        {
            let timeDiff = Math.abs(dateFinTache - ajd);
            indication = "Retard de : " + timeDiff + " jour(s)";
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
                <View>
                    <Text>{this.props.nomTache}</Text>
                    <View>
                        <AnimatedBar
                            progress={this.props.tauxChargement}
                            height={null}
                            borderColor="#BDBDD7"
                            barColor={this.couleurJaugeDuree()}
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
                    <View style={{marginTop: 5}}>
                        <AnimatedBar
                            progress={this.avancementDuree()}
                            height={null}
                            borderColor="#BDBDD7"
                            barColor={this.couleurJaugeDuree()}
                            borderRadius={20}
                            borderWidth={0}
                            animate={false}>
                            <View style={{flexDirection: "row",justifyContent: "center", alignItems: "center"}}>
                                <Text style={{ fontSize: 15, backgroundColor: "transparent", color: "#FFF"}}>
                                {this.dureeRestante()} jour(s) restant(s) sur {this.dureeTache()} jour(s)
                                </Text>
                            </View>
                        </AnimatedBar>
                    </View>
                </View>
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