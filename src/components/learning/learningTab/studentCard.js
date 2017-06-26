import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CONFIG } from '../../../config';
import { GLOBLE } from '../../common/Globle';

const window = Dimensions.get('window');

const styles = {
  cardList: {

  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: window.width,
    height: 56
  },
  infoBox:{
    display: 'flex',
    justifyContent: 'space-around'
  },
  avatarBox: {
    display: 'flex',
    flexDirection: 'row'
  },
  flags: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  toggleBar: {
    height: 35,
    width: window.width,
    backgroundColor: '#ededed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1

  }
}
class StudentCardList extends Component{
  constructor(props){
    super(props);
    this.state = {
      submitToggle: true,
      notSubmitToggle: true
    };
    this.onSubmitToggle=this.onSubmitToggle.bind(this);
    this.onNotSubmitToggle=this.onNotSubmitToggle.bind(this);
    this.renderSubmitToggle=this.renderSubmitToggle.bind(this);
    this.renderSubmittedIcon=this.renderSubmittedIcon.bind(this);
    this.renderNotSubmittedIcon=this.renderNotSubmittedIcon.bind(this);
  }

  componentWillMount(){
    //TODO: post '/users/list'
    let submittedSet = this.props.currentMission.detail.students.submitted;
    let courseSet = this.props.currentMission.detail.target.members.students;
    let notSubmittedSet = [...courseSet].filter(x => submittedSet.indexOf(x) < 0 );
    let list = {
      list: notSubmittedSet
    }
    fetch(CONFIG.API_BASE_URL.concat('/users/list'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth
      },
      body: JSON.stringify(list)
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                console.log(json, 'notSubmittedSet Students');
                                this.setState({notSubmitted: json.users})
                              });

        } else {
          console.log(response.status, 'mission');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmitToggle(){
    if(this.state.submitToggle){
      this.setState({submitToggle: false});
    }else{
      this.setState({submitToggle: true});
    }
  }

  renderSubmittedIcon(){
    if(this.state.submitToggle){
      return(<Icon name="sort-up" size={30} color="black" />);
    }else{
      return(<Icon name="sort-down" size={30} color="black" />)
    }

  }
  renderSubmitToggle(){
      //TODO: flag is still fake(mock) data
      if(this.state.submitToggle){
        return(
          <View>
          {this.props.currentMissionPosts.map(
            (post)=>{
              console.log(post.publicVisible.visible, 'post.publicVisible.visible~');
              let uShow = (post.publicVisible.visible.indexOf('uShow') > -1);//TODO: refactoring to constant
              console.log(uShow, 'uShow');
              let publishDate = GLOBLE.formatDateTimeString(post.createdDate, '/');
              return(
                <StudentCard
                  key={post._id}
                  style={styles.cardList}
                  name={post.author.lastName+post.author.firstName}
                  publishDate={publishDate}
                  title={post.detail.title}
                  flag={uShow}
              />)
            }


          )}
          </View>
        );
      }else{
        return(<View></View>);
      }


  }

  onNotSubmitToggle(){
    if(this.state.notSubmitToggle){
      this.setState({notSubmitToggle: false});
    }else{
      this.setState({notSubmitToggle: true});
    }
  }
  renderNotSubmittedIcon(){
    if(this.state.notSubmitToggle){
      return(<Icon name="sort-up" size={30} color="black" />);
    }else{
      return(<Icon name="sort-down" size={30} color="black" />)
    }
  }
  renderNotSubmitToggle(){
    if(this.state.notSubmitToggle){
      if(this.state.notSubmitted){
        return(
          this.state.notSubmitted.map(
            std=>(
              <StudentCard
              key={std._id}
              style={styles.cardList}
              name={std.lastName+std.firstName}
              title=''
              publishDate=''
              flag={false}
              />
            )
          )
        );
      }else{
        return(<View></View>);
      }
    }else{
      return(<View></View>);
    }
  }

  render(){
    /*
    //ES6: set operation example
    let a = new Set([1,2,3,4]);
    let b = new Set([5,4,3,2]);
    console.log(new Set([...a].filter(x => !b.has(x)))); //a\b => {1}
    console.log(new Set([...b].filter(x => !a.has(x)))); //b\a => {5}
    console.log(new Set([...a].filter(x => b.has(x))));  //a∩b => {2,3,4}
    */
    let submittedSet = this.props.currentMission.detail.students.submitted;
    let courseSet = this.props.currentMission.detail.target.members.students;
    let notSubmittedSet = [...courseSet].filter(x => submittedSet.indexOf(x) < 0 );
    console.log(this.props.currentMission, 'this.props.currentMission');
    console.log(submittedSet, 'B: submitted std');
    console.log(courseSet, 'A: class members');
    console.log(notSubmittedSet, 'C: not submitted yet');

    return(
      <ScrollView>
          <TouchableHighlight onPress={this.onSubmitToggle}>
            <View style={styles.toggleBar}>
              <View style={{margin: 5}}>
               <Text>已繳交</Text>
              </View>
              {this.renderSubmittedIcon()}
            </View>
          </TouchableHighlight>

          {this.renderSubmitToggle()}

         <TouchableHighlight onPress={this.onNotSubmitToggle}>
           <View style={styles.toggleBar}>
             <View style={{margin: 5}}>
             <Text>未繳交</Text>
             </View>
             {this.renderNotSubmittedIcon()}
           </View>
         </TouchableHighlight>

           {this.renderNotSubmitToggle()}



     </ScrollView>
    );
  }
}

class StudentCard extends Component{
  constructor(props){
    super(props);
    this.avatar = this.avatar.bind(this);
  }
  avatar(name, title){
    return(
      <View style={styles.avatarBox}>
        <Image
          source={require('../../../img/love-logo.png')}
          resizeMode="contain"
          fadeDuration={0}
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            borderWidth: 1,
            marginRight: 5
           }}
        />
        <View style={styles.infoBox}>
         <Text>{name}</Text>
         <Text style={{
           color: 'gray',
           fontSize: 12
         }}>{title}</Text>
        </View>
      </View>
    );

  }
  flag(selected){
    //date format: 3/23 14:00
    if(selected){
      return(
        <View style={styles.flags}>
          <Text style={{fontSize: 12, color: 'gray'}}>{this.props.publishDate}</Text>
          <Icon name="bookmark" size={30} color="#F9C00C" />
        </View>
      );
    }else{
      return(
        <View style={styles.flags}>
          <Text style={{fontSize: 12, color: 'gray'}}>{this.props.publishDate}</Text>
          <Icon name="bookmark" size={30} color="white" />
        </View>
      );
    }

  }
  render(){
    return(
      <View style={styles.card}>
        {this.avatar(this.props.name, this.props.title)}
        {this.flag(this.props.flag)}
      </View>
    );
  }
}

export {StudentCard, StudentCardList};
