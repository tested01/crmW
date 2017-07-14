import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Keyboard, TouchableWithoutFeedback,
  TouchableHighlight } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import { RegStyles } from './registerConf';
import { TransparentCardSection } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regPhone } from '../../actions/index';
import { CONFIG } from '../../config.js';

const window = Dimensions.get('window');
const buttonHeight = window.height - 150;

class Phone extends Component {
  constructor(props){
    super(props);
    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.onHandleCont = this.onHandleCont.bind(this);
    this.sendMsgCallback = this.sendMsgCallback.bind(this);
    this.sendMsgCallback = this.sendMsgCallback.bind(this);
    this.checkReduxInfo = this.checkReduxInfo.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.resetCurrentButtonStyle = this.resetCurrentButtonStyle.bind(this);
    this.setCurrentButtonStyle = this.setCurrentButtonStyle.bind(this);
    this.updateButton = this.updateButton.bind(this);
    this.fetchCode = this.fetchCode.bind(this);
    //cmd: nexmo setup ee13e258 d4ea91c43db3cb86
  }

  componentWillMount(){
    console.log('phone-componentWillMount');
    this.setState({valid: false});
    this.resetCurrentButtonStyle();
    this.checkReduxInfo(this.updateButton);
  }

  checkReduxInfo(callBack){
    console.log('reduxPhone', this.props.registerSpec.phone);
    //check phone valid
    if(this.props.registerSpec.phone){
      if(this.props.registerSpec.phone.length == 13){//TODO: check tel format
        this.setState({ valid: true}, callBack);
      }
    }
  }

  updateButton(){
    console.log('call updateButton');
    if(this.state.valid){
      this.setCurrentButtonStyle();
      console.log('call updateButton true');
    }else{
      this.resetCurrentButtonStyle();
      console.log('call updateButton false');
    }
  }

  updateInfo(){
    this.setState({
        valid: this.refs.phone.isValidNumber(),
        type: this.refs.phone.getNumberType(),
        value: this.refs.phone.getValue()
    }, this.updateButton); // change ButtonStyle here

    if(this.refs.phone.getValue().length > 0){
      this.props.regPhone(this.refs.phone.getValue());
    }else{
      this.props.regPhone('+886');
    }
    console.log(this.refs.phone.getValue(), 'type phone');
    console.log(this.state, 'phone');

  }

  renderInfo(){
    console.log(this.state, 'phone');
  }

  sendMsgCallback(){
    console.log('sendMsgCallback');
  }
  fetchCode(){
    //TODO: generate a code or old code ...
    return "5566";
  }
  sendMsg(){
    let apiKey = "ee13e258";
    let apiSecret = "d4ea91c43db3cb86";
    let toPhone = "886910828323";
    let smsText = "你好, \n 非常感謝你使用 uShow, \n 你收到的驗證碼是 " + this.fetchCode();
    let encodedSmsText = encodeURI(smsText);
    let url = "https://rest.nexmo.com/sms/json?api_key=" + apiKey +
    "&api_secret=" + apiSecret + "&to=" + toPhone + "&from=uShow&text=" + encodedSmsText;
    let encodedUrl = url;
    let passMsg = '你的電話是' + this.state.value + ',\n\n';
    passMsg+=smsText;
    /*
    fetch(encodedUrl, { //SMS verification
      method: 'GET',
      headers: {
        }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                console.log('myPhone', json)
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    */

    let nextStep = this.props.next;

    Alert.alert(
      '電話格式正確, 因為簡訊試用 API 限制較多, 先以此模擬',
      passMsg,
      [
        {text: 'OK', onPress: () => nextStep()},
      ],
      { cancelable: false }
    );
  }

  setCurrentButtonStyle(){
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
  resetCurrentButtonStyle(){
    this.setState({
      'nextButton': {
        position: 'absolute',
        display: 'flex',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#00B9F1',
        backgroundColor: 'white',
        width: 320,
        height: 50,
        marginTop: buttonHeight,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      },
      'nextButtonText': {
        color: '#00B9F1'
      }
    }
    );
  }

  //nexmo.message.sendSms(sender, recipient, message, options, callback);
  onHandleCont(){
    //let { condition, errorMsg } = this.verifyTheForm();
    ////Check is the phone # correct?
    let condition = this.state.valid;
    errorMsg = JSON.stringify(this.state);

    if(this.state.type){
      // if not first loading, type will not be undefined
      if(condition){
        this.sendMsg();
      }
    }else{
      // only active when first loading with previous redux data
      if(this.props.registerSpec.phone){
        if(this.props.registerSpec.phone.length == 13){//TODO: check tel format
          condition = true;
          this.setState({
            value: this.props.registerSpec.phone,
            valid: true
          }, this.sendMsg);

        }
      }
    }
    if(condition){
       // pass
    }else{
      //Alert if the phone # is incorrect
      Alert.alert(
        '填寫手機號碼資料',
        '手機號碼格式不符合',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );

    }
  }

  render() {
    /*
    <TouchableHighlight
    onPress={this.renderInfo}>
    <Text style={{fontSize: 5}}> phone info </Text>
    </TouchableHighlight>
    */
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text style={RegStyles.headerStyle}>
        輸入手機進行驗證
        </Text>
        <View style={styles.container}>
          <PhoneInput
          initialCountry='tw'
          style={{margin: 'auto'}}
          cancelText='取消'
          confirmText='選取'
          value={this.props.registerSpec.phone}
          onChangePhoneNumber={this.updateInfo}
          onSelectCountry={this.updateInfo}
          ref='phone'
          />
        </View>

        <TouchableHighlight
          style={this.state.nextButton}
          onPress={this.onHandleCont}
          >
          <Text style={this.state.nextButtonText}>繼續</Text>
        </TouchableHighlight>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

let styles = StyleSheet.create({
    nextButton: {
      position: 'absolute',
      display: 'flex',
      borderWidth: 2,
      borderRadius: 10,
      width: 320,
      height: 50,
      borderColor: '#00B9F1',
      marginTop: window.height - 150,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 2,
        borderColor: 'gray',
        margin: 15,
        paddingTop: 60
    },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ regPhone }, dispatch);
}

function mapStateToProps(state) {
  return {
        registerSpec: state.registerSpec
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone);
