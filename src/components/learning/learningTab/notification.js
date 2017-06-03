import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({

  leftPage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10
  }

});

export default class Notification extends Component{
  /*
  <View style={[styles.leftPage, { backgroundColor: 'white' }]} >
  <Text style={{ fontSize: 18}}> 海綿颱風停課通知 </Text>
  <Text style={{ marginTop: 10 }}> 親愛的老師 你好: </Text>
  <Text style={{ marginTop: 10 }}> 本校因受「海綿颱風」來襲影響，配合人事行政局停止上班上課公告，於7/12(五)18:00起當天停止上課。
         且7/13(六)後之停課與否，同『人事行政局天然災害停止上班及上課情形』網站公告http://www.cpa.gov.tw/。
         請各位師生留意公告動態，並做好防颱準備，保持一切平安~~ </Text>
  </View>
  */
  constructor(props){
    super(props);
    this.state = {
      detail: false,
      detailId: ''
    };
    this.closeDetail = this.closeDetail.bind(this);
  }
  closeDetail(){
    this.setState({detail: false});
  }
  render(){
    if(this.state.detail){
      return(
        <View style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
          <View style={{
            height: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 5
          }}>
            <Text style={{marginLeft: 10}}>Title</Text>
            <Icon.Button
             name="close"
             size={25}
             color="black"
             backgroundColor="transparent"
             onPress={this.closeDetail}
            />
          </View>
          <View style={{display: 'flex',
            height: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginLeft: 15,
            marginRight: 15
          }}>
          <Text style={{color: 'gray', fontSize: 12}}>subtitle</Text>
          <Text style={{color: 'gray', fontSize: 12}}>2017/03/31</Text>
          </View>
          <View style={{flex: 1}}>
            <ScrollView style={{ backgroundColor: 'white'}}>
            </ScrollView>
          </View>
        </View>
      );
    }else{
      return (
        <View style={{display:'flex', flex: 1, justifyContent: 'flex-start'}}>
        <ScrollView>
          <TouchableHighlight onPress={()=>{
            console.log('颱風');
            this.setState({detail: true});
          }}>
          <View style={{display: 'flex', borderBottomWidth: 1, borderColor: 'gray', height: 56}}>
            <View style={{flex: 1, justifyContent: 'center', margin: 5}}>
              <Text>梅姬颱風通知</Text>
            </View>
            <View style={{display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              margin: 5
            }}>
            <Text style={{color: 'gray', fontSize: 12}}>請依據該校所屬之各縣市人事行政局命令判斷。</Text>
            <Text style={{color: 'gray', fontSize: 12}}>2017/03/31</Text>
            </View>
          </View>
          </TouchableHighlight>

        </ScrollView>
        </View>

      );
    }

  }

}
