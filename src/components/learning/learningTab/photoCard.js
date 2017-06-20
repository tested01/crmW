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
import { CONFIG } from '../../../config';


class PhotoCard extends Component{
  constructor(props){
    super(props);
    this.likeOrUnlike = this.likeOrUnlike.bind(this);
    this.renderFlags = this.renderFlags.bind(this);
    this.renderUShowFlag = this.renderUShowFlag.bind(this);
    this.renderUStarFlag = this.renderUStarFlag.bind(this);
  }
  componentWillMount(){
    this.setState({post: this.props.post.likes.users}); //點贊的人有哪些
    this.setState({userId: this.props.loginState.id}); //裡面有登入者的 id
    this.setState({likeCount: this.props.post.likes.users.length});

    if(this.props.post.likes.users.indexOf(this.props.loginState.id)>-1){
      this.setState({like: true});
      this.setState({likeColor: 'blue'});

    }else{
      this.setState({like: false});
      this.setState({likeColor: 'gray'});
    }
  }
  likeOrUnlike(){
    if(this.state.like){
      this.setState({like: false});
      this.setState({likeColor: 'gray'});
      this.setState({likeCount: this.state.likeCount - 1});
      //fetch unlike
      fetch(CONFIG.API_BASE_URL.concat('/posts/unlike/').concat(this.props._id), {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': this.props.loginState.xAuth //FIXME:guest has no xAuth
            }
       })
        .then((response) => {
          if (response.status === 200) {

            response.json().then(json => {
                                  //this.setState(Object.assign({}, this.state, json));
                                  console.log('unlike', json)
                                });
          } else {
            console.log(response.status);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      this.setState({like: true});
      this.setState({likeColor: 'blue'});
      this.setState({likeCount: this.state.likeCount + 1});
      //fetch like
      fetch(CONFIG.API_BASE_URL.concat('/posts/like/').concat(this.props._id), {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': this.props.loginState.xAuth //FIXME:teachauth
          }
       })
        .then((response) => {
          if (response.status === 200) {

            response.json().then(json => {
                                  //this.setState(Object.assign({}, this.state, json));
                                  console.log('like', json);
                                });
          } else {
            console.log(response.status);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  renderFlags(isUShow, isUStar){
   return(
     <View style={{
       display: 'flex',
       alignSelf: 'flex-end',
       flex: 1,
       justifyContent: 'flex-end',
       flexDirection: 'row'
      }}>
      {this.renderUShowFlag(isUShow)}
      {this.renderUStarFlag(isUStar)}
     </View>
   );
  }

  renderUShowFlag(isUShow){
    if(isUShow){
      return(<Icon name="bookmark" size={30} color="#F9C00C" />);
    }else{
      return(<View />);
    }

  }

  renderUStarFlag(isUStar){
    if(isUStar){
      return(<Icon name="star" size={30} color="goldenrod" />);
    }else{
      return(<View />);
    }

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
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 5
      },
      subtitle:{
        color: 'gray'
      },
      authorName:{
        fontSize: 18
      },
      title:{
        height: 30,
        margin: 5
      },
      photoGrid:{
         backgroundColor: '#dedfe0',
         height: window.width ,
         width: window.width
      },
      footer:{
        justifyContent: 'center',
        height: 50
      }
    };

    const publishDate = GLOBLE.formatDateTimeString(this.props.publishDate, '/');
    let isUShow = this.props.post.publicVisible.visible.includes('uShow');
    let isUStar = this.props.post.publicVisible.visible.includes('uStar');
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
          borderWidth: 0,
          marginRight: 5
         }}
      />
      <View style={styles.headerText}>
          <Text style={styles.authorName}> {this.props.author} </Text>
          <Text style={styles.subtitle}> {publishDate.concat(' 指導老師 ').concat(this.props.teacher)} </Text>
      </View>
      { this.renderFlags(isUShow, isUStar) }
      </View>
      <View style={styles.title}>
        <Text>
          {this.props.title}
        </Text>
      </View>
      <View style={styles.photoGrid}>
      <Image
        style={{width: window.width, height: window.width}}
        source={{uri: CONFIG.API_BASE_URL + this.props.resources[0].uri}}
      />
      </View>
      <View style={styles.footer}>
      <View styl={{display:'flex', flexDirection:'row', alignItems:'flex-start'}}>
      <Icon.Button name="thumbs-o-up"
        color={this.state.likeColor}
        backgroundColor='transparent'
        onPress={this.likeOrUnlike}
      >
      <Text style={{color: this.state.likeColor}}>{this.state.likeCount}</Text>
      </Icon.Button>
      </View>
      </View>
      </View>

    );
  }
}

export default PhotoCard;
