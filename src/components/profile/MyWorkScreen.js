import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  SegmentedControlIOS
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImgCard from '../common/ImgCard';
import Header from '../common/Header';
import { GLOBLE } from '../common/Globle';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    zIndex: 1,
  },
  label: {
    backgroundColor: 'transparent',
    color: 'black',
    margin: 0,
  },
  indicator: {
    //backgroundColor: 'black'
    backgroundColor: GLOBLE.COLOR.BLUE,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
    zIndex: 2
  }
});

class MyWorkScreen extends Component {
  constructor(props){
    super(props);
    this.renderMyWorkContent = this.renderMyWorkContent.bind(this);
  }
  componentWillMount(){
    this.setState({selectedIndex: 0});
  }



/*
_renderIcon = ({ route }) => {
    return <Ionicons name={route.icon} size={24} color="white" />;
  };
*/

  renderHeader = (props) => {
    //<Icon name="rocket" size={30} color="#900" />
    //renderIcon={this._renderIcon}

    return (
      <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.label}
          indicatorStyle={styles.indicator}
      />
    );
  };

  renderMyWorkContent(){
    if(this.state.selectedIndex === 0){
      return(
        <Text>1</Text>
      );
      //studentCard
    }

    if(this.state.selectedIndex === 1){
      return(
        <View>
          <Text>star</Text>
        </View>
        );
    }
  }


  render() {
    return (
      <View style={{display: 'flex', flex: 1}}>
        <SegmentedControlIOS
              values={['個人作品', '聯合報之星']}
              selectedIndex={this.state.selectedIndex}
              style={{ width: 280, marginTop: 10, alignSelf: 'center'}}
              onChange={(event) => {
                this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
              }}
            />

          <View style={{flex: 1}}>
            {
              this.renderMyWorkContent()
            }
          </View>
        </View>

    );
  }
}

export default MyWorkScreen;
