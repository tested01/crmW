// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import { GLOBLE } from './Globle';

// Make a component
const Footer = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.footerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative'
  },
  textStyle: {
    fontSize: 15,
    color: '#B3B3B3'
  }
};

// Make the component available to other parts of the app
export { Footer };
