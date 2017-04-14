import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut, registerRequest, selectTabBarItem } from '../actions/index';
import { BigHeader, CustomizedButton, Header, Footer } from './common';
import CustomerFooter from './common/CustomerFooter';
//import MainScreen from './MainScreen';
import RegisterSteps from './register/registerSteps';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import { GLOBLE } from './common/Globle';

class LoginingScreen extends Component {

  render() {
    const { viewStyle, blockStyle, colorlessViewStyle } = styles;
    //<MainScreen style={screenStyle} />
    console.log(this.props.register);
     /*
     <CustomizedButton
     onPress={() => this.props.signOut(false, '')}
     style={colorlessViewStyle}
     >登出
     </CustomizedButton>
     */
    if (!this.props.register.regStatus) {
      console.log(this.props.loginState, 'init');
      switch (this.props.loginState.success) { //fixme2
        case true:
          return (
                  <View style={colorlessViewStyle}>
                    <Header headerText={this.props.selectedFeature.title} />
                    <Dashboard />
                 </View>);
        default:
          return (
                  <View style={viewStyle}>
                    <BigHeader headerText="Student Got Talent" />
                    <LoginForm />
                    <View style={blockStyle} />
                    <CustomerFooter
                     footerText="還沒有帳號嗎？ 註冊。"
                     onPress={() => this.props.registerRequest()}
                    />
                    <Footer footerText="需要協助？" />
                    <Footer footerText="" />
                  </View>);
      }
    } else {
      // Here is the regerister Steps screens
      //return (<MainScreen />);
      return (<RegisterSteps />);
    }
  }
}

const styles = {
  viewStyle: {
    backgroundColor: GLOBLE.COLOR.BLUE,
    flex: 1
  },
  blockStyle: {
    flex: 4
  },
  screenStyle: {
    flex: 15
  },
  colorlessViewStyle: {
    flex: 1
  },
};

// Anything returned from this function will end up as props
// on the LoginForm container
function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ signOut, registerRequest, selectTabBarItem }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
    loginState: state.loginState,
    register: state.register,
    selectedFeature: state.selectedFeature
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(LoginingScreen);
