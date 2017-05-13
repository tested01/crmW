import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const window = Dimensions.get('window');

const styles = {
  cardList: {

  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: window.width,
    height: 56
  },
  infoBox:{
    display: 'flex',
    justifyContent: 'space-around'
  },
  avatarBox: {
    display: 'flex',
    flexDirection: 'row'
  },
  flags: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
}
class StudentCardList extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ScrollView>

          <StudentCard
          style={styles.cardList}
          name='吳小福'
          title='我看彎腰郵筒'
          flag={false}
          />

          <StudentCard
          style={styles.cardList}
          name='吳小福'
          title='我看彎腰郵筒'
          flag={true}
          />

     </ScrollView>
    );
  }
}

class StudentCard extends Component{
  constructor(props){
    super(props);
    this.avatar = this.avatar.bind(this);
  }
  avatar(name, title){
    return(
      <View style={styles.avatarBox}>
        <Image
          source={require('../../../img/react-logo.png')}
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
        <View style={styles.infoBox}>
         <Text>{name}</Text>
         <Text style={{
           color: 'gray',
           fontSize: 12
         }}>{title}</Text>
        </View>
      </View>
    );

  }
  flag(selected){
    if(selected){
      return(
        <View style={styles.flags}>
          <Text style={{fontSize: 12, color: 'gray'}}>3/23 14:00</Text>
          <Icon name="bookmark" size={30} color="#F9C00C" />
        </View>
      );
    }else{
      return(
        <View style={styles.flags}>
          <Text style={{fontSize: 12, color: 'gray'}}>3/23 14:00</Text>
          <Icon name="bookmark" size={30} color="white" />
        </View>
      );
    }

  }
  render(){
    return(
      <View style={styles.card}>
        {this.avatar(this.props.name, this.props.title)}
        {this.flag(this.props.flag)}
      </View>
    );
  }
}

export {StudentCard, StudentCardList};
