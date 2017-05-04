import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Select, Option } from './react-native-chooser';
import { setCurrentCourse } from '../actions/index';
import { CONFIG } from '../config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch'
  }
});

const window = Dimensions.get('window')

class CourseSelector extends Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){

  }
  /*
    When the course selected,
    Set the course context to the course's code*/
  updateCurrentCourse(currentCourseCode) {

    fetch(CONFIG.API_BASE_URL.concat('/courses/').concat(currentCourseCode), {
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
                                this.props.setCurrentCourse(json.course);
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
  The way to get data is encapsulated here
  for decoupling
  */
  fetchCourses() {
    console.log(this.props.courses);
    let optionsList = this.props.courses;
    /*
    optionsList = this.props.courses.map(
      (item) => {return {name: item.name};}
    );
    */

    return optionsList;
    /*[
      { name: '立人國小六年一班'
      }, { name: '永福國小六年一班'
      }, { name: '慈濟國小六年一班'
      }, { name: '慈濟國小六年一班'
      }, { name: '海山國小五年一班'
      }, { name: '頂埔國小六年一班'
      }
    ];*/
  }


  renderOptions() {
    return this.fetchCourses().map(
        (courses) => (<Option key={courses.code} value={courses.code}>{courses.name}</Option>)
    );
  }

  render() {
    console.log(this.props.selectedFeature.title, 'q');
    return (
      <View style={styles.container}>
        <Select
            onSelect={this.updateCurrentCourse.bind(this)}
            defaultText='請選擇你的班級'
            indicator='down'
            style={{ borderWidth: 0, alignItems: 'stretch', width: window.width }}
            indicatorColor='gray'
            textStyle={{ color: 'gray' }}
            backdropStyle={{ backgroundColor: '#d3d5d6', opacity: 0.95 }}
            optionListStyle={{ backgroundColor: '#F5FCFF',
              width: window.width - 20,
              height: window.height - 200
            }}
        >

          {this.renderOptions()}

        </Select>
      </View>
    );
  }
}


// Anything returned from this function will end up as props
// on the LoginForm container

function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ setCurrentCourse }, dispatch);
}

function mapStateToProps(state) {
  return {
    //currentCourse: state.currentCourse
    selectedFeature: state.selectedFeature,
    loginState: state.loginState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(CourseSelector);
