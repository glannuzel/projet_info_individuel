import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Modal, Alert, AlertIOS, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Header } from './components/Header';
import { HomeScreen } from './Screens/HomeScreen';
import BarreNavigation from './Screens/BarreNavigation';
import { DescTacheScreen } from './Screens/DescTacheScreen';
import * as firebase from 'firebase';
import prompt from 'react-native-prompt-android';
//import DateTimePickerTester from './components/DateTimePicker';
/*
import { DetailsScreen } from './Screens/DetailsScreen';
import { DescTacheScreen } from './Screens/DescTacheScreen';
import { Taches } from './Screens/Taches';
import { Suivi } from './Screens/Suivi';
import { Kpi } from './Screens/Kpi';
*/
const styles = require('./style/Style');

const config = {
  apiKey: "AIzaSyCyV5ad0RQwuHupG51yuCDy5UCd-6hjMKU",
  authDomain: "projet-info-d9729.firebaseapp.com",
  databaseURL: "https://projet-info-d9729.firebaseio.com",
  projectId: "projet-info-d9729",
  storageBucket: "projet-info-d9729.appspot.com",
  messagingSenderId: "614815343308"
};
const firebaseApp = firebase.initializeApp(config);


const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: BarreNavigation,
  },
  AjoutTache: {
    screen: DescTacheScreen,
  }
}, {
    initialRouteName: 'Home',
  }
);

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={{
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  }}>
          <Text style={{color: '#333', fontSize: 16 }}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class ActionButton extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onPress}>
          <Text>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default class App extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
      
    };
    this.itemsRef = this.getRef().child('items');
  }

  state = {
    modalVisible: false,
    reply: '',
  }
  
  setModalVisible(visible){
    this.setState({modalVisible: visible});
  }

  _addItem(){
      this.itemsRef.push({ title: reply });
      console.log('Add Pressed');
      this.setModalVisible(false);
      this.props.onSubmitReply(this.state.reply);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }


  render(){
    return (
      <View>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={false}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TextInput value={this.state.reply} 
              placeholder="Reply to the comment"
              onChangeText={(reply) => this.setState({ reply })}/>

              <ActionButton onPress={this._addItem.bind(this)} title="Add" />
              
            </View>
          </View>
        </Modal>
          <Text>coucou</Text>
        <ActionButton onPress={this.setModalVisible(true)} title="Add" />

      </View>

    )
    //return <RootStack/>;
  }

  /*
  _addItem() {
    prompt(
      'Add New Item',
      'rfopkforpko',
      [
        {
          text: 'Cancel', 
          onPress: () => console.log('Cancel Pressed'), 
          style: 'cancel',
        },
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text });
            console.log('Add Pressed');
          }
        },
      ],
      {
        type: 'plain-text',
        cancelable: false,
        placeholder: 'placeholder',
        style: 'shimo'
      }
    );
  }
*/
  _renderItem(item) {

    const onPress = () => {
      Alert.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}
