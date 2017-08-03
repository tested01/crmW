import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationItem } from './NotificationItem';


class NotificationView extends Component{
  componentWillMount(){

  }

  render(){
    return(
      <View style={{ flex: 1 }}>
        <NotificationItem loginState={this.props.loginState}></NotificationItem>
      </View>
    );
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
