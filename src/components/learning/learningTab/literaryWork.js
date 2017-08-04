
import React, { Component } from 'react';
import { View,
  Text,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  TextInput,
  SegmentedControlIOS
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addNewTask,
  endAddNewTask,
  editTask,
  endEditTask,
  viewTask,
  endViewTask,
  recommendTask,
  clearImages,
  endRecommendWork,
  submitWork,
  endSubmitWork,
  hideHeader,
  setCurrentMission,
  setCurrentCourse,
  setCurrentMissions,
  setCurrentMissionPosts
 } from '../../../actions';
import { PleaseSelectCourseFirst, GLOBLE } from '../../common';
import WorkCard from './workCard';
import TaskCard from './taskCard';
import PhotoCard from './photoCard';
import { StudentCardList } from './studentCard';
import { StudentOptionList } from './studentOption';
import StudentWorkSubmit from './studentWorkSubmit';
import { CONFIG } from '../../../config';



//import ExhibitionView from '../../exhibition/ExhibitionView';
/*
export default function() {
  return (<ExhibitionView />);
}*/

const styles = {
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
};

class LiteraryWork extends Component{
  constructor(props){
    super(props);
    this.createNewTask = this.createNewTask.bind(this);
    this.resetLiteraryWork = this.resetLiteraryWork.bind(this);
    this.editTask = this.editTask.bind(this);
    this.viewTask = this.viewTask.bind(this);
    this.enderC_Nth_Task_Content = this.renderC_Nth_Task_Content.bind(this);
    this.renderD_Recommend_Work = this.renderD_Recommend_Work.bind(this);
    this.submitWork=this.submitWork.bind(this);
    this.courseWorks=this.courseWorks.bind(this);
    this.renderHeaderRight=this.renderHeaderRight.bind(this);
    this.taskCardFactory = this.taskCardFactory.bind(this);
    this.taskCardTemplate = this.taskCardTemplate.bind(this);
    this.setInitMissionInfo = this.setInitMissionInfo.bind(this);
    this.setWorkPageIndex = this.setWorkPageIndex.bind(this);
    this.renderCourseWorksByTask = this.renderCourseWorksByTask.bind(this);
    //this.setSubmittedYet = this.setSubmittedYet.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.updateCurrentCourse = this.updateCurrentCourse.bind(this);
  }
  componentWillMount(){
    let initSubmittedYet = false;
    if(this.props.currentMission.detail){
      if(this.props.currentMission.detail.
                          students.submitted
                          .indexOf(this.props.loginState.id) > -1){
                            initSubmittedYet = true;
                          }
    }
    this.state = {
      currentTaskId: 0, //the id of selecting task
      selectedIndex: 0,
      studentSubmitStatus: 'Overview', //Overview, submitWork, courseWorks
      submittedYet : initSubmittedYet

  };
  }
  updateCurrentCourse(currentCourseCode) {

    fetch(CONFIG.API_BASE_URL.concat('/courses/').concat(currentCourseCode), {
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
                                this.props.setCurrentCourse(json.course);
                                let currentCourseId = json.course._id;
                                fetch(CONFIG.API_BASE_URL.concat('/missions/courses/').concat(currentCourseId), {
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

                                                            this.props.setCurrentMissions(json.missions);
                                                            //this.setState(Object.assign({}, this.state, {currentMissions: json.missions}));
                                                            console.log('course updated...');
                                                          });

                                    } else {
                                      console.log(response.status);
                                    }
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
  setInitMissionInfo(taskName, startDate, endDate){
    console.log('setInitMissionInfo...');
    this.taskName = taskName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.setState({taskName});
    console.log(this.taskName, this.startDate, this.endDate, 'tn');
    this.setState({startDate});
    this.setState({endDate});
  }
  renderCreateTaskButton(){
    return(
      <View style={{backgroundColor: 'white', margin: 5}}>
      <Icon.Button
       name='pencil'
       size={20}
       color='gray'
       style={{marginRight: 10}}
       backgroundColor='#e8e8e8'
       onPress={this.createNewTask}
       >
       <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'gray'}}>新增作品繳交項目</Text>
      </Icon.Button>
      </View>
    );
  }
  createNewTask(){
    //hide original headerText
    //change the literaryWork state
    this.props.hideHeader(true);
    this.props.addNewTask();
  }

