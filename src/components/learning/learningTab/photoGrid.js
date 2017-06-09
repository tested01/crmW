import React, { Component } from 'react';
import { Image, View, ScrollView, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import SortableGrid from 'react-native-sortable-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBLE } from '../../common/Globle';


class PhotoGrid extends Component{
  constructor(props){
    super(props);
    this.renderImage=this.renderImage.bind(this);
    this.renderAsset=this.renderAsset.bind(this);
    this.renderVideo=this.renderVideo.bind(this);
  }

  renderImage(imageP) {
   let image = {uri: imageP.path, width: imageP.width, height: imageP.height}
   return (

       <Image style={{
         width: 100,
         height: 100,
         borderWidth: 1,
         borderColor: 'white',
         resizeMode: 'stretch'
       }} source={image} />

   );

 }

 renderVideo(videoP) {
    let video = {uri: imageP.path, width: imageP.width, height: imageP.height}
    return (<View style={{height: 100, width: 100}}>
      <Video source={{uri: video.uri, type: video.mime}}
         style={{position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
         rate={1}
         paused={false}
         volume={1}
         muted={false}
         resizeMode={'cover'}
         onError={e => console.log(e)}
         onLoad={load => console.log(load)}
         repeat={true} />
     </View>);
  }

 renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
    //return (<Text>{image.path.concat(' -- ')}</Text>);
    /*
    let path = image.path;
    return (<Image source={image}></Image>);
    */
  }

  render(){
    console.log('rendering... within map~', this.props.currentImages);
    /*
    <SortableGrid>
     {
        this.props.currentImages.map( (image, index) =>
         <View key={index}>
           {this.renderImages(image)}
         </View>

       )
     }
   </SortableGrid>
    */
    return(
      <SortableGrid>
        {this.props.currentImages ? this.props.currentImages.map(i => <View key={i.path}>{this.renderAsset(i)}</View>) : null}
      </SortableGrid>

    );

  }
}


export default PhotoGrid;
