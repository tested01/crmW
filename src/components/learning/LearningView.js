import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import LiteraryWork from './learningTab/literaryWork';
import { GLOBLE } from '../common/Globle';
import { CourseSelector } from '../CourseSelector';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  renderMockStudents = () => {
    return (

      <View style={{ height: 80, margin: 1, backgroundColor: 'white' }} >
      <Image
       style={{width: 80, height: 80}}
       source={require('../../img/color-logo.png')}
      />
      </View>
    );
  }

  renderMockStudents2 = () => {
    return (

      <View style={{ height: 80, margin: 1, backgroundColor: 'white' }} >
      <Image
       style={{width: 80, height: 80}}
       source={require('../../img/love-logo.png')}
      />
      </View>
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <View style={[styles.page, { backgroundColor: '#ff4081' }]} />;
    case '2':
      return (
              <View style={[styles.leftPage, { backgroundColor: 'white' }]} >
              <Text style={{ fontSize: 18}}> 海綿颱風停課通知 </Text>
              <Text style={{ marginTop: 10 }}> 親愛的 同學 你好: </Text>
              <Text style={{ marginTop: 10 }}> 本校因受「海綿颱風」來襲影響，配合人事行政局停止上班上課公告，於7/12(五)18:00起當天停止上課。
                     且7/13(六)後之停課與否，同『人事行政局天然災害停止上班及上課情形』網站公告http://www.cpa.gov.tw/。
                     請各位師生留意公告動態，並做好防颱準備，保持一切平安~~ </Text>
              </View>
            );
    case '3':
      return (
        <View style={[styles.page, { backgroundColor: 'white' }]} >
          <LiteraryWork />
        </View>
    );
    case '4':
      return (<View style={[styles.page, { backgroundColor: 'gray', flex: 1, flexDirection: 'column', alignItems: 'stretch' }]} >
              <ScrollView>
              <View style={{ height: 80, margin: 1, backgroundColor: 'white' }} >
                <Image
                 style={{width: 80, height: 80}}
                 source={require('../../img/react-logo.png')}
                />
              </View>
              <View style={{ height: 80, margin: 1, backgroundColor: 'white',
              flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
              <Image
               style={{width: 80, height: 80, flex: 1}}
               source={require('../../img/color-logo.png')}
              />
              <Text style={{ flex: 3, fontSize: 20, lineHeight: 80, textAlign: 'left'}}> 蔡英文 </Text>
              </View>
              { this.renderMockStudents()}
              { this.renderMockStudents2()}
              { this.renderMockStudents()}
              { this.renderMockStudents2()}
              { this.renderMockStudents()}
              { this.renderMockStudents2()}
              { this.renderMockStudents2()}
              { this.renderMockStudents()}
              { this.renderMockStudents()}
              { this.renderMockStudents2()}
              </ScrollView>
              </View>);
    default:
      return null;
    }
  };

  render() {
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
