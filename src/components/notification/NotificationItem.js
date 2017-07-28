import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// width: 0 in cardText style is really weird, but it works
//reference: dwilt's answer @ https://github.com/facebook/react-native/issues/1438
const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B1B1B1',
    margin: 5
  },
  cardText: {
    display: 'flex',
    margin: 5,
    justifyContent: 'center',
    flexDirection: 'column',
    width: 0,
    flexGrow: 1,
  },
  cardHeader: {
    flex: 1,
    flexWrap: "wrap",

  },
  cardTime: {
    color: '#D8D8D8',
    fontSize: 12
  }
}
class NotificationItem extends Component{
  constructor(props){
    super(props);
    this.renderByIconAndText = this.renderByIconAndText.bind(this);
  }
  componentWillMount() {
    this.timer = setTimeout(
      () => { console.log('this is a timer'); },
      500
    );
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer); //unmount the timer
  }

  friendlyTimeFormatter(time){

  }
  renderByIconAndText(icon, content){
    return(
      <View style={styles.card}>
        <Icon name={icon} size={30} color="#00B9F1" style={{margin: 3}}/>
        <View style={styles.cardText}>
          <View>
            <Text style={styles.cardHeader}>{content}</Text>
          </View>
          <View>
            <Text style={styles.cardTime}>15分鐘前</Text>
          </View>
        </View>
      </View>
    )
  }
  render(){
    return(
       <View>
         { this.renderByIconAndText('pencil', '陳可可老師在復興國小作文班新增了1個作品繳交項目。')}
         { this.renderByIconAndText('thumbs-up', '鄭興華對你的旅遊作品按讚。')}
         { this.renderByIconAndText('star', '你的旅遊作品被推薦為聯合報之星。')}
       </View>
    )
  }
}

export { NotificationItem };
