import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput, Picker, CheckBox } from 'react-native';
import { ActivityIndicator, ListView, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { StackNavigator} from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AutoExpandingTextInput } from './AutoExpandingTextInput';
import * as firebase from 'firebase';

const styles = require('../style/Style');
require('../ConnexionBD.js');

//Tableau des jours de la semaine abbréviés
const semaine = new Array("Dim.", "Lun.","Mar.", "Mer.","Jeu.", "Ven.", "Sam.");

export class AjoutTache extends React.Component{

    constructor(props){
      super(props);
    }

    state = {
        isDateTimePickerVisible1: false,
        isDateTimePickerVisible2: false,
        titre: "",
        description: "",
        couleurChampTitre: "white",
        contourChampTitre: "#C3C3C3",
        ressources: "(moi)",
        dateDebut: new Date().getTime(),
        dateFin: new Date().getTime(),
        box: "check-box-outline-blank"
    };

    enregistrer=async()=>{
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
        //this.props.rechargerBD();
      }
      else{
        this.setState({couleurChampTitre: '#F4CCCC'});
        this.setState({contourChampTitre: '#DD105E'});
        alert('Vous devez donner un titre à cette tâche.');
      }
    }

    _updateTitre = (text) => this.setState({titre: `${text}`});

    _updateDescription = (text) => this.setState({description: `${text}`});

    _updateDateFin = (date) => {
        this.setState({dateFin: date.getTime()});
        if(this.state.dateDebut > this.state.dateFin){
          this.setState({dateDebut : this.state.dateFin});
      }
    }

    _updateDateDebut = (date) => {
        this.setState({dateDebut: date.getTime()});
        if(this.state.dateDebut > this.state.dateFin){
            this.setState({dateFin : this.state.dateDebut});
        }
    }

    _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });
    _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });
  
    _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });
    _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });
  
    _handleDatePicked1 = (date) => {
        //alert(`A date has been picked: ${date.getTime()}`);
        this._updateDateDebut(date);
        this._hideDateTimePicker1();
    };

    _handleDatePicked2 = (date) => {
        //alert(`A date has been picked: ${date.getTime()}`);
        this._updateDateFin(date);
        this._hideDateTimePicker2();
    };

    _onSubmitEdit = () => {
        alert("VLAIDE");
    };

    _checkBoxClick = () => {
        if (this.state.box=="check-box-outline-blank")
        {
            this.setState({box: "check-box"});
        }
        else { this.setState({box: "check-box-outline-blank"});}
    }

    _ecrireDate = (date) =>{
        date = new Date(date);
        dateBienEcrite = semaine[date.getDay()] + " " + date.getDate()+ "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        return dateBienEcrite
    }

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
                        //selectedValue={this.state.ressources[0]}
                        selectedValue={this.state.ressources}
                        onValueChange={(value) => {
                          //this.state.ressources.splice(0,1,value);
                          this.setState({ressources: value});
                          console.log(this.state.ressources);
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