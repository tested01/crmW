import React, {Component} from 'react';
import {
  View,
  Text
 } from 'react-native';


const FontSquare = 30;
const styles = {
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
class CourseCodeRender extends Component {

  constructor(props){
    super(props);
  }

  render(){
    //<Text style={{fontSize: 35}}> {codeValue} </Text>
    if(this.props.codeValue){

      switch(this.props.codeValue.length){
        case 0:
        
          return(
            <View style={styles.codeBlocks}>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
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
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
              </View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
            </View>
          );

        case 2:

          return(
            <View style={styles.codeBlocks}>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
              </View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
            </View>
          );

        case 3:

          return(
            <View style={styles.codeBlocks}>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[2]} </Text>
              </View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
            </View>
          );

        case 4:

            return(
              <View style={styles.codeBlocks}>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
                </View>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
                </View>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[2]} </Text>
                </View>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[3]} </Text>
                </View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
              </View>
            );

        case 5:

            return(
              <View style={styles.codeBlocks}>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
                </View>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
                </View>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[2]} </Text>
                </View>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[3]} </Text>
                </View>
                <View style={styles.codeBlock}>
                  <Text style={{fontSize: FontSize}}> {this.props.codeValue[4]} </Text>
                </View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
                <View style={styles.codeBlockGray}></View>
              </View>
            );

        case 6:

          return(
            <View style={styles.codeBlocks}>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[2]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[3]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[4]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[5]} </Text>
              </View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
            </View>
          );

        case 7:

          return(
            <View style={styles.codeBlocks}>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[2]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[3]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[4]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[5]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[6]} </Text>
              </View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
            </View>
          );

        case 8:

          return(
            <View style={styles.codeBlocks}>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[2]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[3]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[4]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[5]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[6]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[7]} </Text>
              <View style={styles.codeBlockGray}></View>
              <View style={styles.codeBlockGray}></View>
            </View>
          );

        case 9:

          return(
            <View style={styles.codeBlocks}>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[2]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[3]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[4]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[5]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[6]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[7]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[8]} </Text>
              </View>
              <View style={styles.codeBlockGray}></View>
            </View>
          );

        case 10:

            return(
              <View style={styles.codeBlocks}>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[0]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[1]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[2]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[3]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[4]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[5]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[6]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[7]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[8]} </Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={{fontSize: FontSize}}> {this.props.codeValue[9]} </Text>
              </View>
              </View>
            );

        default:
          return(<Text> ... </Text>);

      };

    }else{
      return(<View></View>);
    }
  }
}

export {CourseCodeRender};
