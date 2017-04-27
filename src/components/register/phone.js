import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import { RegStyles } from './registerConf';
import { TransparentCardSection } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regPhone } from '../../actions/index';


class Phone extends Component {

  constructor(props){
    super(props);
    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }

  updateInfo(){
    this.setState({
        valid: this.refs.phone.isValidNumber(),
        type: this.refs.phone.getNumberType(),
        value: this.refs.phone.getValue()
    });

    if(this.refs.phone.getValue().length > 0){
      this.props.regPhone(this.refs.phone.getValue());
    }else{
      this.props.regPhone('+886');
    }

  }
  renderInfo(){
    console.log(this.state, 'phone');
  }

  render() {
    return (
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
        onPress={this.renderInfo}>
        <Text>get info</Text>
        </TouchableHighlight>

      </View>);
  }
}

let styles = StyleSheet.create({
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
