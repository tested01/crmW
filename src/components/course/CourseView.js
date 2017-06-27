import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { GLOBLE } from '../common/Globle';
import CourseSelector from '../CourseSelector';
import Notification from './courseTab/notification';
import LiteraryWork from './courseTab/literaryWork';
import UwListView from '../common/UwListView';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftPage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    zIndex: 1,
  },
  label: {
    backgroundColor: 'transparent',
    color: 'gray',
    margin: 8,
  },
  indicator: {
    //backgroundColor: 'black'
    backgroundColor: GLOBLE.COLOR.BLUE,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
    zIndex: 2
  }
});

export default class TabViewInstance extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: '班級資訊' },
      { key: '2', title: '教務通知' },
      { key: '3', title: '作品' },
      { key: '4', title: '成員' }
    ],
  };

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => {
    return (
      <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.label}
          indicatorStyle={styles.indicator}
      />
    );
  };


  render() {
    let noCourse = true;
    if (noCourse){
        return (
          <View style={{ flex: 5, alignItems: 'stretch' }}>
          <Text>
           test
          </Text>
          </View>
        );
    }else{
      return (
        <View style={{ flex: 5, alignItems: 'stretch' }}>
        <CourseSelector />
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />
        </View>
      );
    }

  }
}
