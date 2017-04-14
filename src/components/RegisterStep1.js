import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class RegisterStep1 extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const styles = {
      viewStyle: {
        
      },
      textStyle: {
        textAlign: 'center'
      }
    };
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>
          RegisterStep1
        </Text>
        <Button
          onPress={() => navigate('Step1')}
          title="Next Step (Step2)"
          color="#841584"
        />
       </View>
    );
  }
}

export default RegisterStep1;
