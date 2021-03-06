import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, Button, Modal } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-slider';
import { ModifTache } from './ModifTache';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';

require('../ConnexionBD.js');

const styles = require('../style/Style');
const maCle=[];
const semaine = new Array("Dim.", "Lun.","Mar.", "Mer.","Jeu.", "Ven.", "Sam.");

export class Tache extends Component {
    constructor(props){
        super(props);
      }
    
    state={
        finie: false, //visibilité de l'élément pour marquer une tâche finie
        annuler: false, //visibilité de l'élément permettant la suppression d'une tâche
        tacheTerminee: false, //tâche marquée comme terminée
        isModalVisible: false, //ouverture modal de modification de tâche
        box: "check-box-outline-blank", //checkbox pour marquer comme finie
        avancee: this.props.tauxAvancement*100, //taux d'avancement de la tâche
    }

    //Rendre la date compréhensible par l'utilisateur
    dateBienEcrite(date){
        maDate = new Date(date);
        dateBienEcrite = semaine[maDate.getDay()] + " " + maDate.getDate()+ "/" + (maDate.getMonth()+1) + "/" + maDate.getFullYear();
        return dateBienEcrite;
    }
    
    //Inversion du state de la checkbox au clic
    _checkBoxClick = () => {
    if (this.state.box=="check-box-outline-blank")
    {
        this.setState({box: "check-box"});
        this.setState({tacheTerminee: true});
    }
    else { 
        this.setState({box: "check-box-outline-blank"});
        this.setState({tacheTerminee: false});
        }
    }

    //Changement de visibilité de l'élément permettant de marquer comme finie
    marquerCommeFinie(){
        if(this.state.finie)
        {
            this.setState({finie: false});
        }
        else{
            this.setState({finie: true});
        }
    }

    //Ouverture et fermeture du modal de modification de la tâche
    setModalVisible(etat){
        this.setState({isModalVisible: etat});
    }

    //Mise à jour de la tâche
    mettreAJour=async()=>{
        let user = firebase.auth().currentUser;
        projet = this.props.numeroProjet;
        id = this.props.numeroTache;
        firebase.database().ref(user.uid).child(projet).child(id).child('avancement').set(this.state.avancee/100);
        if(this.state.tacheTerminee){
            firebase.database().ref(user.uid).child(projet).child(id).child('fin').set(this.state.tacheTerminee);
            Toast.show('Tâche terminée');
        }
        else {
            Toast.show('Avancement mis à jour');
        }
        this.marquerCommeFinie();
    }

    //Visibilité de l'élément permettant la suppression d'une tâche
    demandeAnnulerTache(){
        if(this.state.annuler)
        {
            this.setState({annuler: false});
        }
        else{
            this.setState({annuler: true});
        }
    }

    //Suppression de la tâche de la base de données
    supprimerTache=async()=>{
        let user = firebase.auth().currentUser;
        projet = this.props.numeroProjet;
        id = this.props.numeroTache;
        firebase.database().ref(user.uid).child(projet).child(id).remove();
        Toast.show('Tâche supprimée');
    }

    //Changement du state de l'avancement de la tâche
    avancementTache(value){
        this.setState({avancee: value})
    }
    
