import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  SegmentedControlIOS
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImgCard from '../common/ImgCard';
import Header from '../common/Header';
import { GLOBLE } from '../common/Globle';
import { CONFIG } from '../../config';
import PhotoCard from '../learning/learningTab/photoCard';

const styles = StyleSheet.create({
  container: {
    flex: 1
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

class MyWorkScreen extends Component {
  constructor(props){
    super(props);
    this.renderMyWorkContent = this.renderMyWorkContent.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.renderScrollEndMsg = this.renderScrollEndMsg.bind(this);
  }
  componentWillMount(){
    this.setState({selectedIndex: 0});

    fetch(CONFIG.API_BASE_URL.concat('/posts/me'), {
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
                                console.log('my works~', json);
                                this.setState(json);
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



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
  renderScrollEndMsg(end){
    if(end){
      return (
        <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
          <Text> 沒有更多文章了... </Text>
        </View>
      );
    }else{
      return (<View />);
    }
  }
  renderPosts(){
    const loginState = this.props.loginState;
    if(this.state.posts){
      const postLength = this.state.posts.length;
      return(this.state.posts.map(
        function(post, index){
          let createdDate = post.createdDate;
          let resources = post.detail.resources;
          let end = (index==postLength-1)? true : false;
          let teacher = post.advisor;
          let teacherFullName = teacher.lastName.concat(teacher.firstName);
          return (
            <View key={post._id}>
            <PhotoCard
              _id={post._id}
              post={post}
              resources={resources}
              loginState={loginState}
              title={post.detail.title}
              author={post.author.lastName.concat(post.author.firstName)}
              publishDate={createdDate}
              teacher={teacherFullName}
            >
            </PhotoCard>
            {this.renderScrollEndMsg(end)}
            </View>

          );
        }.bind(this)
      ));
    }else{
      return (<Text> 載入中...</Text>);
    }

  }

  renderMyWorkContent(){
    if(this.state.selectedIndex === 0){
      //TODO: fetch my post (/posts/me), this.props.loginState.xAuth
      console.log(this.state.posts, 'my work state');
      return(
        <ScrollView>
          {
           this.renderPosts()
          }

        </ScrollView>
      );

    }

    if(this.state.selectedIndex === 1){
      return(
        <View>
          <Text>star</Text>
        </View>
        );
    }
  }


  render() {
    return (
      <View style={{display: 'flex', flex: 1}}>
        <SegmentedControlIOS
              values={['個人作品', '聯合報之星']}
              selectedIndex={this.state.selectedIndex}
              style={{ width: 280, marginTop: 10, alignSelf: 'center'}}
              onChange={(event) => {
                this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
              }}
            />

          <View style={{flex: 1}}>
            {
              this.renderMyWorkContent()
            }
          </View>
        </View>

    );
  }
}

export default MyWorkScreen;
