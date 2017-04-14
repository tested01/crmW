import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class SelectRole extends Component {
  render() {
    const { navigate } = this.props.navigation;

    const styles = {
      cotainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      viewStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
      },
      viewDisableStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#c6c6c6',
        justifyContent: 'center',
        alignItems: 'center'
      },
      textStyle: {
        textAlign: 'center'
      },
      textDisableStyle: {
        textAlign: 'center',
        color: 'gray'
      },
      headerStyle: {
        textAlign: 'center',
        height: 150,
        lineHeight: 150,
        fontSize: 25
      }
    };

    return (
      <View>
        <Text style={styles.headerStyle}>
          選擇身份
        </Text>
          <View style={styles.cotainerStyle}>
            <View style={styles.viewStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => navigate('Step2', { role: 'Teacher' })}
              >
                老師
              </Text>
            </View>

            <Image
                style={styles.viewStyle}
                
                source={{uri: 'https://raw.githubusercontent.com/tested01/materialFiles/master/07_App_0331/%E9%81%B8%E6%93%87%E8%BA%AB%E5%88%86/%E5%AD%B8%E7%94%9F.png'}}
              />

            <View style={styles.viewStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => navigate('Step2', { role: 'Student' })}
              >
                學生
              </Text>
            </View>
            <View style={styles.viewDisableStyle}>
              <Text
                style={styles.textDisableStyle}
              >
                家長
              </Text>
            </View>
           </View>
       </View>
    );
  }
}


export default SelectRole;
