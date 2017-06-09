import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableHighlight,
  ActionSheetIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { GLOBLE } from '../../common/Globle';
import { CONFIG } from '../../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addImages,
  editImages,
  clearImages
 } from '../../../actions';
import PhotoGrid from './photoGrid';

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

    this.state = {
      title: '',
      clicked: 'none'
    };

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
      return(

        <View style={{display: 'flex', flex: 1, backgroundColor: 'transparent'}}>

            <View style={{ borderBottomWidth: 1, margin: 8, borderColor: '#DFDFDF'}}>
              <TextInput
                style={{ height: 40 }}
                placeholder='作品名稱...'
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
              />
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
          <TouchableHighlight
            onPress={
              ()=>{
                console.log(this.props.currentImages, 'ci');
                let body = {
                  detail: {
                    title: this.state.title
                  },
                  mission: this.props.currentMission.id
                };
                console.log(this.props.currentMission,'cm~');
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
                                            console.log('posts~', json);
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

          <Text style={{color: 'white', lineHeight: 40, fontSize: 17}}>繳交</Text>
          </TouchableHighlight>
          <View style={{ width: 100, height: 60, backgroundColor: 'transparent'}}></View>
        </View>
      );

  }
}

function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({
    addImages,
    editImages,
    clearImages
   }, dispatch);
}

function mapStateToProps(state) {
  return {
    loginState: state.loginState,
    currentImages: state.currentImages
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(StudentWorkSubmit);
