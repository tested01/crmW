import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class RegisterStep1 extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>
          RegisterStep1
        </Text>
        <Button
          onPress={() => navigate('Step1')}
          title="Learn More"
          color="#841584"
        />
       </View>
    );
  }
}

export default RegisterStep1;
