import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StatusBar,
         Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut,
         registerRequest,
         selectTabBarItem,
         courseOperation,
         hideHeader } from '../actions/index';
import { BigHeader, CustomizedButton, Header, Footer } from './common';
import CustomerFooter from './common/CustomerFooter';
//import MainScreen from './MainScreen';
import RegisterSteps from './register/registerSteps';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import { GLOBLE } from './common/Globle';
/*
<Icon.Button
 name={props.buttonType}
 size={20}
 color='white'
 style={{marginRight: 10}}
 backgroundColor='transparent'
 onPress={props.delegatedFunction}
 >
</Icon.Button>
*/
const window = Dimensions.get('window');
const blockDashboard = {
  height: 50,
  display: 'none',
  borderWidth: 0,
  position: 'absolute',
  backgroundColor: 'transparent',
  zIndex: 20,
  bottom: 0,
  width: window.width
}
class LoginingScreen extends Component {
  constructor(props){
    super(props);
    this.joinCourse = this.joinCourse.bind(this);
  }
  conditionalHeaderRender(){
    var noHeaderList = ['我']; //hide the header
    var rightButtonList = ['學習','課務'];
    let currentTitleAppear = (noHeaderList.indexOf(this.props.selectedFeature.title) < 0);
    let currentHasRightButton = (rightButtonList.indexOf(this.props.selectedFeature.title) >= 0);
    console.log(this.props.hideHeaderOperation.hide, 'this.props.hideHeader.hide');
    if(this.props.selectedFeature.title=='我'){
      //backgroundColor="#fff"
      return(
        <StatusBar
         barStyle="dark-content" // Here is where you change the font-color
        />
      )

    }
    if(this.props.hideHeaderOperation.hide){
      //Dashboard.hideTabBar();
    }else{
      //Dashboard.showTabBar();
    }
    if(currentTitleAppear && !(this.props.hideHeaderOperation.hide)){
      if(currentHasRightButton){
        //android statusbar backgroundColor="#fff"
        return(
          <View>
            <Header
            headerText={this.props.selectedFeature.title}
            buttonType='plus'
            delegatedFunction={()=>this.joinCourse}
            rightButton
            />
            <StatusBar
             barStyle="light-content" // Here is where you change the font-color
            />
          </View>
        );
      }else{
        //backgroundColor="#fff"
        return(
          <View>
            <Header headerText={this.props.selectedFeature.title} />
            <StatusBar
             barStyle="light-content" // Here is where you change the font-color
            />
          </View>
        );
      }

    }
  }
  joinCourse(){
    this.props.courseOperation(true);
    this.props.hideHeader(true);
  }
  render() {
    const { viewStyle, blockStyle, colorlessViewStyle } = styles;
    //<MainScreen style={screenStyle} />
    //console.log(this.props.register);
     /*
     <CustomizedButton
     onPress={() => this.props.signOut(false, '')}
     style={colorlessViewStyle}
     >登出
     </CustomizedButton>
     */
    if (!this.props.register.regStatus) {
      //console.log(this.props.loginState, 'init');
      switch (this.props.loginState.success) { //fixme2
        case true:
          //  <View style={blockDashboard}></View>
          return (
                  <View style={colorlessViewStyle}>

                    {this.conditionalHeaderRender()}
                    <Dashboard />
                 </View>);
        default:
          //<BigHeader headerText="Student Got Talent" />
          /*
          <Image
           style={{alignSelf: 'center'}}
           source={require('../img/ushow-logo.png')}
          />

          <BigHeader headerText="UShow" />
          */
          //backgroundColor="#fff"
          return (
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={viewStyle}>
                    <StatusBar
                     barStyle="light-content" // Here is where you change the font-color
                    />
                    <Image
                     style={{alignSelf: 'center', marginTop: -20, width: window.width, resizeMode: 'stretch'}}
                     source={require('../img/login/header.png')}
                    />

                    <LoginForm />
                    <View style={blockStyle} />
                    <CustomerFooter
                     footerText="還沒有帳號嗎？ 馬上註冊。"
                     onPress={() => this.props.registerRequest()}
                    />
                    <Footer footerText="需要協助？" />
                    <Footer footerText="" />
                  </View>
                  </TouchableWithoutFeedback>
                );
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
    backgroundColor: 'white',
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

  return bindActionCreators({ signOut,
    registerRequest,
    selectTabBarItem,
    courseOperation,
    hideHeader }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
    loginState: state.loginState,
    register: state.register,
    selectedFeature: state.selectedFeature,
    hideHeaderOperation: state.hideHeaderOperation
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(LoginingScreen);
