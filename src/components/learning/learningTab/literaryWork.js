
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
  endRecommendWork,
  submitWork,
  endSubmitWork,
  hideHeader
 } from '../../../actions';
import { GLOBLE } from '../../common/Globle';
import WorkCard from './workCard';
import TaskCard from './taskCard';
import { StudentCardList } from './studentCard';
import { StudentOptionList } from './studentOption';
import { StudentWorkSubmit } from './studentWorkSubmit';


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

    //this.state.selectedIndex
  }
  componentWillMount(){
    this.state = {
      taskName: '',
      currentTaskId: '',
      selectedIndex: 0,
      studentSubmitStatus: 'Overview', //Overview, submitWork, courseWorks
      currentTaskId: 0 //the id of selecting task
  };
  }
  renderCreateTaskButton(){
    return(

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

    console.log('sw');
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

  }
  renderTeacherPage(){
    return (
      <ScrollView style={{display: 'flex',
      flex: 1,
      margin: 5,
      }}>
       {this.renderCreateTaskButton()}
       <TaskCard title='第一篇作品'
       submit={1}
       notYet={31}
       duration='2017/3/22 ~2017/3/25'
       editTask = {this.editTask}
       viewTask = {this.viewTask}
       />
       <TaskCard title='第二篇作品' submit={12} notYet={21} duration='2017/4/22 ~2017/4/25'/>
       <TaskCard title='第三篇作品' submit={15} notYet={11} duration='2017/5/22 ~2017/5/25'/>
      </ScrollView>
    );
  }
  renderStudentPage(){
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
  }

  renderSubmitWorkPage(){
    let ww = '第三次繳交作品';
    return (
      <View style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
      {this.renderSubmitWorkPageHeader(ww)}
      <SegmentedControlIOS
            values={['作品繳交', '班級作品']}
            selectedIndex={this.state.selectedIndex}
            style={{ width: 280, marginTop: 10, alignSelf: 'center'}}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
          />
        <ScrollView>
          {this.renderSubmitWorkPageContent()}
        </ScrollView>
      </View>
    );
  }

  renderSubmitWorkPageContent(){
    if(this.state.selectedIndex === 0){
      return(<StudentWorkSubmit/>)
      //studentCard
    }

    if(this.state.selectedIndex === 1){
      return(<Text> 班級作品 </Text>)
      //studentOption
    }

    return(<Text></Text>);
  }

  renderSubmitWorkPageHeader(headerTitle) {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        <Icon.Button
         name='angle-left'
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
           name='angle-left'
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
        return(
          <TouchableHighlight onPress={()=>{
            console.log(this.state.taskName, this.state.startDate, this.state.endDate);
            //TODO:check if the task creation data are correct

            //TODO:call API save the task creatation data

            //return to original view
            this.resetLiteraryWork();
          }}>
            <Text style={{ marginTop: 15, color: 'white'}}> 新增 </Text>
          </TouchableHighlight>
        );
      case 'B_Edit_Task':
        return(
          <TouchableHighlight onPress={()=>console.log('ww')}>
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
    }

  }
  editOrCreateTask(featureTitle, rightButtonTitle){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
      {this.renderNewTaskHeader(featureTitle)}
      <View style={{borderBottomWidth: 1, margin: 20}}>
      <TextInput
        multiline={false}
        maxLength={100}
        placeholder='項目名稱'
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
          placeholder="繳交開始時間"
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
          placeholder="繳交結束時間"
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

  renderA_New_Task(){
    //style={styles.taskNameInputStyle}
    //{this.renderNewTaskHeader('繳交項目')}
    return this.editOrCreateTask('繳交項目');
  }

  renderB_Edit_Task(){
    return this.editOrCreateTask('編輯');
  }

  renderC_Nth_Task(){
    console.log('c');
    return (
      <View style={{flex: 1, backgroundColor: 'white' }}>
        {this.renderNewTaskHeader('第二篇作品')}
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
      return(<StudentCardList />)
      //studentCard
    }

    if(this.state.selectedIndex === 1){
      return(<Text> 班級作品 </Text>)
      //studentOption
    }

    return(<Text></Text>);
  }

  renderD_Recommend_Work(){
    return(
      <View style={{flex: 1, backgroundColor: 'white' }}>
        {this.renderNewTaskHeader('選取作品')}
        <StudentOptionList />
      </View>
    );
  }

  render(){
    const role = this.props.loginState.role;
    console.log('literaryWorksState', this.props.literaryWorksState);
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
      /*
      if(this.state.studentSubmitStatus === 'Overview'){
        return this.renderStudentPage();
      }else{
        return this.renderSubmitWorkPage();
      }*/
      if(this.props.literaryWorksState === 'O_Course_Task'){
        return this.renderStudentPage();
      }else{
        return this.renderSubmitWorkPage();
      }
    }

    return this.renderOtherPage();

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
    endSubmitWork,
    hideHeader }, dispatch);
}

function mapStateToProps(state) {
  return {
    loginState: state.loginState,
    literaryWorksState: state.literaryWorksState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(LiteraryWork);
