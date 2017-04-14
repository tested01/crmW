// Import libraries for making a component
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from './Globle';

// Make a component
class CrmHeader extends Component {

  constructor(props){
    super(props);
  }

 //{props.headerText}
  iconParser(prop){
    const { textStyle } = styles;
    switch(prop){
      case 'left_arrow':
        return (<Icon name="angle-left" size={30} color='gray' />);
      case 'right_arrow':
        return (<Icon name="angle-right" size={30} color='gray' />);
      default:
        return (<Text style={textStyle}>{prop}</Text>);
    }
  }
  render(){
  const { viewStyle } = styles;
  return (
    <View style={viewStyle}>
      { this.iconParser(this.props.left) }
      { this.iconParser(this.props.center) }
      { this.iconParser(this.props.right) }
    </View>
  );
 }
}

const styles = {
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
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
    color: 'gray',
    fontSize: 20
  }
};
 //GLOBLE.COLOR.BLUE
// Make the component available to other parts of the app
export { CrmHeader };
