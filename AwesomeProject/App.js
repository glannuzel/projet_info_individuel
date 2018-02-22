import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Header } from './components/Header';
import { HomeScreen } from './Screens/HomeScreen'
import { DetailsScreen } from './Screens/DetailsScreen'
import { DescTacheScreen } from './Screens/DescTacheScreen';

const styles = require('./style/Style');

/*
class SousTitre extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={styles.sousTitre}>
        <Text style={styles.sousTitreTexte}>{this.props.titre}</Text>
      </View>
    )
  }
}

class NomProjet extends Component{
  constructor(props){
    super(props);
  }
  _onPressText() {
    Alert.alert('Bienvenue dans le projet')
  }
  render(){
    return(
      <TouchableHighlight onPress={this._onPressText} underlayColor={'#F3F3F3'}>
        <View style={styles.backgroundProjet} >
          <Text style={styles.nomProjet}>{this.props.nom}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class Accueil extends Component {
  render() {
    return (
      <View>
        <Header />
        <SousTitre titre="Projets en cours"/>
        <NomProjet nom="Projet informatique de 2A"/>
        <NomProjet nom="Projet transpromo"/>
        <SousTitre titre="Projets achevés"/>
      </View>
    );
  }
}
*/

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DescTacheScreen,
  },
},
  {
    initialRouteName: 'Home',
  }
);


export default class App extends React.Component{
  render(){
    return <RootStack/>;
  }
}
