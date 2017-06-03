import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Select, Option } from './react-native-chooser';
import { setCurrentCourse, setCurrentMissions } from '../actions/index';
import { CONFIG } from '../config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }
});

const window = Dimensions.get('window');

class CourseSelector extends Component {

  constructor(props){
    super(props);

  }

  componentWillMount(){
    //重新載入時, 保留原有選擇的 course

    if(this.props.currentCourse.name){
      this.setState({defaultText: this.props.currentCourse.name});
    }else{
      this.state = { defaultText: '請選擇你的班級'};
    }
  }

  /*
    When the course selected,
    Set the course context to the course's code*/
  updateCurrentCourse(currentCourseCode) {
    if(this.props.currentCourse.name){
      this.setState({defaultText: this.props.currentCourse.name});
    }else{
      this.setState({ defaultText: '請選擇你的班級'});
    }
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
                                let currentCourseId = json.course._id;
                                fetch(CONFIG.API_BASE_URL.concat('/missions/courses/').concat(currentCourseId), {
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

                                                            this.props.setCurrentMissions(json.missions);
                                                            //this.setState(Object.assign({}, this.state, {currentMissions: json.missions}));
                                                          });

                                    } else {
                                      console.log(response.status);
                                    }
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
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
        //(courses) => (<Option key={courses.code} value={courses.code}>{courses.name}</Option>)
        function(courses, index){
          if (index % 2 === 0) {
              return (<Option key={courses.code} value={courses.code}>{courses.name}</Option>);
          } else {
              return (<Option
                key={courses.code}
                value={courses.code}
                style={{backgroundColor: '#f2f2f2'}}
                >{courses.name}</Option>);
          }

        }
    );
  }

  render() {
    //backdropStyle={{ backgroundColor: '#d3d5d6', opacity: 0.8 }}
    return (
      <View style={styles.container}>
        <Select
            onSelect={this.updateCurrentCourse.bind(this)}
            defaultText={this.state.defaultText}
            indicator='down'
            style={{ borderWidth: 0, alignItems: 'stretch', width: window.width }}
            indicatorColor='gray'
            textStyle={{ color: 'gray' }}
            selected={this.props.currentCourse.code}
            optionListStyle={{ backgroundColor: 'white',
              borderColor: '#f2f2f2',
              borderWidth: 1.5,
              width: window.width,
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
  return bindActionCreators({ setCurrentCourse, setCurrentMissions }, dispatch);
}

function mapStateToProps(state) {
  return {
    //currentCourse: state.currentCourse
    selectedFeature: state.selectedFeature,
    loginState: state.loginState,
    currentCourse: state.currentCourse
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(CourseSelector);
