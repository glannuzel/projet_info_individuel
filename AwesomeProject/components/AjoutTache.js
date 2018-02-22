import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput, Picker, CheckBox } from 'react-native';
import { ActivityIndicator, ListView, TouchableOpacity } from 'react-native';
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
    dateFin: 'dd/mm/yyyy'
  };
 
  _updateText = (date) => this.setState({dateFin: `${date}`});

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    alert(`A date has been picked: ${date}`);
    this._updateText(date);
    this._hideDateTimePicker();
  };

  render(){
      return (
        <View style={{margin: 40}} >

            <Text style={styles.sousTitreTexte}>Titre de la tâche</Text>
            <TextInput style={{ height: 40, margin: 10 }} 
            underlineColorAndroid='#C3C3C3' 
            placeholder="Titre de la tâche" 
            selectionColor='#46466E'
            onChangeText={(text) => this.setState({text})} />

            <Text style={styles.sousTitreTexte}>Description</Text>
            <TextInput style={{ height: 40, margin: 10 }} 
            underlineColorAndroid='#C3C3C3' 
            placeholder="Description"
            selectionColor='#46466E'
            onChangeText={(text) => this.setState({text})} />

            <View style={{backgroundColor: '#BDBDD7', borderRadius: 3, padding: 8}}>
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

        </View>
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