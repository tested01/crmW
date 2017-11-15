import React, { Component } from 'react';
import {
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';

class UwListView extends Component {
  _handlePressSlack(){
   console.log('slack');
  }
  _handlePressDocs(){
    console.log('doc');
  }
  render() {
    return (
      <View>
        <Text allowFontScaling={false} style={styles.optionsTitleText}>
          Resources
        </Text>

        <TouchableOpacity
          style={styles.optionsContainer}
          onPress={this._handlePressSlack}>
          <View style={styles.option}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../../img/react-logo.png')}
                resizeMode="contain"
                fadeDuration={0}
                style={{ width: 18, height: 18, marginTop: 1  }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text allowFontScaling={false} style={styles.optionText}>
                Join us on Slack
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionsContainer}
          onPress={this._handlePressDocs}>
          <View style={styles.option}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../../img/react-logo.png')}
                resizeMode="contain"
                fadeDuration={0}
                style={{ width: 20, height: 20, marginTop: 1 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text allowFontScaling={false} style={styles.optionText}>
                Read the Expo documentation
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'white'
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionsContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    flexDirection: 'row',
    backgroundColor: 'white',//rgba(0,0,0,0.02)
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});

export default UwListView;
