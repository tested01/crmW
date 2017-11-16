import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StudentCard from '../../common/StudentCard';
import { PleaseSelectCourseFirst, GLOBLE } from '../../common';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class MemberList extends Component{

  render(){
    let notLoadingYet = (this.props.currentCourse.code.length != 10);
    if(notLoadingYet){
      console.log('notLoadingYet');
      return (<PleaseSelectCourseFirst />)
    }else{
      const currentStudents = this.props.currentCourse.members.students;
      console.log(currentStudents);

      const listStudents = currentStudents.map((student) =>
        <StudentCard
        key={student._id}
        student={student}
        currentCourse={this.props.currentCourse}
        refresh={this.props.refresh}
        />
      );
      let w = this.props.currentCourse._creator;
      //const listTeachers = [ <StudentCard key='{student._id}' teacher student={w}/> ];

      //StudentCard

      // { listTeachers }
      return(
        <View style={[styles.page, { backgroundColor: 'white',
        flex: 1, flexDirection: 'column', alignItems: 'stretch' }]} >
          <Text allowFontScaling={false} style={{color: 'gray'}}>共 {this.props.currentCourse.members.students.length} 位成員</Text>
          <ScrollView>
          { listStudents }
          </ScrollView>
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

export default connect(mapStateToProps)(MemberList);
