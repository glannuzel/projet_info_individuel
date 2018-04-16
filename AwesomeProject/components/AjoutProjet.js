import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';

const styles = require('../style/Style');

//Champ d'ajout d'un projet
export class AjoutProjet extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.backgroundProjetAdd} >
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 4}}>
                        <TextInput style={styles.nomProjet} placeholder="Ajouter un projet..." selectionColor='#46466E'/>
                    </View>
                    <View style={{flex: 1, margin: 10}}>
                        <Button title="Ajouter" onPress={()=>alert('kikou')} color="#DD105E" />
                    </View>
                </View>
            </View>
        )
    }
}