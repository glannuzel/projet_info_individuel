import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Alert, AppRegistry, Button, Image, TextInput, Picker, CheckBox } from 'react-native';
import { ActivityIndicator, ListView, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { StackNavigator} from 'react-navigation';

const styles = require('../style/Style');

export class AutoExpandingTextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            height: 0
        };
    }

    render() {
        return (
            <TextInput
              {...this.props}
              multiline={true}
              onContentSizeChange={(event) => {
                  if (this.state.height <= 120)
                  {this.setState({ height: event.nativeEvent.contentSize.height });}
              }}
              style={[styles.default, {height: Math.max(35, this.state.height)}]}
            />
        );
    }
}