  editTask(){
    this.props.hideHeader(true);
    this.props.editTask();
  }

  viewTask(){
    this.props.hideHeader(true);
    this.props.viewTask();
  }


  submitWork(){
    this.props.hideHeader(true);
    this.setState({studentSubmitStatus: 'submitWork'});
    this.setState({selectedIndex: 0});
    this.props.submitWork();
  }
  /*
  this.setState({value: event.target.value}, function () {
    console.log(this.state.value);
  });
  */
  courseWorks(){
    this.setState({selectedIndex: 1}, function () {
      this.courseWorksSync();
    });
  }
  courseWorksSync(){
    this.props.hideHeader(true);
    this.setState({studentSubmitStatus: 'courseWorks'});
    console.log(this.state.selectedIndex, 'selectedIndex');
    this.props.submitWork();
  }



  //TODO: taskCard Factory
  taskCardFactory(){

    //fetch missions based on currentCourse
    return (
      <View>
        {this.props.currentMissions.map((mission)=>this.taskCardTemplate(mission))}
      </View>
    );

  }
  taskCardTemplate(mission){
    let startDay = GLOBLE.formatDateString(mission.missionDuration.startDate, '/');
    let endDay = GLOBLE.formatDateString(mission.missionDuration.endDate, '/');

    let submittedSet = mission.students.submitted;
    let courseSet = mission.target.members.students;
    let notSubmittedSet = [...courseSet].filter(x => submittedSet.indexOf(x) < 0 );

    return(
      <TaskCard title={mission.title}
      submit={ submittedSet.length }
      notYet={ notSubmittedSet.length }
      key={ mission._id }
      missionId={ mission._id }
      setInitMissionInfo={ this.setInitMissionInfo }
      startDate={ mission.missionDuration.startDate }
      endDate={ mission.missionDuration.endDate }
      setCurrentMission={ this.props.setCurrentMission }
      duration={ startDay + '~' + endDay}
      editTask = { this.editTask }
      viewTask = { this.viewTask }
      teacher={mission._creator}
      setCurrentMissionPosts={this.props.setCurrentMissionPosts}
      loginState={this.props.loginState}
      missionDetail={mission}
      />
    );
  }
  renderTeacherPage(){
    return (
      <View style={{display: 'flex',
      flex: 1,
      margin: 5
      }}>
      {this.renderCreateTaskButton()}
      <ScrollView style={{
      }}>
       {this.taskCardFactory()}
      </ScrollView>
      <View style={{height: 50, width:window.width}}></View>
      </View>
    );
  }

  studentCardTemplate(mission){
    let startDay = GLOBLE.formatDateString(mission.missionDuration.startDate, '/');
    let endDay = GLOBLE.formatDateString(mission.missionDuration.endDate, '/');
    console.log(mission, 'work card mission');
    let submittedYet = 'no';
    if (mission.students.submitted.indexOf(this.props.loginState.id) > -1){
      submittedYet = 'yes';
    }else{
      submittedYet = 'no';
    }
    return(
      <WorkCard submitted={submittedYet}
                hasCourseWorks={'yes'}
                title={mission.title}
                key={mission._id}
                missionId={ mission._id }
                setInitMissionInfo={ this.setInitMissionInfo }
                startDate={ mission.missionDuration.startDate }
                endDate={ mission.missionDuration.endDate }
                setCurrentMission={this.props.setCurrentMission}
                subtitle={'期限 | '.concat(startDay).concat(' ~ ').concat(endDay)}
                submitWork={this.submitWork}
                courseWorks={this.courseWorks}
                setWorkPageIndex={this.setWorkPageIndex}
                loginState={this.props.loginState}
                setCurrentMissionPosts={this.props.setCurrentMissionPosts}
                teacher={mission._creator}
                missionDetail={mission}
      />
    );

  }
  studentCardFactory(){

    //fetch missions based on currentCourse
    return (
      <View>
        {this.props.currentMissions.map((mission)=>this.studentCardTemplate(mission))}
      </View>
    );

  }
  renderStudentPage(){
    //this.props.currentMissions;
    return(
      <View style={{display: 'flex', flex: 1}}>
      <ScrollView style={{display: 'flex', flex: 1}}>
      {this.studentCardFactory()}
      </ScrollView>
      <View style={{height: 50, width:window.width}}></View>
      </View>
    );
    /*
    return(
      <ScrollView style={{display: 'flex', flex: 1}}>
       <WorkCard submitted='yes'
                 hasCourseWorks='yes'
                 title='第一篇作品'
                 subtitle='期限 | 2017/03/31 ~ 2017/05/06'
                 submitWork={this.submitWork}
                 courseWorks={this.courseWorks}
       />
       <WorkCard submitted='yes'
                 hasCourseWorks='no'
                 title='第二篇作品'
                 subtitle='期限 | 2017/01/01 ~ 2017/02/02'
       />
       <WorkCard submitted='no'
       hasCourseWorks='yes'
       title='第三篇作品'
       subtitle='期限 | 2017/02/12 ~ 2017/03/31'
       />
       <WorkCard submitted='no'
       hasCourseWorks='no'
       title='第四篇作品'
       subtitle='期限 | 2017/12/01 ~ 2017/12/02'
       />
      </ScrollView>
    );
    */
  }

