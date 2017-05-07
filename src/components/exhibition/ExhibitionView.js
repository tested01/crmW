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
import ImgCard from '../common/ImgCard';
import Header from '../common/Header';
import { GLOBLE } from '../common/Globle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 12,
    color: 'black',
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

export default class TabViewExample extends Component {
  constructor(props){
    super(props);
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: '最新' },
      { key: '2', title: '熱門' },
      { key: '3', title: '聯合報之星' },
      { key: '4', title: '聯合報\n寫作教室' },
    ],
    selectedIndex: 0
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

  renderSt(){
    return(
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>s</Text>
      </View>
    );
  }

  renderTe(){
    return(
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>t</Text>
      </View>
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return this.renderTe();
    case '2':
      return this.renderSt();
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


/*
export default class extends Component {

  constructor(){
    super();
    this.testData = [
      {
        'name': '小明老師',
        'img': 'https://raw.githubusercontent.com/tested01/staticFiles/master/smallming.png',
        'works': [
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/1.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/2.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/3.jpg'
        ],
        'content': "影響生活的一項發明"
      },
      {
        'name': 'Verna',
        'img': 'https://raw.githubusercontent.com/tested01/staticFiles/master/verna.png',
        'works': [
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/7.jpg'
        ],
        'content': "暑假課輔心得"
      },
      {
        'name': 'Steven',
        'img':'https://raw.githubusercontent.com/tested01/staticFiles/master/steven.png',
        'works': [
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/3.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/4.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/5.jpg'
        ],
        'content': "如果我是一位老師"

      },
      {
        'name': 'Joyce',
        'img': 'https://raw.githubusercontent.com/tested01/staticFiles/master/joyce.png',
        'works': [
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/1.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/2.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/3.jpg'
        ],
        'content': "影響生活的一項發明"
      },
      {
        'name': 'Lily',
        'img': 'https://raw.githubusercontent.com/tested01/staticFiles/master/lily.png',
        'works': [
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/2.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/3.jpg'
        ],
        'content': "白日夢冒險王"
      },
      {
        'name': 'Doc',
        'img': 'https://raw.githubusercontent.com/tested01/staticFiles/master/sally.jpg',
        'works': [
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/5.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/2.jpg',
          'https://raw.githubusercontent.com/tested01/staticFiles/master/literary_works/7.jpg'
        ],
        'content': "樂來越愛你"
      }
    ]
    ;
  }

  render () {
    let rows = [];

    for (var i = 0; i < this.testData.length; i++) {
      rows.push(<ImgCard key={i}
                      cardName= {this.testData[i].name}
                      thumbnail= {this.testData[i].img}
                      works={this.testData[i].works}
                      cardContent={this.testData[i].content} />);
    }
    return (

      <ScrollView>
      {rows}
      </ScrollView>
    )
  }
}

*/
