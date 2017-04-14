import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import { RegStyles } from './registerConf';

class SchoolInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
        schoolType: '',
        level: '',
        schoolName: '',
        schoolCity: ''
    };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData(){
    let index = 0;
    const data = [
        { key: index++, section: true, label: 'Fruits' },
        { key: index++, label: 'Red Apples' },
        { key: index++, label: 'Cherries' },
        { key: index++, label: 'Cranberries' },
        { key: index++, label: 'Pink Grapefruit' },
        { key: index++, label: 'Raspberries' },
        { key: index++, section: true, label: 'Vegetables' },
        { key: index++, label: 'Beets' },
        { key: index++, label: 'Red Peppers' },
        { key: index++, label: 'Radishes' },
        { key: index++, label: 'Radicchio' },
        { key: index++, label: 'Red Onions' },
        { key: index++, label: 'Red Potatoes' },
        { key: index++, label: 'Rhubarb' },
        { key: index++, label: 'Tomatoes' }
    ];
    return data;
  }
  fetchCity(){
    let index = 0;
    const data = [
        { key: index++, section: true, label: '縣市' },
        { key: index++, label: '臺北市' },
        { key: index++, label: '新北市' },
        { key: index++, label: '桃園市' },
        { key: index++, label: '臺中市' },
        { key: index++, label: '臺南市' },
        { key: index++, label: '高雄市' },
        { key: index++, label: '基隆市' },
        { key: index++, label: '新竹市' },
        { key: index++, label: '嘉義市' },
        { key: index++, label: '新竹縣' },
        { key: index++, label: '苗栗縣' },
        { key: index++, label: '彰化縣' },
        { key: index++, label: '南投縣' },
        { key: index++, label: '雲林縣' },
        { key: index++, label: '嘉義縣' },
        { key: index++, label: '屏東縣' },
        { key: index++, label: '宜蘭縣' },
        { key: index++, label: '花蓮縣' },
        { key: index++, label: '臺東縣' },
        { key: index++, label: '澎湖縣' }
    ];
    return data;
  }
  fetchSchoolType(){
    let index = 0;
    const data = [
        { key: index++, section: true, label: '學制' },
        { key: index++, label: '國小' },
        { key: index++, label: '國中' },
        { key: index++, label: '高中職' }
    ];
    return data;
  }
  fetchLevel(){
    let index = 0;
    const data = [
        { key: index++, section: true, label: '年級' },
        { key: index++, label: '一年級' },
        { key: index++, label: '二年級' },
        { key: index++, label: '三年級' }
    ];
    return data;
  }
  fetchSchool(){
    let index = 0;
    const data = [
        { key: index++, section: true, label: '學校' },
        { key: index++, label: '立人國小' },
        { key: index++, label: '新興國中' },
        { key: index++, label: '台南一中' }
    ];
    return data;
  }
  render() {
    let styles = StyleSheet.create({
        container: {
            margin: 8
        },
    });
    return (
          <View>
            <Text style={RegStyles.headerStyle}>
            填寫學校資料
            </Text>

            <ModalPicker
                data={this.fetchCity()}
                style={styles.container}
                initValue=""
                onChange={(option)=>{ this.setState({schoolCity:option.label})}}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                    editable={false}
                    placeholder="學校縣市"
                    value={this.state.schoolCity} />

            </ModalPicker>

            <ModalPicker
                data={this.fetchSchoolType()}
                style={styles.container}
                initValue=""
                onChange={(option)=>{ this.setState({schoolType:option.label})}}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                    editable={false}
                    placeholder="學制"
                    value={this.state.schoolType} />

            </ModalPicker>

            <ModalPicker
                data={this.fetchLevel()}
                style={styles.container}
                initValue=""
                onChange={(option)=>{ this.setState({level:option.label})}}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                    editable={false}
                    placeholder="年級"
                    value={this.state.level} />

            </ModalPicker>

              <ModalPicker
                  data={this.fetchSchool()}
                  style={styles.container}
                  initValue=""
                  onChange={(option)=>{ this.setState({schoolName:option.label})}}>

                  <TextInput
                      style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                      editable={false}
                      placeholder="校名"
                      value={this.state.schoolName} />

              </ModalPicker>
          </View>);
  }
}



export default SchoolInfo;
