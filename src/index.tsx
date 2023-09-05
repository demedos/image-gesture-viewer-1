import { View, StyleSheet, FlatList, ListRenderItemInfo, useWindowDimensions } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const images = [
  'https://images.unsplash.com/photo-1682687982107-14492010e05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3687&q=80',
  'https://plus.unsplash.com/premium_photo-1679757670562-0e00c3863bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3687&q=80',
  'https://images.unsplash.com/photo-1693851505426-c183d5f7d2c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3570&q=80',
  'https://images.unsplash.com/photo-1682695796795-cc287af78a2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3570&q=80',
  'https://images.unsplash.com/photo-1682685797208-c741d58c2eff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3570&q=80',
  'https://i.pinimg.com/originals/dc/e4/24/dce42482d815bfbc30e5f09a239371b8.jpg',
  'https://i.pinimg.com/originals/4b/3e/c3/4b3ec3b980f3a82eb6b754d4149138c4.jpg',
];

const App = () => {
  const { width } = useWindowDimensions();

  const renderItem = ({ item }: ListRenderItemInfo<string>) => {
    return (
      <FastImage
        source={{
          uri: item,
        }}
        style={{
          width,
        }}
        resizeMode="contain"
      />
    );
  };

  const gesture = Gesture.Exclusive();

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.view]}>
          <FlatList data={images} renderItem={renderItem} horizontal={true} snapToAlignment="center" pagingEnabled={true} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  view: {
    width: '100%',
    height: '100%',
  },
});