    render() {
      return (
        <TouchableHighlight underlayColor='#D7D7D7' onPress={()=>{if(!this.state.annuler){this.marquerCommeFinie()}}} onLongPress={()=>{this.demandeAnnulerTache(); if(this.state.finie){this.marquerCommeFinie()}}}>
            {!this.state.finie&&!this.state.annuler&&
            <View style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5,
                padding: 5,
                backgroundColor: '#EFEFEF',
                borderRadius: 3,
                borderWidth: 1,
                borderColor: '#BDBDD7'}}>
                    <Text style={styles.sousTitreTexte}>{this.props.nom}</Text>
                    <Text style={{color: '#8787A3'}}>{this.props.description}</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View style={{flex: 2}}></View>
                        <View style={{flex: 3, flexDirection: 'row', backgroundColor: '#46466E', borderRadius: 3}}>
                            <View style={{flex: 1}}>
                                <Icon size={20} color="white" name="event" />
                            </View>
                            <View style={{flex: 4}}>
                                <Text style={{color: 'white'}}>Fin : {this.dateBienEcrite(this.props.dateFin)}</Text>
                            </View>
                        </View>
                    </View>
            </View> ||
            this.state.finie&&!this.state.annuler&&
            <View>
                <View style={{
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    backgroundColor: '#EFEFEF',
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: '#BDBDD7'}}>
                <View style={{padding: 5}}>
                        <Text style={styles.sousTitreTexte}>{this.props.nom}</Text>
                        <Text style={{color: '#8787A3'}}>{this.props.description}</Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 2}}></View>
                            <View style={{flex: 3, flexDirection: 'row', backgroundColor: '#46466E', borderRadius: 3}}>
                                <View style={{flex: 1}}>
                                    <Icon size={20} color="white" name="event" />
                                </View>
                                <View style={{flex: 4}}>
                                    <Text style={{color: 'white'}}>Fin : {this.dateBienEcrite(this.props.dateFin)}</Text>
                                </View>
                            </View>
                        </View>
                        </View>
                
                <View style={{paddingBottom: 5, backgroundColor: '#8787A3', flexDirection: 'row'}}>
                    <View style={{
                            flex: 1,
                            marginLeft: 10,
                            marginRight: 10,
                            alignItems: 'stretch',
                            justifyContent: 'center',
                            }}>
                        <Slider
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.avancee}
                        thumbTintColor='white'
                        step={10}
                        onValueChange={(value) => this.avancementTache(value)} />
                        <Text style={{color: 'white', textAlign: 'center'}}>Avancée de la tâche : {this.state.avancee}%</Text>
                    </View>
                </View>
                <View style={{backgroundColor: '#46466E', padding: 5, flexDirection: 'row'}}>
                    <View style={{flex: 3, paddingTop: 5}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Marquer comme terminée :</Text>         
                    </View>    
                    <View style={{flex: 1, paddingTop: 5}}> 
                        <TouchableOpacity onPress={this._checkBoxClick}>
                            <Icon size={24} name={this.state.box} color="white"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <Button title="OK!" color="#EF7E56" onPress={()=>this.mettreAJour()}/>
                    </View>
                </View>
                </View>
            </View> ||

            <View style={{marginBottom: 5, 
                marginRight: 10,
                marginLeft: 10,}}>
                <View style={{
                    backgroundColor: '#EFEFEF',
                    marginTop: 5,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: '#BDBDD7'}}>

                        <Modal animationType="slide" transparent={false} visible={this.state.isModalVisible}>
                            <View style={{flexDirection: 'row', alignItems: 'center', margin: 0, backgroundColor: "#E0E0E0"}}>
                                <View style={{flex: 3}}>
                                    <Text style={{color: "#777777", fontSize: 20, marginLeft: 15}}>Modifier la tâche</Text>
                                </View>
                                <View style={{flex: 1, padding: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
                                    <TouchableHighlight underlayColor="#D7D7D7" onPress={()=>this.setModalVisible(false)}>
                                        <Icon name='close' color="#46466E" size={30}/>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <ScrollView style={{marginTop: 10}}>
                                <ModifTache
                                    numeroProjet={this.props.numeroProjet} 
                                    numeroTache={this.props.numeroTache} 
                                    ressources={this.props.ressources}
                                    ressource={this.props.laRessource}
                                    nom={this.props.nom} 
                                    description={this.props.description} 
                                    dateFin={this.props.dateFin}
                                    dateDebut={this.props.dateDebut}
                                    ouvert={()=>this.setModalVisible(false)}
                                    modifFaite={()=>this.demandeAnnulerTache()} />
                            </ScrollView>
                        </Modal>
                        <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 5, padding: 5}}>
                            <Text style={styles.sousTitreTexte}>{this.props.nom}</Text>
                            <Text style={{color: '#8787A3'}}>{this.props.description}</Text>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <View style={{flex: 1}}></View>
                                <View style={{flex: 3, flexDirection: 'row', backgroundColor: '#46466E', borderRadius: 3}}>
                                    <View style={{flex: 1}}>
                                        <Icon size={20} color="white" name="event" />
                                    </View>
                                    <View style={{flex: 4}}>
                                        <Text style={{color: 'white'}}>Fin : {this.dateBienEcrite(this.props.dateFin)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{flex : 1}}>

                            <View style={{flex: 1, flexDirection: 'column'}}>

                                <View style={{flex: 1, 
                                    alignItems: 'center',
                                    justifyContent: 'center', 
                                    backgroundColor: '#BDBDD7'}}>
                                    <TouchableHighlight style={{borderRadius: 30, padding: 5, margin: 5}} underlayColor='#A2A2B9' onPress={()=>this.setModalVisible(true)}>
                                        <Icon name='mode-edit' color='#46466E' size={24}/>
                                    </TouchableHighlight>
                                </View>
                                <View style={{flex: 1, 
                                    alignItems: 'center',
                                    justifyContent: 'center', 
                                    backgroundColor: '#DD105E'}}>
                                    <TouchableHighlight style={{borderRadius: 30, padding: 5, margin: 5}} underlayColor='#AC0C49' onPress={()=>Alert.alert(
                                        'Supprimer la tâche',
                                        `Souhaitez-vous vraiment supprimer la tâche "${this.props.nom}" ? \n\nNote : Cette action est irréversible, cette tâche ne pourra pas être utilisée pour les calculs des KPI`,
                                        [
                                        {text: 'Supprimer la tâche', onPress: ()=>{this.supprimerTache(); this.demandeAnnulerTache();}},
                                        {text: 'Annuler', style: 'cancel'}
                                        ],
                                        {cancelable: false}
                                    )}>
                                        <Icon name='delete-forever' color='white' size={24}/>
                                    </TouchableHighlight>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginLeft: 5}}>
                        <View style={{heigth: 50, width: 50, backgroundColor: '#46466E', marginRight: 20, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableHighlight style={{borderRadius: 30, padding: 5, margin: 1}} underlayColor='##373757' onPress={()=>this.setState({annuler: false})}>
                                <Icon name='undo' color='white' size={20}/>
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 5}}/>
                    </View>
                </View>
            </View>
            }
        </TouchableHighlight>
        );
    }
}