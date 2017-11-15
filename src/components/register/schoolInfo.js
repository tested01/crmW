import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Dimensions
 } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import { RegStyles } from './registerConf';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  regSchoolType, regSchoolLevel, regSchoolCity, regSchoolName, regSchoolsList
 } from '../../actions/index';

const window = Dimensions.get('window');
const buttonHeight = window.height - 150;

class SchoolInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
        schoolType: '',
        schoolLevel: '',
        schoolName: '',
        schoolCity: '',
        levelData: [],
        currentSchoolsList: []
    };
    this.setCurrentSchoolsList = this.setCurrentSchoolsList.bind(this);
    this.isFullFillment = this.isFullFillment.bind(this);
    this.setCurrentButtonStyle = this.setCurrentButtonStyle.bind(this);
    this.onHandleCont = this.onHandleCont.bind(this);
    this.verifyTheFormRedux = this.verifyTheFormRedux.bind(this);
    this.verifyTheForm = this.verifyTheForm.bind(this);
    this.checkAndUpdateButton = this.checkAndUpdateButton.bind(this);
    this.resetCurrentButtonStyle = this.resetCurrentButtonStyle.bind(this);
    this.elementarySchools = require('../../json/elementary_schools.json');
    this.juniorHighSchools = require('../../json/junior_high_schools.json');
    this.seniorHighSchools = require('../../json/senior_high_schools.json');


  }
  componentWillMount(){

    if(this.props.registerSpec.regSchoolsList){
      this.setState({ currentSchoolsList : this.props.registerSpec.regSchoolsList})
    }

    if(this.props.registerSpec.schoolType){
      this.setSchoolType({schoolType:this.props.registerSpec.schoolType});
    }

    if(this.props.registerSpec.schoolLevel){
      this.setSchoolLevel({schoolLevel:this.props.registerSpec.schoolLevel});
    }
    if(this.props.registerSpec.schoolCity){
      this.setSchoolCity({schoolCity:this.props.registerSpec.schoolCity});
    }

    if(this.props.registerSpec.schoolName){
      this.setSchoolName({schoolName:this.props.registerSpec.schoolName});
    }

    if(this.verifyTheFormRedux().overallCondition){
      this.state.nextButton
      = {
          position: 'absolute',
          display: 'flex',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#00B9F1',
          backgroundColor: '#00B9F1',
          width: 320,
          height: 50,
          marginTop: buttonHeight,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        };
        this.setState({'nextButtonText': {
          color: 'white'
          }
        });
    }else{
      this.state.nextButton
      = {
          position: 'absolute',
          display: 'flex',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#00B9F1',
          width: 320,
          height: 50,
          marginTop: buttonHeight,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        };
        this.setState({'nextButtonText': {
          color: '#00B9F1'
          }
        });

      }
  }
  verifyTheFormRedux(){
    if(this.props.registerSpec.schoolType&&this.props.registerSpec.schoolLevel&&
      this.props.registerSpec.schoolName&&this.props.registerSpec.schoolCity)
      {
      return({overallCondition: true});
      }else{
        return({overallCondition: false});
      }
    }
  setCurrentButtonStyle(){
    this.setState({
      'nextButton': {
        position: 'absolute',
        display: 'flex',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#00B9F1',
        backgroundColor: '#00B9F1',
        width: 320,
        height: 50,
        marginTop: buttonHeight,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      },
      'nextButtonText': {
        color: 'white'
      }
    }
    );
  }
  resetCurrentButtonStyle(){
    this.setState({
      'nextButton': {
        position: 'absolute',
        display: 'flex',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#00B9F1',
        backgroundColor: 'white',
        width: 320,
        height: 50,
        marginTop: buttonHeight,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      },
      'nextButtonText': {
        color: '#00B9F1'
      }
    }
    );
  }

  setCurrentSchoolsList(schoolType, schoolCity){
    let currentSchools = [];

    switch(schoolType){
      case '國小':
        currentSchools = this.elementarySchools.schools.filter(
          (school)=>{
            //console.log((school.city == schoolCity), school.city, schoolCity)
            return school.city == schoolCity;
          }
        )
        .map(
          (school, index)=>{
            //Example entry: { key: 1, label: '一年級' },
            return { key: index, label: school.schoolName }
          }
        );
        break;
      case '國中':
        currentSchools = this.juniorHighSchools.schools.filter(
          (school)=>{
            return school.city === schoolCity;
          }
        )
        .map(
          (school, index)=>{
            //Example entry: { key: 1, label: '一年級' },
            return { key: index, label: school.schoolName }
          }
        );
        break;
      case '高中職':
        currentSchools = this.seniorHighSchools.schools.filter(
          (school)=>{
            return school.city === schoolCity;
          }
        )
        .map(
          (school, index)=>{
            //Example entry: { key: 1, label: '一年級' },
            return { key: index, label: school.schoolName }
          }
        );
        break;
      default:
        break;
    }
    this.setState({currentSchoolsList: currentSchools});
    this.props.regSchoolsList(currentSchools);//save currentSchoolList to redux

    return currentSchools;
  }

  //check if four entries are filled
  isFullFillment(){
    let hasCity = this.state.schoolCity;
    let hasName = this.state.schoolName;
    let hasType = this.state.schoolType;
    let hasLevel = this.state.schoolLevel;
    console.log(hasCity, hasType, hasName, hasLevel, 'wwwwwww@@');
  }
  setSchoolType(schoolType){
    this.setState(schoolType, this.checkAndUpdateButton);
    this.setState({schoolLevel: ''}, this.checkAndUpdateButton)//reset schoolLevel
    this.setState({schoolName: ''}, this.checkAndUpdateButton);//reset schoolName
    //check if completed
    this.isFullFillment();

    if(this.state.schoolCity != ''){
      console.log('yes~~~~~~sc',this.state.schoolCity, schoolType.schoolType);
      let schoolList = this.setCurrentSchoolsList(schoolType.schoolType, this.state.schoolCity);
      console.log(schoolList, 'schoolList');

    }else{
      console.log('no~~~~~~~sc')
    }

    if(schoolType.schoolType === '國小'){
      this.setState(
        {'levelData':
        [
            { key: 0, section: true, label: '年級' },
            { key: 1, label: '一年級' },
            { key: 2, label: '二年級' },
            { key: 3, label: '三年級' },
            { key: 4, label: '四年級' },
            { key: 5, label: '五年級' },
            { key: 6, label: '六年級' }
        ]
      }
      );
    }
    if(schoolType.schoolType === '國中'){
      this.setState(
        {'levelData':
        [
            { key: 0, section: true, label: '年級' },
            { key: 1, label: '國七' },
            { key: 2, label: '國八' },
            { key: 3, label: '國九' }
        ]
      }
      );
    }
    if(schoolType.schoolType === '高中職'){
      this.setState(
        {'levelData':
        [
            { key: 0, section: true, label: '年級' },
            { key: 1, label: '一年級' },
            { key: 2, label: '二年級' },
            { key: 3, label: '三年級' }
        ]
      }
      );
    }

    this.props.regSchoolType(schoolType.schoolType);
  }

  setSchoolLevel(schoolLevel){
    this.setState(schoolLevel, this.checkAndUpdateButton);
    this.props.regSchoolLevel(schoolLevel.schoolLevel);
    //check if completed
    this.isFullFillment();

  }

  setSchoolCity(schoolCity){
    this.setState(schoolCity, this.checkAndUpdateButton);
    this.setState({schoolName: ''}, this.checkAndUpdateButton);//reset schoolName

    if(this.state.schoolType != ''){
      this.setCurrentSchoolsList(this.state.schoolType, schoolCity.schoolCity);
    }else{
      console.log('no~~~~~~~st')
    }

    let reduceSchools = this.elementarySchools.schools.filter(
      (school)=>{
        return school.city === schoolCity.schoolCity;
      }
    );
    console.log(reduceSchools.length, 'reduceSchools.length');
    console.log(schoolCity,this.props.registerSpec);
    this.props.regSchoolCity(schoolCity.schoolCity);
  }

  setSchoolName(schoolName){
    this.setState(schoolName, this.checkAndUpdateButton);
    this.props.regSchoolName(schoolName.schoolName);
  }

  checkAndUpdateButton(){
    if(this.verifyTheForm().condition){
      this.setCurrentButtonStyle();
    }else{
      this.resetCurrentButtonStyle();
    }
  }

  fetchCity(){
    let index = 0;
    const data = [
        { key: index++, section: true, label: '縣市' },
        { key: index++, label: "新北市" },
        { key: index++, label: "臺北市" },
        { key: index++, label: "桃園市" },
        { key: index++, label: "臺中市" },
        { key: index++, label: "臺南市" },
        { key: index++, label: "高雄市" },
        { key: index++, label: "宜蘭縣" },
        { key: index++, label: "新竹縣" },
        { key: index++, label: "苗栗縣" },
        { key: index++, label: "彰化縣" },
        { key: index++, label: "南投縣" },
        { key: index++, label: "雲林縣" },
        { key: index++, label: "嘉義縣" },
        { key: index++, label: "屏東縣" },
        { key: index++, label: "臺東縣" },
        { key: index++, label: "花蓮縣" },
        { key: index++, label: "澎湖縣" },
        { key: index++, label: "基隆市" },
        { key: index++, label: "新竹市" },
        { key: index++, label: "嘉義市" },
        { key: index++, label: "金門縣" },
        { key: index++, label: "連江縣" }
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
    //TODO: save currentSchoolList to redux

    let data = this.state.currentSchoolsList;
    /*
    [
        { key: index++, section: true, label: '學校' },
        { key: index++, label: '立人國小' },
        { key: index++, label: '新興國中' },
        { key: index++, label: '台南一中' }
    ];
    */
    return data;
  }
  verifyTheForm(){
    let errorMsg = '\n';
    let condition = true;
    if (this.state.schoolType == ''){
      condition = false;
      errorMsg+='請選擇學制\n'
    }
    if(this.state.schoolLevel == ''){
      condition = false;
      errorMsg+='請選擇年級\n'
    }
    if(this.state.schoolName ==''){
      condition = false;
      errorMsg+='請選擇學校名稱\n'
    }
    if(this.state.schoolCity == ''){
      condition = false;
      errorMsg+='請選擇學校縣市\n'
    }
    console.log({ errorMsg, condition }, 'asdfasdf');
    return { errorMsg, condition };
  }
  onHandleCont(){
    //this.props.next
    //this.verifyTheForm();
    let { condition, errorMsg } = this.verifyTheForm();

    if(condition){
      //TODO: change the button color

      this.props.next();

    }else{
      Alert.alert(
        '填寫學校資料',
        errorMsg,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }

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
            <Text allowFontScaling={false} style={RegStyles.headerStyle}>
            填寫學校資料
            </Text>

            <ModalPicker
                data={this.fetchCity()}
                style={styles.container}
                initValue=""
                cancelText="取消"
                onChange={(option)=>{ this.setSchoolCity({schoolCity:option.label})}}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                    editable={false}
                    placeholder="學校縣市"
                    value={this.state.schoolCity} />

            </ModalPicker>

            <ModalPicker
                data={this.fetchSchoolType()}
                style={styles.container}
                initValue=""
                cancelText="取消"
                onChange={(option)=>{ this.setSchoolType({schoolType:option.label})}}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                    editable={false}
                    placeholder="學制"
                    value={this.state.schoolType} />

            </ModalPicker>

            <ModalPicker
                data={this.state.levelData}
                style={styles.container}
                initValue=""
                cancelText="取消"
                onChange={(option)=>{ this.setSchoolLevel({schoolLevel:option.label})}}>

                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                    editable={false}
                    placeholder="年級"
                    value={this.state.schoolLevel} />

            </ModalPicker>

              <ModalPicker
                  data={this.fetchSchool()}
                  style={styles.container}
                  initValue=""
                  cancelText="取消"
                  onChange={(option)=>{ this.setSchoolName({schoolName:option.label})}}>

                  <TextInput
                      style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                      editable={false}
                      placeholder="校名"
                      value={this.state.schoolName} />

              </ModalPicker>
              <TouchableHighlight
                style={this.state.nextButton}
                onPress={this.onHandleCont}
                >
                <Text allowFontScaling={false} style={this.state.nextButtonText}>繼續</Text>
              </TouchableHighlight>
          </View>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    regSchoolType, regSchoolLevel, regSchoolCity, regSchoolName, regSchoolsList
   }, dispatch);
}

function mapStateToProps(state) {
  return {
        registerSpec: state.registerSpec
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolInfo);
