// Import libraries for making a component
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from './Globle';

// Make a component
class CrmHeader extends Component {

  constructor(props){
    super(props);
    this.tColor = '';
    if(this.props.theme == 'blue'){
      this.tColor = GLOBLE.COLOR.BLUE
    }else{
      this.tColor = this.props.theme;
    }
    this.styles = {
      viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: this.tColor,
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

  }


 //{props.headerText}
  iconParser(prop){
    const { textStyle } = this.styles;
    switch(prop){
      case 'left':
        return (<Icon.Button
           name={this.props.left}
           size={30}
           backgroundColor='transparent'
           color={this.props.wordColor}
           onPress={this.props.leftPress}
           />);
      case 'right':
        if(this.props.right == 'none'){
          console.log('none--->');
          return (<Icon.Button
             name="close"
             size={30}
             backgroundColor='transparent'
             color='transparent'
             onPress={()=>{console.log('empty')}}
              />);
        }else{
          return (<Icon.Button
             name={this.props.right}
             size={30}
             backgroundColor='transparent'
             color={this.props.wordColor}
             onPress={this.props.rightPress}
              />);
        }

      default:
      return (
        <View
         style={{width: 30, height: 30}}

          />);
    }
  }

  render(){
  const { viewStyle } = this.styles;
  return (
    <View style={viewStyle}>
      <View >
      { this.iconParser('left') }
      </View>
      <View >
       <Text style={this.styles.textStyle}>{this.props.center}</Text>
      </View>
      <View>
      { this.iconParser('right') }
      </View>

    </View>
  );
 }
}


 //GLOBLE.COLOR.BLUE
// Make the component available to other parts of the app
export { CrmHeader };
