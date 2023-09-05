import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainApp from './src';

function App() {
  const backgroundStyle = {
    backgroundColor: 'black',
  };

  return (
    <Fragment>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={'light-content'} backgroundColor={backgroundStyle.backgroundColor} />
        <GestureHandlerRootView style={backgroundStyle}>
          <MainApp />
        </GestureHandlerRootView>
      </SafeAreaView>
    </Fragment>
  );
}

export default App;
