import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {TabNavigator} from 'react-navigation';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class BarreNavigation extends Component {
    render() {
      return (
        <BottomNavigation
          labelColor="#BDBDD7"
          rippleColor="white"
          activeLabelColor="#46466E"
          style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
          onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
        >
          <Tab
            barBackgroundColor="#BDBDD7"
            label="Tâches en cours"
            icon={<Icon size={24} color="#8787A3" name="list" />}
            activeIcon={<Icon size={24} color="#46466E" name="list" />}
          />
          <Tab
            barBackgroundColor="#BDBDD7"
            label="Suivi"
            icon={<Icon size={24} color="#8787A3" name="today" />}
            activeIcon={<Icon size={24} color="#46466E" name="today" />}
          />
          <Tab
            barBackgroundColor="#BDBDD7"
            label="KPI"
            icon={<Icon size={24} color="#8787A3" name="assessment" />}
            activeIcon={<Icon size={24} color="#46466E" name="assessment" />}
          />
        </BottomNavigation>
      )
    }
  }