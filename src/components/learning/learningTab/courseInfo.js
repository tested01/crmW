import React, { Component } from 'react';
import {
  View,
  Text,
  Image
 } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PleaseSelectCourseFirst, GLOBLE } from '../../common';

 class CourseInfo extends Component{
   render(){

     const courseInfoStyle = {
       display: 'flex',
       flexDirection: 'row',
       alignSelf: 'stretch',
       margin: 10,
       justifyContent: 'space-between',
       alignItems: 'flex-end',
       borderBottomWidth: 1,
       borderColor: '#cccccc',
       height: 56,
       width: window.width-40
     };

     const pageStyle = {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
     };

     if(this.props.currentCourse.code===''){
       return (<PleaseSelectCourseFirst />);
     }else{
       let teacherName = this.props.currentCourse._creator.lastName +
                          this.props.currentCourse._creator.firstName;
       let startDate = GLOBLE.formatDateString(this.props.currentCourse.courseDuration.startDate, '/');
       let endDate = GLOBLE.formatDateString(this.props.currentCourse.courseDuration.endDate, '/');
       return (
         <View style={[pageStyle, { backgroundColor: 'white' }]} >
         <Image
          style={{width: 80, height: 80, marginBottom: 5, marginTop: -80}}
          source={require('../../../img/color-logo.png')}
         />

         <View>
          <Text>{ this.props.currentCourse.name }</Text>
         </View>
         <View style={courseInfoStyle}>
           <Text> 開始時間 </Text>
           <Text>{ startDate }</Text>
         </View>
         <View style={courseInfoStyle}>
           <Text> 結束時間 </Text>
           <Text>{ endDate }</Text>
         </View>
         <View style={courseInfoStyle}>
           <Text> 老師 </Text>
           <Text>{ teacherName }</Text>
         </View>
         <View style={courseInfoStyle}>
           <Text> 班級代碼 </Text>
           <Text>{ this.props.currentCourse.code }</Text>
           </View>
         </View>
         );
     }

   }
 }



 function mapStateToProps(state) {
   return {

     loginState: state.loginState,
     currentCourse: state.currentCourse
   };
 }

 // Promote BoxList from a component to a container - it
 // needs to know about this new dispatch method, selectedNumBox & answerNum.
 // Make it available as a prop.
 export default connect(mapStateToProps)(CourseInfo);
