import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Image,
  Modal,
  ScrollView
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';
import { GLOBLE, CrmHeader } from '../../common';
import { CONFIG } from '../../../config';

const window = Dimensions.get('window');
class PhotoCard extends Component{
  constructor(props){
    super(props);
    this.likeOrUnlike = this.likeOrUnlike.bind(this);
    this.renderFlags = this.renderFlags.bind(this);
    this.renderUShowFlag = this.renderUShowFlag.bind(this);
    this.renderUStarFlag = this.renderUStarFlag.bind(this);
    this.closeDetailImage = this.closeDetailImage.bind(this);
    this.openDetailImage = this.openDetailImage.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.imageList = this.imageList.bind(this);
    this.closeZoomImages = this.closeZoomImages.bind(this);
    this.openZoomImages = this.openZoomImages.bind(this);
    this.imageUrlList = this.imageUrlList.bind(this);
  }
  componentWillMount(){
    this.setState({post: this.props.post});
    this.setState({whoLikes: this.props.post.likes.users}); //點贊的人有哪些
    this.setState({userId: this.props.loginState.id}); //裡面有登入者的 id
    this.setState({likeCount: this.props.post.likes.users.length});
    this.setState({modalDetailImages: false});
    this.setState({modalZoomImages: false})

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
  closeDetailImage(){
    this.setState({modalDetailImages: false});
  }
  openDetailImage(){
    this.setState({modalDetailImages: true});
  }
  //modalZoomImages
  closeZoomImages(){
    this.setState({modalZoomImages: false});
  }
  openZoomImages(){
    console.log('openZoomImages...');
    this.setState({modalZoomImages: true});
  }
  //render the image viewer, which can zoom in&out
  renderZoomImages(){
    <View style={{borderWidth: 5, flex: 1}}>
    <ImageZoom cropWidth={Dimensions.get('window').width}
                           cropHeight={Dimensions.get('window').height}
                           imageWidth={200}
                           imageHeight={200}>
                           {this.imageList()}
                </ImageZoom>
   </View>
  }
  imageUrlList(){
    return(this.props.resources.map(
      (img)=>{
        return{url: CONFIG.API_BASE_URL + img.uri}
      }
    ));
  }
  imageList(){
    return(function(img, index){
        return(
          <View key={index}>
          <Image
          style={{width: window.width - 20, height: window.width - 20, margin: 10}}
          source={{uri: CONFIG.API_BASE_URL + img.uri}}
        />
        <View style={{height: 100, width: 1}}/>
        </View>
      );
    });
  }
  renderImages(){
    let resourcesSize = this.props.resources.length;
    return(
      this.props.resources.map(
        (img, index) => {
          if(index == resourcesSize - 1){
            return(
           <View key={index}>
           <TouchableHighlight  onPress={this.openZoomImages}>
              <Image
              style={{width: window.width - 20, height: window.width - 20, margin: 10}}
              source={{uri: CONFIG.API_BASE_URL + img.uri}}
              />

            </TouchableHighlight>
            <View style={{height: 100, width: 1}}/>
            </View>


          );
        }else{
          return(

            <TouchableHighlight key={index} onPress={this.openZoomImages}>
              <Image
              style={{width: window.width - 20, height: window.width - 20, margin: 10}}
              source={{uri: CONFIG.API_BASE_URL + img.uri}}
              />
            </TouchableHighlight>

        );
        }

        }
      )

    );
  }
  render(){

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
          <TouchableHighlight onPress={this.openDetailImage}>
            <Image
              style={{width: window.width, height: window.width}}
              source={{uri: CONFIG.API_BASE_URL + this.props.resources[0].uri}}
            />
          </TouchableHighlight>
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
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalDetailImages}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <CrmHeader
              left="angle-left"
              right="none"
              wordColor='white'
              theme='blue'
              leftPress={this.closeDetailImage}
              center={this.props.author + "的作品"}
            />

            <ScrollView>
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

              {this.renderImages()}

            </ScrollView>

          </View>
         </View>
         <Modal
           animationType={"fade"}
           transparent={false}
           visible={this.state.modalZoomImages}
           onRequestClose={() => {alert("Modal has been closed.")}}
           >
           <View style={{marginTop: 22}}>
             <CrmHeader
               left='close'
               wordColor='white'
               leftPress={this.closeZoomImages}
               right='none'
               size={20}
               rightPress={()=>console.log('ellipsis pressed!')}
               theme="black"
               center={""}
             />
             </View>

             <ImageViewer imageUrls={this.imageUrlList()}/>
         </Modal>
        </Modal>



      </View>

    );
  }
}



export default PhotoCard;
