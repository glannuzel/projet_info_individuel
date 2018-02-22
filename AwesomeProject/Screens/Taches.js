import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';


//const BarreNavigation = require('../components/BarreNavigation');

export class Taches extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.titre}`,
        headerTintColor : 'white',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle: { backgroundColor:'#46466E' },
        });
    render() {
        const { navigate } = this.props.navigation;
      return (
        <View style={{
            flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{marginTop: 12}}>
                <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this.props.navigation.navigate('AjoutTache', {titre: `Ajouter une tâche`})} >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 2, textAlign: 'right', textAlignVertical: 'center', padding: 10, color: '#46466E'}}>Ajouter une tâche ... </Text>
                        <View style={{flex: 1, paddingTop: 10}}><Icon size={20} color="#EF7E56" name="add-circle"/></View>
                    </View>
                </TouchableHighlight>
            </View>
            
        </View>
      );
    }
}

/*
<View style={{height:50}}>
    <BarreNavigation/>
</View>
*/