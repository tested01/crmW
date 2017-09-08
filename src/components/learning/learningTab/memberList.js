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
  constructor(props){
    super(props);
    this.refreshStudentCount = this.refreshStudentCount.bind(this);
    //this.setCount = this.setCount.bind(this);
  }
  componentWillMount() {
    //this.state.currentMemberCount = this.props.currentCourse.members.students.length;
  }
  /*
  setCount(count){
    this.setState({currentMemberCount: count});
  }*/
  refreshStudentCount(){
    //let count = this.state.currentMemberCount - 1;
    //this.setState({currentMemberCount: count});
  }
  render(){
    let notLoadingYet = (this.props.currentCourse.code.length != 10);
    if(notLoadingYet){
      console.log('notLoadingYet');
      return (<PleaseSelectCourseFirst />)
    }else{
      //this.setCount(this.props.currentCourse.members.students.length);
      const currentStudents = this.props.currentCourse.members.students;


      const listStudents = currentStudents.map((student) =>
        <StudentCard
        key={student._id}
        student={student}
        currentCourse={this.props.currentCourse}
        refresh={this.refreshStudentCount}
        />
      );
      let w = this.props.currentCourse._creator;
      const listTeachers = [ <StudentCard key='{student._id}' teacher student={w}/> ];

      //StudentCard

      // { listTeachers }
      return(
        <View style={[styles.page, { backgroundColor: 'white',
        flex: 1, flexDirection: 'column', alignItems: 'stretch' }]} >
          <Text style={{color: 'gray'}}>共有 {this.props.currentCourse.memberLength} 位成員</Text>
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
