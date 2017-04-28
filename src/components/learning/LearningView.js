import React, { Component } from 'react';
import { View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableHighlight,
  TextInput,
  Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import LiteraryWork from './learningTab/literaryWork';
import { GLOBLE } from '../common/Globle';
import CourseSelector from '../CourseSelector';
import { CONFIG } from '../../config';
import { hideHeader, courseOperation } from '../../actions/index';
import { CustomizedButton, StudentCard } from '../common';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    zIndex: 1,
  },
  label: {
    backgroundColor: 'transparent',
    color: 'gray',
    margin: 8,
  },
  indicator: {
    //backgroundColor: 'black'
    backgroundColor: GLOBLE.COLOR.BLUE,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
    zIndex: 2
  },
  circleButton: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 100/2
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GLOBLE.COLOR.BLUE,
    alignItems: 'center',
    height: 60,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
});

class LearningView extends Component {

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: '班級資訊' },
        { key: '2', title: '教務通知' },
        { key: '3', title: '作品' },
        { key: '4', title: '成員' }
      ],
      //classOperation: false
    };
    this.joinClass = this.joinClass.bind(this);
    this.concealCreateCourse = this.concealCreateCourse.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.fetchOneCourses = this.fetchOneCourses.bind(this);
    this.renderCourseAndJoinButton = this.renderCourseAndJoinButton.bind(this);
    this.joinCourseAPI = this.joinCourseAPI.bind(this);
  }

  componentWillMount(){
    this.updateCourses(this.props.loginState.xAuth);
    this.props.courseOperation(false);
  }
  joinClass(){

    this.props.courseOperation(true);
    this.props.hideHeader(true);
  }

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => {
    return (
      <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.label}
          indicatorStyle={styles.indicator}
      />
    );
  };

  renderMockStudents = () => {
    return (

      <View style={{ height: 80, margin: 1, backgroundColor: 'white' }} >
      <Image
       style={{width: 80, height: 80}}
       source={require('../../img/color-logo.png')}
      />
      </View>
    );
  }

  renderMockStudents2 = () => {
    return (

      <View style={{ height: 80, margin: 1, backgroundColor: 'white' }} >
      <Image
       style={{width: 80, height: 80}}
       source={require('../../img/love-logo.png')}
      />
      </View>
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <View style={[styles.page, { backgroundColor: '#ff4081' }]} />;
    case '2':
      return (
              <View style={[styles.leftPage, { backgroundColor: 'white' }]} >
              <Text style={{ fontSize: 18}}> 海綿颱風停課通知 </Text>
              <Text style={{ marginTop: 10 }}> 親愛的 同學 你好: </Text>
              <Text style={{ marginTop: 10 }}> 本校因受「海綿颱風」來襲影響，配合人事行政局停止上班上課公告，於7/12(五)18:00起當天停止上課。
                     且7/13(六)後之停課與否，同『人事行政局天然災害停止上班及上課情形』網站公告http://www.cpa.gov.tw/。
                     請各位師生留意公告動態，並做好防颱準備，保持一切平安~~ </Text>
              </View>
            );
    case '3':
      return (
        <View style={[styles.page, { backgroundColor: 'white' }]} >
          <LiteraryWork />
        </View>
    );
    case '4':
      console.log(this.props.currentCourse, 'courses current students');
      let notLoadingYet = (this.props.currentCourse.code.length != 10);
      if(notLoadingYet){
        console.log('notLoadingYet');
      }else{
        console.log(this.props.currentCourse.members.students);
        //StudentCard
        let st = {name: 'j6ru04zj6'};
        return(<StudentCard student={st}/>);
      }
      return (<View style={[styles.page, { backgroundColor: 'gray',
      flex: 1, flexDirection: 'column', alignItems: 'stretch' }]} >
              <ScrollView>
              <View style={{ height: 80, margin: 1, backgroundColor: 'white' }} >
                <Image
                 style={{width: 80, height: 80}}
                 source={require('../../img/react-logo.png')}
                />
              </View>
              <View style={{ height: 80, margin: 1, backgroundColor: 'white',
              flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
              <Image
               style={{width: 80, height: 80, flex: 1}}
               source={require('../../img/color-logo.png')}
              />
              <Text style={{ flex: 3, fontSize: 20, lineHeight: 80, textAlign: 'left'}}> 蔡英文 </Text>
              </View>
              { this.renderMockStudents()}
              { this.renderMockStudents2()}
              { this.renderMockStudents()}
              { this.renderMockStudents2()}
              { this.renderMockStudents()}
              { this.renderMockStudents2()}
              { this.renderMockStudents2()}
              { this.renderMockStudents()}
              { this.renderMockStudents()}
              { this.renderMockStudents2()}
              </ScrollView>
              </View>);
    default:
      return null;
    }
  };
  //TODO: import <studentCard />
  // use each items in this.props.currentCourse.members.students
  // as property to render

  fetchOneCourses(code){
    fetch(CONFIG.API_BASE_URL.concat('/courses/').concat(code), {
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
                                //this.setState(Object.assign({}, this.state, json));
                                //console.log(json.course, 'user courses qq');
                                this.setState({fetchCourse: json.course});
                                //this.setState(Object.assign({}, this.state, json));
                                //console.log(this.state);
                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateCourses(token){
    fetch(CONFIG.API_BASE_URL.concat('/courses'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': token
      }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                console.log(json.courses, 'user courses');
                                console.log(json.courses.length, 'user courses count');
                                this.setState(Object.assign({}, this.state, json));
                                console.log(this.state);
                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderNoCourse() {
    return (
      <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight onPress={this.joinClass}>
            <Image
              style={styles.circleButton}
              source={require('../../img/love-logo.png')}
            />
          </TouchableHighlight>
          <Text style={{ marginTop: 20 }}>
          加入班級，擁有更多學習！
          </Text>
          <View style={{ height: window.height/5 , width:20 }}></View>
      </View>
    );
  }

  renderNewCourseHeader(headerTitle) {
    const { viewStyle } = styles;
    /*
    <Icon.Button
      name="angle-left"
      size={30}
      color='white'
      backgroundColor='transparent'
      style={{ marginLeft: 20, marginTop: 15}}
      onPress={this.backToLearning}
      />
    */
    return (
      <View style={viewStyle}>
        <TouchableHighlight onPress={this.concealCreateCourse}>
          <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
        </TouchableHighlight>
        <Text style={{ marginTop: 15, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}> {headerTitle} </Text>
        <TouchableHighlight onPress={this.createCourse}>
          <Text style={{ marginTop: 15, color: 'white'}}>  </Text>
        </TouchableHighlight>
      </View>
    );
  }
  createCourse(){
    console.log('createCourse');
    //this.props.hideHeader(false); //call this when exit 建立班級
  }
  concealCreateCourse(){
    console.log('concealCreateCourse');
    //this.setState({classOperation: false});
    this.props.courseOperation(false);
    this.props.hideHeader(false);
  }

  renderCourseAndJoinButton(){
    if (this.state.fetchCourse){
      return(<View style={{
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <Text style={{fontSize:50}}>圖</Text>
        <Text>{this.state.fetchCourse.name}</Text>

        <TouchableHighlight onPress={this.joinCourseAPI}>
          <View style={{
            width: window.width-40,
            height: 30,
            backgroundColor: '#F9C00C',
            borderRadius: 5,
            margin: 5
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>加入</Text>
          </View>
        </TouchableHighlight>

        </View>)
    }else{
      return(<View/>);
    }
  }

  joinCourseAPI(){
    //this.state.courseCode;
    //courses/:code/students
    //state.loginState.xAuth
    //TODO
    fetch(CONFIG.API_BASE_URL.concat('/courses/')
    .concat(this.state.courseCode).concat('/students'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth
      }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {

                                this.props.courseOperation(false);
                                this.props.hideHeader(false);
                                this.updateCourses(this.props.loginState.xAuth); //update

                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  renderCourseCreationPage(){
    return(
      <View style={{flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 25
      }}>
        <Text style={{fontSize: 17}}> 輸入你想加入的班級代碼 </Text>
        <Text style={{fontSize: 14}}> 欲想了解班級代碼，可詢問班級老師</Text>
        <View>
        <TextInput
          style={{height: 40,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 20
          }}
          autoFocus={true}
          keyboardType= 'numeric'
          maxLength={10}
          onChangeText={(courseCode) => {
            this.setState({courseCode});
            //console.log(this.state.courseCode);
            if(courseCode.length === 10){
              console.log('10~', courseCode);
              this.fetchOneCourses(courseCode);
              //fetch by the courseCode
              //set the state
              //render below
              // -> /courses/:CourseCode
            }
          }}
        value={this.state.courseCode}
      />
      </View>
        {this.renderCourseAndJoinButton()}
      </View>
    );
  }
  render() {
    //console.log(this.props.currentCourse);
    if(this.props.courseOperationState){
      if(this.props.courseOperationState.open){
        return (
          <View>
          {this.renderNewCourseHeader('加入班級')}
          {this.renderCourseCreationPage()}
          </View>
        );
      }else{
        if(this.state.courses){
          let noCourse = (this.state.courses.length == 0);
          //console.log(this.props.loginState.xAuth,'xa');

          if (noCourse){ // When no existing course, show this page

            return this.renderNoCourse();

          }else
          {
            return (
              <View style={{ flex: 5, alignItems: 'stretch' }}>
              <CourseSelector courses={this.state.courses} />
              <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this.renderScene}
                renderHeader={this.renderHeader}
                onRequestChangeTab={this.handleChangeTab}
              />
              </View>
            );
          }
        }else{
          return (
            <View style={{ flex: 5,
                           backgroundColor: 'white' }}>
            <Text>
            .
            </Text>
            </View>
          );
        }
      }
    }else{
      return (
        <View style={{ flex: 5,
                       backgroundColor: 'white' }}>
                  <Text>
                  .
                  </Text>
                  </View>);
    }




  }
}

// Anything returned from this function will end up as props
// on the LoginForm container

function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ hideHeader, courseOperation }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
    //selectedFeature: state.selectedFeature,
    loginState: state.loginState,
    currentCourse: state.currentCourse,
    hideHeader: state.hideHeader,
    courseOperationState: state.courseOperation
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
//export default connect(mapStateToProps, mapDispatchToProps)(LearningView);
export default connect(mapStateToProps, mapDispatchToProps)(LearningView);
