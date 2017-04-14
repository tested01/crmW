import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { CrmHeader, CrmHeaderOld } from '../common/CrmHeader';
import { RegStyles } from './registerConf';

class SelectRole extends Component {
  constructor(props){
    super(props);
    this.x_student = 'https://raw.githubusercontent.com/tested01/materialFiles/master/07_App_0331/%E9%81%B8%E6%93%87%E8%BA%AB%E5%88%86/%E5%AD%B8%E7%94%9F.png';
    this.o_student = 'https://raw.githubusercontent.com/tested01/materialFiles/master/07_App_0331/%E9%81%B8%E6%93%87%E8%BA%AB%E5%88%86/%E5%AD%B8%E7%94%9F%E9%81%B8%E5%8F%96.png';
    this.x_teacher = 'https://raw.githubusercontent.com/tested01/materialFiles/master/07_App_0331/%E9%81%B8%E6%93%87%E8%BA%AB%E5%88%86/%E8%80%81%E5%B8%AB.png';
    this.o_teacher = 'https://raw.githubusercontent.com/tested01/materialFiles/master/07_App_0331/%E9%81%B8%E6%93%87%E8%BA%AB%E5%88%86/%E8%80%81%E5%B8%AB%E9%81%B8%E5%8F%96.png';
    this.x_parent = 'https://raw.githubusercontent.com/tested01/materialFiles/master/07_App_0331/%E9%81%B8%E6%93%87%E8%BA%AB%E5%88%86/%E5%AE%B6%E9%95%B7.png';
    this.state = {
      s_uri: this.x_student,
      t_uri: this.x_teacher,
      p_uri: this.x_parent,
      teacherTextStyle:{color: 'black'},
      studentTextStyle:{color: 'black'},
      selectedRole: ''
    }
  }
  selectRole(role){
    switch(role){
      case 'teacher':
      this.setState({s_uri: this.x_student,
                     t_uri: this.o_teacher,
                     teacherTextStyle:{color: 'skyblue', fontWeight: 'bold'},
                     studentTextStyle:{color: 'black'},
                     selectedRole: 'teacher'});
      break;
      case 'student':
      this.setState({t_uri: this.x_teacher,
                     s_uri: this.o_student,
                     teacherTextStyle:{color: 'black'},
                     studentTextStyle:{color: 'skyblue', fontWeight: 'bold'},
                     selectedRole: 'student'});
      break;
      default:
      break;
    }
  }
  render() {
    const styles = {
      externalContainerStyle: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-around'
      },
      cotainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      viewStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      },
      textViewStyle: {
        height: 100,
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center'
      },
      viewDisableStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#c6c6c6',
        justifyContent: 'center',
        alignItems: 'center'
      },
      textStyle: {
        textAlign: 'center'
      },
      textDisableStyle: {
        textAlign: 'center',
        color: 'gray'
      },
      headerStyle: {
        textAlign: 'center',
        height: 150,
        lineHeight: 150,
        fontSize: 25
      }
    };
    return (
      <View>
        <Text style={RegStyles.headerStyle}>
          選擇身份
        </Text>
          <View style={styles.externalContainerStyle}>
          <View style={styles.cotainerStyle}>
              <TouchableHighlight onPress={() => this.selectRole('teacher')}>
                <Image
                  style={styles.viewStyle}
                  source={{uri: this.state.t_uri}}
                />
              </TouchableHighlight>

              <TouchableHighlight onPress={() => this.selectRole('student')}>
                <Image
                  style={styles.viewStyle}
                  source={{uri: this.state.s_uri}}
                />
              </TouchableHighlight>

              <TouchableHighlight onPress={() => console.log('select parent')}>
                <Image
                  style={styles.viewStyle}
                  source={{uri: this.state.p_uri}}
                />
              </TouchableHighlight>
           </View>
       </View>
       <View style={styles.cotainerStyle}>
       <View style={styles.textViewStyle}><Text style={this.state.teacherTextStyle}>老師</Text></View>
       <View style={styles.textViewStyle}><Text style={this.state.studentTextStyle}>學生</Text></View>
       <View style={styles.textViewStyle}><Text style={{color:'gray'}}>家長</Text></View>
       </View>
       </View>
    );
  }
}

export default SelectRole;
