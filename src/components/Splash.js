import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import LoginingScreen from './LoginingScreen';

const window = Dimensions.get('window');
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AfterSplash: true, //false, //fixme2
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
        },
        stretch: {
           width: window.width,
           height: window.height
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

            <Image
              style={styles.stretch}
              source={require('../img/splash/splash_01.png')}
            />
          </View>
          <View style={styles.slide2}>

            <Image
              style={styles.stretch}
              source={require('../img/splash/splash_02.png')}
            />
          </View>
          <View style={styles.slide3}>

            <Image
              style={styles.stretch}
              source={require('../img/splash/splash_03.png')}
            />
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
