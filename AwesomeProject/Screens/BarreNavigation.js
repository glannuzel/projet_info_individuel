import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator} from 'react-navigation';
//import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationComponent from 'react-native-material-bottom-navigation/lib/NavigationComponent';

import { Taches } from './Taches';
import { Suivi } from './Suivi';
import { Kpi } from './Kpi';

//Barre de navigation entre les écrans pour un projet
export const BarreNavigation = TabNavigator({
    //Page 1 : Liste des tâches
    Taches: { 
        screen: Taches,
        navigationOptions: {
            tabBarLabel: 'Tâches en cours',
            tabBarIcon: () => (<Icon size={24} color="#8787A3" name="list" />)
        }
    },
    //Page 2 : écran de suivi
    Suivi: {
        screen: Suivi,
        navigationOptions: {
            tabBarLabel: 'Suivi',
            tabBarIcon: () => (<Icon size={24} color="#8787A3" name="today" />)
        }
    },
    //Page 3 : indicateurs
    Kpi: { 
        screen: Kpi,
        navigationOptions: {
            tabBarLabel: 'KPI',
            tabBarIcon: () => (<Icon size={24} color="#8787A3" name="assessment" />)
        }
    }
 }, {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        bottomNavigationOptions: {
            labelColor: 'white',
            rippleColor: '#8787A3',
            tabs: {
                Taches: {
                    barBackgroundColor: "white",
                    activeIcon: <Icon size={24} color="#46466E" name="list" />,
                    activeLabelColor: "#46466E"
                },
                Suivi: {
                    barBackgroundColor: "white",
                    activeIcon: <Icon size={24} color="#46466E" name="today" />,
                    activeLabelColor: "#46466E"
                },
                Kpi: {
                    barBackgroundColor: "white",
                    activeIcon: <Icon size={24} color="#46466E" name="assessment" />,
                    activeLabelColor: "#46466E"
                }
            }
        }
    }
})

//Composant de navigation exporté
export default class App extends React.Component{
    render(){
      return <BarreNavigation/>;
    }
  }

module.exports = BarreNavigation;