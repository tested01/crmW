import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';

class WorkCard extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
     // st stands for submit
     let st = {
        submitText: '未繳交',
        submitColor: 'gray'
      };
      if(this.props.submitted == 'yes'){
        st = {
           submitText: '已繳交',
           submitColor: '#ffcc00'
         };
      }
      // hcw stands for has Course Works
      let hcw = {
        courseWorkText: '班級作品',
        courseWorkColor: 'gray'
      }
      if(this.props.hasCourseWorks == 'yes'){
        hcw = {
           courseWorkText: '班級作品',
           courseWorkColor: '#ffcc00'
         };
       }
    const styles = {
      workCard: {
        alignSelf: 'stretch',
        display: 'flex',
        backgroundColor: '#f2f2f2',
        margin: 2,
        height: 108,
        justifyContent: 'space-between'
      },
      buttons: {
        display: 'flex',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      thumbnail: {
        width: 70,
        height: 70,
        backgroundColor: '#bfbfbf'
      },
      content: {
        display: 'flex',
        height: 70,
        margin: 4,
        flexDirection: 'row'
      }
    };
    const window = Dimensions.get('window');
    return(
      <View style={styles.workCard}>
        <View style={styles.content}>
          <View style={styles.thumbnail}/>
            <View style={{display: 'flex', justifyContent: 'space-around'}}>
              <View style={{marginLeft: 4}}>
                <Text style={{fontSize: 14}}>
                   {this.props.title}
                </Text>
              </View>
              <View style={{marginLeft: 4}}>
                <Text style={{fontSize: 12}}>
                   {this.props.subtitle}
                </Text>
              </View>
            </View>
        </View>
        <View style={styles.buttons}>
        <View style={{backgroundColor: st.submitColor,
        width: window.width/2-8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
      }}>
          <TouchableHighlight>
            <Text style={{color: 'white'}}>{st.submitText}</Text>
          </TouchableHighlight>
        </View>
        <View style={{backgroundColor: hcw.courseWorkColor,
        width: window.width/2-8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
    }}>
          <TouchableHighlight>
            <Text style={{color: 'white'}}>{hcw.courseWorkText}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    );
  }
}

export default WorkCard;
