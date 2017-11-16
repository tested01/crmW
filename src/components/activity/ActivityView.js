import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  WebView,
  Text,
  Image,
  Dimensions,
  TouchableHighlight
 } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { hideHeader } from '../../actions/index';
import { GLOBLE } from '../common/Globle';
import { CONFIG } from '../../config';
const window = Dimensions.get('window');
var actId = 0;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GLOBLE.COLOR.BLUE,
    alignItems: 'center',
    height: 60,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
});


class ActivityView extends Component {
  constructor(props){
    super(props);
    this.renderActivityCard = this.renderActivityCard.bind(this);
    this.renderActivityDetail = this.renderActivityDetail.bind(this);
    this.leftDetail = this.leftDetail.bind(this);
    this.enterDetail = this.enterDetail.bind(this);
    this.fetchActivities = this.fetchActivities.bind(this);
    this.renderNewest = this.renderNewest.bind(this);
    this.isCurrentSelectedActivity = this.isCurrentSelectedActivity.bind(this);
    this.getDateString = this.getDateString.bind(this);
  }
  componentWillMount(){
    this.state = {
      index: 0,
      url: '',
      routes: [
        { key: '1', title: '最新' },
        { key: '2', title: '熱門' },
      ],
      inDetail: false
    };
    this.fetchActivities();
  }

  fetchActivities(){
    fetch(CONFIG.API_BASE_URL.concat('/activities'), {
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
                                //this.setState(Object.assign({}, this.state, json));
                                json.map((act)=>{
                                  console.log('act:', act, act.happenAt.toString().split('T')[0]);
                                })
                                this.setState(Object.assign({}, this.state, {'activities': json}));
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChangeTab = (index) => {
    this.setState({ index });

  };

  renderHeader = (props) => <TabBar {...props} />;

  renderHot(){
    if(this.state.activities){
      return(
        <ScrollView>
           { this.state.activities.filter((activity)=>{
             if(activity.viewers.length >=0){
               return true;
             }else{
               return false;
             }
           })
             .map((activity)=>{
             return(
               this.renderActivityCard(activity)
             )
           }) }
           <Text></Text>
        </ScrollView>
      );
    }else{
      return(<Text>載入中</Text>)
    }
  }

  renderNewest(){
    /*
    {this.renderActivityCard('http://stevenwu.no-ip.org/activitys/act_01.png', '好讀找好文大賽')}
    {this.renderActivityCard('http://stevenwu.no-ip.org/activitys/act_02.png', '楚才盃')}
    */
      if(this.state.activities){
        return(
          <ScrollView>
             { this.state.activities.map((activity)=>{
               return(
                 this.renderActivityCard(activity)
               )
             }) }
             <Text></Text>
          </ScrollView>
        );
      }else{
        return(<Text>載入中</Text>)
      }

  }

  /*
  Example of javascript find
  --
    function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
      if (element % start++ < 1) {
        return false;
      }
    }
    return element > 1;
  }

  console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
  console.log([4, 5, 8, 12].find(isPrime)); // 5
  */
 isCurrentSelectedActivity(element, index, array) {
    console.log('this.state.activityId1', this.state.activityId);
    if(element._id == this.state.activityId){
      return true
    }else{
      return false
    }
  }
  renderActivityDetail(){
    this.props.hideHeader(true, '活動');
      //{this.renderActivityCard(this.state.activityId)}
    let currentActivity = this.state.activities.find(this.isCurrentSelectedActivity);
    console.log('currentActivity', currentActivity);
      return(
        <View>
        {this.renderActivityHeader(this.state.title)}
        <View style={{marginTop: 5, height: window.height - 60 , width: window.width, borderWidth: 0}}>
        <WebView
          source={{uri: currentActivity.webpage}}
          style={{marginTop: 0}}>
        </WebView>
        </View>
        </View>
      );


  }

  enterDetail(){
    this.setState({inDetail: true});
  }
  getDateString(time1, time2){
    if(time2){
      return time1.toString().split('T')[0] + '~' + time2.toString().split('T')[0];;
    }

    return time1.toString().split('T')[0];

  }
  renderActivityCard(activity){


      return (
        <View
          key={activity._id}
          style={{
          display: 'flex',
          alignItems: 'center',
          borderWidth:0.8,
          borderColor: '#dbdbdb',
          height:220,
          width: window.width - 6,
          margin: 3,
          borderRadius: 5,
          justifyContent: 'flex-start'
         }}>
         <TouchableHighlight value='5'  onPress={()=>
           {
             this.enterDetail();
             this.setState({activityId: activity._id});
             console.log('this.state.activityId2', activity);
             this.setState({title: activity.title});
           }
         }>
         {<Image
         source={{uri:activity.thumbnail}}
         fadeDuration={0}
         style={{resizeMode: 'contain',
                 width: window.width - 10,
                 height: 170,
                 margin: 5,
                 marginTop: -3
                }}
         />}
         </TouchableHighlight>
        <View style={{flex: 1,
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 3,
          marginLeft: 3
        }}>
        <Text allowFontScaling={false} style={{}}>{activity.title}</Text>
        <Text allowFontScaling={false} style={{ color: 'gray'}}>{this.getDateString(activity.happenAt, activity.endAt)}</Text>
        </View>
        </View>
      );
  }


  renderActivityHeader(headerTitle) {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        {this.renderActivityHeaderLeft()}
        <Text allowFontScaling={false} style={{ marginTop: 15, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}>
          {headerTitle}
        </Text>
        {this.renderActivityHeaderRight()}
      </View>
    );
  }
  leftDetail(){
    this.setState({inDetail: false});
    this.props.hideHeader(false, '活動');
  }
  renderActivityHeaderLeft(){
    return(
      <Icon.Button
      name="angle-left"
      size={30}
      backgroundColor='transparent'
      color="white"
      onPress={this.leftDetail}
       />
    );
  }
  renderActivityHeaderRight(){
    return(<View style={{width: 30}}></View>);
  }


  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return this.renderNewest();
    case '2':
      return this.renderHot();
    default:
      return null;
    }
  };

  render() {

    if(this.state.inDetail){
      return this.renderActivityDetail();
    }else{
      return (
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hideHeader
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    loginState: state.loginState,
    literaryWorksState: state.literaryWorksState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(ActivityView);
