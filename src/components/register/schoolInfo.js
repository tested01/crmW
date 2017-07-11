import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions
 } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import { RegStyles } from './registerConf';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regSchoolType, regSchoolLevel, regSchoolCity, regSchoolName } from '../../actions/index';

const window = Dimensions.get('window');

class SchoolInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
        schoolType: '',
        schoolLevel: '',
        schoolName: '',
        schoolCity: ''
    };

  }
  componentWillMount(){

    if(this.props.registerSpec.schoolType){
      this.setSchoolType({schoolType:this.props.registerSpec.schoolType});
    }
    if(this.props.registerSpec.schoolName){
      this.setSchoolName({schoolName:this.props.registerSpec.schoolName});
    }
    if(this.props.registerSpec.schoolLevel){
      this.setSchoolLevel({schoolLevel:this.props.registerSpec.schoolLevel});
    }
    if(this.props.registerSpec.schoolCity){
      this.setSchoolCity({schoolCity:this.props.registerSpec.schoolCity});
    }

  }

  setSchoolType(schoolType){
    this.setState(schoolType);
    console.log(schoolType, schoolType.schoolType, this.props.registerSpec)
    this.props.regSchoolType(schoolType.schoolType);
  }

  setSchoolLevel(schoolLevel){
    this.setState(schoolLevel);
    console.log(schoolLevel,this.props.registerSpec);
    this.props.regSchoolLevel(schoolLevel.schoolLevel);
  }

  setSchoolCity(schoolCity){
    this.setState(schoolCity);
    console.log(schoolCity,this.props.registerSpec);
    this.props.regSchoolCity(schoolCity.schoolCity);
  }

  setSchoolName(schoolName){
    this.setState(schoolName);
    console.log(schoolName,schoolName.schoolName);
    console.log(this.props.registerSpec);
    this.props.regSchoolName(schoolName.schoolName);
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
        nextButton: {
          position: 'absolute',
          display: 'flex',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#00B9F1',
          width: 320,
          height: 50,
          marginTop: window.height - 150,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }
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
                onChange={(option)=>{ this.setSchoolCity({schoolCity:option.label})}}>

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
                onChange={(option)=>{ this.setSchoolType({schoolType:option.label})}}>

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
                onChange={(option)=>{ this.setSchoolLevel({schoolLevel:option.label})}}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                    editable={false}
                    placeholder="年級"
                    value={this.state.schoolLevel} />

            </ModalPicker>

              <ModalPicker
                  data={this.fetchSchool()}
                  style={styles.container}
                  initValue=""
                  onChange={(option)=>{ this.setSchoolName({schoolName:option.label})}}>

                  <TextInput
                      style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                      editable={false}
                      placeholder="校名"
                      value={this.state.schoolName} />

              </ModalPicker>
              <TouchableHighlight
                style={styles.nextButton}
                onPress={this.props.next}
                >
                <Text style={{color: '#00B9F1'}}>繼續</Text>
              </TouchableHighlight>
          </View>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ regSchoolType, regSchoolLevel, regSchoolCity, regSchoolName }, dispatch);
}

function mapStateToProps(state) {
  return {
        registerSpec: state.registerSpec
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolInfo);
