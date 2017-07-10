import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { RegStyles } from './registerConf';
import { NoLabelUnderlineInput, TransparentCardSection } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regFirstname, regLastname, regEmail, regPassword } from '../../actions/index';

const window = Dimensions.get('window');
const styles = {
  nextButton: {
    position: 'absolute',
    display: 'flex',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#00B9F1',
    width: 320,
    height: 50,
    marginTop: window.height - 250,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
class FillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  }
  componentWillMount(){
    if(this.props.registerSpec.email){
      this.changeEmail(this.props.registerSpec.email);
    }
    if(this.props.registerSpec.password){
      this.changePassword(this.props.registerSpec.password);
    }
    if(this.props.registerSpec.firstname){
      this.changeFirstname(this.props.registerSpec.firstname);
    }
    if(this.props.registerSpec.lastname){
      this.changeLastname(this.props.registerSpec.lastname);
    }
  }
  changeEmail(email){
    this.setState({ email: email.toLowerCase() });
    this.props.regEmail(email.toLowerCase());
  }
  changePassword(password){
    this.setState({ password });
    this.props.regPassword(password);
  }
  changeFirstname(firstname){
    this.setState({ firstname });
    this.props.regFirstname(firstname);
  }
  changeLastname(lastname){
    this.setState({ lastname });
    this.props.regLastname(lastname);
  }
  render() {
    return (<View>
      <Text style={RegStyles.headerStyle}>
      填寫帳號資料
      </Text>
      <TransparentCardSection>
      <NoLabelUnderlineInput
        placeholder="user@gmail.com"
        label="Email"
        value={this.state.email}
        keyboardType='email-address'
        onChangeText={email => this.changeEmail(email)}
      />
      </TransparentCardSection>
      <TransparentCardSection>
      <NoLabelUnderlineInput
        secureTextEntry
        placeholder="password"
        label="Password"
        value={this.state.password}
        onChangeText={password => this.changePassword(password)}
      />
      </TransparentCardSection>
      <TransparentCardSection>
      <Text style={{fontSize: 18, color: 'gray'}}>真實姓名</Text>
      </TransparentCardSection>

      <TransparentCardSection style={{flex: 1,
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      borderBottomWidth: 0 }}>

        <NoLabelUnderlineInput
          placeholder="姓氏"
          label="LastName"
          value={this.state.lastname}
          onChangeText={lastname => this.changeLastname(lastname)}
        />


        <NoLabelUnderlineInput
          placeholder="名字"
          label="FirstName"
          value={this.state.firstname}
          onChangeText={firstname => this.changeFirstname(firstname)}
        />

      </TransparentCardSection>
      <TransparentCardSection>
        <Text>
         為了你的使用權利及安全，請務必填寫真實姓名。
        </Text>
      </TransparentCardSection>
      <TouchableHighlight
        style={styles.nextButton}
        onPress={this.props.next}
        >
        <Text style={{color: '#00B9F1'}}>繼續</Text>
      </TouchableHighlight>
      </View>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ regFirstname, regLastname, regEmail, regPassword }, dispatch);
}

function mapStateToProps(state) {
  return {
        registerSpec: state.registerSpec
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FillForm);
