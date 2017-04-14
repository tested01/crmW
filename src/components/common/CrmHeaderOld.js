// Import libraries for making a component
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GLOBLE } from './Globle';
import { REGISTERNEXT, REGISTERLAST } from '../../actions';
import { registerLastStep, registerNextStep } from '../../actions/index';

// Make a component
class CrmHeaderOld extends Component {

  constructor(props){
    super(props);
  }

 //{props.headerText}
  iconParser(prop, position){
    const { textStyle } = styles;
    /*
    var handler;
    switch(position){
      case 'left':
        handler = () => {this.props.registerLastStep};
        break;
      case 'center':
        handler = () => {this.props.registerNextStep};
        break;
      default:
        handler = () => {console.log('center')};
        break;
    }*/
    switch(prop){
      case 'left_arrow':
        return (<Icon name="angle-left" size={30} color='gray' />);
        /*return (  <Icon.Button name="angle-left"  onPress={handler}>
                  </Icon.Button>);*/
      case 'right_arrow':
        return (<Icon name="angle-right" size={30} color='gray' />);
        /*return (  <Icon.Button name="angle-right"  onPress={handler}>
                  </Icon.Button>);*/
      default:
        return (<Text style={textStyle}>{prop}</Text>);
        /*return (<TouchableHighlight onPress={handler}>
                <Text style={textStyle}>{prop}</Text>
                </TouchableHighlight>);*/
    }
  }
  /*
  { this.iconParser(this.props.left, 'left') }
  { this.iconParser(this.props.center, 'center') }
  { this.iconParser(this.props.right, 'right') }
  */
  render(){
  const { viewStyle } = styles;
  return (
    <View style={viewStyle}>
    <Text>www</Text>
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

// Anything returned from this function will end up as props
// on the LoginForm container
function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ registerLastStep, registerNextStep }, dispatch);
}

function mapStateToProps(state) {
  return {
    registerStep: state.registerStep
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(CrmHeaderOld);
