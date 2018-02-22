import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput, Picker, CheckBox } from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
//import { CheckBox } from 'react-native-elements';

const styles = require('../style/Style');

export class AjoutTache extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
      return (
        <View style={{margin: 40}} >
            <Text style={styles.sousTitreTexte}>Titre de la tâche</Text>
            <TextInput style={{ height: 40, margin: 10 }} 
            underlineColorAndroid='#C3C3C3' 
            placeholder="Titre de la tâche" 
            onChangeText={(text) => this.setState({text})} />
            <Text style={styles.sousTitreTexte}>Description</Text>
            <TextInput style={{ height: 40, margin: 10 }} 
            underlineColorAndroid='#C3C3C3' 
            placeholder="Description"
            onChangeText={(text) => this.setState({text})} />
            <Text style={styles.sousTitreTexte}>Titre de la tâche</Text>
            <TextInput style={{ height: 40, margin: 10 }} 
            underlineColorAndroid='#C3C3C3' 
            placeholder="Titre de la tâche" 
            onChangeText={(text) => this.setState({text})} />
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