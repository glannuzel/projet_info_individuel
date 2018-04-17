import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
      //flex: 1,
      backgroundColor: '#46466E',
      padding: 10,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    enTete: {
      margin: 10, 
      marginTop: 20,
      fontSize: 20, 
      color: "#46466E"
    },
    positionGraphe: {
      flex: 2, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    elementIndicateur: {
      flexDirection: 'row', 
      alignItems: 'center', 
    },
    appName:{
      color: '#EF7E56',
      fontFamily: 'Raleway',
      fontWeight: 'bold',
      fontSize: 30,
      textShadowOffset: {width: 2, height: 2}
    },
    sousTitre:{
      backgroundColor: '#BDBDD7',
      elevation: 3,
      padding: 20
    },
    sousTitreTexte:{
      color: '#46466E',
      textAlign: 'center',
      fontSize: 18
    },
    sousTitreTexteBlanc:{
      color: 'white',
      textAlign: 'center',
      fontSize: 18
    },
    backgroundProjet:{
      padding : 10,
      paddingRight : 10,
      borderBottomColor: '#8787A3',
      borderBottomWidth: 1
    },
    backgroundProjetAdd:{
      padding : 10,
      backgroundColor: "#F5F5F5",
      borderBottomColor: '#8787A3',
      borderBottomWidth: 1
    },
    nomProjet:{
      color: '#46466E',
      margin: 10
    },
    suppProjet:{
      color: '#46466E'
    },
    flipcard:{
      height: '100%',
      padding: 10,
      borderRadius:5,
      borderColor: '#BDBDD7',
    },
    backflipcard:{
      borderRadius:5,
    },
  });

  module.exports = styles;