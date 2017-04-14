import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { Select, Option } from './react-native-chooser';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch'
  }
});

const window = Dimensions.get('window')

export default class CourseSelector extends Component {

  onSelect(data) {
    console.log(data);
  }

  fetchClasses() {
    return [
      { name: '立人國小六年一班'
      }, { name: '永福國小六年一班'
      }, { name: '慈濟國小六年一班'
      }, { name: '慈濟國小六年一班'
      }, { name: '海山國小五年一班'
      }, { name: '頂埔國小六年一班'
      }
    ];
  }


  renderOptions() {
    return this.fetchClasses().map(
        (classes) => (<Option key={classes.name} value={classes.name}>{classes.name}</Option>)
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
            backdropStyle={{ backgroundColor: '#d3d5d6', opacity: 0.88 }}
            optionListStyle={{ backgroundColor: '#F5FCFF' }}
        >

          {this.renderOptions()}

        </Select>
      </View>
    );
  }
}

export { CourseSelector };
