import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CONFIG } from '../../config';

const timer = require('react-native-timer');
const moment = require('moment');
// width: 0 in cardText style is really weird, but it works
//reference: dwilt's answer @ https://github.com/facebook/react-native/issues/1438
const NotificationTypes = Object.freeze({
    T_CREATECOURSE: 'T_CREATECOURSE',
    S_JOINCOURSE: 'S_JOINCOURSE',
    T_CREATETASK: 'T_CREATETASK',
    S_SUBMITTASK: 'S_SUBMITTASK',
    A_LIKEAPOST: 'A_LIKEAPOST',
    A_UNLIKEAPOST: 'A_UNLIKEAPOST',
    S_USHOWAWARD: 'S_USHOWAWARD',
    T_USHOWAWARD: 'T_USHOWAWARD',

});
const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B1B1B1',
    margin: 5
  },
  cardText: {
    display: 'flex',
    margin: 5,
    justifyContent: 'center',
    flexDirection: 'column',
    width: 0,
    flexGrow: 1,
  },
  cardHeader: {
    flex: 1,
    flexWrap: "wrap",

  },
  cardTime: {
    color: '#D8D8D8',
    fontSize: 12
  }
}
class NotificationItem extends Component{
  constructor(props){
    super(props);
    this.renderNotificationItems = this.renderNotificationItems.bind(this);
    this.fetchNotifs = this.fetchNotifs.bind(this);
    this.titleTemplate = this.titleTemplate.bind(this);
    this.filterTeacherNotifs = this.filterTeacherNotifs.bind(this);
    this.filterStudentNotifs = this.filterStudentNotifs.bind(this);
    this.handleScrollNewest = this.handleScrollNewest.bind(this);
    this.friendlyTimeFormatter = this.friendlyTimeFormatter.bind(this);
    this.deltaTranslator = this.deltaTranslator.bind(this);
    this.deltaThresholdcheck = this.deltaThresholdcheck.bind(this);
  }
  componentWillMount() {
    this.state = { notifications: []};
    this.fetchNotifs();
    this.timer = setTimeout(
      () => { console.log('this is a timer'); },
      500
    );
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer); //unmount the timer
  }

  fetchNotifs(){

    fetch(CONFIG.API_BASE_URL.concat('/personal_notifications'), {
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

            console.log(json, 'notifs');
            this.setState({notifications: json});

                              });

        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
  // UTC -> CST (absolute time)
  // Time delta
  //
  friendlyTimeFormatter(time){
    let date = moment(time.toString()).toDate();

    let MM = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let dd = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let formatedDate = `${yyyy}-${MM}-${dd} ${hh}:${mm}`;
    console.log(yyyy,MM,dd,hh+8,mm);
    let delta = moment(formatedDate, "YYYY-MM-DD hh:mm").fromNow();
    console.log(this.deltaTranslator(delta), delta);
    if(this.deltaThresholdcheck(delta)){
      return formatedDate;
    }else{
      return this.deltaTranslator(delta);
    }

    //return moment(time.toString()).toDate().toString();
  }
  //Return true if the value is higher than threshold
  deltaThresholdcheck(dateString){
    let checkResult = false;
    let monthLevel = (dateString.includes('months'));
    let value = dateString.split(' ')[0];
    console.log(value, '值');
    if(monthLevel && (value > 2)){ //threshold = 2 months
      checkResult = true;
    }
    return checkResult;
  }
  deltaTranslator(dateString){
    //TODO: 設個 threshold, 則顯示日期不顯示 delta

    //replace days to 天, ago to 前
    let TranslatedDate =
      dateString.replace('days', '天').
      replace('hours', '小時').
      replace('minutes', '分鐘').
      replace('ago', '前').
      replace('a minute', '1 分鐘').
      replace('a day', '1 天').
      replace('an hour', '1 小時').
      replace(' ', '');

    return TranslatedDate;



  }

  titleTemplate(teacher, course){
    return `${teacher}老師在${course}新增了1個作品繳交項目。`
  }
  customizedDelta(){
    //Given a time delta, return a friendly format
  }
  filterTeacherNotifs(item, index){
    let icon = 'pencil';
    let content = this.titleTemplate('就宜史', '復興國小作文班');//'陳可可老師在復興國小作文班新增了1個作品繳交項目。';
    switch(item.notifType){
      case NotificationTypes.S_JOINCOURSE:
      return(
        <View style={styles.card} key={index}>
          <Icon name={'user-plus'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
      case NotificationTypes.S_SUBMITTASK:
      return(
        <View style={styles.card} key={index}>
          <Icon name={'pencil'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
      case NotificationTypes.A_LIKEAPOST:
      return(
        <View style={styles.card} key={index}>
          <Icon name={'thumbs-up'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
      case NotificationTypes.T_USHOWAWARD:
      return(
        <View style={styles.card} key={index}>
          <Icon name={'star'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
    default:
      return(<View key={index}/>);
    }
  }
  filterStudentNotifs(item, index){
    //let content = this.titleTemplate('就宜史', '復興國小作文班');
    //'陳可可老師在復興國小作文班新增了1個作品繳交項目。';
    switch(item.notifType){
      case NotificationTypes.S_JOINCOURSE:
      return(
        <View style={styles.card} key={index}>
          <Icon name={'user-plus'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
      case NotificationTypes.S_SUBMITTASK:
      return(
        <View style={styles.card} key={index}>
          <Icon name={'pencil'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
      case NotificationTypes.A_LIKEAPOST:
      return(
        <View style={styles.card} key={index}>
          <Icon name={'thumbs-up'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
      case NotificationTypes.T_CREATETASK:
      return(
        <View style={styles.card} key={index}>
          <Icon name={'file-text-o'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
      case NotificationTypes.S_USHOWAWARD:
      //FIXME
      return(
        <View style={styles.card} key={index}>
          <Icon name={'star'} size={30} color="#00B9F1" style={{margin: 3}}/>
          <View style={styles.cardText}>
            <View>
              <Text style={styles.cardHeader}>{item.data.message}</Text>
            </View>
            <View>
              <Text style={styles.cardTime}>{this.friendlyTimeFormatter(item.happenAt)}</Text>
            </View>
          </View>
        </View>
      );
    default:
      return(<View key={index}/>);
    }
  }
  // type=> audience => factory (obj, template selection)
  renderNotificationItems(item, index){

    switch(this.props.loginState.role){
      case 'teacher':
        return this.filterTeacherNotifs(item, index);
      case 'student':
        return this.filterStudentNotifs(item, index);
      default:
        return(<View></View>);
    }
  }
  handleScrollNewest(event: Object){
    let scrollGesture = event.nativeEvent.contentOffset.y;
    console.log('event.nativeEvent.contentOffset.y: ', event.nativeEvent.contentOffset.y);
    //if the user scrolls over the top => trigger update mechanism
    if(scrollGesture < 0){
      this.fetchNotifs();
      //a timeout for update redux
      //REUSE: a pattern for resolving redux async delay problem
      timer.setTimeout(
        this, 'getExhibition', () => {

          //fetch the data and set it to redux
          //this.updateNewPosts();
          //this.updateHotPosts();
        },
        500
      );

    }

  }
  render(){
    /*
    { this.renderNotificationItems('pencil', '陳可可老師在復興國小作文班新增了1個作品繳交項目。', 1)}
    { this.renderNotificationItems('thumbs-up', '鄭興華對你的旅遊作品按讚。', 2)}
    { this.renderNotificationItems('star', '你的旅遊作品被推薦為聯合報之星。', 3)}
    */
    return(
       <ScrollView style={{ flex: 1 }} onScroll={this.handleScrollNewest}>
         { this.state.notifications.map(
           (item, index)=>this.renderNotificationItems(item, index)
         )
           }
       </ScrollView>
    )
  }
}

export { NotificationItem };
