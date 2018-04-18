import React, { Component } from 'react';
import { TextInput } from 'react-native';

const styles = require('../style/Style');

//Champ de saisie s'agranddissant lorsque le nombre de ligne du texte augmente
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