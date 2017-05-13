import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from '../../common/Globle';

class TaskCard extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.editTask = this.editTask.bind(this);
  }

  editTask(){
    this.props.editTask();
  }
  render(){
     // st stands for submit
     let st = {
        submitText: '未繳交',
        submitColor: 'gray'
      };
      if(this.props.submitted == 'yes'){
        st = {
           submitText: '已繳交',
           submitColor: '#ffcc00'
         };
      }
      // hcw stands for has Course Works
      let hcw = {
        courseWorkText: '班級作品',
        courseWorkColor: 'gray'
      }
      if(this.props.hasCourseWorks == 'yes'){
        hcw = {
           courseWorkText: '班級作品',
           courseWorkColor: '#ffcc00'
         };
       }
       const window = Dimensions.get('window');
       const styles = {
         taskCard: {
           display: 'flex',
           flexDirection: 'row',
           backgroundColor: '#f2f2f2',
           margin: 2,
           height: 108,
           width : window.width,
           justifyContent: 'space-between',
           alignItems: 'center'
         },
         stat: {
           display: 'flex',
           flexDirection: 'row',
           marginRight: 5,
           padding: 1,
           justifyContent: 'center',
           alignItems: 'center'
         },
         DateInfo: {
           display: 'flex',
           padding: 15,
           flexDirection: 'column',
           justifyContent: 'space-between',
           alignItems: 'center'
         },
         button: {
           height: 60,
           width: 60,
           borderRadius: 30,
           margin: 3,
           backgroundColor: 'gray',
           justifyContent: 'center',
           alignItems: 'center'
         },
         buttonBlue: {
           height: 60,
           width: 60,
           borderRadius: 30,
           margin: 3,
           backgroundColor: GLOBLE.COLOR.BLUE,
           justifyContent: 'center',
           alignItems: 'center'
         },
         buttonWithLabel: {
           display: 'flex',
           margin: 5,
           justifyContent: 'center',
           alignItems: 'center'
         }
       };
    return(
      <TouchableHighlight onPress={this.props.viewTask}>
      <View style={styles.taskCard}>
        <View style={styles.DateInfo}>
          <View style={{ flex: 1, alignSelf: 'flex-start'}}>
            <Text style={{ fontSize: 16 }}> {this.props.title} </Text></View>
          <View>
            <View><Text style={{ fontSize: 12 }}> 期限| </Text></View>
            <View><Text style={{ fontSize: 12 }}> { this.props.duration } </Text></View>
          </View>
        </View>
        <View style={styles.stat}>
          <View style={styles.buttonWithLabel}>
            <View style={styles.buttonBlue}>
            <Text style={{color: 'white', fontSize: 20}}> { this.props.submit } </Text>
            </View>
            <Text style={{color: 'gray' }}> 已繳交 </Text>
          </View>
          <View style={styles.buttonWithLabel}>
            <View style={styles.button}>
            <Text style={{color: 'white', fontSize: 20}}> { this.props.notYet } </Text>
            </View>
            <Text style={{color: 'gray'}}> 未繳交 </Text>
          </View>
          <View style={{alignSelf: 'flex-start'}}>
            <Icon.Button name="edit"
              color='gray'
              backgroundColor='transparent'
              onPress={this.editTask}
            >
            </Icon.Button>
          </View>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

export default TaskCard;
