/* components/Dashboard.js */
import React, { Component } from 'react';
import { TabBarIOS, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTabBarItem, TABBAR } from '../actions/index';
import LearningView from './learning/LearningView';
import ExhibitionView from './exhibition/ExhibitionView';
import ActivityView from './activity/ActivityView';
import ProfileView from './profile/ProfileView';
import CourseView from './course/CourseView';
import Icon from 'react-native-vector-icons/FontAwesome';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'Activity'
    };
  }
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
            <CourseView />
        </Icon.TabBarItem>
      );
    }
  }
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
            <ExhibitionView />
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
  }
}

// Anything returned from this function will end up as props
// on the LoginForm container
function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
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
