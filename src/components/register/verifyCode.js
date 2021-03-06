import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, Alert,
  Keyboard, TouchableWithoutFeedback, TextInput, Platform
 } from 'react-native';
import { RegStyles } from './registerConf';
import { SmsVerifyInput, TransparentCardSection } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regVerifyCode } from '../../actions/index';
import { CONFIG } from '../../config.js';

const window = Dimensions.get('window');
const buttonHeight = window.height - 350;

const styles = {
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
  }
}

class VerifyCode extends Component {
  constructor(props){
    super(props);
    this.state = {
      verifyCode: '',
      resendCount: 1
    }
    this.onResendRequest = this.onResendRequest.bind(this);
    this.setCurrentButtonStyle = this.setCurrentButtonStyle.bind(this);
    this.resetCurrentButtonStyle = this.resetCurrentButtonStyle.bind(this);
    this.updateButton = this.updateButton.bind(this);
    this.onHandleCont = this.onHandleCont.bind(this);
    this.nextStepRegister = this.nextStepRegister.bind(this);
    this.renderContinue = this.renderContinue.bind(this);
  }
  componentWillMount(){
    this.resetCurrentButtonStyle();
  }
  updateButton(){
    console.log('call updateButton');
    if(this.state.verifyCode.length == 4){
      this.setCurrentButtonStyle();

    }else{
      this.resetCurrentButtonStyle();

    }
  }
  onResendRequest(){
    this.setState(Object.assign({}, this.state, {resendCount: this.state.resendCount + 1}));
    console.log('resend....', this.state.resendCount, this.state.verifyCode);
    fetch(CONFIG.API_BASE_URL.concat('/phone/').concat(this.props.registerSpec.phone), {
      method: 'GET',
      headers: {
        }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                console.log('myPhone3', json);
                                if(json.status == 'success'){
                                  Alert.alert(
                                    '請檢查簡訊',
                                    '已重新發送, 請檢查簡訊, 並輸入收到的四位數驗證碼',
                                    [
                                      {text: 'OK', onPress: () => console.log('error: no code')},
                                    ],
                                    { cancelable: false }
                                  );
                                }else{
                                  Alert.alert(
                                    '簡訊要求太頻繁',
                                    '請檢查簡訊, 或是回到上一步確認電話號碼是否輸入正確',
                                    [
                                      {text: 'OK', onPress: () => console.log('error: no code')},
                                    ],
                                    { cancelable: false }
                                  );
                                }

                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });

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
  nextStepRegister(){
    console.log('this.props.next();');
    this.props.next();
  }
  onHandleCont(){
    //this.props.next();
    //Alert here if error
    let nextStep = this.nextStepRegister;

    if(this.state.verifyCode){
      if(this.state.verifyCode.length == 0){
        Alert.alert(
          '請輸入四位數驗證碼',
          '請檢查簡訊, 並輸入收到的四位數驗證碼',
          [
            {text: 'OK', onPress: () => console.log('error: no code')},
          ],
          { cancelable: false }
        );
      }else{
        if(this.state.verifyCode.length < 4){
          Alert.alert(
            '輸入驗證碼不足四位數',
            '請檢查簡訊, 並輸入收到的四位數驗證碼',
            [
              {text: 'OK', onPress: () =>console.log('error: code is too short')},
            ],
            { cancelable: false }
          );
        }else{
          //nextStep();
          let body = {
            phone: this.props.registerSpec.phone,
            code: this.state.verifyCode
          };
          console.log('body2', body, JSON.stringify(body));
          //TODO: check the input code against Redux code
          //      and assign the check result to checkResult
          fetch(CONFIG.API_BASE_URL.concat('/phone/'), {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
           })
            .then((response) => {
              if (response.status === 200) {

                response.json().then(json => {
                                      console.log('myPhone2', json);
                                      let checkResult = false;
                                      if(json.status === 'match'){
                                        checkResult = true;

                                        console.log(checkResult);
                                      }

                                      if(checkResult){
                                        nextStep();
                                      }else{
                                        Alert.alert(
                                          '驗證碼錯誤',
                                          '請檢查簡訊, 確認輸入正確的四位數驗證碼; 若沒收到簡訊, 可返回上一頁檢查是否輸入錯誤的電話號碼',
                                          [
                                            {text: 'OK', onPress: () => console.log('error: no code')},
                                          ],
                                          { cancelable: false }
                                        );
                                      }

                                    });
              } else {
                console.log(response.status);
              }
            })
            .catch((error) => {
              console.log(error);
            });



        }
      }
    }else{
      Alert.alert(
        '請輸入四位數驗證碼',
        '請檢查簡訊, 並輸入收到的四位數驗證碼',
        [
          {text: 'OK', onPress: () => console.log('error: state is not ready')},
        ],
        { cancelable: false }
      );
    }

  }

  renderContinue(){
    if(Platform.OS === 'android'){
      return(
        <View style={{width: window.width, height: 200}}>
        <TouchableHighlight
          style={this.state.nextButton}
          onPress={this.onHandleCont}
          >
          <Text allowFontScaling={false} style={this.state.nextButtonText}>繼續</Text>
        </TouchableHighlight>
        </View>
      )
    }else{
      return(
        <View></View>
      );
    }

  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text allowFontScaling={false} style={RegStyles.headerStyle} >
            輸入4位數驗證碼
            </Text>
            <View style={{
              position: 'absolute', marginTop: 100, display: 'flex',
              alignItems: 'center', width: window.width
          }}>
              <Text>{this.props.registerSpec.phone}</Text>
            </View>
            <View style={{
              height: 80,
              width: window.width,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <SmsVerifyInput
              placeholder=""
              label="VerifyCode"
              maxLength={4}
              inputStyle={{justifyContent: 'center', alignItems: 'center'}}
              value={this.state.verifyCode}
              keyboardType="phone-pad"
              onChangeText={verifyCode => {
                this.props.regVerifyCode(verifyCode);
                this.setState({ verifyCode }, this.updateButton);
              }}
            />
            </View>
            <TouchableHighlight onPress={this.onResendRequest}>
              <Text allowFontScaling={false} style={{textAlign: 'center', marginTop: 10}}>
               尚未收到驗證碼，再傳送一次
              </Text>
            </TouchableHighlight>
            {this.renderContinue()}
            <TouchableHighlight
              style={this.state.nextButton}
              onPress={this.onHandleCont}
              >
              <Text allowFontScaling={false} style={this.state.nextButtonText}>繼續</Text>
            </TouchableHighlight>
          </View>
          </TouchableWithoutFeedback>
        );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ regVerifyCode }, dispatch);
}

function mapStateToProps(state) {
  return {
        registerSpec: state.registerSpec
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);
