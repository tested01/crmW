/* components/Dashboard.js */
import React, { Component } from 'react';
import { TabBarIOS, View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { selectTabBarItem, TABBAR } from '../actions/index';
import LearningView from './learning/LearningView';
import ExhibitionView from './exhibition/ExhibitionView';
import ActivityView from './activity/ActivityView';
import ProfileView from './profile/ProfileView';
import CourseView from './course/CourseView';
import { GLOBLE } from './common/Globle';
import NotificationView from './notification/NotificationView';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'Activity'
    };
    //this.roleBasedRender();
    this.getCurrentRouteName = this.getCurrentRouteName.bind(this);
    this.getTABBAR = this.getTABBAR.bind(this);
  }

  getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  }
  //deprecate
  /*
  roleBasedRender() {

    let role = this.props.loginState.role;
    console.log(this.props.loginState, 'loginState');
    if (role === 'student'){
      return (
        <Icon.TabBarItem
          title="學習"
          iconName="book"
          selectedIconName="book"
          onPress={() => {
            this.setState({ selectedTab: 'Learning' });
            this.props.selectTabBarItem(TABBAR.LEARNING);
            }
          }
          selected={this.state.selectedTab === 'Learning'}
          >
            <LearningView />
        </Icon.TabBarItem>
      );
    }
    if (role === 'teacher'){
      return(
        <Icon.TabBarItem
          title="課務"
          iconName="book"
          selectedIconName="book"
          onPress={() => {
            this.setState({ selectedTab: 'Course' });
            this.props.selectTabBarItem(TABBAR.COURSE);
            }
          }
          selected={this.state.selectedTab === 'Course'}
          >
            <LearningView />
        </Icon.TabBarItem>
      );
    }
  }*/
  static hideTabBar(){
    //Hide the tab bar
    ProfileScreen.navigationOptions.tabBarVisible = false;
    ActivityScreen.navigationOptions.tabBarVisible = false;
    ExhibitionScreen.navigationOptions.tabBarVisible = false;
    NotificationScreen.navigationOptions.tabBarVisible = false;
    LearningScreen.navigationOptions.tabBarVisible = false;
  }
  static showTabBar(){
    //Show the tab bar
    ProfileScreen.navigationOptions.tabBarVisible = true;
    ActivityScreen.navigationOptions.tabBarVisible = true;
    ExhibitionScreen.navigationOptions.tabBarVisible = true;
    NotificationScreen.navigationOptions.tabBarVisible = true;
    LearningScreen.navigationOptions.tabBarVisible = true;
  }
  getTABBAR(tabName){
    switch(tabName){
      case 'Course':
        return TABBAR.COURSE;
      case 'Learning':
        return TABBAR.LEARNING;
      case 'Activity':
        return TABBAR.ACTIVITY;
      case 'Exhibition':
        return TABBAR.EXIBITION;
      case 'Notification':
        return TABBAR.NOTIFICATION;
      case 'Profile':
        return TABBAR.PROFILE;
      default:
        return 'TODO: error handling';
    }

  }
  render() {
    let role = this.props.loginState.role;
    console.log(this.props.loginState, 'loginState');
    if (role === 'student'){
      return(
        <StudentDashboard
          onNavigationStateChange={(prevState, currentState) => {
          const currentScreen = this.getCurrentRouteName(currentState);
          const prevScreen = this.getCurrentRouteName(prevState);

          if (prevScreen !== currentScreen) {
            // the line below uses the Google Analytics tracker
            // change the tracker here to use other Mobile analytics SDK.
            this.setState({ selectedTab: currentScreen });
            //this.props.selectTabBarItem(TABBAR.EXIBITION);
            this.props.selectTabBarItem(this.getTABBAR(currentScreen));
          }
        }}
      />
      )
    }
    if (role === 'teacher'){
      return(
        <TeacherDashboard
          onNavigationStateChange={(prevState, currentState) => {
          const currentScreen = this.getCurrentRouteName(currentState);
          const prevScreen = this.getCurrentRouteName(prevState);

          if (prevScreen !== currentScreen) {
            // the line below uses the Google Analytics tracker
            // change the tracker here to use other Mobile analytics SDK.
            this.setState({ selectedTab: currentScreen });
            //this.props.selectTabBarItem(TABBAR.EXIBITION);
            this.props.selectTabBarItem(this.getTABBAR(currentScreen));
          }
        }}
      />
      )
    }


  }
  /*
  render() {
    return (
      <TabBarIOS>

        {this.roleBasedRender()}

        <Icon.TabBarItem
          title="活動"
          iconName="calendar"
          selectedIconName="calendar"
          onPress={() => {
            this.setState({ selectedTab: 'Activity' });
            this.props.selectTabBarItem(TABBAR.ACTIVITY);
            }
          }
          selected={this.state.selectedTab === 'Activity'}
          >
            <ActivityView />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="展演"
          iconName="university"
          selectedIconName="university"
          onPress={() => {
            this.setState({ selectedTab: 'Exhibition' });
            this.props.selectTabBarItem(TABBAR.EXIBITION);
            }
          }
          selected={this.state.selectedTab === 'Exhibition'}
          >
            <ExhibitionView loginState={this.props.loginState}/>
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="通知"
          iconName="bell"
          selectedIconName="bell"
          onPress={() => {
            this.setState({ selectedTab: 'Notification' });
            this.props.selectTabBarItem(TABBAR.NOTIFICATION);
            }
          }
          selected={this.state.selectedTab === 'Notification'}
          >
            <NotificationView loginState={this.props.loginState}/>
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="我"
          iconName="user"
          selectedIconName="user"
          onPress={() => {
            this.setState({ selectedTab: 'Profile' });
            this.props.selectTabBarItem(TABBAR.PROFILE);

            }
          }
          selected={this.state.selectedTab === 'Profile'}
          >
            <ProfileView />
        </Icon.TabBarItem>

      </TabBarIOS>

    );
  }*/
}


class LearningScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '學習',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/dashboard/learn.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />

    ),
  };
  render() {

    return (
     <LearningView />
    );
  }
}


class CourseScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '課務',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/dashboard/learn.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />

    ),
  };
  render() {

    return (
     <LearningView />
    );
  }
}

class ActivityScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '活動',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/dashboard/activity.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />

    ),
  };
  render() {

    return (
     <ActivityView />
    );
  }
}

class ExhibitionScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '展演',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/dashboard/exhib.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />

    ),
  };
  render() {

    return (
     <ExhibitionView loginState={this.props.loginState}/>
    );
  }
}

class NotificationScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '通知',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/dashboard/notif.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />

    ),
  };
  render() {

    return (
     <NotificationView loginState={this.props.loginState}/>
    );
  }
}

class ProfileScreen extends Component {
  //tabBarVisible: false,
  static navigationOptions = {
    tabBarLabel: '我',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/dashboard/profile.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />

    )
  };
  render() {
    return (
     <ProfileView />
    );
  }
}

const StudentDashboard = TabNavigator({
  Learning: {
    screen: LearningScreen
  },
  Activity: {
    screen: ActivityScreen
  },
  Exhibition: {
    screen: ExhibitionScreen
  },
  Notification: {
    screen: NotificationScreen
  },
  Profile: {
    screen: ProfileScreen
  }
}, {
  tabBarOptions: {
    activeTintColor: GLOBLE.COLOR.DARKBLUE//'#3B5998'//'#57c1f9'
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  initialRouteName: 'Activity',

});

const TeacherDashboard = TabNavigator({
  Course: {
    screen: CourseScreen
  },
  Activity: {
    screen: ActivityScreen
  },
  Exhibition: {
    screen: ExhibitionScreen
  },
  Notification: {
    screen: NotificationScreen
  },
  Profile: {
    screen: ProfileScreen
  }
}, {
  tabBarOptions: {
    activeTintColor: 'blue'
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  initialRouteName: 'Activity'
});

// Anything returned from this function will end up as props
// on the LoginForm container
function mapDispatchToProps(dispatch) {

  return bindActionCreators({ selectTabBarItem }, dispatch);
}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
    //selectedFeature: state.selectedFeature,
    loginState: state.loginState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
