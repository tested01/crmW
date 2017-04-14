import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GLOBLE } from './Globle';

class CustomerFooter extends Component {

  render() {
    const styles = {
      viewStyle: {
        backgroundColor: GLOBLE.COLOR.BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
      },
      textStyle: {
        fontSize: 15,
        color: 'white'
      }
    };
    const { textStyle, viewStyle } = styles;
    return (
      <View style={viewStyle}>
        <Text onPress={this.props.onPress} style={textStyle}>
          {this.props.footerText}
        </Text>
      </View>
    );
  }
}

export default CustomerFooter;
