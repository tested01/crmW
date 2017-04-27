import React from 'react';
import { TextInput, View } from 'react-native';

const NoLabelUnderlineInput = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        keyboardType = {keyboardType}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    backgroundColor: 'white',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5
  },
  containerStyle: {
    borderBottomWidth: 2,
    borderColor: 'gray',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export {NoLabelUnderlineInput};
