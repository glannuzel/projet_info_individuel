import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AnimatedBar from "react-native-animated-bar";
import FlipCard from 'react-native-flip-card';

const styles = require('../style/Style');


//Composant contenant les jauges d'avancement
export class Jauge extends React.Component{

    constructor(props){
        super(props);
    }

    //Couleur de la jauge selon le temps restant
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

    //Couleur du texte selon l'échéance
    couleurTexte(){
        let couleur;
        let fin = Math.ceil(this.props.dateFin / (1000*3600*24));
        let ajd = Math.ceil(Date.now() / (1000*3600*24));
        if(fin > ajd)
        {
            couleur= "#46466E";
        }
        else {
            if(fin === ajd){
                couleur="#EF7E56";
            }
            else {
                couleur="#DD105E";
            }
        }
        return couleur;
    }

    //Calcul de la durée totale de la tâche
    dureeTache(){
        let duree;
        let fin = Math.ceil(this.props.dateFin / (1000*3600*24));
        let debut = Math.ceil(this.props.dateDebut / (1000*3600*24));
        duree = Math.abs(fin - debut) + 1;
        return duree;
    }

    //Calcul de la durée restante de la tâche
    dureeRestante(){
        let duree;
        let fin = Math.ceil(this.props.dateFin / (1000*3600*24));
        let ajd = Math.ceil(Date.now() / (1000*3600*24));
        let debut = Math.ceil(this.props.dateDebut / (1000*3600*24));
        if(debut <= ajd){
            if(fin >= ajd){
                duree = Math.abs(fin - ajd);
            }
            else {
                duree = 0;
            }
        }
        else {
            duree = Math.abs(fin-debut)+1;
        }
        return duree;
    }

    //Calcul du pourcentage d'avancement de la date
    avancementDuree(){
        let avancement;
        let timeDiff = this.dureeTache();
        let timeLeft = this.dureeRestante();
        if (timeLeft == 0){
            avancement = 1;
        }
        else{
            avancement = 1 - timeLeft / timeDiff;
        }
        return avancement;
    }

    //Calcul du temps entre ajd et l'échéance
    echeance(){
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

    //Calcul du temps entre ajd et le début de la tâche
    debut(){
        let indication;
        let ajd = Math.ceil(Date.now()/(1000*3600*24));
        let dateDebutTache = Math.ceil(this.props.dateDebut / (1000*3600*24));
        if(dateDebutTache > ajd)
        {
            let timeDiff = Math.abs(dateDebutTache - ajd);
            indication = "Début dans : " + timeDiff + " jour(s)";
        }
        if(dateDebutTache === ajd)
        {
            indication = "Début : aujourd'hui";
        }
        if(dateDebutTache < ajd)
        {
            let timeDiff = Math.abs(ajd - dateDebutTache);
            indication = "Début il y a : " + timeDiff + " jour(s)";
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
                    <Text style={{color: '#8787A3'}}>Tâche affectée à : {this.props.ressource}</Text>
                    <Text style={{color: '#46466E'}}>{this.debut()}</Text> 
                    <Text style={{color: this.couleurTexte()}}>{this.echeance()}</Text>
                </View>
            </FlipCard>
        </View>

      )
    }
  }