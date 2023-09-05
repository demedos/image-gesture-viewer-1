import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic"></ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