  setWorkPageIndex(index){
    //TODO: 把以下 selectedIndex 改成 redux state
    this.setState({selectedIndex: index});
  }
  renderSubmitWorkPage(){
    let title = this.props.currentMission.title;
    console.log(this.props.currentMission, 'currentMission');
    return (
      <View style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
      {this.renderSubmitWorkPageHeader(title)}
      <SegmentedControlIOS
            values={['作品繳交', '班級作品']}
            selectedIndex={this.state.selectedIndex}
            style={{ width: 280, marginTop: 10, alignSelf: 'center'}}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
          />

        <View style={{flex: 1}}>
          {
            this.renderSubmitWorkPageContent()
          }
        </View>

      </View>
    );
  }

  setSubmittedYet(bValue){
    this.setState({submittedYet: bValue},
      ()=>console.log('setSubmittedYet', bValue, this.state.submittedYet)
    );

  }

  renderDisplay(){

      let myEmail = this.props.loginState.email;

      let teacher = this.props.currentMission.teacher;
      let teacherFullName = teacher.lastName.concat(teacher.firstName);
      if(this.props.currentMissionPosts.length > 0){
        //filter
        let myPost = this.props.currentMissionPosts.filter(function(el) {
          return el.author.email === myEmail;
        });
        //FIXME: update delay: after image will show in a flash
        return(
          <PhotoCard
            key={myPost[0]._id}
            _id={myPost[0]._id}
            post={myPost[0]}
            resources={myPost[0].detail.resources}
            loginState={this.props.loginState}
            title={myPost[0].detail.title}
            author={myPost[0].author.lastName.concat(myPost[0].author.firstName)}
            publishDate={myPost[0].createdDate}
            teacher={teacherFullName}
          >
          </PhotoCard>

        );
    }else{

      return(
        <Text></Text>
      );
    }

}
/*
  renderSubmit(){

  }*/

  renderSubmitWorkPageContent(){
      //TODO: check if student has post for the mission
      // If (s)he did, fetch the post and fill in the form


      //To check if current user has submitted for this mission:
      //----------------------------------------------------
      //Intersect this.props.currentMission, current users,
      // and this.props.currentMissionPosts


     let submittedYet = (this.props.currentMission.detail.
                         students.submitted
                         .indexOf(this.props.loginState.id) > -1);

      //PhotoCard


      if(this.state.selectedIndex === 0){
        if(submittedYet){
          return(this.renderDisplay());
        }else{
          return(
            <StudentWorkSubmit
            loginState={this.props.loginState}
            currentMission={this.props.currentMission}
            resetLiteraryWork={this.resetLiteraryWork}
             />);
        }
      }

      if(this.state.selectedIndex === 1){
        return(
          <View>
          {this.renderCourseWorksByTask()}
          </View>
          );
      }

    return(<Text></Text>);
  }

  renderCourseWorksByTask(){
  /*
  <PhotoCard
    title='標題'
    author={}
    publishDate={}
    teacher={}
  >
  </PhotoCard>
  */
  if(this.props.currentMissionPosts){
    return(
      <ScrollView style={{backgroundColor: '#dedfe0'}}>
      {this.props.currentMissionPosts.map((post)=>this.renderPost(post))}
      <View style={{height:50,
        width:window.width,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }} >
        <Text> 沒有更多文章了... </Text>
      </View>
      </ScrollView>
    );
  }else{
    return(<Text>Loading posts</Text>);
  }

  }

