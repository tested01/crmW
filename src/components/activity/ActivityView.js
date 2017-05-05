import React, { Component } from 'react';
import { View, StyleSheet, SegmentedControlIOS, ScrollView, Text } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class TabViewExample extends Component {
  constructor(props){
    super(props);
    this.renderBySegmentation=this.renderBySegmentation.bind(this);
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: '最新(老師)' },
      { key: '2', title: '熱門(學生)' },
    ],
    selectedIndex: 0
  };

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => <TabBar {...props} />;

  renderSt(){
    return(
      <View style={{ flex: 1, alignItems: 'center' }}>
      <SegmentedControlIOS
            values={['作品繳交', '班級作品']}
            selectedIndex={this.state.selectedIndex}
            style={{ width: 280, marginTop: 10 }}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
          />
      </View>
    );
  }

  renderTe(){
    return(
      <View style={{ flex: 1, alignItems: 'center' }}>
      <SegmentedControlIOS
            values={['作品繳交', '班級作品']}
            selectedIndex={this.state.selectedIndex}
            style={{ width: 280, marginTop: 10 }}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
          />
      {this.renderBySegmentation()}
      </View>
    );
  }

  renderBySegmentation(){
    console.log(this.state.selectedIndex);
    switch(this.state.selectedIndex){
      case 0:
        return ( <ScrollView>
                   <Text> 已繳交 未繳交 清單 </Text>
                 </ScrollView>);
      case 1:
        return ( <Text> 班級作品列表 </Text>);

      default:
        return (<Text></Text>);
    }
  }

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return this.renderTe();
    case '2':
      return this.renderSt();
    default:
      return null;
    }
  };

  render() {
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
