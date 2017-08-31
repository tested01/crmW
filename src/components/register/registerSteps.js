import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registeredRequest, registerRequest, loginSuccess } from '../../actions/index';
import FillForm from './fillForm';
import Phone from './phone';
import SchoolInfo from './schoolInfo';
import SelectRole from './selectRole';
import VerifyCode from './verifyCode';
import RegisterSuccess from './registerSuccess';
import { CONFIG } from '../../config';

class RegisterSteps extends Component {
  constructor(props){
    super(props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.state = {step: 0};
  }
  conditionalRender(){
    switch(this.state.step){
      case 0:
        return (< SelectRole next={this.next}/>);
      case 1:
        return (< FillForm next={this.next}/>);
      case 2:
        return (< SchoolInfo next={this.next}/>);
      case 3:
        return (< Phone next={this.next}/>);
      case 4:
        return (< VerifyCode next={this.next}/>);
      case 5:
        return (< RegisterSuccess next={this.next}/>)
    }
  }
  next() {
    console.log(this.props.registerSpec, 'current reg');
    let currentState = this.state.step;
    var nextState = {};
    switch(this.state.step){
      case 0:
      case 1:
      case 2:
      case 3:
        nextState = Object.assign({}, this.state, { step: currentState + 1});
        this.setState(nextState);
        break;
        case 4:
          nextState = Object.assign({}, this.state, { step: currentState + 1});
          //this.setState(nextState);

          /*
          fetch(CONFIG.API_BASE_URL.concat('/users/login'), { //auto log in
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.props.registerSpec.email,
              password: this.props.registerSpec.password
            }) })
            .then((response) => {
              if (response.status === 200) {
                this.props.loginSuccess(true, response.headers.get('x-auth'), this.props.registerSpec.role);
              } else {
                this.props.loginSuccess(false, '');
              }
            })
            .catch((error) => {
              console.log(error);
            });
           */
            fetch(CONFIG.API_BASE_URL.concat('/users'), { //auto log in
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.props.registerSpec.email,
                password: this.props.registerSpec.password,
                role: this.props.registerSpec.role,
                firstName: this.props.registerSpec.firstname,
                lastName: this.props.registerSpec.lastname,
                phone: this.props.registerSpec.phone,
                schoolName: this.props.registerSpec.schoolName,
                schoolType: this.props.registerSpec.schoolType,
                schoolLevel: this.props.registerSpec.schoolLevel,
                schoolCity: this.props.registerSpec.schoolCity

              }) })
              .then((response) => {
                if (response.status === 200) {
                  this.props.loginSuccess(true, response.headers.get('x-auth'), this.props.registerSpec.email, this.props.registerSpec.role);
                  this.props.registeredRequest(); //Set as register completed
                  console.log('reging...');
                  response.json().then(json => {
                                        console.log(json, json._id, 'reg_login_info');
                                        this.props.loginSuccess(true, response.headers.get('x-auth'), this.props.registerSpec.email, this.props.registerSpec.role, json._id, json);

                                      });
                } else {
                  this.props.loginSuccess(false, '', '', '', '', '');

                  console.log('not reging...');
                  response.json().then(json => {
                                        console.log(json, 'reg_login_error');
                                      });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          break;
      case 5:
        //TODO: add a button to call this.props.registeredRequest(); ==> Login page
        // or this.props.loginSuccess();  ==> login directly
        break;
    }


  }
  previous() {
    switch(this.state.step){
      case 0:
        this.props.registeredRequest();
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        let currentState = this.state.step;
        var nextState = Object.assign({}, this.state, { step: currentState - 1});
        this.setState(nextState);
        break;
     case 5:
        break;
    }

    console.log('previous');
  }
  renderHeader() {
    if (this.state.step != 5){
      return(<View style={styles.headerStyle}>
        <Icon.Button
          name="angle-left"
          backgroundColor="white"
          color="gray"
          onPress={this.previous}
          size={38}
        >
        </Icon.Button>
        <Text> </Text>
        <TouchableHighlight onPress={()=>console.log('Deprecate Button: no action')}>
                <Text style={{color: 'transparent'}}> 繼續 </Text>
        </TouchableHighlight>
      </View>);
    }else{
      return (<View />)
    }

  }
  render() {
    return (
      <View>
      {this.renderHeader()}
      {this.conditionalRender()}
      </View>
    );
    //return (< VerifyCode />);
  }
}

const styles = {
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
}

// Anything returned from this function will end up as props
// on the LoginForm container
function mapDispatchToProps(dispatch) {

  return bindActionCreators({ registeredRequest, registerRequest, loginSuccess }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
        register: state.register,
        registerSpec: state.registerSpec
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(RegisterSteps);