  renderPost(post){
    let createdDate = post.createdDate;
    let resources = post.detail.resources;

    let teacher = this.props.currentMission.teacher;
    let teacherFullName = teacher.lastName.concat(teacher.firstName);
    return(
      <PhotoCard
        key={post._id}
        _id={post._id}
        post={post}
        resources={resources}
        loginState={this.props.loginState}
        title={post.detail.title}
        author={post.author.lastName.concat(post.author.firstName)}
        publishDate={createdDate}
        teacher={teacherFullName}
      >
      </PhotoCard>
    );
  }
  renderSubmitWorkPageHeader(headerTitle) {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        <Icon.Button
         name="angle-left"
         size={30}
         color='white'
         style={{marginTop: 15, marginRight: 10}}
         backgroundColor='transparent'
         onPress={this.resetLiteraryWork}
         />
        <Text style={{ marginTop: 15, marginLeft: -35, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}>
          {headerTitle}
        </Text>
        <View style={{width: 30}}></View>

      </View>
    );
  }


  renderNewTaskHeader(headerTitle) {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        {this.renderHeaderLeft()}
        <Text style={{ marginTop: 15, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}>
          {headerTitle}
        </Text>
        {this.renderHeaderRight()}
      </View>
    );
  }

  renderHeaderLeft(){
    switch(this.props.literaryWorksState){
      case 'A_New_Task':
        return(
          <TouchableHighlight onPress={this.resetLiteraryWork}>
            <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
          </TouchableHighlight>
        );
      case 'B_Edit_Task':
        return(
          <TouchableHighlight onPress={this.resetLiteraryWork}>
            <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
          </TouchableHighlight>
        );
      case 'C_Nth_Task':
        return(
          <Icon.Button
           name="angle-left"
           size={30}
           color='white'
           style={{marginTop: 15, marginRight: 10}}
           backgroundColor='transparent'
           onPress={this.resetLiteraryWork}
           />
        );
      case 'D_Recommend_Work':
        return(
          <TouchableHighlight onPress={()=>console.log('nothing')}>
            <Text style={{ marginTop: 15, color: 'transparent', fontSize:30}}> no </Text>
          </TouchableHighlight>
        );
      default:
        return(
          <TouchableHighlight onPress={()=>console.log('unknown state')}>
            <Text style={{ marginTop: 15, color: 'white'}}></Text>
          </TouchableHighlight>
        );
    }
  }

