import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import LoginingScreen from './LoginingScreen';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AfterSplash: false, //fixme2
      DragStartState: 0
    };
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
  }

  onMomentumScrollEnd(e, state, context) {
    console.log(context.state.index);
  }

  onScrollBeginDrag(e, state, context) {
    this.setState({ DragStartState: context.state.index });
  }

  onTouchStart(e, state, context) {
    const endIndex = context.state.total - 1;
    const currentIndex = context.state.index;
    if (currentIndex === endIndex) {
      this.setState({ AfterSplash: true });
    }
  }

  renderContent() {
    return (<LoginingScreen />);
    //return (<View><Text>test</Text></View>);
  }


    renderSplash() {
      const styles = {
        wrapper: {
        },
        slide1: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#9DD6EB'
        },
        slide2: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#97CAE5'
        },
        slide3: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#92BBD9'
        },
        text: {
          color: '#fff',
          fontSize: 30,
          fontWeight: 'bold'
        }
      };
      return (
        <Swiper
        style={styles.wrapper}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onTouchStart={this.onTouchStart}
        loop={false}
        dotColor='gray'
        activeDotColor='white'
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello, Student Got Talent</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
      );
    }
    render() {
      if (this.state.AfterSplash) {
        return this.renderContent();
      }
      return this.renderSplash();
    }
}

export default Splash;
