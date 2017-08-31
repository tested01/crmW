import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  updateExhibition
 } from '../../actions';
import ImgCard from '../common/ImgCard';
import Header from '../common/Header';
import PhotoCard from '../learning/learningTab/photoCard';
import { GLOBLE } from '../common/Globle';
import { CONFIG } from '../../config';

const timer = require('react-native-timer');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    zIndex: 1,
  },
  label: {
    backgroundColor: 'transparent',
    color: 'black',
    margin: 0,
  },
  indicator: {
    //backgroundColor: 'black'
    backgroundColor: GLOBLE.COLOR.BLUE,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
    zIndex: 2
  }
});

class ExhibitionView extends Component {
  constructor(props){
    super(props);
    this.fetchuShowPosts=this.fetchuShowPosts.bind(this);
    this.renderPost=this.renderPost.bind(this);
    this.handleScrollNewest=this.handleScrollNewest.bind(this);
    this.updateNewPosts=this.updateNewPosts.bind(this);
    this.updateHotPosts=this.updateHotPosts.bind(this);
  }
  componentWillMount(){
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: '最新' },
        { key: '2', title: '熱門' },
        { key: '3', title: '聯合報\n  之星' },
        { key: '4', title: '  聯合報\n寫作教室' },
      ],
      selectedIndex: 0
    };
    this.fetchuShowPosts();
    this.fetchuStarPosts();

    this.props.updateExhibition(this.props.loginState.xAuth);

    timer.setTimeout(
      this, 'getExhibition', () => {
        console.log(this.props.exhibition, 'this.props.updateExhibition');
        this.updateNewPosts();
        this.updateHotPosts();
        this.fetchuShowPosts();
        this.fetchuStarPosts();
      },
      500
    );

  }
  /*
   When a component unmounts, these timers have to be cleared and, so that you
   are not left with zombie timers doing things when you did not expect them
   to be there.
   [*] https://www.npmjs.com/package/react-native-timer
  */
  componentWillUnmount(){
    timer.clearTimeout(this);
  }

  handleChangeTab = (index) => {
    this.setState({ index });
  };

