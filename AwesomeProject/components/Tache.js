import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlipCard from 'react-native-flip-card';
import Slider from 'react-native-slider';
import * as firebase from 'firebase';

require('../ConnexionBD.js');

const styles = require('../style/Style');
const maCle=[];

export class Tache extends Component {
    constructor(props){
        super(props);
      }
    
    state={
        finie: false,
        box: "check-box-outline-blank",
        avancee: this.props.tauxAvancement*100,
    }
    
    _checkBoxClick = () => {
    if (this.state.box=="check-box-outline-blank")
    {
        this.setState({box: "check-box"});
    }
    else { this.setState({box: "check-box-outline-blank"});}
    }

    marquerCommeFinie(){
        if(this.state.finie)
        {
            this.setState({finie: false})
        }
        else{
            this.setState({finie: true})
        }
    }

    mettreAJour=async()=>{
        let user = firebase.auth().currentUser;
        projet = this.props.numeroProjet;
        id = this.props.numeroTache;
        //console.log(projet);
        //console.log(id);
        firebase.database().ref(user.uid).child(projet).child(id).child('avancement').set(this.state.avancee/100);
        this.marquerCommeFinie();
        this.props.rechargerBD();
    }


    avancementTache(value){
        this.setState({avancee: value})
    }
    
    render() {
      return (
        <TouchableHighlight underlayColor='#D7D7D7' onPress={()=>this.marquerCommeFinie()}>
            {!this.state.finie&&
            <View style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5,
                padding: 5,
                backgroundColor: '#EFEFEF',
                borderRadius: 3,
                borderWidth: 1,
                borderColor: '#BDBDD7'}}>
                    <Text style={styles.sousTitreTexte}>{this.props.nom}</Text>
                    <Text style={{color: '#8787A3'}}>{this.props.description}</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View style={{flex: 2}}></View>
                        <View style={{flex: 3, flexDirection: 'row', backgroundColor: '#46466E', borderRadius: 3}}>
                            <View style={{flex: 1}}>
                                <Icon size={20} color="white" name="event" />
                            </View>
                            <View style={{flex: 4}}>
                                <Text style={{color: 'white'}}>Fin : {this.props.dateFin}</Text>
                            </View>
                        </View>
                    </View>
            </View> ||
            <View>
                <View style={{
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    backgroundColor: '#EFEFEF',
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: '#BDBDD7'}}>
                <View style={{padding: 5}}>
                        <Text style={styles.sousTitreTexte}>{this.props.nom}</Text>
                        <Text style={{color: '#8787A3'}}>{this.props.description}</Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 2}}></View>
                            <View style={{flex: 3, flexDirection: 'row', backgroundColor: '#46466E', borderRadius: 3}}>
                                <View style={{flex: 1}}>
                                    <Icon size={20} color="white" name="event" />
                                </View>
                                <View style={{flex: 4}}>
                                    <Text style={{color: 'white'}}>Fin : {this.props.dateFin}</Text>
                                </View>
                            </View>
                        </View>
                        </View>
                
                <View style={{paddingBottom: 5, backgroundColor: '#8787A3', flexDirection: 'row'}}>
                    <View style={{
                            flex: 1,
                            marginLeft: 10,
                            marginRight: 10,
                            alignItems: 'stretch',
                            justifyContent: 'center',
                            }}>
                        <Slider
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.avancee}
                        thumbTintColor='white'
                        step={10}
                        onValueChange={(value) => this.avancementTache(value)} />
                        <Text style={{color: 'white', textAlign: 'center'}}>Avancée de la tâche : {this.state.avancee}%</Text>
                    </View>
                </View>
                <View style={{backgroundColor: '#46466E', padding: 5, flexDirection: 'row'}}>
                    <View style={{flex: 3, paddingTop: 5}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Marquer comme terminée :</Text>         
                    </View>    
                    <View style={{flex: 1, paddingTop: 5}}> 
                        <TouchableOpacity onPress={this._checkBoxClick}>
                            <Icon size={24} name={this.state.box} color="white"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <Button title="OK!" color="#EF7E56" onPress={()=>this.mettreAJour()}/>
                    </View>
                </View>
                </View>
            </View>
            }
        </TouchableHighlight>
      );
    }
}