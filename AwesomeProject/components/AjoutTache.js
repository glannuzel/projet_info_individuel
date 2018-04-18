import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, Button, TextInput, Picker } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AutoExpandingTextInput } from './AutoExpandingTextInput';
import * as firebase from 'firebase';

const styles = require('../style/Style');
require('../ConnexionBD.js');

//Tableau des jours de la semaine abbréviés
const semaine = new Array("Dim.", "Lun.","Mar.", "Mer.","Jeu.", "Ven.", "Sam.");

//Modal pour l'ajout d'une tâche
export class AjoutTache extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        isDateTimePickerVisible1: false, //ouverture calendrier de date de début
        isDateTimePickerVisible2: false, //ouverture calendrier de date de fin
        titre: "", //titre de la tache
        description: "", //description de la tache
        couleurChampTitre: "white", //couleur du champ de saisie du titre
        contourChampTitre: "#C3C3C3", //couleur du contour du champ de saisie du titre
        ressources: "(moi)", //ressource associée au projet, par defaut (moi)
        dateDebut: new Date().getTime(), //date de debut de la tache
        dateFin: new Date().getTime(), //date de fin de tache
    };

    //Sauvegarde de la nouvelle tache dans la BD
    enregistrer=async()=>{
      //Vérifier que le titre est renseigne
        if(this.state.titre != ""){
            let user = firebase.auth().currentUser;
            id = this.props.id;
            let obj={
              titre: `${this.state.titre}`,
              description: `${this.state.description}`,
              dateDebut: this.state.dateDebut,
              dateFin: this.state.dateFin,
              ressource: this.state.ressources,
              avancement: 0,
              fin: false
            }
            firebase.database().ref(user.uid).child(id).push(obj);
            this.props.ouvert();
        }
        //Sinon en informer l'utilisateur
        else {
            this.setState({couleurChampTitre: '#F4CCCC'});
            this.setState({contourChampTitre: '#DD105E'});
            Alert.alert(
                "Titre manquant",
                "Vous devez donner un titre à cette tâche.",
                [
                {text: 'Ok', style: 'cancel'}
                ],
                {cancelable: false}
            );
        }
    }

    //Mise à jour du titre de la tache
    _updateTitre = (text) => this.setState({titre: `${text}`});

    //Mise à jour de la description de la tache
    _updateDescription = (text) => this.setState({description: `${text}`});

    //Mise à jour de la date de fin de tâche
    _updateDateFin = (date) => {
        this.setState({dateFin: date.getTime()});
        if(this.state.dateDebut > this.state.dateFin){
            this.setState({dateDebut : this.state.dateFin});
        }
    }

    //Mis à jour de la date de début de la tâche
    _updateDateDebut = (date) => {
        this.setState({dateDebut: date.getTime()});
        if(this.state.dateDebut > this.state.dateFin){
            this.setState({dateFin : this.state.dateDebut});
        }
    }

    //Rendre visible le calendrier de début de tâche
    _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });
    //Rendre visible le calendrier de fin de tâche
    _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });
  
    //Rendre invisible le calendrier de début de tâche
    _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });
    //Rendre invisible le calendrier de fin de tâche
    _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });
  
    //Lorsque la saisie du calendrier de début de tâche est validée
    _handleDatePicked1 = (date) => {
        this._updateDateDebut(date);
        this._hideDateTimePicker1();
    };

    //Lorsque la saisie du calendrier de fin de tâche est validée
    _handleDatePicked2 = (date) => {
        this._updateDateFin(date);
        this._hideDateTimePicker2();
    };

    _onSubmitEdit = () => {};

    //Rendre la date compréhensible par l'utilisateur
    _ecrireDate = (date) =>{
        date = new Date(date);
        dateBienEcrite = semaine[date.getDay()] + " " + date.getDate()+ "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        return dateBienEcrite;
    }

    //Lister les ressources du projet
    _listeRessources(){
        const ressourcesAssociees = [];
        for (i = 0; i < this.props.ressources.length; i++) {
            ressourcesAssociees.push(
            <Picker.Item label={`${this.props.ressources[i]}`} value={`${this.props.ressources[i]}`} key={i} />
            );
        }
        return ressourcesAssociees;
    }


    render(){
        return (
        <ScrollView style={{marginLeft: 15, marginRight: 15}}>

            <Text style={styles.sousTitreTexte}>Titre de la tâche</Text>
            <View style={{borderColor: this.state.contourChampTitre, backgroundColor: this.state.couleurChampTitre, borderWidth: 1, borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 5}}>
                <TextInput
                  underlineColorAndroid='transparent' 
                  placeholder="Titre de la tâche" 
                  selectionColor='#46466E'
                  onChangeText={(text) => this._updateTitre(text)} />
            </View>

            <Text style={styles.sousTitreTexte}>Description</Text>
            <View style={{ borderColor: '#C3C3C3', backgroundColor: 'white', borderWidth: 1, borderRadius: 5, marginTop: 5, marginBottom: 10, padding: 5}}>
                <AutoExpandingTextInput style={{ height: 40, margin: 10, padding: 5 }} 
                    underlineColorAndroid='transparent'
                    placeholder="Description ..."
                    selectionColor='#46466E'
                    onChangeText={(text) => this._updateDescription(text)}
                    maxLength={500}
                />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 5}}/>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this._onSubmitEdit}>
                            <Icon size={24} color="#46466E" name="done" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{marginBottom: 10}}>

                <View style={{marginTop: 10, backgroundColor: '#BDBDD7', borderRadius: 3, padding: 8 }}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 6}}>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{color: '#46466E', textAlign: 'right', fontSize: 18, paddingRight: 15}}>Date de début de tâche </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{color: '#8787A3', textAlign: 'right', paddingRight: 20}}>{this._ecrireDate(this.state.dateDebut)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, padding: 10}}>
                            <TouchableOpacity underlayColor='#D7D7D7' onPress={this._showDateTimePicker1}>
                                <Icon size={30} color="#46466E" name="event" />
                            </TouchableOpacity>
                            <DateTimePicker
                              isVisible={this.state.isDateTimePickerVisible1}
                              onConfirm={this._handleDatePicked1}
                              onCancel={this._hideDateTimePicker1}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginTop: 10, backgroundColor: '#46466E', borderRadius: 3, padding: 8 }}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 6}}>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{color: 'white', textAlign: 'right', fontSize: 18, paddingRight: 15}}>Date de fin de tâche </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{color: 'white', textAlign: 'right', paddingRight: 20}}>{this._ecrireDate(this.state.dateFin)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, padding: 10}}>
                            <TouchableOpacity underlayColor='#D7D7D7' onPress={this._showDateTimePicker2}>
                                <Icon size={30} color="white" name="event" />
                            </TouchableOpacity>
                            <DateTimePicker
                              isVisible={this.state.isDateTimePickerVisible2}
                              onConfirm={this._handleDatePicked2}
                              onCancel={this._hideDateTimePicker2}
                            />
                        </View>
                    </View>
                </View>

            </View>

            <View>
                <Text style={styles.sousTitreTexte}>Affecter à la tâche : </Text>
                <View style={{borderColor: '#C3C3C3', backgroundColor: 'white', borderWidth: 1, borderRadius: 5, marginTop: 10, marginBottom: 10}}>
                    <Picker
                        selectedValue={this.state.ressources}
                        onValueChange={(value) => {
                            this.setState({ressources: value});
                        }}>
                        {this._listeRessources()}
                  </Picker>
                </View>
            </View>
              
            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                <View style={{flex: 1, margin: 15}}>
                    <Button title="Enregistrer" onPress={()=>this.enregistrer()} color="#EF7E56"/>
                </View>
                <View style={{flex: 1, margin: 15}}>
                    <Button title="Annuler" onPress={()=>this.props.ouvert()} color="#DD105E"/>
                </View>
            </View>

        </ScrollView>
        );
    }
}