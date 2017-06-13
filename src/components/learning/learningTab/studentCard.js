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

  }

  onSubmitToggle(){
    if(this.state.submitToggle){
      this.setState({submitToggle: false});
    }else{
      this.setState({submitToggle: true});
    }
  }


  renderSubmitToggle(){
      //TODO: flag is still fake(mock) data
      if(this.state.submitToggle){
        return(
          <View>
          {this.props.currentMissionPosts.map(
            (post)=>(
              <StudentCard
                key={post._id}
                style={styles.cardList}
                name={post.author.lastName+post.author.firstName}
                title={post.detail.title}
                flag={true}
            />)

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

  renderNotSubmitToggle(){
    if(this.state.notSubmitToggle){
      return(
        <StudentCard
        style={styles.cardList}
        name='吳小福'
        title='我看彎腰郵筒'
        flag={false}
        />
      );
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
    console.log(submittedSet, 'B: submitted std');
    console.log(courseSet, 'A: class members');
    console.log(notSubmittedSet, 'C: not submitted yet');

    return(
      <ScrollView>
          <TouchableHighlight onPress={this.onSubmitToggle}>
            <Text>已繳交</Text>
          </TouchableHighlight>

          {this.renderSubmitToggle()}

         <TouchableHighlight onPress={this.onNotSubmitToggle}>
           <Text>未繳交</Text>
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
          source={require('../../../img/react-logo.png')}
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
    if(selected){
      return(
        <View style={styles.flags}>
          <Text style={{fontSize: 12, color: 'gray'}}>3/23 14:00</Text>
          <Icon name="bookmark" size={30} color="#F9C00C" />
        </View>
      );
    }else{
      return(
        <View style={styles.flags}>
          <Text style={{fontSize: 12, color: 'gray'}}>3/23 14:00</Text>
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
