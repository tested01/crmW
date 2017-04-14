import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GLOBLE } from './Globle';

const CustomizedButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: GLOBLE.COLOR.YELLOW,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cc9004',
    marginLeft: 5,
    marginRight: 5
  }
};

export { CustomizedButton };
