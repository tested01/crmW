import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class TabViewExample extends Component {
  constructor(props){
    super(props);
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: '最新' },
      { key: '2', title: '熱門' },
    ]
  };

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => <TabBar {...props} />;

  renderHot(){
    return(
      <View style={{ flex: 1, alignItems: 'center' }}>
      <Text> hot </Text>
      </View>
    );
  }

  renderNewest(){
    return(
      <View style={{ flex: 1, alignItems: 'center' }}>
       <Text>  newest </Text>
      </View>
    );
  }


  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return this.renderNewest();
    case '2':
      return this.renderHot();
    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onRequestChangeTab={this.handleChangeTab}
      />
    );
  }
}
