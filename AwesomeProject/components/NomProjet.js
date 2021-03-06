import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Modal} from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ParamProjet } from './ParamProjet';

const styles = require('../style/Style');

//Element de la liste de projet
export class NomProjet extends React.Component{

    constructor(props){
        super(props);
    }
  
    state={
        effacer: true, //apparition et disparition du bouton des paramètres
        modalVisible: false //visibilité du modal des paramètres
    }

    //Gestion de l'apparition du bouton des paramètres après pression longue
    _onLongPress(etat){
        this.setState({effacer: etat});
    }

    //Ouverture et fermeture du modal de gestion des paramètres
    _setModalVisible=(etat)=>{
        this.setState({modalVisible: etat});
        this.setState({effacer: !etat});
    }
  
    render(){
        return(
            <View>

            {!this.state.effacer&&
              <View>
                  <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                      <View style={{flexDirection: 'row', alignItems: 'center', margin: 0, backgroundColor: "#E0E0E0"}}>
                          <View style={{flex: 3}}>
                              <View style={{flexDirection: 'row'}}>
                                  <View style={{flex: 1, padding: 10}}>
                                      <Icon name='settings' size={30} color="#777777"/>
                                  </View>
                                  <View style={{flex: 3, justifyContent: 'center'}}>
                                      <Text style={{color: "#777777", fontSize: 20}}>{this.props.nom}</Text>
                                  </View>
                              </View>
                          </View>
                          <View style={{flex: 1, padding: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
                              <TouchableHighlight style={{borderRadius: 30, padding: 5}} underlayColor="#D7D7D7" onPress={()=>this._setModalVisible(false)}>
                                  <Icon name='close' color="#46466E" size={30}/>
                              </TouchableHighlight>
                          </View>
                      </View>
                      <ScrollView style={{marginTop: 10}}>
                          <ParamProjet
                              id={this.props.numero} 
                              nomProjet={this.props.nom}
                              ressources={this.props.ressource}
                              ouvert={()=>this._setModalVisible(false)}
                              />
                      </ScrollView>
                  </Modal>

                  <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this.props.navigation.navigate('Details', {titre: `${this.props.nom}`, id: `${this.props.numero}`})} onLongPress={()=>this._onLongPress(true)}>
                      <View style={styles.backgroundProjet} >
                          <View style={{flexDirection: 'row'}}>
                              <View style={{flex: 6, justifyContent: 'center', alignItems: 'flex-start'}}>
                                  <Text style={styles.nomProjet}>{this.props.nom}</Text>
                              </View>
                              <View style={{flex: 5, alignItems: 'flex-end', justifyContent: 'center'}}>
                                  <Button raised icon={{name: 'settings', color : 'white'}} title='Paramètres' backgroundColor='#46466E' borderRadius={3}
                                    onPress={()=>{this._setModalVisible(true)}}/>
                              </View>
                              <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                  <TouchableOpacity onPress={()=>this._onLongPress(true)}>
                                      <Icon name='cancel' size={25} color="#A9A9A9"/>
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                  </TouchableHighlight>
              </View> ||

              <TouchableHighlight underlayColor='#D7D7D7' onPress={() => this.props.navigation.navigate('Details', {titre: `${this.props.nom}`, id: `${this.props.numero}`})} onLongPress={()=>this._onLongPress()}>
                  <View style={styles.backgroundProjet} >
                      <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 6, justifyContent: 'center', alignItems: 'flex-start'}}>
                              <Text style={styles.nomProjet}>{this.props.nom}</Text>
                          </View>
                          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                              <Icon name="chevron-right" size={25} color="#A9A9A9"/>
                          </View>
                      </View>
                  </View>
              </TouchableHighlight>
            }

            </View>
        )
    }
}