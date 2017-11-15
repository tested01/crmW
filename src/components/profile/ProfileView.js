import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from '../common/Globle';
import { CONFIG } from '../../config';
import MyWorkScreen from './MyWorkScreen';
import { signOut } from '../../actions';

const {height, width} = Dimensions.get('window');

const config = {
  headerSize: 100
};
/*
<Image
  source={require('../../img/react-logo.png')}
  resizeMode="contain"
  fadeDuration={0}
  style={{ width: 30, height: 30, marginTop: 1  }}
/>
*/
function renderButton(buttonTitle, handler, iconName, iconSize, color='black'){

  return (
    <TouchableOpacity
      style={styles.optionsContainer}
      onPress={handler}>
      <View style={styles.option}>

        <View style={styles.optionIconContainer}>
        </View>
        <View style={styles.optionTextContainer}>
          <Text allowFontScaling={false} style={{
            fontSize: 15,
            marginLeft: 30,
            color: color
          }}>
            {buttonTitle}
          </Text>
        </View>
        <Icon
          name={iconName}
          size={iconSize}
          color={color}
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
    this.renderMyWorks = this.renderMyWorks.bind(this);
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
    /*
    paddingHorizontal: 1,
    paddingVertical: 1
    //underlineColorAndroid={'rgba(0,0,0,0)'}  Android textInput's underline
    */
     <TouchableOpacity
       style={styles.optionsContainer}
       onPress={handler}>
       <View style={{
         flexDirection: 'row',
         justifyContent: 'space-between',
         backgroundColor: 'white',//rgba(0,0,0,0.02)
         marginTop: 5,
         marginBottom: 5
       }}>
         <View style={{flex: 2, height: 50, justifyContent: 'center', marginLeft: 10}}>
           <Text allowFontScaling={false} style={{fontSize: 15}}>
             {buttonTitle}
           </Text>
         </View>
         <View style={{width: width - 150, justifyContent: 'flex-end'}}>
         <TextInput
           style={{
             height: 30,
             flex: 5.5,
             textAlign: 'right',
             color: 'gray'
           }}
           underlineColorAndroid={'rgba(0,0,0,0)'}
           onChangeText={handler}
           value={value}
           editable={editable}
         />
         </View>
         <Icon
           name="angle-right"
           size={30}
           color='gray'
           backgroundColor='transparent'
           style={{ marginLeft: 20, alignSelf: 'center', flex: 0.5}}
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
        <Text allowFontScaling={false} style={{ marginTop: 15, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}> {headerTitle} </Text>
        <Text>  </Text>
      </View>
    );
  }
  renderMyworksButton(){
    if(this.props.loginState.role == 'teacher'){
      return (
        <View>
        <Text></Text>
        </View>
      );
    }
    if(this.props.loginState.role === 'student')
    {
      return renderButton('我的作品', () => {
        this.setState({pageLocation:'myWorks'});
      }, 'angle-right', 30);
    }
  }
  renderLogoutButton(){
    return renderButton('登出', () => {

      Alert.alert(
        '登出',
        '確定是否要登出',
        [
          {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: '確定', onPress: () => this.props.signOut()},
        ],
        { cancelable: false }
      );
    }, 'angle-right', 30, 'red');
  }
  renderProfile() {
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
          source={require('../../img/background.png')}
        />
        <Image
         style={{ width: config.headerSize,
                  height: config.headerSize,
                  marginTop: -(config.headerSize/2),
                  marginBottom: 10,
                  borderRadius: config.headerSize / 2,
                  alignSelf: 'center',
                  borderWidth: 2,
                  borderColor: 'white'
                 }}
                  source={require('../../img/love-logo.png')}
        />

        <Text allowFontScaling={false} style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}> { fullName } </Text>

        </View>
        </View>

        { renderButton('個人資料', () => this.setState({pageLocation:'editProfile'}), 'angle-right', 30)}
        { this.renderMyworksButton() }
        { this.renderLogoutButton() }

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
          <MyWorkScreen loginState={this.props.loginState}/>
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
    alignItems: 'center',
    backgroundColor: 'white',//rgba(0,0,0,0.02)
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  optionText: {
    fontSize: 15,
    marginLeft: 30
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

function mapDispatchToProps(dispatch) {

  return bindActionCreators({ signOut }, dispatch);
}

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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
