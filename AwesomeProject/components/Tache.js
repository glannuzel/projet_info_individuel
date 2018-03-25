import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = require('../style/Style');

export class Tache extends Component {
    constructor(props){
        super(props);
      }
    render() {
      return (
        <View style={{
            margin: 10, 
            padding: 5,
            backgroundColor: '#EFEFEF',
            borderRadius: 3,
            borderWidth: 1,
            borderColor: '#BDBDD7'}}>
                <Text style={styles.sousTitreTexte}>{this.props.nom}</Text>
                <Text style={{color: '#8787A3'}}>{this.props.description}</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#46466E', borderRadius: 3}}>
                        <View style={{flex: 1}}>
                            <Icon size={20} color="white" name="event" />
                        </View>
                        <View style={{flex: 4}}>
                            <Text style={{color: 'white'}}>Fin : {this.props.dateFin}</Text>
                        </View>
                    </View>
                </View>
        </View>
      );
    }
}