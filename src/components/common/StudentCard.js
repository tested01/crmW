import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, ActionSheetIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionSheet from 'react-native-actionsheet';
import { setCurrentCourse } from '../../actions/index';
import { CONFIG } from '../../config';


class StudentCard extends Component {
  constructor(props){
    super(props);
    this.memberDetail = this.memberDetail.bind(this);
    this.title = '確認要移除成員嗎？';
    /*
    this.DELETE_BUTTONS = [
      '移除成員',
      '取消'
    ];*/
    this.options = [
      '移除成員',
      '取消'
    ];
    this.DESTRUCTIVE_INDEX = 4;
    this.CANCEL_INDEX = 0;
    this.showActionSheet = this.showActionSheet.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.syncWithCurrentCourse = this.syncWithCurrentCourse.bind(this);
    this.isEditable = this.isEditable.bind(this);
    this.state = { visible: true, selected: ''};
    }


  isEditable(){
    if(this.props.teacher) {
      return (<Text> </Text>);
    } else{
      if(this.props.loginState.role == 'student'){
        return (<Text> </Text>);
      }else{
        return (
          <TouchableHighlight onPress={this.memberDetail}>
            <Icon style={{ alignSelf: 'center' }}name='dots-three-horizontal' size={20} color='gray' />
          </TouchableHighlight>
      );
      }

    }
  }

  isTeacher(){
    if(this.props.teacher) {
      return (<Text> 老師 </Text>);
    } else{
      return (<Text> </Text>);
    }
  }

  memberDetail(){

    console.log(this.props.student);
    this.showActionSheet();

  }

  deleteStudent(sid, currentCourse){
    //http://localhost:3000/courses/0844429054/members/58f8e2d211101e58124494c1
    const deleteStudentUrl = CONFIG.API_BASE_URL
      .concat('/courses/')
      .concat(currentCourse.code)
      .concat('/members/')
      .concat(sid);
    console.log(deleteStudentUrl);

    fetch(deleteStudentUrl
    , {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth
        }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                 console.log(json, 'json');
                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showActionSheet() {
    this.ActionSheet.show();
  }

  handlePress(i) {
    this.setState({
      selected: i
    })
    if(this.options[i] === '移除成員'){
      console.log('移除成員中.....');
      let refineCourse =  Object.assign({}, this.props.currentCourse);
      refineCourse = this.removeStudent(refineCourse, this.props.student._id);
      this.deleteStudent(this.props.student._id, this.props.currentCourse);
      this.props.setCurrentCourse(refineCourse);
      this.props.refresh();
      let visible = false;
      this.setState({visible});
      this.syncWithCurrentCourse();
    }
  }

  /*
  showActionSheet(){
    ActionSheetIOS.showActionSheetWithOptions({
      options: this.DELETE_BUTTONS,
      cancelButtonIndex: this.CANCEL_INDEX,
      destructiveButtonIndex: this.DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      this.setState({ clicked: this.DELETE_BUTTONS[buttonIndex] });
      console.log(this.state.clicked === this.DELETE_BUTTONS);

      if(this.state.clicked === this.DELETE_BUTTONS[0]){
        //console.log(this.state.clicked);
        //console.log(this.props.student._id);
        //console.log(this.props.currentCourse);
        let refineCourse =  Object.assign({}, this.props.currentCourse);
        refineCourse = this.removeStudent(refineCourse, this.props.student._id);
        this.deleteStudent(this.props.student._id, this.props.currentCourse);
        this.props.setCurrentCourse(refineCourse);
        this.props.refresh();
        let visible = false;
        this.setState({visible});
        this.syncWithCurrentCourse();
      }else{
        //concel
      }

    });
  };

  */

  removeStudent(course, sid){
    let index = course.members.students.indexOf(sid);
    if(index > -1){
      course.members.students.splice(index, 1);
    }
    return course;
  }

  syncWithCurrentCourse() {
    fetch(CONFIG.API_BASE_URL.concat('/courses/').concat(this.props.currentCourse.code), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth //FIXME:teachauth
        //'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGVjNzBkY2E5NTZhMjdiMTk5YmNkOTEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkxODkwMzk3fQ._5J7xKENI4jsX8--0EtEnFV195SySjSfVyze_rcxewQ'
      }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                this.props.setCurrentCourse(json.course);
                                console.log('resetCourse', json.course)
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
    if(this.state.visible){
      return (
        <View style={{
          height: 50,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 0.5,
          borderColor: 'gray',
          backgroundColor: 'white',
          justifyContent: 'space-between',
          margin: 5
        }}>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={this.title}
            options={this.options}
            cancelButtonIndex={this.CANCEL_INDEX}
            onPress={this.handlePress}
          />
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <Image
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              borderWidth: 0,
              marginRight: 5
             }}
              source={require('../../img/love-logo.png')}
            />
            <View style={{ marginLeft: 10, backgroundColor: 'white'}}>
              <Text>
              { this.props.student.lastName.concat(this.props.student.firstName) }
              { this.isTeacher() }
              </Text>
            </View>
          </View>
          { this.isEditable() }
        </View>
      );
    }else{
      return(<View></View>);
    }
  }
}

//export { StudentCard };

function mapDispatchToProps(dispatch) {

  return bindActionCreators({ setCurrentCourse }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
    //selectedFeature: state.selectedFeature,
    loginState: state.loginState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
//export default connect(mapStateToProps, mapDispatchToProps)(LearningView);
export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);
