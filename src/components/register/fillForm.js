import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, Alert,
  Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView
 } from 'react-native';
import { RegStyles } from './registerConf';
import { NoLabelUnderlineInput, TransparentCardSection } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regFirstname, regLastname, regEmail, regPassword } from '../../actions/index';

const window = Dimensions.get('window');
const buttonHeight = window.height - 150;
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
class FillForm extends Component {
  constructor(props) {
    super(props);
    this.verifyTheForm = this.verifyTheForm.bind(this);
    this.onHandleCont = this.onHandleCont.bind(this);
    this.setCurrentButtonStyle = this.setCurrentButtonStyle.bind(this);
    this.resetCurrentButtonStyle = this.resetCurrentButtonStyle.bind(this);
    this.changePasswordConfirmOffFocus = this.changePasswordConfirmOffFocus.bind(this);

    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      passwordConfirm: ''
    }

  }

  componentWillMount(){
    console.log(this.verifyTheForm(), 'this.verifyTheForm()');

    if(this.verifyTheFormRedux().overallCondition){
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
    this.setState({ email: email.toLowerCase() }, this.verifyTheForm);
    this.props.regEmail(email.toLowerCase());

  }
  changePassword(password){
    this.setState({ password }, this.verifyTheForm);
    this.props.regPassword(password);

  }
  changePasswordConfirm(passwordConfirm){
    this.setState({ passwordConfirm });
    this.verifyTheForm();
  }
  changePasswordConfirmOffFocus(){
    this.verifyTheForm();
  }
  changeFirstname(firstname){
    this.setState({ firstname }, this.verifyTheForm);
    this.props.regFirstname(firstname);

  }
  changeLastname(lastname){
    this.setState({ lastname }, this.verifyTheForm);
    this.props.regLastname(lastname);

  }
  verifyTheForm(){
    // criteria:
    // ---------------------------------------------------
    // Has the email, has the password, has the full name
    // The email should not be duplicated
    // FIXME: current process is not good enough without email verification mechanism
    let verifiedResult = {};

    let lastNameDone = this.state.lastname.length > 0;
    let firstNameDone = this.state.firstname.length > 0;
    let emailDone = (this.state.email.length > 0); //TODO: and other checks
    let passwordDone = (this.state.password.length > 5);
    let passwordConfirmDone = true; //(this.state.password === this.state.passwordConfirm);

    let errorMsg = '\n須先補齊以下資料再繼續流程\n -----------------------------';


    if(!emailDone){
      errorMsg+='\n 需填寫電子信箱'
    }
    if(!passwordDone){
      errorMsg+='\n\n 密碼需介於 6 ~ 20 個英數字母'
    }
    if(!passwordConfirmDone){
      errorMsg+='\n\n 密碼與確認密碼不一致'
    }

    if(!lastNameDone){
      errorMsg+='\n\n 需填寫 姓                 '
    }

    if(!firstNameDone){
      errorMsg+='\n\n 需填寫 名字                 '
    }

    verifiedResult['errorMsg'] = errorMsg;



    let overallCondition = lastNameDone && firstNameDone &&
                           emailDone && passwordDone && passwordConfirmDone;

    verifiedResult['condition'] = overallCondition;

    if(overallCondition){
      this.setCurrentButtonStyle(); //change the button style
    }else{
      this.resetCurrentButtonStyle();
    }

    return verifiedResult;
  }

  verifyTheFormRedux(){
    // criteria:
    // ---------------------------------------------------
    // Has the email, has the password, has the full name
    // The email should not be duplicated
    // FIXME: current process is not good enough without email verification mechanism
    let verifiedResult = {};

    let lastNameDone = false;
    if(this.props.registerSpec.lastname) {this.props.registerSpec.lastname.length > 0};
    let firstNameDone = false;
    if(this.props.registerSpec.firstname) {this.props.registerSpec.firstname.length > 0};
    let emailDone = false;
    if(this.props.registerSpec.email) {(this.props.registerSpec.email.length > 0)}; //TODO: and other checks
    let passwordDone = false;
    if(this.props.registerSpec.password) {(this.props.registerSpec.password.length > 5)};
    let passwordConfirmDone = true; //(this.state.password === this.state.passwordConfirm);

    let errorMsg = '\n須先補齊以下資料再繼續流程\n -----------------------------';


    if(!emailDone){
      errorMsg+='\n 需填寫電子信箱'
    }
    if(!passwordDone){
      errorMsg+='\n\n 密碼需介於 6 ~ 20 個英數字母'
    }
    if(!passwordConfirmDone){
      errorMsg+='\n\n 密碼與確認密碼不一致'
    }

    if(!lastNameDone){
      errorMsg+='\n\n 需填寫 姓                 '
    }

    if(!firstNameDone){
      errorMsg+='\n\n 需填寫 名字                 '
    }

    verifiedResult['errorMsg'] = errorMsg;



    let overallCondition = lastNameDone && firstNameDone &&
                           emailDone && passwordDone && passwordConfirmDone;

    verifiedResult['condition'] = overallCondition;

    if(overallCondition){
      this.setCurrentButtonStyle(); //change the button style
    }

    return verifiedResult;
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
  onHandleCont(){
    //this.props.next
    //this.verifyTheForm();
    let { condition, errorMsg } = this.verifyTheForm();

    if(condition){
      //TODO: change the button color

      this.props.next();

    }else{
      Alert.alert(
        '填寫帳號資料',
        errorMsg,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
  }
  render() {
    /*

    <TransparentCardSection>
    <Text style={{fontSize: 14, color: 'gray'}}>
     {'請再輸入一次密碼確認'}
    </Text>
    </TransparentCardSection>

    <TransparentCardSection>
    <NoLabelUnderlineInput
      secureTextEntry
      placeholder="請再輸入一次密碼確認"
      label="Password"
      value={this.state.passwordConfirm}
      onChangeText={password => this.changePasswordConfirm(password)}
      onEndEditing={this.changePasswordConfirmOffFocus}
    />
    </TransparentCardSection>

    */
    return (
      <KeyboardAvoidingView
      behavior="padding"
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <Text style={RegStyles.headerStyle}>
      填寫帳號資料
      </Text>
      <TransparentCardSection>
      <Text style={{fontSize: 14, color: 'gray'}}>
       {'電子郵件'}
      </Text>
      </TransparentCardSection>
      <TransparentCardSection>
      <NoLabelUnderlineInput
        placeholder="電子郵件"
        label="Email"
        value={this.state.email}
        keyboardType='email-address'
        onChangeText={email => this.changeEmail(email)}
      />
      </TransparentCardSection>
      <TransparentCardSection>
      <Text style={{fontSize: 14, color: 'gray'}}>
       {'英數密碼(6 ~ 20字)'}
      </Text>
      </TransparentCardSection>
      <TransparentCardSection>
      <NoLabelUnderlineInput
        secureTextEntry
        placeholder="英數密碼(6 ~ 20字)"
        label="Password"
        value={this.state.password}
        onChangeText={password => this.changePassword(password)}
      />
      </TransparentCardSection>


      <TransparentCardSection>

      </TransparentCardSection>
      <TransparentCardSection>
      <Text style={{fontSize: 14, color: 'gray'}}>
       {'真實姓名'}
      </Text>
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

        <Text style={{fontSize: 14, color: 'gray'}}>
         {'為了你的使用權利及安全，請務必填寫真實姓名。'}
        </Text>
      </TransparentCardSection>
      <TouchableHighlight
        style={this.state.nextButton}
        onPress={this.onHandleCont}
        >
        <Text style={this.state.nextButtonText}>繼續</Text>
      </TouchableHighlight>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
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
