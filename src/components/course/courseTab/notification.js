import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({

  leftPage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10
  }

});

export default function(){
  return (
    <View style={[styles.leftPage, { backgroundColor: 'white' }]} >
    <Text style={{ fontSize: 18}}> 海綿颱風停課通知 </Text>
    <Text style={{ marginTop: 10 }}> 親愛的老師 你好: </Text>
    <Text style={{ marginTop: 10 }}> 本校因受「海綿颱風」來襲影響，配合人事行政局停止上班上課公告，於7/12(五)18:00起當天停止上課。
           且7/13(六)後之停課與否，同『人事行政局天然災害停止上班及上課情形』網站公告http://www.cpa.gov.tw/。
           請各位師生留意公告動態，並做好防颱準備，保持一切平安~~ </Text>
    </View>
  );
}
