import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from '../../common/Globle';
import { CONFIG } from '../../../config';

const window = Dimensions.get('window');
const styles = {
  photoCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderColor: GLOBLE.COLOR.BLUE,
    borderWidth: 1
  }
};
class StudentWorkSubmit extends Component{
  constructor(props){
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
    this.state = {title: ''};
  }
  uploadImage(){
    /*
    var ImagePicker = require('react-native-image-picker');
    var options = {
        title: 'Select Avatar',
        customButtons: [
          {name: 'fb', title: 'Choose Photo from Facebook'},
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };


      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };

          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({
            avatarSource: source
          });
        }
      });
   */
  }
  render(){
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
        <ScrollView style={{ marginLeft: 8}}>
          <View style={styles.photoCard}>
            <Icon.Button
            name="camera" size={50}
            backgroundColor='transparent'
            color={GLOBLE.COLOR.BLUE}
            onPress={this.uploadImage}
             />
          </View>
        </ScrollView>
        <TouchableHighlight
          onPress={
            ()=>{
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

export  { StudentWorkSubmit };
