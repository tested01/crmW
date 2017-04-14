import React, { Component } from 'react';
import { View, TextInput, Picker, Button } from 'react-native';
//import update from 'immutability-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Profile extends Component {
  static navigationOptions = {
    title: '填寫資料'/*,
    header: ({ state, setParams }) => {
    // The navigation prop has functions like setParams, goBack, and navigate.
    const right = (
        <Button
          title="Done"
          onPress={() => console.log(state, setParams)}
        />
      );
    return { right };
  }*/
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      school: '',
      selectors: {
        city: '台北市',
        level: '國小中',
        color: 'red',
        mode: Picker.MODE_DIALOG,
      }
  };
  this.onSubmitProfile.bind(this);
}

  onSubmitProfile() {
    console.log(this.state);
    const { email, password } = this.state;
    console.log(email, password);
    fetch('http://localhost:3000/users', {
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
          //this.onLoginSuccess();
          //this.props.loginSuccess(true, response.headers.get('x-auth'));
          console.log(response.status);
          //console.log(this.props.loginState);
        } else {
          //this.onLoginFail();
          //this.props.loginSuccess(false, '');
          //console.log(this.props.loginState);
          console.log(response.status);
        }
      })
      .catch((error) => {
        //console.log(this.props.loginState);
        console.log(error);
      });
  }

  onSelectorValueChange(key, value) {
    switch (key) {
      case 'city':
        this.setState(update(this.state, {
          selectors: { city: { $set: value } }
        }));
        break;
      case 'level':
        this.setState(update(this.state, {
          selectors: { level: { $set: value } }
        }));
        break;
      default:
        break;
    }
 }

  render() {
    const { params } = this.props.navigation.state;
    const lineHeight = 40;
    const Item = Picker.Item;
    const styles = {
      textStyle: {
        textAlign: 'center'
      },
      picker: {
        width: 100
     }
    };
    //{params.role}
    return (
      <View style={{ borderWidth: 0, flex: 1 }}>
        <KeyboardAwareScrollView style={{ margin: 30 }}>
          <View
          style={{ borderColor: 'gray', borderBottomWidth: 1, elevation: 1 }}
          >
          <TextInput
            style={{ height: lineHeight }}
            onChangeText={(email) => this.setState({ email })}
            placeholder='電子郵件'
            value={this.state.email}
          />
          </View>

          <View
          style={{ borderColor: 'gray', borderBottomWidth: 1, elevation: 1 }}
          >
          <TextInput
            style={{ height: lineHeight }}
            onChangeText={(password) => this.setState({ password })}
            placeholder='密碼'
            value={this.state.password}
          />
          </View>

          <View
          style={{ borderColor: 'gray', borderBottomWidth: 1, elevation: 1 }}
          >
          <TextInput
            style={{ height: lineHeight }}
            onChangeText={(name) => this.setState({ name })}
            placeholder='姓名'
            value={this.state.name}
          />
          </View>

          <Picker
          style={styles.picker}
          selectedValue={this.state.selectors.city}
          onValueChange={this.onSelectorValueChange.bind(this, 'city')}
          itemStyle={{ height: 100 }}
          mode='dialog'
          >
            <Item label="台北市" value="台北市" />
            <Item label="新北市" value="新北市" />
            <Item label="新竹市" value="新竹市" />
            <Item label="桃園市" value="桃園市" />
            <Item label="台中市" value="台中市" />
            <Item label="台南市" value="台南市" />
            <Item label="高雄市" value="高雄市" />
            <Item label="屏東市" value="屏東市" />
            <Item label="台東縣" value="台東縣" />
            <Item label="宜蘭縣" value="宜蘭縣" />
          </Picker>

          <View
          style={{ borderColor: 'gray', borderBottomWidth: 1, elevation: 1 }}
          >
          <TextInput
            style={{ height: lineHeight }}
            onChangeText={(school) => this.setState({ school })}
            placeholder='學校校名'
            value={this.state.school}
          />
          </View>

          <Picker
          style={styles.picker}
          selectedValue={this.state.selectors.level}
          onValueChange={this.onSelectorValueChange.bind(this, 'level')}
          mode='dropdown'
          itemStyle={{ height: 100 }}
          prompt='年級'
          >
            <Item label="國小中" value="國小中" />
            <Item label="國小高" value="國小高" />
            <Item label="國七" value="國七" />
            <Item label="國八" value="國八" />
            <Item label="國九" value="國九" />
            <Item label="高中" value="高中" />
          </Picker>

        </KeyboardAwareScrollView>
        <Button
          title="Done"
          onPress={() => this.onSubmitProfile()}
        />
       </View>
    );
  }
}

export default Profile;
