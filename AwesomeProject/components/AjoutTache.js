import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput, Picker, CheckBox } from 'react-native';
import { ActivityIndicator, ListView, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { StackNavigator} from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
//import { CheckBox } from 'react-native-elements';

const styles = require('../style/Style');
require('../ConnexionBD.js');

export class AjoutTache extends React.Component{
  constructor(props){
    super(props);
  }

  state = {
    isDateTimePickerVisible1: false,
    isDateTimePickerVisible2: false,
    titre: "",
    description: "",
    dateDebut: new Date().getTime(),
    dateFin: new Date().getTime(),
    box: "check-box-outline-blank"
  };

  enregistrer=async()=>{
    //if(this.state.login){
        //let user = firebase.auth().currentUser;
        //id = user.uid;
        let user = firebase.auth().currentUser;
        id = this.props.id;
        let obj={
        titre: `${this.state.titre}`,
        description: `${this.state.description}`,
        dateDebut: this.state.dateDebut,
        dateFin: this.state.dateFin,
        avancement: 0,
        fin: false
        }
        firebase.database().ref(user.uid).child(id).push(obj);
        console.log("ajout");
        this.props.ouvert();
        this.props.rechargerBD();
   // }
  }

  _updateTitre = (text) => this.setState({titre: `${text}`});

  _updateDescription = (text) => this.setState({description: `${text}`});

  _updateDateFin = (date) => this.setState({dateFin: date.getTime()});

  _updateDateDebut = (date) => {
    this.setState({dateDebut: date.getTime()});
    if(this.state.dateDebut > this.state.dateFin){
      this.setState({dateFin : this.state.dateDebut});
    }}

  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });
  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });
 
  _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });
  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });
 
  _handleDatePicked1 = (date) => {
    alert(`A date has been picked: ${date.getTime()}`);
    this._updateDateDebut(date);
    this._hideDateTimePicker1();
  };

  _handleDatePicked2 = (date) => {
    alert(`A date has been picked: ${date.getTime()}`);
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

  render(){
      return (
        <ScrollView>
        <KeyboardAvoidingView style={{margin: 15}} behavior="padding" >

            <Text style={styles.sousTitreTexte}>Titre de la tâche</Text>
            <TextInput style={{ height: 40, margin: 10 }} 
            underlineColorAndroid='#C3C3C3' 
            placeholder="Titre de la tâche" 
            selectionColor='#46466E'
            onChangeText={(text) => this._updateTitre(text)} />

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

            <View style={{marginTop: 10, marginBottom: 10, backgroundColor: '#BDBDD7', borderRadius: 3, padding: 8 }}>
              <View>
                <Text style={styles.sousTitreTexte}>Date de début de tâche </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 5}}>
                  <Text style={{color: '#8787A3', textAlign: 'right', paddingRight: 15}}>{this.state.dateDebut}</Text>
                </View>
                <View style={{flex: 1}}>
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

            <View style={{backgroundColor: '#46466E', borderRadius: 3, padding: 8 }}>
              <View>
                <Text style={styles.sousTitreTexteBlanc}>Date de fin de tâche </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 5}}>
                  <Text style={{color: 'white', textAlign: 'right', paddingRight: 15}}>{this.state.dateFin}</Text>
                </View>
                <View style={{flex: 1}}>
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
            
            <View style={{marginTop: 15}}>
              <Button title="Enregistrer" onPress={()=>this.enregistrer()} color="#46466E"/>
            </View>

        </KeyboardAvoidingView>
        </ScrollView>
      );
  }
}

class AutoExpandingTextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        text: '',
        height: 0
    };
  }

  render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onContentSizeChange={(event) => {
          if (this.state.height <= 120)
            {this.setState({ height: event.nativeEvent.contentSize.height });}
        }}
        style={[styles.default, {height: Math.max(35, this.state.height)}]}
      />
    );
  }
}
/*
<Picker>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <CheckBox
              title='Click Here'
              checked={this.state.checked}
            />
            */

/*
<Picker>
              <Picker.Item label="blablabla"/>
              <Picker.Item label="nfieojf"/>
            </Picker>

            <CheckBox label="Click here"/>
            */

/*
<View style={{marginTop: 15}}>
  <Text style={styles.sousTitreTexte}>CheckList</Text>
  <TouchableOpacity onPress={this._checkBoxClick}>
    <Icon size={24} name={this.state.box} color="grey"/>
  </TouchableOpacity>
  <TouchableOpacity onPress={this._checkBoxClick}>
    <Icon size={24} name={this.state.box} color="grey"/>
  </TouchableOpacity>
</View>
*/