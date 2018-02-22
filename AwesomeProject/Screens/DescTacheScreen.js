import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Header } from '../components/Header';
import { AjoutTache } from '../components/AjoutTache';

const styles = require('../style/Style');

export class DescTacheScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.titre}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle: { backgroundColor:'#46466E'},
        });
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <AjoutTache/>
            </View>
        );
    }
}