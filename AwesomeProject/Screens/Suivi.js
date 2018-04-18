import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Picker } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Jauge } from '../components/Jauge';
import * as firebase from 'firebase';


require('../ConnexionBD.js');
const styles = require('../style/Style');
const myKey=new Array(0);
const myUser=[];

//Page de représentation graphique
export class Suivi extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.titre}`,
        headerTintColor : 'white',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle: { backgroundColor:'#46466E' },
        });
    
    state={
          dataCharged: false, //chargement des données terminé
          affichagePicker: "tout", //valeur du picker
          isTachesEnRetardDisplayed: true, //affichage tâches en retard
          isTachesUrgentesDisplayed: true, //affichage tâches urgentes
          isTachesEnCoursDisplayed: true, //affichage tâches en cours
          isTachesAVenirDisplayed: false //affichage tâches à venir
    }

    //Fonction appelée lors de la destruction du composant
    componentWillUnmount() {
      let user = firebase.auth().currentUser;
      id = this.props.navigation.state.params.id;
      let maRef = firebase.database().ref(user.uid).child(id);
      maRef.orderByChild('dateFin').off();
    }
  
    //Fonction appelée avant le premier affichage du render()
    componentWillMount=async()=>{
      this.setState({dataCharged:false});
      myUser=[];
      myKey=[];

      try{
          let user = firebase.auth().currentUser;
          id = this.props.navigation.state.params.id;
          let maRef = firebase.database().ref(user.uid).child(id);

          //Récupération des id des tâches pas date de fin et écoute sur les ajouts
          maRef.orderByChild('dateFin').on('child_added',
          (data)=>{
              myKey.push(data.key)
          });
          
          //Récupération des valeurs des tâches et écoute sur les modifs
          maRef.orderByChild('dateFin').on('value',
          (data)=>{
              myUser=data.val()
              this.setState({dataCharged:true});
            }
          ); 

          //Ecoute sur les suppression des tâches
          maRef.orderByChild('dateFin').on('child_removed',
          (data)=>{
              let index = myKey.indexOf(data.key);
              myKey.splice(index,1);
          });

          }
          catch(error){
            console.log(error.ToString())
          }
      }

    //Liste des éléments en retard
    jaugeTacheRetard(){
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 2; iter < myKey.length; iter++){
              if(myUser[myKey[iter]].ressource == "(moi)"){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateFinTache / (1000*3600*24)) < ajd && !myUser[myKey[iter]].fin){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
          }
          else{
            for (let iter = 2; iter < myKey.length; iter++){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateFinTache / (1000*3600*24)) < ajd && !myUser[myKey[iter]].fin){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
      }
      if(liste.length == 0){ 
        liste.push(<Text style={{marginLeft: 20, color: "#AAAAAA"}}>Aucune tâche actuellement en retard</Text>)
      }
      return liste;
    }

    //Liste des éléments urgents
    jaugeTacheUrgente(){
      const liste = [];
        if (this.state.dataCharged){

          if(this.state.affichagePicker === "mesTaches"){

            for (let iter = 2; iter < myKey.length; iter++){
              dateFinTache = new Date(myUser[myKey[iter]].dateFin);
              dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
              let ajd = Math.ceil(Date.now() / (1000*3600*24));
              let fin = Math.ceil(dateFinTache / (1000*3600*24));
              let debut = Math.ceil(dateDebutTache / (1000*3600*24));

              if(myUser[myKey[iter]].ressource == "(moi)"){
                if (!myUser[myKey[iter]].fin && (debut <= ajd) && (fin >= ajd)&& (fin <= ajd+3)){                
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
          }
          else{
            for (let iter = 2; iter < myKey.length; iter++){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                let fin = Math.ceil(dateFinTache / (1000*3600*24));
                let debut = Math.ceil(dateDebutTache / (1000*3600*24));
                if (!myUser[myKey[iter]].fin && (debut <= ajd) && (fin >= ajd)&& (fin <= ajd+3)){
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
        }
        if(liste.length == 0){ 
          liste.push(<Text style={{marginLeft: 20, color: "#AAAAAA"}}>Aucune tâche urgente pour le moment</Text>)
        }
      return liste;
    }

    //Liste des éléments en cours
    jaugeTacheEnCours(){
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 2; iter < myKey.length; iter++){
              dateFinTache = new Date(myUser[myKey[iter]].dateFin);
              dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
              let ajd = Math.ceil(Date.now() / (1000*3600*24));
              let fin = Math.ceil(dateFinTache / (1000*3600*24));
              let debut = Math.ceil(dateDebutTache / (1000*3600*24));

              if(myUser[myKey[iter]].ressource == "(moi)"){
                if (!myUser[myKey[iter]].fin && fin > ajd+3 && debut <= ajd){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
          }
          else{
            for (let iter = 2; iter < myKey.length; iter++){
                dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                let fin = Math.ceil(dateFinTache / (1000*3600*24));
                let debut = Math.ceil(dateDebutTache / (1000*3600*24));

                if (!myUser[myKey[iter]].fin && fin > ajd+3 && debut <= ajd){
                  dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
        }
        if(liste.length == 0){ 
          liste.push(<Text style={{marginLeft: 20, color: "#AAAAAA"}}>Aucune autre tâche en cours pour le moment</Text>)
        }
      return liste;
    }

    //Liste des éléments à venir
    jaugeTacheAVenir(){
      const liste = [];
        if (this.state.dataCharged){
          if(this.state.affichagePicker === "mesTaches"){
            for (let iter = 2; iter < myKey.length; iter++){
              if(myUser[myKey[iter]].ressource == "(moi)"){
                dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateDebutTache / (1000*3600*24)) > ajd && !myUser[myKey[iter]].fin){
                  dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
          }
          else{
            for (let iter = 2; iter < myKey.length; iter++){
                dateDebutTache = new Date(myUser[myKey[iter]].dateDebut);
                let ajd = Math.ceil(Date.now() / (1000*3600*24));
                if (Math.ceil(dateDebutTache / (1000*3600*24)) > ajd && !myUser[myKey[iter]].fin){
                  dateFinTache = new Date(myUser[myKey[iter]].dateFin);
                  liste.push(
                    <Jauge tauxChargement={myUser[myKey[iter]].avancement} dateDebut={dateDebutTache} dateFin={dateFinTache} description={myUser[myKey[iter]].description} ressource={myUser[myKey[iter]].ressource} nomTache={myUser[myKey[iter]].titre}/>
                  );
                }
              }
            }
        }
        if(liste.length == 0){ 
          liste.push(<Text style={{marginLeft: 20, color: "#AAAAAA"}}>Aucune tâche à venir pour le moment</Text>)
        }
      return liste;
    }



    render(){
        
        return (
            <ScrollView>

              <View style={{backgroundColor: '#DDDDDD', borderRadius: 3, marginTop: 10, marginRight: 10, marginLeft: 10}}>
                <Picker enabled={this.state.dataCharged}
                      selectedValue={this.state.affichagePicker}
                      onValueChange={(value) => {
                        this.setState({affichagePicker: value});
                        if(value === "mesTaches"){
                          this.setState({isTachesEnRetardDisplayed: true});
                          this.setState({isTachesUrgentesDisplayed: true});
                          this.setState({isTachesEnCoursDisplayed: true});
                          this.setState({isTachesAVenirDisplayed: false});
                          }
                        else{
                          if(value === "tout"){
                            this.setState({isTachesEnRetardDisplayed: true});
                            this.setState({isTachesUrgentesDisplayed: true});
                            this.setState({isTachesEnCoursDisplayed: true});
                            this.setState({isTachesAVenirDisplayed: false});
                          }
                          if(value == "retard"){
                            this.setState({isTachesEnRetardDisplayed: true});
                            this.setState({isTachesUrgentesDisplayed: false});
                            this.setState({isTachesEnCoursDisplayed: false});
                            this.setState({isTachesAVenirDisplayed: false});
                          }
                          if(value == "urgentes"){
                            this.setState({isTachesEnRetardDisplayed: false});
                            this.setState({isTachesUrgentesDisplayed: true});
                            this.setState({isTachesEnCoursDisplayed: false});
                            this.setState({isTachesAVenirDisplayed: false});
                          }
                          if(value == "aVenir"){
                            this.setState({isTachesEnRetardDisplayed: false});
                            this.setState({isTachesUrgentesDisplayed: false});
                            this.setState({isTachesEnCoursDisplayed: false});
                            this.setState({isTachesAVenirDisplayed: true});
                          }
                        }}}>
                  <Picker.Item label="Toutes les tâches en cours" value="tout" key={1} />
                  <Picker.Item label="Tâches en retard" value="retard" key={2} />
                  <Picker.Item label="Tâches urgentes" value="urgentes" key={3} />
                  <Picker.Item label="Tâches à venir" value="aVenir" key={4} />
                  <Picker.Item label="Mes tâches uniquement" value="mesTaches" key={5} />
                </Picker>
              </View>

              {this.state.dataCharged&&
              this.state.isTachesEnRetardDisplayed&&this.state.isTachesUrgentesDisplayed&&this.state.isTachesEnCoursDisplayed&&!this.state.isTachesAVenirDisplayed&&
              <View style={{marginBottom: 5}}>
                <View style={{marginBottom: 5}}>
                  <Text style={styles.enTete}>Tâches en retard</Text>
                    {this.jaugeTacheRetard()}
                </View>
                <View style={{marginBottom: 5}}>
                  <Text style={styles.enTete}>Tâches urgentes</Text>
                    {this.jaugeTacheUrgente()}
                </View>
                <View style={{marginBottom: 5}}>
                  <Text style={styles.enTete}>Autres tâches en cours</Text>
                    {this.jaugeTacheEnCours()}
                </View>
              </View> ||

              this.state.dataCharged&&
              this.state.isTachesEnRetardDisplayed&&!this.state.isTachesUrgentesDisplayed&&!this.state.isTachesEnCoursDisplayed&&!this.state.isTachesAVenirDisplayed&&
              <View style={{marginBottom: 5}}>
                <View style={{marginBottom: 5}}>
                  <Text style={styles.enTete}>Tâches en retard</Text>
                    {this.jaugeTacheRetard()}
                </View>
              </View> ||

              this.state.dataCharged&&
              !this.state.isTachesEnRetardDisplayed&&this.state.isTachesUrgentesDisplayed&&!this.state.isTachesEnCoursDisplayed&&!this.state.isTachesAVenirDisplayed&&
              <View style={{marginBottom: 5}}>
                <View style={{marginBottom: 5}}>
                  <Text style={styles.enTete}>Tâches urgentes</Text>
                    {this.jaugeTacheUrgente()}
                </View>
              </View> ||

              this.state.dataCharged&&
              !this.state.isTachesEnRetardDisplayed&&!this.state.isTachesUrgentesDisplayed&&!this.state.isTachesEnCoursDisplayed&&this.state.isTachesAVenirDisplayed&&
              <View style={{marginBottom: 5}}>
                <View style={{marginBottom: 5}}>
                  <Text style={styles.enTete}>Tâches à venir</Text>
                    {this.jaugeTacheAVenir()}
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