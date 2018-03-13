import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput, Picker, CheckBox } from 'react-native';
import { ActivityIndicator, ListView, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { StackNavigator} from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { CheckBox } from 'react-native-elements';

const styles = require('../style/Style');

export class AjoutTache extends React.Component{
  constructor(props){
    super(props);
  }
  state = {
    isDateTimePickerVisible: false,
    dateFin: 'dd/mm/yyyy',
    box: "check-box-outline-blank"
  };
 
  _updateText = (date) => this.setState({dateFin: `${date}`});

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    alert(`A date has been picked: ${date}`);
    this._updateText(date);
    this._hideDateTimePicker();
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
        <KeyboardAvoidingView style={{margin: 40}} behavior="padding" >

            <Text style={styles.sousTitreTexte}>Titre de la tâche</Text>
            <TextInput style={{ height: 40, margin: 10 }} 
            underlineColorAndroid='#C3C3C3' 
            placeholder="Titre de la tâche" 
            selectionColor='#46466E'
            onChangeText={(text) => this.setState({text})} />

            <Text style={styles.sousTitreTexte}>Description</Text>
            <View style={{ borderColor: '#C3C3C3', backgroundColor: 'white', borderWidth: 1, borderRadius: 5, marginTop: 5, marginBottom: 10, padding: 5}}>
              <AutoExpandingTextInput style={{ height: 40, margin: 10, padding: 5 }} 
              underlineColorAndroid='transparent'
              placeholder="Description ..."
              selectionColor='#46466E'
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

            <View style={{backgroundColor: '#BDBDD7', borderRadius: 3, padding: 8 }}>
              <View>
                <Text style={styles.sousTitreTexte}>Date de fin de tâche </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 5}}>
                  <Text style={{color: '#8787A3', textAlign: 'right', paddingRight: 15}}>{this.state.dateFin}</Text>
                </View>
                <View style={{flex: 1}}>
                <TouchableOpacity underlayColor='#D7D7D7' onPress={this._showDateTimePicker}>
                    <Icon size={30} color="#46466E" name="event" />
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
                </View>
              </View>
            </View>
            
            <View style={{marginTop: 15}}>
              <Text style={styles.sousTitreTexte}>CheckList</Text>
              <TouchableOpacity onPress={this._checkBoxClick}>
                <Icon size={24} name={this.state.box} color="grey"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._checkBoxClick}>
                <Icon size={24} name={this.state.box} color="grey"/>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 15}}>
              <Button title="Enregistrer" onPress={()=>alert("hola ca va")} color="#46466E"/>
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
        onChangeText={(text) => {
            this.setState({ text })
        }}
        onContentSizeChange={(event) => {
          if (this.state.height <= 120)
            {this.setState({ height: event.nativeEvent.contentSize.height });}
        }}
        style={[styles.default, {height: Math.max(35, this.state.height)}]}
        value={this.state.text}
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