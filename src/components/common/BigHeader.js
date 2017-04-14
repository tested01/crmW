// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import { GLOBLE } from './Globle';

// Make a component
const BigHeader = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: GLOBLE.COLOR.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    height: 260,
    paddingTop: 15,
    position: 'relative'
  },
  textStyle: {
    fontSize: 36,
    color: 'white'
  }
};

// Make the component available to other parts of the app
export { BigHeader };
