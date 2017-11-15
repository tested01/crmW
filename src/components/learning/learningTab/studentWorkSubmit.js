import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableHighlight,
  ActionSheetIOS,
  Keyboard, TouchableWithoutFeedback,
  Modal,
  Alert,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

import { GLOBLE, CrmHeader } from '../../common';
import { CONFIG } from '../../../config';
import {
  addImages,
  editImages,
  clearImages,
  setCurrentCourse,
  setCurrentMissions
 } from '../../../actions';
import PhotoGrid from './photoGrid';
import OfflinePhotoCard from './offlinePhotoCard';


const window = Dimensions.get('window');
const styles = {
  photoCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    width: window.width-16,
    height: 40,
    backgroundColor: 'white',
    borderColor: GLOBLE.COLOR.BLUE,
    borderWidth: 1
  }
};
var BUTTONS = [
  '相機照相',
  '相簿選取',
  '取消',
];
const CAMERA_INDEX = 0;
const GALLERY_INDEX = 1;
const CANCEL_INDEX = 2;

class StudentWorkSubmit extends Component{



  constructor(props){
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadImageFromImagePicker = this.uploadImageFromImagePicker.bind(this);
    this.uploadImageFromCamera = this.uploadImageFromCamera.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.setPostPreviewModalVisible = this.setPostPreviewModalVisible.bind(this);
    this.uploadPost = this.uploadPost.bind(this);
    this.updateCurrentCourse = this.updateCurrentCourse.bind(this);

    this.state = {
      title: '',
      clicked: 'none',
      switchValue: true,
      postPreviewModalVisible: false
    };

  }
  toggleSwitch(value){
    this.setState({ switchValue: value });

  }
  showActionSheet(){
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      tintColor: GLOBLE.COLOR.BLUE
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
      if(buttonIndex === CAMERA_INDEX){
        this.uploadImageFromCamera();
      }
      if(buttonIndex === GALLERY_INDEX){
        this.uploadImageFromImagePicker();
      }
      if(buttonIndex === CANCEL_INDEX){
        ImagePicker.clean().then(() => {
          console.log('removed all tmp images from tmp directory');
        }).catch(e => {
          alert(e);
        });
      }
    });
  }

  uploadImageFromCamera(){

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.7,
      mediaType: 'photo'
    }).then(image => {
      console.log(image);
      this.props.addImages(image);

    }).catch( reason => {
          console.log( 'onRejected function called: ', reason );
    });

  }

  uploadImageFromImagePicker(){

    ImagePicker.openPicker({
      multiple: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.7,
      mediaType: 'photo'
    }).then(images => {
      console.log(images);
      this.props.addImages(images);

    }).catch( reason => {
          console.log( 'onRejected function called: ', reason );
    });
  }

  //TODO: ActionSheetIOS
  uploadImage(){
    //TODO: ActionSheetIOS
    // 1. uploadImageFromImagePicker
    // 2. uploadImageFromCamera
    this.showActionSheet();
  }
  //Before post submitting, users should preview their work
  setPostPreviewModalVisible(visible){
    this.setState({postPreviewModalVisible: visible}, ()=>{console.log('visible', visible)});
  }

  updateCurrentCourse(currentCourseCode) {

    fetch(CONFIG.API_BASE_URL.concat('/courses/').concat(currentCourseCode), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth
      }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                this.props.setCurrentCourse(json.course);
                                let currentCourseId = json.course._id;
                                fetch(CONFIG.API_BASE_URL.concat('/missions/courses/').concat(currentCourseId), {
                                  method: 'GET',
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'x-auth': this.props.loginState.xAuth
                                  }
                                 })
                                  .then((response) => {
                                    if (response.status === 200) {

                                      response.json().then(json => {
                                                            //this.setState(Object.assign({}, this.state, json));

                                                            this.props.setCurrentMissions(json.missions);
                                                            //this.setState(Object.assign({}, this.state, {currentMissions: json.missions}));
                                                          });

                                    } else {
                                      console.log(response.status);
                                    }
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  uploadPost(body, setPostPreviewModalVisible, resetLiteraryWork){
    //start real post
   let courseCode = this.props.currentCourse.code;
   let updateCurrentCourse = this.updateCurrentCourse;
  fetch(CONFIG.API_BASE_URL.concat('/posts/'), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-auth': this.props.loginState.xAuth //FIXME:teachauth
      //'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGVjNzBkY2E5NTZhMjdiMTk5YmNkOTEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkxODkwMzk3fQ._5J7xKENI4jsX8--0EtEnFV195SySjSfVyze_rcxewQ'
    },
    body: JSON.stringify(body)
   })
    .then((response) => {
      if (response.status === 200) {
        response.json().then(json => {
                              //this.setState(Object.assign({}, this.state, json));

                              //TODO: get the post id & upload the currentImage
                              //this.props.currentImages
                              //pass multiple images

                              console.log(json, 'posted post...');

                              let imgs = this.props.currentImages;
                              let serverURL = CONFIG.API_BASE_URL.concat('/upload/photos')

                              var xhr = new XMLHttpRequest();
                              xhr.onreadystatechange = function()
                              {
                                console.log('ready~~~~~~~', typeof(xhr.readyState), xhr.readyState, xhr.status, (xhr.readyState == 1));
                                  //if (xhr.readyState == 4 && xhr.status == 200)
                                  if (xhr.readyState == 1)
                                  {
                                      //setPostPreviewModalVisible(false);
                                      updateCurrentCourse(courseCode);
                                      resetLiteraryWork();
                                  }
                              };
                              let body = new FormData();
                              let photos = imgs.map(
                                function(img, index){
                                  body.append('article', {
                                      uri: img.path,
                                      type: 'image/jpeg',
                                      name: index.toString().concat('.jpg'),
                                  });
                                  return {
                                      uri: img.path,
                                      type: 'image/jpeg',
                                      name: index.toString().concat('.jpg'),
                                  };
                                }
                              );

                              //body.append('authToken', 'secret');
                              body.append('post_id', json._id);
                              body.append('auth_id', json.author._id);
                              xhr.open('POST', serverURL);
                              xhr.send(body);
                            });
      } else {
        console.log(response.status);
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });

      //end real post
  }

  render(){
    /*

    <Image
      source={{uri: image.path}}
      style={{
        width: 46,
        height: 46,
        margin: 5
       }}
    />

    */
      console.log('currentMission...123456qq', this.props.currentMission);
      console.log('loginState 0000000', this.props.loginState);
      return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{display: 'flex', flex: 1, backgroundColor: 'transparent'}}>

            <View style={{ borderBottomWidth: 1, margin: 8, borderColor: '#DFDFDF'}}>
              <TextInput
                style={{ height: 40 }}
                placeholder='作品名稱...'
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
              />
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 5
          }}>
            <Text allowFontScaling={false} style={{fontSize: 14, color: 'gray'}}> 主動公開於班級作品 </Text>
            <Switch onValueChange = {this.toggleSwitch} value = {this.state.switchValue}/>
          </View>
          <TouchableHighlight
            style={styles.photoCard}
            onPress={this.uploadImage}
          >
            <Icon
            name="camera" size={30}
            backgroundColor='transparent'
            color={GLOBLE.COLOR.BLUE}
             />
          </TouchableHighlight>
          <ScrollView style={{ marginLeft: 8}}>


            <PhotoGrid onPress={this.uploadImage} currentImages={this.props.currentImages} />


          </ScrollView>
          <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.postPreviewModalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
               <ScrollView style={{marginTop: 22}}>
                <View>
                <CrmHeader
                  left="star"
                  right="none"
                  wordColor='transparent'
                  theme='blue'
                  leftPress={()=>{console.log('nothing')}}
                  center={"作品繳交預覽畫面"}
                />
                <OfflinePhotoCard
                  publishDate={Date.now()}
                  author={
                    this.props.loginState.user.lastName +
                    this.props.loginState.user.firstName
                  }
                  teacher={
                    this.props.currentMission.teacher.lastName +
                    this.props.currentMission.teacher.firstName
                  }
                  title={this.state.title}
                  currentImages={this.props.currentImages}
                />

                 <View style={{
                   display: 'flex',
                   flexDirection: 'row',
                   justifyContent: 'space-around'
                 }}>

                    <TouchableHighlight onPress={() => {
                      this.setPostPreviewModalVisible(!this.state.postPreviewModalVisible)
                    }}>
                      <View style={{backgroundColor: 'gray',
                      height: 36,
                      borderRadius: 8,
                      width: window.width / 2 - 15,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                        <Text allowFontScaling={false} style={{color: 'white'}}>取消</Text>
                      </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => {
                      //this.setPostPreviewModalVisible(!this.state.postPreviewModalVisible)
                      let body = {
                        detail: {
                          title: this.state.title
                        },
                        mission: this.props.currentMission.id,
                        advisor: this.props.currentMission.teacher._id,
                        openaccess: this.state.switchValue
                      };
                      this.uploadPost(body,
                        this.setPostPreviewModalVisible,
                        this.props.resetLiteraryWork
                      );
                    }}>
                      <View style={{backgroundColor: 'green',
                      height: 36,
                      borderRadius: 8,
                      width: window.width / 2 - 15,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                        <Text allowFontScaling={false} style={{color: 'white'}}>確認上傳</Text>
                      </View>
                    </TouchableHighlight>

                  </View>

                </View>
               </ScrollView>
          </Modal>
          <TouchableHighlight
            onPress={
              ()=>{
                //TODO:檢查是否 title 跟 images 都有了
                let hasTitle = this.state.title.length>0;
                let hasImage = this.props.currentImages.length>0;

                let errMsg = '';
                if(!hasTitle){
                  errMsg += '\n\n請為你的作品添加標題';
                }
                if(!hasImage){
                  errMsg += '\n\n請為你的作品添加至少一張作文照片';
                }

                if(hasTitle && hasImage){
                  this.setPostPreviewModalVisible(true); //開啟預覽的 Modal
                }else{
                  console.log(errMsg);
                  Alert.alert(
                    '作品資料尚未齊全',
                    errMsg,
                    [
                      {text: 'OK', onPress: () =>console.log('error: code is too short')},
                    ],
                    { cancelable: false }
                  );
                }



                //this.state.switchValue ==> 是否要公開文章
                //上傳此 state, 且更新相對應 API 與 展演 最新 與 最熱門 的 pool
                //TODO: 點擊上傳 post 按鈕後, 需要能夠 預覽 post (利用 Modal)
                //TODO: 確定送出後, 需要可以跳轉到該 post 個別頁面, 是可以修改的!

                //this.uploadPost(body); //real post

                  //start real post
                /*
                fetch(CONFIG.API_BASE_URL.concat('/posts/'), {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth': this.props.loginState.xAuth //FIXME:teachauth
                    //'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGVjNzBkY2E5NTZhMjdiMTk5YmNkOTEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkxODkwMzk3fQ._5J7xKENI4jsX8--0EtEnFV195SySjSfVyze_rcxewQ'
                  },
                  body: JSON.stringify(body)
                 })
                  .then((response) => {
                    if (response.status === 200) {
                      response.json().then(json => {
                                            //this.setState(Object.assign({}, this.state, json));

                                            //TODO: get the post id & upload the currentImage
                                            //this.props.currentImages
                                            //pass multiple images

                                            console.log(json, 'posted post...');

                                            let imgs = this.props.currentImages;
                                            let serverURL = CONFIG.API_BASE_URL.concat('/upload/photos')

                                            var xhr = new XMLHttpRequest();
                                            let body = new FormData();
                                            let photos = imgs.map(
                                              function(img, index){
                                                body.append('article', {
                                                    uri: img.path,
                                                    type: 'image/jpeg',
                                                    name: index.toString().concat('.jpg'),
                                                });
                                                return {
                                                    uri: img.path,
                                                    type: 'image/jpeg',
                                                    name: index.toString().concat('.jpg'),
                                                };
                                              }
                                            );

                                            //body.append('authToken', 'secret');
                                            body.append('post_id', json._id);
                                            body.append('auth_id', json.author._id);
                                            xhr.open('POST', serverURL);
                                            xhr.send(body);




                                          });
                    } else {
                      console.log(response.status);
                      console.log(response);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                    */
                    //end real post
              }
            }
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: window.width-20,
              borderRadius: 8,
              backgroundColor: '#F9C00C',
              alignSelf: 'center'
            }}
          >

          <Text allowFontScaling={false} style={{color: 'white', lineHeight: 40, fontSize: 17}}>繳交</Text>
          </TouchableHighlight>
          <View style={{ width: 100, height: 60, backgroundColor: 'transparent'}}></View>
        </View>
        </TouchableWithoutFeedback>
      );

  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    addImages,
    editImages,
    clearImages,
    setCurrentCourse,
    setCurrentMissions
   }, dispatch);
}

function mapStateToProps(state) {
  return {
    loginState: state.loginState,
    currentMission: state.currentMission,
    currentImages: state.currentImages,
    currentCourse: state.currentCourse
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentWorkSubmit);

//[backup-code-fragment] pass single image

/*
let img = this.props.currentImages[0];
let serverURL = CONFIG.API_BASE_URL.concat('/upload/photo')

var xhr = new XMLHttpRequest();

let photo = {
    uri: img.path,
    type: 'image/jpeg',
    name: 'photo.jpg',
};


let body = new FormData();
//body.append('authToken', 'secret');
body.append('article', photo);
console.log(body);
xhr.open('POST', serverURL);
xhr.send(body);
*/
