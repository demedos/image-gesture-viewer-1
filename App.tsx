import React, { Fragment } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainApp from './src';

function App() {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor={styles.background.backgroundColor} />
      <GestureHandlerRootView style={styles.background}>
        <MainApp />
      </GestureHandlerRootView>
    </Fragment>
  );
}

export default App;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
  },
});
