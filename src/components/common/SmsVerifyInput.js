import React from 'react';
import { TextInput, View, Text, Dimensions} from 'react-native';

const FontSize = 40;
const FontSquare = 55;
const CodeRender = ({value}) => {
  let styles = {
    codeBlocks: {
      display: 'flex',
      flexDirection: 'row'
    },
    codeBlock: {
      width: FontSquare,
      height: FontSquare,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderBottomWidth: 5
    },
    codeBlockGray: {
      width: FontSquare,
      height: FontSquare,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 5,
      borderColor: 'gray'
    }
  };
  //<Text style={{fontSize: 35}}> {value} </Text>
  switch(value.length){
    case 0:
      return(
        <View style={styles.codeBlocks}>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
        </View>
      );
    case 1:
      return(
        <View style={styles.codeBlocks}>
          <View style={styles.codeBlock}>
            <Text style={{fontSize: FontSize}}> {value[0]} </Text>
          </View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
        </View>
      );
    case 2:
      return(
        <View style={styles.codeBlocks}>
          <View style={styles.codeBlock}>
            <Text style={{fontSize: FontSize}}> {value[0]} </Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={{fontSize: FontSize}}> {value[1]} </Text>
          </View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
        </View>
      );
    case 3:
      return(
        <View style={styles.codeBlocks}>
          <View style={styles.codeBlock}>
            <Text style={{fontSize: FontSize}}> {value[0]} </Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={{fontSize: FontSize}}> {value[1]} </Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={{fontSize: FontSize}}> {value[2]} </Text>
          </View>
          <View style={styles.codeBlockGray}></View>
        </View>
      );
    case 4:
        return(
          <View style={styles.codeBlocks}>
            <View style={styles.codeBlock}>
              <Text style={{fontSize: FontSize}}> {value[0]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={{fontSize: FontSize}}> {value[1]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={{fontSize: FontSize}}> {value[2]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={{fontSize: FontSize}}> {value[3]} </Text>
            </View>
          </View>
        );
  }
}

const SmsVerifyInput = ({ value, onChangeText, placeholder, secureTextEntry, maxLength, keyboardType }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View>
    <View style={containerStyle}>
      <View style={styles.textStyle}>
        <CodeRender value={value}/>
      </View>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={value}
        autoFocus={true}
        selectionColor="transparent"
        maxLength={maxLength}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </View>
    </View>
  );
};

const commonHeight = 80;
const commonWidth = 300;

const styles = {
  textStyle: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: commonHeight,
    width: commonWidth
  },
  inputStyle: {
    backgroundColor: 'transparent',
    color: 'transparent',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    position: 'absolute',
    height: commonHeight,
    width: commonWidth,
    marginLeft: 5,
    marginRight: 5
  },
  containerStyle: {
    height: commonHeight,
    width: commonWidth,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};



export { SmsVerifyInput };
