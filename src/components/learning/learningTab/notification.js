import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  WebView,
  Dimensions,
  TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CrmHeader, GLOBLE } from '../../common';

const styles = StyleSheet.create({

  leftPage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10
  }

});

const window = Dimensions.get('window');
export default class Notification extends Component{

  constructor(props){
    super(props);
    this.state = {
      modalDetail: false,
      detailId: '',
      detailTitle: '',
      detailSubtitle: '',
      detailContent: ''

    };

    this.setModalVisible = this.setModalVisible.bind(this);
    this.closeDetail=this.closeDetail.bind(this);
    this.renderWebView=this.renderWebView.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalDetail: visible});
  }
  closeDetail(){
    this.setModalVisible(!this.state.modalDetail);
  }
  renderWebView(){
    if(this.state.contentUri){
      return(

        <WebView
          source={{uri: this.state.contentUri}}
          style={{ flex: 1, width: window.width-12}}
        />

      );
    }else{
      return(<Text>nothing</Text>);
    }


  }
  render(){
      console.log(this.state.contentUri, 'this.state.contentUri');
      return (
        <View style={{display:'flex', flex: 1, justifyContent: 'flex-start'}}>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalDetail}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <CrmHeader
              left='left_arrow'
              wordColor='white'
              leftPress={this.closeDetail}
              center='教務通知'

            />
            <Text style={{margin: 15, fontSize: 15}}>{this.state.detailTitle}</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 25,
              margin: 5
            }}>
            <Text style={{}}>{this.state.detailSubtitle}</Text>
            <Text style={{color: 'gray'}}>{this.state.notificationTime}</Text>
            </View>
            <View
            style={{margin: 5, height: window.height-165}}
            >
              { this.renderWebView() }
            </View>


          </View>
         </View>
        </Modal>
        <ScrollView>
          <TouchableHighlight onPress={()=>{
            this.setState({modalDetail: true});
            this.setState({detailTitle: this.props.title});
            this.setState({detailSubtitle: this.props.subtitle});
            this.setState({contentUri: this.props.contentUri});
            let cdate = GLOBLE.formatDateString(this.props.createdDate, '/');
            this.setState({notificationTime: cdate});


          }}>
          <View style={{display: 'flex', backgroundColor: 'white',
                        borderBottomWidth: 1, borderColor: 'gray', height: 56}}>
            <View style={{flex: 1, justifyContent: 'center', margin: 5}}>
              <Text>{this.props.title}</Text>
            </View>
            <View style={{display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              margin: 5
            }}>
            <Text style={{color: 'gray', fontSize: 12}}>{this.props.subtitle}</Text>
            <Text style={{color: 'gray', fontSize: 12}}>{GLOBLE.formatDateString(this.props.createdDate, '/')}</Text>
            </View>
          </View>
          </TouchableHighlight>

        </ScrollView>
        </View>

      );
  }
}
