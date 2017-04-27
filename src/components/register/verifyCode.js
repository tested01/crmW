import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { RegStyles } from './registerConf';
import { NoLabelInput, TransparentCardSection } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regVerifyCode } from '../../actions/index';

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
                maxLength={4}
                value={this.state.verifyCode}
                keyboardType="phone-pad"
                onChangeText={verifyCode => {
                  this.props.regVerifyCode(verifyCode);
                  this.setState({ verifyCode });
                }}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ regVerifyCode }, dispatch);
}

function mapStateToProps(state) {
  return {
        registerSpec: state.registerSpec
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);
