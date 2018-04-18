import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Modal} from 'react-native';
import { Button } from 'react-native-elements';
import { ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tache } from '../components/Tache';
import * as firebase from 'firebase';
import { AjoutTache } from '../components/AjoutTache';

require('../ConnexionBD.js');
const styles = require('../style/Style');
const myKey=new Array(0);
const myUser=[];
const myRessources=[];
const myRessourcesKey=[];
//Tableau des abbréviation des jours de la semaine
const semaine = new Array("Dim.", "Lun.","Mar.", "Mer.","Jeu.", "Ven.", "Sam.");

//Ecran d'affichage de l'ensemble des tâches
export class Taches extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.titre}`,
        id: `${navigation.state.params.id}`,
        headerTintColor : 'white',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle: { backgroundColor:'#46466E' },
        });

    state={
        dataCharged: false, //chargement des données terminé
        modalVisible: false, //Modal d'ajout de tâche visible
        rechercheTache: false, //recherche en cours
        nomRecherche: "", //valeur dans la barre de recherche
    }

    //Ouverture et fermeture du modal d'ajout de tâche
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    //Fonction appelée à la destruction du composant
    componentWillUnmount() {
        let user = firebase.auth().currentUser;
        id = this.props.navigation.state.params.id;
        //Destruction de toutes les écoutes
        firebase.database().ref(user.uid).child(id).orderByChild('fin').equalTo(false).off();
    }

    //Fonction appelée avant le premier render()
    componentWillMount=async()=>{

        this.setState({dataCharged: false});

            try{
                let user = firebase.auth().currentUser; //ref de l'utilisateur
                id = this.props.navigation.state.params.id; //id de l'utilisateur

                myUser=[];
                myKey=[];
                myRessources=[];
                myRessourcesKey=[];

                //Récupération des tâches non achevées et écoute sur les ajouts, suppressions et modifications
                firebase.database().ref(user.uid).child(id).orderByChild('fin').equalTo(false).on('child_added',
                (data)=>{
                    myKey.push(data.key);
                    this.setState({dataCharged:true});
                    });
                
                firebase.database().ref(user.uid).child(id).orderByChild('fin').equalTo(false).on('child_removed',
                (data)=>{
                    this.setState({nomRecherche: ""});
                    let index = myKey.indexOf(data.key);
                    myKey.splice(index,1);
                    this.setState({dataCharged: true});
                });
                    
                firebase.database().ref(user.uid).child(id).orderByChild('fin').equalTo(false).on('value',
                (data)=>{
                    myUser=data.val();
                    this.setState({dataCharged:true});
                    }
                );

                //Récupération des ressources associées à un projet et écoutes
                firebase.database().ref(user.uid).child(id).child('ressources').on('child_added',
                (data)=>{
                    myRessourcesKey.push(data.key);
                    });
                    
                firebase.database().ref(user.uid).child(id).child('ressources').on('value',
                (data)=>{
                    myRessources=data.val();
                    }
                ); 

                this.setState({dataCharged:true});
                }

            catch(error){
                console.log(error.ToString())
            }
        this.setState({dataCharged: true});
    }

    //Fonction listant les tâches en cours du projet
    listeTaches(){
        const liste = [];
        if (this.state.dataCharged){
            if(this.state.nomRecherche == ""){
                for (let iter = 0; iter < myKey.length; iter++){
                    dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                    dateFinBienEcrite = semaine[dateFinTache.getDay()] + " " + dateFinTache.getDate()+ "/" + (dateFinTache.getMonth()+1) + "/" + dateFinTache.getFullYear();
                    liste.push(
                    <Tache numeroProjet={this.props.navigation.state.params.id} 
                        numeroTache={myKey[iter]} nom={myUser[myKey[iter]].titre} 
                        ressources={myRessources}
                        laRessource={myUser[myKey[iter]].ressource}
                        description={myUser[myKey[iter]].description} 
                        dateFin={dateFinTache}
                        dateDebut={myUser[myKey[iter]].dateDebut}
                        tauxAvancement={myUser[myKey[iter]].avancement} />
                    );
                }
            }
            else{
                for (let iter = 0; iter < myKey.length; iter++){
                    if(myUser[myKey[iter]].titre.indexOf(this.state.nomRecherche) != -1){
                        liste.push(
                            <Tache numeroProjet={this.props.navigation.state.params.id} 
                                numeroTache={myKey[iter]} nom={myUser[myKey[iter]].titre} 
                                ressources={myRessources}
                                laRessource={myUser[myKey[iter]].ressource}
                                description={myUser[myKey[iter]].description} 
                                dateFin={dateFinTache}
                                dateDebut={myUser[myKey[iter]].dateDebut}
                                tauxAvancement={myUser[myKey[iter]].avancement} />
                        );
                    }
                }
            }
        }
      return liste;
    }


    render() {
    const { navigate } = this.props.navigation;
      return (
        <ScrollView>
            {this.state.dataCharged&&
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                    <View style={{flexDirection: 'row', alignItems: 'center', margin: 0, backgroundColor: "#E0E0E0"}}>
                        <View style={{flex: 3}}>
                            <Text style={{color: "#777777", fontSize: 20, marginLeft: 15}}>Ajouter une tâche</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TouchableHighlight underlayColor="#D7D7D7" onPress={()=>this.setModalVisible(false)}>
                                <Icon name='close' color="#46466E" size={30}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <ScrollView style={{marginTop: 10}}>
                        <AjoutTache 
                            id={this.props.navigation.state.params.id} 
                            ressources={myRessources}
                            ouvert={()=>this.setModalVisible(false)} />
                    </ScrollView>
                </Modal>
                <View style={{marginTop: 12}}>
                    <Button raised title='AJOUTER UNE TACHE' iconRight={{name: 'add-circle'}} backgroundColor="#EF7E56" onPress={()=>this.setModalVisible(true)}/>
                </View>

                <View style={{flexDirection: 'row', backgroundColor: '#DDDDDD', borderRadius: 3, marginTop: 10, marginRight : 10, marginLeft: 10}}>
                    <View style={{flex: 5, justifyContent: 'center', color: '#AAAAAA'}}>
                            <TextInput style={styles.nomProjet} placeholder="Rechercher une tâche" placeholderTextColor="#AAAAAA"
                                            selectionColor='#46466E'
                                            onChangeText={(text) => this.setState({nomRecherche: text})}
                                            ref={input => { this.textInput = input}}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableHighlight style={{borderRadius: 20, padding: 5}} underlayColor='#D7D7D7' 
                            onPress={() => {this.setState({rechercheTache: true});}}>
                            <Icon name='search' size={20} color="#46466E"/>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={{marginTop: 10}}>
                    <Text style={{color: "#8787A3", fontSize: 16, textAlign: 'right'}}>Nombre d'éléments : {myKey.length}</Text>
                </View>
                <View style={{width: '100%', marginTop: 10}}>
                    {this.listeTaches()}
                </View>
            </View> ||

            <View style={{marginTop:'30%',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#DD105E"/>
            <Text>Chargement en cours...</Text>
          </View>
          }
        </ScrollView>
      );
    }
}