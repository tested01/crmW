import React from 'react';
import { View, Image, Text, Button, ScrollView } from 'react-native';


const colorlessViewStyle = { color: 'black', backgroundColor: 'green', width: 56};

function mockItem() {
  return (
    <View style={{ height: 80, margin: 1, backgroundColor: 'white',
    flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
    <View
     style={{width: 80, height: 80, backgroundColor: 'gray'}}
    />
    <Text style={{  fontSize: 12, lineHeight: 80, textAlign: 'left'}}> 第 n 次作品 </Text>
    <View style={{ height: 30, marginTop: 20, borderWidth: 1 }}>
    <Button
      onPress={() => console.log('ww')}
      color='gray'
      title='繳交'
    >
    </Button>
    </View>
    </View>
  );
}

export default function() {

  return (
    <ScrollView>
    {mockItem()}
    {mockItem()}
    {mockItem()}
    {mockItem()}
    {mockItem()}
    </ScrollView>
  );

}
