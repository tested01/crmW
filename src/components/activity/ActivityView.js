import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableHighlight
 } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { hideHeader } from '../../actions/index';
import { GLOBLE } from '../common/Globle';
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GLOBLE.COLOR.BLUE,
    alignItems: 'center',
    height: 60,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
});


class ActivityView extends Component {
  constructor(props){
    super(props);
    this.renderActivityCard = this.renderActivityCard.bind(this);
    this.renderActivityDetail = this.renderActivityDetail.bind(this);
    this.leftDetail = this.leftDetail.bind(this);
    this.enterDetail = this.enterDetail.bind(this);
  }
  componentWillMount(){
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: '最新' },
        { key: '2', title: '熱門' },
      ],
      inDetail: false
    };
  }

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => <TabBar {...props} />;

  renderHot(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> hot </Text>
      </View>
    );
  }

  renderNewest(){
      return(
        <ScrollView>
          {this.renderActivityCard(1)}
          {this.renderActivityCard(2)}
        </ScrollView>
      );
  }
  renderActivityDetail(){
    this.props.hideHeader(true);

    return(
      <View>
      {this.renderActivityHeader('activityName here')}
      {this.renderActivityCard(5)}
      <Text>qq</Text>
      </View>
    );
  }

  enterDetail(){
    this.setState({inDetail: true});
    console.log('ww');
  }
  renderActivityCard(activityId){
      return (
        <View style={{
          display: 'flex',
          alignItems: 'center',
          borderWidth:0.8,
          borderColor: '#dbdbdb',
          height:220,
          width: window.width - 6,
          margin: 3,
          borderRadius: 5,
          justifyContent: 'flex-start'
         }}>
         <TouchableHighlight value='5' onPress={()=>
           this.enterDetail()
         }>
         <Image
           source={require('../../img/act2.png')}
           fadeDuration={0}
           style={{resizeMode: 'contain',
                   width: window.width - 10,
                   height: 170,
                   margin: 5,
                   marginTop: -3
                  }}
         />
         </TouchableHighlight>
        <View style={{flex: 1,
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 3,
          marginLeft: 3
        }}>
        <Text style={{}}>好讀盃作文大賽</Text>
        <Text style={{ color: 'gray'}}>2017/02/12~2017/03/31</Text>
        </View>
        </View>
      );
  }

  renderActivityHeader(headerTitle) {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        {this.renderActivityHeaderLeft()}
        <Text style={{ marginTop: 15, color: 'white', fontSize: GLOBLE.HEADER_FONTSIZE}}>
          {headerTitle}
        </Text>
        {this.renderActivityHeaderRight()}
      </View>
    );
  }
  leftDetail(){
    this.setState({inDetail: false});
    this.props.hideHeader(false);
  }
  renderActivityHeaderLeft(){
    return(
      <Icon.Button
      name="angle-left"
      size={30}
      backgroundColor='transparent'
      color="white"
      onPress={()=>this.leftDetail()}
       />
    );
  }
  renderActivityHeaderRight(){
    return(<View style={{width: 30}}></View>);
  }


  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return this.renderNewest();
    case '2':
      return this.renderHot();
    default:
      return null;
    }
  };

  render() {

    if(this.state.inDetail){
      return this.renderActivityDetail();
    }else{
      return (
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  // Whenever loginSuccess is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({
    hideHeader
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    loginState: state.loginState,
    literaryWorksState: state.literaryWorksState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(ActivityView);
