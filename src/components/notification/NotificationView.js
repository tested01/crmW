import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NotificationView extends Component{
  render(){
    return(<Text>我是小鼻仔</Text>);
  }
}


// Anything returned from this function will end up as props
// on this container
/*
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hideHeader,
    courseOperation,
    setCurrentCourse
   }, dispatch);
}
*/
function mapStateToProps(state) {

  return {
    loginState: state.loginState,
    currentCourse: state.currentCourse,
    hideHeaderOperation: state.hideHeaderOperation,
    courseOperationState: state.courseOperation,
    literaryWorksState: state.literaryWorksState
  };
}

export default connect(mapStateToProps)(NotificationView);
//export default connect(mapStateToProps, mapDispatchToProps)(NotificationView);
