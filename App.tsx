import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainApp from './src';

function App() {
  const backgroundStyle = {
    flex: 1,
    backgroundColor: '#ececec',
  };

  return (
    <Fragment>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle} contentContainerStyle={backgroundStyle}>
          <GestureHandlerRootView style={backgroundStyle}>
            <MainApp />
          </GestureHandlerRootView>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

export default App;
