import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions,
         Alert } from 'react-native';
import { CrmHeader, CrmHeaderOld } from '../common/CrmHeader';
import { RegStyles } from './registerConf';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regRole } from '../../actions/index';

const window = Dimensions.get('window');

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
    this.setCurrentButtonStyle = this.setCurrentButtonStyle.bind(this);
    this.onHandleCont = this.onHandleCont.bind(this);
  }
  /*
  When user hits back, filled data will be retrieved and filled automatically
  */
  componentWillMount(){
    let buttonHeight = window.height - 150;
    if(this.props.registerSpec.role){
      this.selectRole(this.props.registerSpec.role);
      this.state.nextButton
      = {
          position: 'absolute',
          display: 'flex',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#00B9F1',
          backgroundColor: '#00B9F1',
          width: 320,
          height: 50,
          marginTop: buttonHeight,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        };
        this.setState({'nextButtonText': {
          color: 'white'
          }
        });
    }else{
      this.state.nextButton
      = {
          position: 'absolute',
          display: 'flex',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#00B9F1',
          width: 320,
          height: 50,
          marginTop: buttonHeight,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        };
        this.setState({'nextButtonText': {
          color: '#00B9F1'
          }
        });
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
        this.props.regRole( role );
        this.setCurrentButtonStyle();
        break;
      case 'student':
        this.setState({t_uri: this.x_teacher,
                       s_uri: this.o_student,
                       teacherTextStyle:{color: 'black'},
                       studentTextStyle:{color: 'skyblue', fontWeight: 'bold'},
                       selectedRole: 'student'});
        this.props.regRole( role );
        this.setCurrentButtonStyle();
        break;
      default:
      break;
    }
  }
  setCurrentButtonStyle(){
    let buttonHeight = window.height - 150;
    this.setState({
      'nextButton': {
        position: 'absolute',
        display: 'flex',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#00B9F1',
        backgroundColor: '#00B9F1',
        width: 320,
        height: 50,
        marginTop: buttonHeight,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      },
      'nextButtonText': {
        color: 'white'
      }
    }
    );
  }

  onHandleCont(){
    if(this.state.nextButtonText.color === 'white'){
      this.props.next();
    }else{
      Alert.alert(
        '請先選擇您的身份',
        '\n選擇老師或學生身份後繼續',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const styles = {
      externalContainerStyle: {

        flex: 3,
        flexDirection: 'column',

        justifyContent: 'space-between'
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
      },
      nextButton: {
        position: 'absolute',
        display: 'flex',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#00B9F1',
        width: 320,
        height: 50,
        marginTop: window.height - 150,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      },
      nextButtonActive: {
        position: 'absolute',
        display: 'flex',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#00B9F1',
        backgroundColor: '#00B9F1',
        width: 320,
        height: 50,
        marginTop: window.height - 150,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      }
    };
    return (

      <View style={{display: 'flex', flex: 3}}>
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
       <TouchableHighlight
        style={this.state.nextButton}
        onPress={this.onHandleCont}
       >
         <Text style={this.state.nextButtonText}>繼續</Text>
       </TouchableHighlight>
       </View>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ regRole }, dispatch);
}

function mapStateToProps(state) {
  return {
        registerSpec: state.registerSpec
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRole);
