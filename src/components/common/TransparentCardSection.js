import React from 'react';
import { View } from 'react-native';

const TransparentCardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
};

export { TransparentCardSection };
