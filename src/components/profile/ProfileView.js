import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from '../common/Globle';
import { CONFIG } from '../../config';
import MyWorkScreen from './MyWorkScreen';

const config = {
  headerSize: 100
};

function renderButton(buttonTitle, handler){
  return (

    <TouchableOpacity
      style={styles.optionsContainer}
      onPress={handler}>
      <View style={styles.option}>
        <View style={styles.optionIconContainer}>
          <Image
            source={require('../../img/react-logo.png')}
            resizeMode="contain"
            fadeDuration={0}
            style={{ width: 30, height: 30, marginTop: 1  }}
          />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>
            {buttonTitle}
          </Text>
        </View>
        <Icon
          name="angle-right"
          size={30}
          color='black'
          backgroundColor='transparent'
          style={{ marginLeft: 20, alignSelf: 'flex-end'}}
          />
      </View>

    </TouchableOpacity>

  );
}

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLocation: 'profile',
      text: 'abc'
    };
    this.backToProfile = this.backToProfile.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderMyworksButton = this.renderMyworksButton.bind(this);
  }
  componentDidMount(){
    this.updateState();
  }
  stateBasedRender() {
    switch(this.state.pageLocation){
      case 'profile':
        return this.renderProfile();
      case 'editProfile':
        return this.renderEditProfile();
      case 'myWorks':
        return this.renderMyWorks();
    }
  }
  backToProfile(){
    this.setState({pageLocation: 'profile'});
  }
  renderEditButton(buttonTitle, value, editable=true, handler){
   return (

     <TouchableOpacity
       style={styles.optionsContainer}
       onPress={handler}>
       <View style={{
         flexDirection: 'row',
         justifyContent: 'space-between',
         backgroundColor: 'white',//rgba(0,0,0,0.02)
         paddingHorizontal: 15,
         paddingVertical: 15
       }}>
         <View style={{flex: 2}}>
           <Text style={{fontSize: 15}}>
             {buttonTitle}
           </Text>
         </View>
         <TextInput
           style={{height: 30, flex: 5.5, textAlign: 'right', color: 'gray'}}
           onChangeText={handler}
           value={value}
           editable={editable}
         />
         <Icon
           name="angle-right"
           size={30}
           color='gray'
           backgroundColor='transparent'
           style={{ marginLeft: 20, alignSelf: 'flex-end', flex: 0.5}}
           />
       </View>

     </TouchableOpacity>

   );
 }
  renderHeader(headerTitle) {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        <Icon.Button
          name="angle-left"
          size={30}
          color='white'
          backgroundColor='transparent'
          style={{ marginLeft: 20, marginTop: 15}}
          onPress={this.backToProfile}
          />
        <Text style={{ marginTop: 15, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}> {headerTitle} </Text>
        <Text>  </Text>
      </View>
    );
  }
  renderMyworksButton(){
    if(this.props.loginState.role == 'teacher'){
      return (<Text></Text>);
    }
    if(this.props.loginState.role === 'student')
    {
      return renderButton('我的作品', () => {this.setState({pageLocation:'myWorks'});
                                      console.log('my works');});
    }

  }
  renderProfile() {
      var {height, width} = Dimensions.get('window');
      let fullName = '';
      if(this.state.lastName){
        fullName = this.state.lastName.concat(this.state.firstName)
      }
      return (
        <ScrollView
                   style={{ flex: 5 }}
        >
        <View
          style={{ backgroundColor: 'white',
                   justifyContent: 'center',
                   alignItems: 'center' }}
        >
        <View style={{ flex: 1,
          backgroundColor: 'white',
          alignItems: 'stretch',
          marginBottom: 15 }}>
        <Image
          style={{width: width, height: height/3}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
        <Image
         style={{ width: config.headerSize,
                  height: config.headerSize,
                  marginTop: -(config.headerSize/2),
                  marginBottom: 10,
                  borderRadius: config.headerSize / 2,
                  alignSelf: 'center',
                  borderWidth: 2 }}
                  source={require('../../img/color-logo.png')}
        />

        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}> { fullName } </Text>

        </View>
        </View>

        { renderButton('個人資料', () => this.setState({pageLocation:'editProfile'}))}
        { this.renderMyworksButton() }

        </ScrollView>
      );
  }
  updateState() {
    //this.props.loginState.xAuth
    fetch(CONFIG.API_BASE_URL.concat('/users/me'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth
      } })
      .then((response) => {
        if (response.status === 200) {
          response.json().then(json => {
                                console.log(json, 'resp2');
                                this.setState(Object.assign({}, this.state, json));
                                console.log(this.state, 'current')
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        //console.log(this.props.loginState);
        console.log(error);
      });
  }
  renderEditProfile(){
    return (
      <View>
         { this.renderHeader('個人資料')}
         { this.renderEditButton('真實姓名', this.state.lastName.concat(this.state.firstName))}
         { this.renderEditButton('暱稱', this.state.nickName)}
         { this.renderEditButton('電話號碼', this.state.phone)}
         { this.renderEditButton('電子郵件', this.state.email, editable=false)}
         { this.renderEditButton('變更密碼', '')}
         { this.renderEditButton('學校地區', this.state.schoolCity)}
         { this.renderEditButton('學校校名', this.state.schoolName)}
         { this.renderEditButton('年級', this.state.schoolLevel)}
      </View>

    );
  }
  renderMyWorks(){
    return (
      <View style={{display: 'flex', flex: 1}}>
        {this.renderHeader('我的作品')}
        <View style={{ flex: 1 }}>
          <MyWorkScreen />
        </View>
      </View>
    );
  }
  render() {
     return(this.stateBasedRender());
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white'
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionsContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',//rgba(0,0,0,0.02)
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 15
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GLOBLE.COLOR.BLUE,
    alignItems: 'center',
    height: 60,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
});


// Anything returned from this function will end up as props
// on the LoginForm container
/*
function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ loginSuccess }, dispatch);
}*/

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
        loginState: state.loginState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
//export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
export default connect(mapStateToProps)(ProfileView);