/*
_renderIcon = ({ route }) => {
    return <Ionicons name={route.icon} size={24} color="white" />;
  };
*/

  renderHeader = (props) => {
    //<Icon name="rocket" size={30} color="#900" />
    //renderIcon={this._renderIcon}

    return (
      <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.label}
          indicatorStyle={styles.indicator}
      />
    );
  };

  handleScrollNewest(event: Object){
    let scrollGesture = event.nativeEvent.contentOffset.y;
    console.log('event.nativeEvent.contentOffset.y: ', event.nativeEvent.contentOffset.y);
    //if the user scrolls over the top => trigger update mechanism
    if(scrollGesture < 0){
      this.props.updateExhibition(this.props.loginState.xAuth);
      //a timeout for update redux
      //REUSE: a pattern for resolving redux async delay problem
      timer.setTimeout(
        this, 'getExhibition', () => {
          console.log(this.props.exhibition, 'this.props.updateExhibition scroll');
          //fetch the data and set it to redux
          this.updateNewPosts();
          this.updateHotPosts();
          this.fetchuShowPosts();
          this.fetchuStarPosts();
        },
        500
      );

    }

  }

  updateNewPosts(){
    fetch(CONFIG.API_BASE_URL.concat('/posts/filters/new/10'), {
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
                                console.log('new posts', {'newposts': json.posts});
                                this.setState(Object.assign({}, this.state, {'newposts': json.posts}));
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderNew(){
    if(this.state.newposts){
      return(
        <ScrollView style={{ flex: 1 }} onScroll={this.handleScrollNewest}>
        {this.state.newposts
          .filter(
            function(post){
              let postDate = new Date(post.createdDate);

              let d = new Date();
              d.setDate(d.getDate() - 80);//8 is temp threshold for new posts

              return (postDate > d);//the threshold of like count
            }
          )
          .map((post) => this.renderPost(post))
        }
        <View style={{height:50,
          width:window.width,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Text> 沒有更多文章了... </Text>
        </View>
        </ScrollView>
      );
    }else{
      return(<Text> 載入文章中, 需要網路開啟...</Text>);
    }
  }

  updateHotPosts(){
    fetch(CONFIG.API_BASE_URL.concat('/posts/filters/hot/10'), {
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
                                console.log('new posts', {'newposts': json.posts});
                                this.setState(Object.assign({}, this.state, {'hotposts': json.posts}));
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderHot(){
    if(this.state.hotposts){

      return(
        <ScrollView style={{ flex: 1 }} onScroll={this.handleScrollNewest}>
        {this.state.hotposts
          .filter(
            function(post){
              //console.log(post, post.likes.users.length);
              return (post.likes.users.length > 0);//the threshold of like count
            }
          )
          .map((post) => this.renderPost(post))
        }
        <View style={{height:50,
          width:window.width,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Text> 沒有更多文章了... </Text>
        </View>
        </ScrollView>
      );
  }else{
    return(<Text> 載入文章中, 需要網路開啟...</Text>);
  }

  }

  renderStar(){
    if(this.state.uStar){

      return(
        <ScrollView style={{ flex: 1 }} onScroll={this.handleScrollNewest}>
        {this.state.uStar.map(
          (post) => this.renderPost(post)
        )}
        <View style={{height:50,
          width:window.width,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Text> 沒有更多文章了... </Text>
        </View>
        </ScrollView>
      );
  }else{
    return(<Text> 載入文章中, 需要網路開啟...</Text>);
  }

  }


  //FIXME: guest doesn't have loginState...
  //TODO: create an anonymous version of PhotoCard
  renderPost(post){
    let createdDate = post.createdDate;
    let resources = post.detail.resources;
    //console.log(resources);
    let teacher = post.advisor;
    let teacherFullName = teacher.lastName.concat(teacher.firstName);
    return(
      <PhotoCard
        key={post._id}
        _id={post._id}
        post={post}
        resources={resources}
        loginState={this.props.loginState}
        title={post.detail.title}
        author={post.author.lastName.concat(post.author.firstName)}
        publishDate={createdDate}
        teacher={teacherFullName}
      >
      </PhotoCard>
    );
  }

  /*
renderClassRoom(){
  console.log(this.state.uShow, 'this.state.uShow');
  if(this.state.uShow){

    return(
      <ScrollView style={{ flex: 1 }}>
      {this.state.uShow.map(
        (post) => this.renderPost(post)
      )}
      <View style={{height:50,
        width:window.width,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }} >
        <Text> 沒有更多文章了... </Text>
      </View>
      </ScrollView>
    );
  }
}
  */
  renderClassRoom(){
    if(this.state.uShow){

      return(
        <ScrollView style={{ flex: 1 }} onScroll={this.handleScrollNewest}>
        {this.state.uShow.map(
          (post) => this.renderPost(post)
        )}
        <View style={{height:50,
          width:window.width,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Text> 沒有更多文章了... </Text>
        </View>
        </ScrollView>
      );
    }else{
      return(<Text> 載入文章中, 需要網路開啟...</Text>);
    }
  }

  fetchuShowPosts(){
    fetch(CONFIG.API_BASE_URL.concat('/shows/'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                this.setState({'uShow': json.posts});
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchuStarPosts(){
    fetch(CONFIG.API_BASE_URL.concat('/stars/'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                this.setState({'uStar': json.posts});
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return this.renderNew();
    case '2':
      return this.renderHot();
    case '3':
      return this.renderStar();
    case '4':
      return this.renderClassRoom();
    default:
      return null;
    }
  };

  render() {
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


// Anything returned from this function will end up as props
// on the LoginForm container

function mapDispatchToProps(dispatch) {
  
  return bindActionCreators({
    updateExhibition
   }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
    //selectedFeature: state.selectedFeature,
    loginState: state.loginState,
    exhibition: state.exhibition
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
//export default connect(mapStateToProps, mapDispatchToProps)(LearningView);
export default connect(mapStateToProps, mapDispatchToProps)(ExhibitionView);
