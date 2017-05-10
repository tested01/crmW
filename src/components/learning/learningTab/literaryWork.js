
import React, { Component } from 'react';
import { View,
  Text,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  TextInput
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addNewTask,
  endAddNewTask,
  hideHeader
 } from '../../../actions';
import { GLOBLE } from '../../common/Globle';
import WorkCard from './workCard';
import TaskCard from './taskCard';


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
    this.state = {taskName: '', currentTaskId: ''};
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
       <TaskCard title='第一篇作品' submit={1} notYet={31} duration='2017/3/22 ~2017/3/25'/>
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

  renderNewTaskHeader(headerTitle) {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        {this.renderHeaderLeft()}
        <Text style={{ marginTop: 15, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}> {headerTitle} </Text>
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
          <TouchableHighlight onPress={()=>console.log('ww')}>
            <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
          </TouchableHighlight>
        );
      case 'C_Nth_Task':
        return(
          <TouchableHighlight onPress={()=>console.log('ww')}>
            <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
          </TouchableHighlight>
        );
      case 'D_Recommend_Work':
        return(
          <TouchableHighlight onPress={()=>console.log('ww')}>
            <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
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
            <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
          </TouchableHighlight>
        );
      case 'C_Nth_Task':
        return(
          <TouchableHighlight onPress={()=>console.log('ww')}>
            <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
          </TouchableHighlight>
        );
      case 'D_Recommend_Work':
        return(
          <TouchableHighlight onPress={()=>console.log('ww')}>
            <Text style={{ marginTop: 15, color: 'white'}}> 取消 </Text>
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

  //回到本頁初始狀態
  resetLiteraryWork(){
    this.props.hideHeader(false);
    this.props.endAddNewTask();
  }

  renderA_New_Task(){
    //style={styles.taskNameInputStyle}
    //{this.renderNewTaskHeader('繳交項目')}
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
      {this.renderNewTaskHeader('繳交項目')}
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
            return(<Text>B_Edit_Task</Text>);
          case 'C_Nth_Task':
            console.log('C_Nth_Task');
            return(<Text>C_Nth_Task</Text>);
          case 'D_Recommend_Work':
            console.log('D_Recommend_Work');
            return(<Text>D_Recommend_Work</Text>);
          default:
            console.log('unknownState');
            return (<Text>unknownState</Text>);
        }
      }
    }

    if( role == 'student'){
      return this.renderStudentPage();
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
