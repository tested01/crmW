import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class StudentCard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>
        <Text>
        test { this.props.student.name }
        </Text>
      </View>
    );
  }
}

export { StudentCard };
