import React, { Component } from 'react';
import { View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableHighlight,
  TextInput,
  Dimensions,
  Alert
   } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import LiteraryWork from './learningTab/literaryWork';
import { GLOBLE } from '../common/Globle';
import CourseSelector from '../CourseSelector';
import { CONFIG } from '../../config';
import {
  hideHeader,
  courseOperation,
  setCurrentCourse } from '../../actions';
import { CustomizedButton, PleaseSelectCourseFirst } from '../common';
import StudentCard from '../common/StudentCard';
import Notification from './learningTab/notification';

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
      ]


      //
      //classOperation: false

    };

    this.role = this.props.loginState.role;

    this.joinClass = this.joinClass.bind(this);
    this.concealCreateCourse = this.concealCreateCourse.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.fetchOneCourses = this.fetchOneCourses.bind(this);
    this.renderCourseAndJoinButton = this.renderCourseAndJoinButton.bind(this);
    this.joinCourseAPI = this.joinCourseAPI.bind(this);
    this.refreshStudentCount = this.refreshStudentCount.bind(this);
    this.getCourseOperationHeader = this.getCourseOperationHeader.bind(this);
    this.renderDatePicker = this.renderDatePicker.bind(this);
    this.renderStartDateTitle = this.renderStartDateTitle.bind(this);
    this.renderEndDateTitle = this.renderEndDateTitle.bind(this);
    this.renderCourseTitle = this.renderCourseTitle.bind(this);
    this.courseDataValidator = this.courseDataValidator.bind(this);
    this.createCourseAPI = this.createCourseAPI.bind(this);
    this.fetchAndBuildNotifications = this.fetchAndBuildNotifications.bind(this);
  }

  componentWillMount(){
    this.updateCourses(this.props.loginState.xAuth);
    this.props.courseOperation(false);
    this.setState({error_courseName: true});
    this.setState({error_startDate: true});
    this.setState({error_endDate: true});
    this.setState({error_range: false});
    //fetch notifications
    fetch(CONFIG.API_BASE_URL.concat('/notifications/'), {
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
                                console.log()
                                this.setState({notifications: json});

                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  joinClass(){

    this.props.courseOperation(true);
    this.props.hideHeader(true);
  }

  refreshStudentCount(){
    let studentNum = this.state.studentNum - 1;
    this.setState({studentNum});
    console.log(studentNum);

  }

  handleChangeTab = (index) => {
    this.setState({ index });
    if(this.props.currentCourse.members){
      this.setState({studentNum: this.props.currentCourse.members.students.length});
    }


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

  renderDatePicker(reminder, ref, key){
    switch(key){
      case 'startDate':
        return(
          <DatePicker
            style={{width: 150}}
            date={this.state.startDate}
            mode="date"
            placeholder={reminder}
            format="YYYY-MM-DD"
            minDate="2017-03-31"
            maxDate="2100-02-12"
            confirmBtnText="確定"
            cancelBtnText="取消"
            customStyles={{
              dateIcon: {
                width: 0
              },
              dateInput: {
                marginLeft: 0,
                borderWidth: 0
              },
              placeholderText: {
                fontSize: 16,
                color: 'gray',

              }
              // ... You can check the source to find the other keys.
            }}
                onDateChange={(date) => {
                  this.setState({startDate: date});
                  }
                }

          />
        );
      case 'endDate':
        return(
          <DatePicker
            style={{width: 150}}
            date={this.state.endDate}
            mode="date"
            placeholder={reminder}
            format="YYYY-MM-DD"
            minDate="2017-03-31"
            maxDate="2100-02-12"
            confirmBtnText="確定"
            cancelBtnText="取消"
            customStyles={{
              dateIcon: {
                width: 0
              },
              dateInput: {
                marginLeft: 0,
                borderWidth: 0
              },
              placeholderText: {
                fontSize: 16,
                color: 'gray',

              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({endDate: date});
              }
            }
          />
        );
      default:
        break;
  }

  }

  renderCourseInfo(){
    console.log(this.props.currentCourse);
    if(this.props.currentCourse.code != ''){
      let teacherName = this.props.currentCourse._creator.lastName +
                         this.props.currentCourse._creator.firstName;
      let startDate = GLOBLE.formatDateString(this.props.currentCourse.courseDuration.startDate, '/');
      let endDate = GLOBLE.formatDateString(this.props.currentCourse.courseDuration.endDate, '/');
      const courseInfoStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        height: 56,
        width: window.width-40
      };

      return (
        <View style={[styles.page, { backgroundColor: 'white' }]} >
        <Image
         style={{width: 80, height: 80, marginBottom: 5, marginTop: -80}}
         source={require('../../img/color-logo.png')}
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
    }else{
        return (
          <PleaseSelectCourseFirst />
        );
    }

  }

  renderMembers(){
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
          <Text style={{color: 'gray'}}>共 {this.state.studentNum} 位成員</Text>
          <ScrollView>
          { listStudents }
          </ScrollView>
        </View>
      );
    }

  }

/*
<Notification
  title='【梅姬颱風快報】'
  subtitle='請依據該校所屬之各縣市人事行政局命令判斷。'
  content={"\n\n" +
  "梅姬颱風即將登陸，中央氣象局今9/26上午11時30分，已發布海上陸上颱風警報，" +
  "因此本週二9/27、週三9/28的課程恐受颱風影響。\n\n" +
  "最新停班停課訊息，請以行政院人事行政總處或地方縣市政府公布為準。\n\n" +
  "如遇停課情形，後續處理方式與是否需擇期補課，請密切注意App內教務通知區。\n\n\n" +
  "聯合報寫作教室 敬啟\n"}
/>
<Notification
  title='【第32屆楚才盃作文競賽公告】'
  subtitle=''
  content={"\n\n" +
  "去年第31屆楚才盃作文競賽參賽學生踴躍，各區不乏臥虎藏龍~" +
  "今年擴大舉行~各區老師們趕快推舉您的優秀學生，一同參與作文盛事吧~~比賽題本將於下週公佈！\n\n" +
  "【預告！預告】。\n\n" +
  "廣發戰帖～各位老師，請各位同學齊來'比文過招'吧！" +
  "聯合報和大陸武漢市，將攜手進行，「2016年第32屆楚才盃作文競賽」囉!\n\n" +
  "比賽將於3/26~4/01進行，此期間要請老師們於課堂中使用比賽題本寫作。\n\n" +
  "希望藉由老師的指導與鼓勵下學生寫出好文章，讓入圍的佳作飄洋過海至武漢，和學生們一起爭取榮譽。\n\n" +
  "聯合報寫作教室 敬啟\n"}
/>
*/
  renderNotification(){
    return (
          <ScrollView>
            {this.fetchAndBuildNotifications()}
          </ScrollView>
          );
  }

  fetchAndBuildNotifications(){

    if(this.state.notifications){
      return(
        this.state.notifications.map(
          function(notification){
              console.log(notification, 'notif')
              return(
                <Notification
                  key={notification._id}
                  title={notification.detail.title}
                  contentUri={notification.detail.contentUri}
                  createdDate={notification.createdDate}
                />
              );
          }
        )
      );
    }else{
      return(<Text></Text>);
    }


  }

  renderLiteraryWorks(){
    //<View style={[styles.page, { backgroundColor: 'white' }]} ></View>
    return (

        <LiteraryWork />

  );
  }

  renderScene = ({ route }) => {

    switch (route.key) {
    case '1':
      return this.renderCourseInfo();
    case '2':
      return this.renderNotification();
    case '3':
      return this.renderLiteraryWorks();
    case '4':
      return this.renderMembers();
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
    switch(this.role){

      case 'student':
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
      case 'teacher':
        return (
          <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight onPress={this.joinClass}>
                <Image
                  style={styles.circleButton}
                  source={require('../../img/love-logo.png')}
                />
              </TouchableHighlight>
              <Text style={{ marginTop: 20 }}>
              建立班級，讓教學更便利！
              </Text>
              <View style={{ height: window.height/5 , width:20 }}></View>
          </View>
        );
      default:
        return(<View> role error </View>)

    }

  }
  renderNewCourseCreateButton(){
    if(this.role === 'teacher'){
      return(
        <TouchableHighlight onPress={this.createCourse}>
          <Text style={{ marginTop: 15, color: 'white'}}> 建立 </Text>
          </TouchableHighlight>
        );
    }else{
      return(<View></View>)
    }

  }
  renderNewCourseHeader(headerTitle) {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        <TouchableHighlight onPress={this.concealCreateCourse}>
          <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
        </TouchableHighlight>
        <Text style={{ marginTop: 15, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}> {headerTitle} </Text>
        {this.renderNewCourseCreateButton()}
      </View>
    );
  }
  createCourse(){

    let { error_courseName,
          error_startDate,
          error_endDate,
          error_range
        } = this.courseDataValidator();

    //this.courseDataValidator();
    if(!error_courseName &&
       !error_startDate  &&
       !error_endDate    &&
       !error_range
    ){
      //this.props.hideHeader(false); //call this when exit 建立班級
      //this.props.courseOperation(false);
      //this.updateCourses(this.props.loginState.xAuth);
      let requestBody = {
        name: this.state.courseName,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
      this.createCourseAPI(requestBody);

    }else{

      let errorMsg = '';
      if(error_courseName){
        errorMsg = errorMsg.concat('\n課程名稱空白\n');
        console.log('this.state.error_courseName', this.state.error_courseName);
      }
      if(error_startDate){
        errorMsg = errorMsg.concat('開始日期空白\n');
        console.log('this.state.error_startDate', this.state.error_startDate);
      }
      if(error_endDate){
        errorMsg = errorMsg.concat('結束日期空白\n');
        console.log('this.state.error_endDate', this.state.error_endDate);
      }
      if(error_range){
        errorMsg = errorMsg.concat('結束日期小於開始日期\n');
        console.log('this.state.error_range', this.state.error_range);
      }

      Alert.alert(
      '無法建立班級',
       errorMsg ,
      [
        {text: 'OK', onPress: () => {
          console.log('on alert------');}},
      ],
      { cancelable: false }
    );
    }

  }

  courseDataValidator(){

      let error_courseName = true;
      let error_startDate = true;
      let error_endDate = true;
      let error_range = false;

    if(this.state.courseName == undefined){
      error_courseName = true;
    }else{
      if(this.state.courseName.length == 0){
        error_courseName = true;
      }else{
        error_courseName = false;
      }
    }

    if(this.state.startDate == undefined){
      error_startDate = true;
    }else{
      error_startDate = false;
    }
    if(this.state.endDate == undefined){
      error_endDate = true;
    }else{
      error_endDate = false;
    }
    if((this.state.endDate != undefined) && (this.state.startDate != undefined)){
      if(Date.parse(this.state.endDate) < Date.parse(this.state.startDate)){
        error_range = true;
      }else{
        error_range = false;
      }
    }
   return {
     error_range,
     error_endDate,
     error_startDate,
     error_courseName
   }
  }
  concealCreateCourse(){
    console.log('concealCreateCourse');
    //this.setState({classOperation: false});
    this.props.courseOperation(false);
    this.props.hideHeader(false);
  }

  createCourseAPI(body){
    fetch(CONFIG.API_BASE_URL.concat('/courses/'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth
      },
      body: JSON.stringify(body)
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                this.props.hideHeader(false); //call this when exit 建立班級
                                this.props.courseOperation(false);
                                this.updateCourses(this.props.loginState.xAuth);
                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderCourseAndJoinButton(){
    if (this.state.fetchCourse){
      return(<View style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 100
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
    switch(this.role){
      case 'student':
        return this.studentJoinCourse();
      case 'teacher':
        return this.teacherCreateCourse();
    }

  }
  renderStartDateTitle(){
    if(this.state.startDate){
      return(<Text>班級開始時間</Text>);
    }
  }
  renderEndDateTitle(){
    if(this.state.endDate){
      return(<Text>班級結束時間</Text>);
    }
  }
  renderCourseTitle(){
    if(this.state.courseName){
      return(<Text>班級名稱</Text>);
    }
  }
  teacherCreateCourse(){
    return(
      <View style={{flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 25
      }}>
      <Image
       style={{width: 100, height: 100, marginBottom: 30}}
       source={require('../../img/color-logo.png')}
      />

        <View
          style={{
            borderColor: 'gray',
            width: 300,
            height: 50,
            borderBottomWidth: 1,
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
        {this.renderCourseTitle()}
        <TextInput
          style={{height: 40,
            width: 150,
            marginLeft: 20,
            fontSize: 16
          }}
          autoFocus={true}
          keyboardType= 'default'
          maxLength={150}
          placeholder='班級名稱'
          placeholderTextColor='gray'
          onChangeText={(courseName) => {
            this.setState({courseName});
            // save
          }}
        value={this.state.courseCode}

      />
      </View>
        <View style={{width: 300,
          height: 50,
          borderBottomWidth: 1,
          borderColor: 'gray',
          display:'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          {this.renderStartDateTitle()}
          {this.renderDatePicker('班級開始時間', this.state.startDate, 'startDate')}
        </View>
        <View style={{width: 300,
          height: 50,
          borderBottomWidth: 1,
          borderColor: 'gray',
          display:'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          {this.renderEndDateTitle()}
          {this.renderDatePicker('班級結束時間', this.state.endDate, 'endDate')}
        </View>
        {this.renderCourseAndJoinButton()}
      </View>
    );
  }
  studentJoinCourse(){
    return(
      <View style={{flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 25
      }}>
        <View style={{height: 50}}>
        <Text style={{fontSize: 17}}> 輸入你想加入的班級代碼 </Text>
        <Text style={{fontSize: 14}}> 欲想了解班級代碼，可詢問班級老師</Text>
        </View>
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
  getCourseOperationHeader(){
    switch(this.role){
      case 'student':
      return '加入班級';
      case 'teacher':
      return '建立班級'
      default:
      return '';
    }
  }
  render() {
    //console.log(this.props.currentCourse);
    if(this.props.courseOperationState){
      if(this.props.courseOperationState.open){
        return (
          <View>
          {this.renderNewCourseHeader(this.getCourseOperationHeader())}
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
            console.log('..this.props.currentCourse', this.props.currentCourse);

            //如果進入課務的新增作品繳交項目
            //refresh 這一頁
            if(this.props.literaryWorksState === 'O_Course_Task'){
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
            }else{
              /*
              O_Course_Task
              A_New_Task
              B_Edit_Task
              C_Nth_Task
              D_Recommend_Work
              */
              return (
                <View style={{ display: 'flex',
                               flex: 1,
                               backgroundColor: 'gray'

                              }}>
                    <LiteraryWork />
                </View>
              );
            }
          }
        }else{
          return (
            <View style={{ flex: 5,
                           backgroundColor: 'white' }}>
            <Text>

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
                  載入最新資訊...
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
  return bindActionCreators({
    hideHeader,
    courseOperation,
    setCurrentCourse
   }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
    //selectedFeature: state.selectedFeature,
    loginState: state.loginState,
    currentCourse: state.currentCourse,
    hideHeaderOperation: state.hideHeaderOperation,
    courseOperationState: state.courseOperation,
    literaryWorksState: state.literaryWorksState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
//export default connect(mapStateToProps, mapDispatchToProps)(LearningView);
export default connect(mapStateToProps, mapDispatchToProps)(LearningView);
