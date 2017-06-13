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

class StudentOptionList extends Component{
  constructor(props){
    super(props);
  }
  /*

  <StudentOption
    name='吳小福'
    title='我看彎腰郵筒'

  />

  <StudentOption
    name='吳小福'
    title='我看彎腰郵筒'

  />

  */
  render(){
    console.log(this.props.currentMissionPosts, '吳小福');
    return(
      <ScrollView>
      { this.props.currentMissionPosts.map(
        function(post){
          return(
            <StudentOption
              key={ post._id }
              name={ post.author.lastName + post.author.firstName }
              title={ post.detail.title }
            />
          );

        }
      ) }
      </ScrollView>
    );
  }
}

class StudentOption extends Component{
  constructor(props){
    super(props);
    this.avatar = this.avatar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.option = this.option.bind(this);
    this.state = { selected: false };
  }
  avatar(name, title){
    return(
      <View style={styles.avatarBox}>
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
  flag(){

      return(
        <View style={styles.flags}>
          <Text style={{fontSize: 12, color: 'gray'}}>3/23 14:00</Text>
          <Icon name="bookmark" size={30} color="white" />
        </View>
      );

  }
  toggle(){

    if(this.state.selected){
      this.setState({selected: false});

    }else{
      this.setState({selected: true});

    }
  }
  option(){
    if(this.state.selected){
      return(
        <Icon.Button
          name="bookmark"
          size={30}
          color="#F9C00C"
          onPress={this.toggle}
          backgroundColor='transparent'
       />
     );
    }else{
      return(
        <Icon.Button
          name="bookmark-o"
          size={30}
          color="#F9C00C"
          onPress={this.toggle}
          backgroundColor='transparent'
       />
      );
    }
  }
  render(){
    return(
      <View style={styles.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {this.option()}
          {this.avatar(this.props.name, this.props.title)}
        </View>
        {this.flag(this.props.flag)}
      </View>
    );
  }
}

export {StudentOption, StudentOptionList};
