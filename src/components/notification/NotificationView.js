import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationItem } from './NotificationItem';
import { CONFIG } from '../../config';

class NotificationView extends Component{
  componentWillMount(){

  }
  fetchNotifs(){

    etch(CONFIG.API_BASE_URL.concat('/activity_notifications/'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth
      }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {

            console.log(json, 'notifs');

                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
  render(){
    return(
      <ScrollView>
        <NotificationItem></NotificationItem>
      </ScrollView>
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
