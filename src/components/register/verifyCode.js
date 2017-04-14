import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { RegStyles } from './registerConf';
import { NoLabelInput, TransparentCardSection } from '../common';

class VerifyCode extends Component {
  constructor(props){
    super(props);
    this.state = {
      verifyCode: '',
      resendCount: 1
    }
    this.onResendRequest = this.onResendRequest.bind(this);
  }
  onResendRequest(){
    this.setState(Object.assign({}, this.state, {resendCount: this.state.resendCount + 1}));
    console.log('resend....', this.state.resendCount, this.state.verifyCode);
  }
  render() {
    return (
          <View>
            <Text style={RegStyles.headerStyle}>
            輸入4位數驗證碼
            </Text>
            <TransparentCardSection>
              <NoLabelInput
                placeholder="請於此輸入驗證碼"
                label="VerifyCode"
                value={this.state.verifyCode}
                maxLength = {4}
                onChangeText={verifyCode => this.setState({ verifyCode })}
              />
            </TransparentCardSection>
            <TouchableHighlight onPress={this.onResendRequest}>
              <Text style={{textAlign: 'center'}}>
               尚未收到驗證碼，再傳送一次
              </Text>
            </TouchableHighlight>
          </View>);
  }
}

export default  VerifyCode ;
