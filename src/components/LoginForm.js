import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginSuccess } from '../actions/index';
import { CustomizedButton, MaterialCard, TransparentCardSection, NoLabelInput, Spinner } from './common';

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


    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }) })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.headers.get('x-auth'));
          this.onLoginSuccess();
          console.log(this.props.loginState, 'success1');
          this.props.loginSuccess(true, response.headers.get('x-auth'));
          console.log(response.status);
          console.log(this.props.loginState, 'success2');
        } else {
          this.onLoginFail();
          this.props.loginSuccess(false, '');
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
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email.toLowerCase()}
            onChangeText={email => this.setState({ email: email.toLowerCase() })}
          />
        </TransparentCardSection>

        <TransparentCardSection>
          <NoLabelInput
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </TransparentCardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <TransparentCardSection>
          {this.renderButton()}
        </TransparentCardSection>
        <Text style={styles.linkTextStyle}> 訪客登入 </Text>
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
    fontSize: 15,
    alignSelf: 'center',
    color: 'white'
  }
};


// Anything returned from this function will end up as props
// on the LoginForm container
function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ loginSuccess }, dispatch);
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
