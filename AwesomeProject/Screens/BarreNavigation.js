import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {TabNavigator} from 'react-navigation';
import { Alert, AppRegistry, Button, Image, TextInput} from 'react-native';
import { StackNavigator} from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationComponent from 'react-native-material-bottom-navigation/lib/NavigationComponent';

import { DescTacheScreen } from './DescTacheScreen';
import { Taches } from './Taches';
import { Suivi } from './Suivi';
import { Kpi } from './Kpi';

/*
class TachesPage extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Tâches en cours',
        tabBarIcon: () => (<Icon size={24} color="#8787A3" name="list" />)
    }
    render(){}
}

class SuiviPage extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Suivi',
        tabBarIcon: () => (<Icon size={24} color="#8787A3" name="today" />)
    }
    render(){}
}

class KpiPage extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'KPI',
        tabBarIcon: () => (<Icon size={24} color="#8787A3" name="assessment" />)
    }
    render(){}
}
*/

export const BarreNavigation = TabNavigator({
    Taches: { 
        screen: Taches,
        navigationOptions: {
            tabBarLabel: 'Tâches en cours',
            tabBarIcon: () => (<Icon size={24} color="#8787A3" name="list" />)
        }
    },
    Suivi: {
        screen: Suivi,
        navigationOptions: {
            tabBarLabel: 'Suivi',
            tabBarIcon: () => (<Icon size={24} color="#8787A3" name="today" />)
        }
    },
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

export default class App extends React.Component{
    render(){
      return <BarreNavigation/>;
    }
  }

module.exports = BarreNavigation;



/*
export class BarreNavigation extends Component {
    render() { 
      return (
        <BottomNavigation
          labelColor="#BDBDD7"
          rippleColor="white"
          activeLabelColor="#46466E"
          style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
          //onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
        >
          <Tab
            barBackgroundColor="#BDBDD7"
            label="Tâches en cours"
            icon={<Icon size={24} color="#8787A3" name="list" />}
            activeIcon={<Icon size={24} color="#46466E" name="list" />}
            onTabPress={() => this.props.navigate('Taches')}
          />
          <Tab
            barBackgroundColor="#BDBDD7"
            label="Suivi"
            icon={<Icon size={24} color="#8787A3" name="today" />}
            activeIcon={<Icon size={24} color="#46466E" name="today" />}
            onTabPress={() => this.props.navigate('Suivi')}
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
  */