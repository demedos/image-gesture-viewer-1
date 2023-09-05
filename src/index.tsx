import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
