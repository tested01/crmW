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
  onSelect(data) {
    this.props.setCurrentCourse(data);
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
    return (
      <View style={styles.container}>
        <Select
            onSelect={this.onSelect.bind(this)}
            defaultText='請選擇你的班級'
            indicator='down'
            style={{ borderWidth: 0, alignItems: 'stretch', width: window.width }}
            indicatorColor='gray'
            textStyle={{ color: 'gray' }}
            backdropStyle={{ backgroundColor: '#d3d5d6', opacity: 0.99 }}
            optionListStyle={{ backgroundColor: '#F5FCFF', width: window.width, height: window.height - 200 }}
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
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(CourseSelector);
