import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Image,
  ScrollView
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from '../../common/Globle';

class PhotoCard extends Component{
  constructor(props){
    super(props);
    this.state = {};

  }

  render(){
    const window = Dimensions.get('window');
    const styles = {
      card:{
        marginBottom: 2,
        backgroundColor: 'white'
      },
      header:{
        flexDirection: 'row',
        margin: 5
      },
      headerText:{
        flexDirection: 'column'
      },
      subtitle:{
        color: 'gray'
      },
      authorName:{
        fontSize: 22
      },
      title:{
        height: 30
      },
      photoGrid:{
         backgroundColor: 'blue',
         height: window.width ,
         width: window.width
      },
      footer:{
        height: 50
      }
    };

    const publishDate = GLOBLE.formatDateTimeString(this.props.publishDate, '/');
    return(
      <View style={styles.card}>
      <View style={styles.header}>
      <Image
        source={require('../../../img/love-logo.png')}
        resizeMode="contain"
        fadeDuration={0}
        style={{
          width: 46,
          height: 46,
          borderRadius: 23,
          borderWidth: 1,
          marginRight: 5
         }}
      />
      <View style={styles.headerText}>
          <Text style={styles.authorName}> {this.props.author} </Text>
          <Text style={styles.subtitle}> {publishDate.concat(' 指導老師 ').concat(this.props.teacher)} </Text>
      </View>
      </View>
      <View style={styles.title}>
        <Text>
          {this.props.title}
        </Text>
      </View>
      <View style={styles.photoGrid}>
      </View>
      <View style={styles.footer}>
      <Icon.Button name="thumbs-o-up"
        color='gray'
        backgroundColor='transparent'
        onPress={this.editTask}
      >
      </Icon.Button>
      </View>
      </View>

    );
  }
}

export default PhotoCard;
