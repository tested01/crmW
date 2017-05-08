import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImgCard from '../common/ImgCard';
import Header from '../common/Header';
import { GLOBLE } from '../common/Globle';

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
    color: 'black',
    margin: 0,
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

class MyWorkScreen extends Component {
  constructor(props){
    super(props);
  }
  //'  聯合報\n寫作教室'
  state = {
    index: 0,
    routes: [
      { key: '1', title: '作品集' },
      { key: '2', title: '  聯合報\n寫作教室' },
      { key: '3', title: '活動紀錄' },
      { key: '4', title: '通知' },
    ],
    selectedIndex: 0
  };

  handleChangeTab = (index) => {
    this.setState({ index });
  };

/*
_renderIcon = ({ route }) => {
    return <Ionicons name={route.icon} size={24} color="white" />;
  };
*/

  renderHeader = (props) => {
    //<Icon name="rocket" size={30} color="#900" />
    //renderIcon={this._renderIcon}

    return (
      <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.label}
          indicatorStyle={styles.indicator}
      />
    );
  };

  renderWorks(){
    return(
      <ScrollView style={{ flex: 1 }}>
        <Text>renderWorks</Text>
      </ScrollView>
    );
  }

  renderClassRoom(){
    return(
      <ScrollView style={{ flex: 1}}>
        <Text>renderClassRoom</Text>
      </ScrollView>
    );
  }

  renderRecords(){
    return(
      <ScrollView style={{ flex: 1 }}>
        <Text>renderRecords</Text>
      </ScrollView>
    );
  }

  renderNotification(){
    return(
      <ScrollView style={{ flex: 1 }}>
        <Text>renderNotification</Text>
      </ScrollView>
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return this.renderWorks();
    case '2':
      return this.renderClassRoom();
    case '3':
      return this.renderRecords();
    case '4':
      return this.renderNotification();
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
      >
      </TabViewAnimated>

    );
  }
}

export default MyWorkScreen;
