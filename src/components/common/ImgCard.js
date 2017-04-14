import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window')

const styles = {
  wrapper: {

  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
}

const renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      bottom: 10,
      right: 10
    }}>
      <Text style={{ color: 'grey' }}>
        <Text style={{
          color: 'black',
          fontSize: 20
        }}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

export default class extends Component {
  render () {
    let rows = [];
    for (var i = 0; i < this.props.works.length; i++) {
      rows.push(<View key={i} style={styles.slide} title={<Text numberOfLines={1}></Text>}>
                        <Image style={styles.image} source={{uri: this.props.works[i]}} />
                      </View>);
    }

    return (
      <View style={{marginBottom: 10}}>
        <Swiper style={styles.wrapper} height={240}
          renderPagination={renderPagination}
          paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop={false} showsButtons>
          {rows}
        </Swiper>

        <View style={{flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'stretch'}}>
          <Image style={{width: 50, height: 50}} source={{uri: this.props.thumbnail}} />
          <View style={{flex: 5, height: 50, backgroundColor: '#ededed'}} >
          <Text style={{textAlign: 'center', color: 'skyblue'}}>{this.props.cardName}</Text>
          <Text style={{textAlign: 'center'}}>{this.props.cardContent}</Text>
          </View>
        </View>
      </View>
    )
  }
}