  renderHeaderRight(){
    switch(this.props.literaryWorksState){
      case 'A_New_Task':
        let updateCurrentCourse = this.updateCurrentCourse;
        let courseCode = this.props.currentCourse.code;
        return(
          <TouchableHighlight onPress={()=>{
            console.log('##', this.state.taskName, this.state.startDate, this.state.endDate);
            //TODO:check if the task creation data are correct

            //TODO:call API save the task creatation data
            let body = {
              title: this.state.taskName,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              target: this.props.currentCourse._id
            };
            fetch(CONFIG.API_BASE_URL.concat('/missions/'), {
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
                                        //TODO: update current missions
                                        console.log('!!!mission added!!!');
                                        updateCurrentCourse(courseCode);
                                      });

                } else {
                  console.log(response.status, 'mission');
                }
              })
              .catch((error) => {
                console.log(error);
              });
            //return to original view
            this.resetLiteraryWork();
          }}>
            <Text style={{ marginTop: 15, color: 'white'}}> 新增 </Text>
          </TouchableHighlight>
        );
      case 'B_Edit_Task':
        return(
          <TouchableHighlight onPress={()=>{
            //TODO: save the change
            console.log(this.props.currentMission, 'this.props.currentMission');
            let tName = '';
            let sDate = '';
            let eDate = '';

            if(this.state.taskName){
              tName = this.state.taskName;
            }
            if(this.state.startDate){
              sDate = this.state.startDate;
            }
            if(this.state.endDate){
              eDate = this.state.endDate;
            }
            let updateFields = {
              "target": this.props.currentCourse._id
            };
            //如果是空字串, 不更新, 用原來的資料寫回
            if(tName.length > 0){
              updateFields['title'] = tName;
            }else{
              updateFields['title'] = this.props.currentMission.title;
            }
            if(sDate.length > 0){
              updateFields['startDate'] = sDate;
            }else{
              updateFields['startDate'] = GLOBLE.formatDateString(this.props.currentMission.startDate, '-');
            }
            if(eDate.length > 0){
              updateFields['endDate'] = eDate;
            }else{
              updateFields['endDate'] = GLOBLE.formatDateString(this.props.currentMission.endDate, '-');
            }
            fetch(CONFIG.API_BASE_URL.concat('/missions/').concat(this.props.currentMission.id), {
              method: 'PATCH',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth': this.props.loginState.xAuth //FIXME:teachauth
                //'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGVjNzBkY2E5NTZhMjdiMTk5YmNkOTEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkxODkwMzk3fQ._5J7xKENI4jsX8--0EtEnFV195SySjSfVyze_rcxewQ'
              },
              body: JSON.stringify(updateFields)
             })
              .then((response) => {
                if (response.status === 200) {

                  response.json().then(json => {
                                        //this.setState(Object.assign({}, this.state, json));
                                        console.log('patch success?', json);
                                      });
                } else {
                  console.log(response.status);
                }
              })
              .catch((error) => {
                console.log(error);
              });

            this.resetLiteraryWork();



          }}>
            <Text style={{ marginTop: 15, color: 'white'}}> 完成 </Text>
          </TouchableHighlight>
        );
      case 'C_Nth_Task':
        return(
          <TouchableHighlight onPress={
            ()=>{
              this.props.recommendTask();
            }
          }>
            <Text style={{ marginTop: 15, color: 'white'}}> 選取 </Text>
          </TouchableHighlight>
        );
      case 'D_Recommend_Work':
        return(

          <Icon.Button
           name='close'
           size={20}
           color='white'
           style={{marginRight: 0, marginTop: 15}}
           backgroundColor='transparent'
           onPress={this.props.endRecommendWork}
           />

        );
      default:
        return(
          <TouchableHighlight onPress={()=>console.log('unknown state')}>
            <Text style={{ marginTop: 15, color: 'white'}}></Text>
          </TouchableHighlight>
        );
    }
  }

  //回到本頁初始狀態
  resetLiteraryWork(){
    this.props.hideHeader(false);
    if(this.props.loginState.role === 'teacher'){
      this.props.endAddNewTask();
      this.props.endEditTask();
      this.props.endViewTask();
    }
    if(this.props.loginState.role === 'student'){
      this.setState({studentSubmitStatus: 'Overview'});
      this.props.endSubmitWork();
      this.props.clearImages();
    }

  }
  renderEmptyForm(featureTitle, edit){
    let titleLabel='';
    let startDateLabel='';
    let endDateLabel='';
    if(edit === 'new'){
      titleLabel='項目名稱';
      startDateLabel='繳交開始時間';
      endDateLabel='繳交結束時間';
    }
    if(edit === 'edit'){
      titleLabel=this.props.currentMission.title;
      startDateLabel=GLOBLE.formatDateString(this.props.currentMission.startDate, '-');
      endDateLabel=GLOBLE.formatDateString(this.props.currentMission.endDate, '-');
    }
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
      {this.renderNewTaskHeader(featureTitle)}
      <View style={{borderBottomWidth: 1, margin: 20}}>
      <TextInput
        multiline={false}
        maxLength={100}
        placeholder={titleLabel}
        onChangeText={(taskName) => {
          this.setState({taskName});
        }}
        style={{height: 50, marginLeft: 25, marginTop: 30, fontSize: 16}}
        value={this.state.text}
      />
      </View>
      <View style={{borderBottomWidth: 1, margin: 20}}>
        <DatePicker
          style={{width: 150}}
          date={this.state.startDate}
          mode="date"
          placeholder={
            startDateLabel
          }
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
            }
            // ... You can check the source to find the other keys.
          }}
              onDateChange={(date) => {
                this.setState({startDate: date});
                }
              }
        />
      </View>
      <View style={{borderBottomWidth: 1, margin: 20}}>
        <DatePicker
          style={{width: 150}}
          date={this.state.endDate}
          mode="date"
          placeholder={
            endDateLabel
          }
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
              fontSize: 16

            }
            // ... You can check the source to find the other keys.
          }}
              onDateChange={(date) => {
                this.setState({endDate: date});
                }
              }
        />
      </View>
      </View>
    );
  }
  editOrCreateTask(featureTitle, type){
    if(type==='edit'){

      return this.renderEmptyForm(featureTitle,
        type);
    }else{
      return this.renderEmptyForm(featureTitle,
      type);
    }

  }

  renderA_New_Task(){
    //style={styles.taskNameInputStyle}
    //{this.renderNewTaskHeader('繳交項目')}
    return this.editOrCreateTask('繳交項目', 'new');
  }

  renderB_Edit_Task(){
    return this.editOrCreateTask('編輯', 'edit');
  }

  renderC_Nth_Task(){

    return (
      <View style={{flex: 1, backgroundColor: 'white' }}>
        {this.renderNewTaskHeader(this.props.currentMission.title)}
        <SegmentedControlIOS
              values={['作品繳交', '班級作品']}
              selectedIndex={this.state.selectedIndex}
              style={{ width: 280, marginTop: 10, alignSelf: 'center'}}
              onChange={(event) => {
                this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
              }}
            />
        <ScrollView>
        <View style={{ flex: 1, alignItems: 'center' }}>
            {this.renderC_Nth_Task_Content()}
        </View>
        </ScrollView>
      </View>
    );
  }

  //selectedIndex
  renderC_Nth_Task_Content(){
    if(this.state.selectedIndex === 0){
      return(
        <StudentCardList
         loginState={this.props.loginState}
         currentMission={this.props.currentMission}
         currentMissionPosts={this.props.currentMissionPosts}
        />)

    }

    if(this.state.selectedIndex === 1){
      return(
        <View>
        {this.renderCourseWorksByTask()}
        </View>
        );
      //studentOption
    }

    return(<Text></Text>);
  }

  renderD_Recommend_Work(){
    return(
      <View style={{flex: 1, backgroundColor: 'white' }}>
        {this.renderNewTaskHeader('選取作品')}
        <StudentOptionList
         loginState={this.props.loginState}
         currentMissionPosts={this.props.currentMissionPosts}
        />
      </View>
    );
  }

  render(){
    if(this.props.currentCourse.code===''){
      return (<PleaseSelectCourseFirst />);
    }else{
      const role = this.props.loginState.role;
      if( role == 'teacher'){
        if(this.props.literaryWorksState === 'O_Course_Task'){
            return this.renderTeacherPage();
        }else{
          switch(this.props.literaryWorksState){
            case 'A_New_Task':
              return this.renderA_New_Task();
            case 'B_Edit_Task':
              console.log('B_Edit_Task');
              return this.renderB_Edit_Task();
            case 'C_Nth_Task':
              console.log('C_Nth_Task');
              return this.renderC_Nth_Task();
            case 'D_Recommend_Work':
              console.log('D_Recommend_Work');
              return this.renderD_Recommend_Work();
            default:
              console.log('unknownState');
              return (<Text>unknownState</Text>);
          }
        }
      }

      if( role === 'student'){

        if(this.props.literaryWorksState === 'O_Course_Task'){
          return this.renderStudentPage();
        }else{
          //TODO: has not submitted yet vs submitted (edit)
          return this.renderSubmitWorkPage();
        }
      }

      return this.renderOtherPage();
    }
  }

}

// Anything returned from this function will end up as props
// on the LoginForm container

function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({
    addNewTask,
    endAddNewTask,
    editTask,
    endEditTask,
    viewTask,
    endViewTask,
    recommendTask,
    endRecommendWork,
    submitWork,
    clearImages,
    endSubmitWork,
    hideHeader,
    setCurrentMission,
    setCurrentCourse,
    setCurrentMissions,
    setCurrentMissionPosts
   }, dispatch);
}

function mapStateToProps(state) {
  return {
    loginState: state.loginState,
    literaryWorksState: state.literaryWorksState,
    currentCourse: state.currentCourse,
    currentMissions: state.currentMissions,
    currentMission: state.currentMission,
    currentCourse: state.currentCourse,
    currentMissionPosts: state.currentMissionPosts
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(LiteraryWork);
