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
        return (<Icon.Button
           name="angle-left"
           size={30}
           backgroundColor='transparent'
           color={this.props.wordColor}
           onPress={this.props.leftPress}
           />);
      case 'right_arrow':
        return (<Icon.Button
           name="angle-right"
           size={30}
           backgroundColor='transparent'
           color={this.props.wordColor}
           onPress={this.props.rightPress}
            />);
      default:
      return (<Icon
         name="angle-right"
         size={30}
         color={GLOBLE.COLOR.BLUE}

          />);
    }
  }

  render(){
  const { viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
      { this.iconParser(this.props.left) }
      </View>
      <View >
       <Text style={styles.textStyle}>{this.props.center}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
      { this.iconParser(this.props.right) }
      </View>
    </View>
  );
 }
}

const styles = {
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GLOBLE.COLOR.BLUE,
    alignItems: 'center',
    height: 50,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    color: 'white',
    marginLeft: 30,
    fontSize: 20
  }
};
 //GLOBLE.COLOR.BLUE
// Make the component available to other parts of the app
export { CrmHeader };
