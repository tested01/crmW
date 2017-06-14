import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({

  leftPage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10
  }

});

export default class Notification extends Component{

  constructor(props){
    super(props);
    this.state = {
      detail: false,
      detailId: ''
    };
    this.closeDetail = this.closeDetail.bind(this);
  }
  closeDetail(){
    this.setState({detail: false});
  }
  render(){
    if(this.state.detail){
      return(
        <View style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
          <View style={{
            height: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 5
          }}>
            <Text style={{marginLeft: 10}}>{this.props.title}</Text>
            <Icon.Button
             name="close"
             size={25}
             color="black"
             backgroundColor="transparent"
             onPress={this.closeDetail}
            />
          </View>
          <View style={{display: 'flex',
            height: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginLeft: 15,
            marginRight: 15
          }}>
          <Text style={{color: 'gray', fontSize: 12}}>
            {this.props.subtitle}
          </Text>
          <Text style={{color: 'gray', fontSize: 12}}>2017/03/31</Text>
          </View>
          <View style={{flex: 1, borderBottomWidth: 1}}>
            <ScrollView style={{ backgroundColor: 'white'}}>
            <Text style={{margin: 20}}>
              {this.props.content}
            </Text>
            </ScrollView>
          </View>
        </View>
      );
    }else{
      return (
        <View style={{display:'flex', flex: 1, justifyContent: 'flex-start'}}>
        <ScrollView>
          <TouchableHighlight onPress={()=>{
            this.setState({detail: true});
          }}>
          <View style={{display: 'flex', backgroundColor: '#f2f2f2',
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
            <Text style={{color: 'gray', fontSize: 12}}>2017/03/31</Text>
            </View>
          </View>
          </TouchableHighlight>

        </ScrollView>
        </View>

      );
    }

  }

}
