import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginSuccess, cleanHideHeader } from '../actions/index';
import { CustomizedButton, MaterialCard, TransparentCardSection, NoLabelInput, Spinner } from './common';
import { CONFIG } from '../config';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.onLoginSuccess.bind(this);
    this.onLoginFail.bind(this);
  }
  state = { email: '', password: '', error: '', loading: false };
  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    let login_uri = CONFIG.API_BASE_URL.concat('/users/login');

    fetch(login_uri , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:  email, //fixme2
        password: password
      }) })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.headers.get('x-auth'));
          response.json().then((data) => {
            this.props.cleanHideHeader();
            this.props.loginSuccess(true, response.headers.get('x-auth'), data.email, data.role, data._id, data);

          });
          this.onLoginSuccess();
        } else {
          this.onLoginFail();
          this.props.loginSuccess(false, '', '', '', '', '');
          console.log(this.props.loginState);
        }
      })
      .catch((error) => {
        console.log(this.props.loginState);
        console.log(error);
      });

/*
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  */
  }

  onLoginFail() {
    this.setState({ error: '帳號或密碼錯誤', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <CustomizedButton onPress={this.onButtonPress.bind(this)}>
        登入
      </CustomizedButton>
    );
  }

  render() {
    return (
      <MaterialCard>
        <TransparentCardSection>
          <NoLabelInput
            placeholder="電子信箱"
            label="Email"
            keyboardType="email-address"
            value={this.state.email.toLowerCase()}
            onChangeText={email => this.setState({ email: email.toLowerCase() })}
          />
        </TransparentCardSection>

        <TransparentCardSection>
          <NoLabelInput
            secureTextEntry
            placeholder="密碼"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </TransparentCardSection>

        <Text allowFontScaling={false} style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <TransparentCardSection>
          {this.renderButton()}
        </TransparentCardSection>
        <Text allowFontScaling={false} style={styles.linkTextStyle}> 訪客進入 </Text>

      </MaterialCard>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  },
  linkTextStyle: {
    fontSize: 15, //訪客
    alignSelf: 'center',
    color: 'transparent' //#B3B3B3
  }
};


// Anything returned from this function will end up as props
// on the LoginForm container
function mapDispatchToProps(dispatch) {

  return bindActionCreators({ loginSuccess, cleanHideHeader }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
        loginState: state.loginState,
        register: state.register,
        selectedFeature: state.selectedFeature
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
