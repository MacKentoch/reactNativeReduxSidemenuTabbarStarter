'use strict';

import React, {
  Component
}                           from 'react';
import {
  StyleSheet,
  View,
  Text
}                           from 'react-native';

class ModalDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Modal Demo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#4A4A4A'
  }
});

export default ModalDemo;
