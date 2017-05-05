
import React, { Component } from 'react';
import { View,
  Text,
  TouchableHighlight,
  Dimensions,
  ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkCard from './workCard';
import TaskCard from './taskCard';

//import ExhibitionView from '../../exhibition/ExhibitionView';
/*
export default function() {
  return (<ExhibitionView />);
}*/

class LiteraryWork extends Component{
  renderCreateTaskButton(){
    return(

      <Icon.Button
       name='pencil'
       size={20}
       color='gray'
       style={{marginRight: 10}}
       backgroundColor='#e8e8e8'
       onPress={()=>console.log('new issue')}
       >
       <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'gray'}}>新增作品繳交項目</Text>
      </Icon.Button>
    );
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


  render(){
    const role = this.props.loginState.role;
    if( role == 'teacher'){
      return this.renderTeacherPage();
    }

    if( role == 'student'){
      return this.renderStudentPage();
    }

    return this.renderOtherPage();

  }

}

// Anything returned from this function will end up as props
// on the LoginForm container
/*
function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ registerLastStep, registerNextStep }, dispatch);
}*/

function mapStateToProps(state) {
  return {
    loginState: state.loginState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps)(LiteraryWork);
