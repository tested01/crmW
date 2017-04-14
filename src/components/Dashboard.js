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
  render() {
    const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAA' +
                       'BLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3' +
                       'btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ' +
                       '4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA' +
                       '3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLE' +
                       'jdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKz' +
                       'LC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzg' +
                       'ZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZb' +
                       'GR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2' +
                       'zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNN' +
                       'WFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM' +
                       '773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPV' +
                       'XNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky' +
                       '+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
    return (
      <TabBarIOS>
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
    selectedFeature: state.selectedFeature
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
