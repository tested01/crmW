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

export default class ExhibitionView extends Component {
  constructor(props){
    super(props);
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: '最新' },
      { key: '2', title: '熱門' },
      { key: '3', title: '聯合報\n  之星' },
      { key: '4', title: '  聯合報\n寫作教室' },
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

  renderNew(){
    return(
      <ScrollView style={{ flex: 1 }}>
        <Text>最新文章: 開發中...</Text>
      </ScrollView>
    );
  }

  renderHot(){
    return(
      <ScrollView style={{ flex: 1}}>
        <Text>熱門文章: 開發中...</Text>
      </ScrollView>
    );
  }

  renderStar(){
    return(
      <ScrollView style={{ flex: 1 }}>
        <Text>聯合報之星: 開發中...</Text>
      </ScrollView>
    );
  }

  renderClassRoom(){
    return(
      <ScrollView style={{ flex: 1 }}>
        <Text>聯合報寫作教室: 開發中...</Text>
      </ScrollView>
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return this.renderNew();
    case '2':
      return this.renderHot();
    case '3':
      return this.renderStar();
    case '4':
      return this.renderClassRoom();
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
