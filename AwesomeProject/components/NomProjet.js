import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Alert, AppRegistry, Image, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = require('../style/Style');

export class NomProjet extends React.Component{
  constructor(props){
    super(props);
  }
  //_onPressText() {
    //this.props.navigation.navigate('Details', {titre: 'WHATEVER'})
    //this.props.navigation.navigate('Details');
  //}
  state={
    effacer: true
  }

  _onLongPress(etat){
    this.setState({effacer: etat})
  }
  
  render(){
    return(
      <View>
        {!this.state.effacer&&
        <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this.props.navigation.navigate('Details', {titre: `${this.props.nom}`, id: `${this.props.numero}`})} onLongPress={()=>this._onLongPress(true)}>
          <View style={styles.backgroundProjet} >
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 6}}>
                <Text style={styles.nomProjet}>{this.props.nom}</Text>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={()=>alert("supprimer")}>
                  <Icon name="delete" size={25} color="#DD105E"/>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={()=>this._onLongPress(true)}>
                  <Icon name='cancel' size={25} color="#A9A9A9"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableHighlight>||
        <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this.props.navigation.navigate('Details', {titre: `${this.props.nom}`, id: `${this.props.numero}`})} onLongPress={()=>this._onLongPress()}>
        <View style={styles.backgroundProjet} >
          <Text style={styles.nomProjet}>{this.props.nom}</Text>
        </View>
      </TouchableHighlight>
        }
      </View>
    )
  }
}