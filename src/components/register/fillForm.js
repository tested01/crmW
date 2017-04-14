import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { RegStyles } from './registerConf';
import { NoLabelUnderlineInput, TransparentCardSection } from '../common';

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
        onChangeText={email => this.setState({ email })}
      />
      </TransparentCardSection>
      <TransparentCardSection>
      <NoLabelUnderlineInput
        secureTextEntry
        placeholder="password"
        label="Password"
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
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
          onChangeText={lastname => this.setState({ lastname })}
        />


        <NoLabelUnderlineInput
          placeholder="名字"
          label="FirstName"
          value={this.state.firstname}
          onChangeText={firstname => this.setState({ firstname })}
        />

      </TransparentCardSection>
      <TransparentCardSection>
        <Text>
         為了你的使用權利及安全，請務必填寫真實姓名。
        </Text>
      </TransparentCardSection>
      </View>);
  }
}


export default FillForm;
