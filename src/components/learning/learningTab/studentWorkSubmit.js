import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from '../../common/Globle';

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
      <View>
        <ScrollView>
          <View style={styles.photoCard}>
          <Icon.Button
          name="camera" size={50}
          backgroundColor='transparent'
          color={GLOBLE.COLOR.BLUE}
          onPress={this.uploadImage}
           />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export  { StudentWorkSubmit };
