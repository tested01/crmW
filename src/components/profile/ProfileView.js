import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';

const config = {
  headerSize: 100
};

export default function () {
  return (
    <ScrollView
               style={{ flex: 5 }}
    >
    <View
      style={{ backgroundColor: 'white',
               justifyContent: 'center',
               alignItems: 'center' }}
    >
    <View style={{ height: 250, backgroundColor: 'white' }}>
    <Image
     style={{ width: config.headerSize,
              height: config.headerSize,
              marginTop: 30,
              borderRadius: config.headerSize / 2,
              borderWidth: 2 }}
              source={require('../../img/color-logo.png')}
    />

    </View>

    </View>
    </ScrollView>
  );
}
