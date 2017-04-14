import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native'
import ImgCard from '../common/ImgCard'
import Header from '../common/Header'

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
    //{rows}
    //<Header headerText="Students Got Talent" />
    return (

      <ScrollView>
      {rows}
      </ScrollView>
    )
  }
}
