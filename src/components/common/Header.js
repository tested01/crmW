// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from './Globle';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle, textStyleRefine } = styles;
  /*
  <Icon.Button
    name="angle-left"
    size={30}
    color='white'
    backgroundColor='transparent'
    style={{ marginLeft: 20, marginTop: 15}}
    onPress={this.backToLearning}
    />
  */
  if(props.rightButton){
    return (
      <View style={viewStyle}>
        <Text></Text>
        <Text style={textStyleRefine}>{props.headerText}</Text>
        <Icon.Button
         name={props.buttonType}
         size={20}
         color='white'
         backgroundColor='transparent'
         onPress={props.delegatedFunction()}
         >
        </Icon.Button>
      </View>
    );
  }else{
    return (
      <View style={viewStyle}>
        <Text></Text>
        <Text style={textStyle}>{props.headerText}</Text>
        <Text></Text>
      </View>
    );
  }

};

const styles = {
  viewStyle: {
    backgroundColor: GLOBLE.COLOR.BLUE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    color: 'white',
    fontSize: 20
  },
  textStyleRefine: {
    color: 'white',
    fontSize: 20,
    marginLeft: 40
  }
};

// Make the component available to other parts of the app
export { Header };
