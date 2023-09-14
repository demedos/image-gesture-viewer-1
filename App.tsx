import React, { Fragment } from 'react';
import { StatusBar, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

type Point = {
  x: number;
  y: number;
};

function App() {
  const { width, height } = useWindowDimensions();

  const matrix = MatrixMath.createIdentityMatrix();

  // const offset = useSharedValue<Pointer>({ x: 0, y: 0 });
  // const translate = useSharedValue<Pointer>({ x: 0, y: 0 });

  const scale = useSharedValue(1);
  const prevScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  // const prevScale = useSharedValue(1);

  const centerX = width / 2;
  const centerY = height / 2;

  const pinchGesture = Gesture.Pinch()
    .onBegin(event => {
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onChange(e => {
      scale.value = prevScale.value * e.scale;
    })
    .onEnd(() => {
      prevScale.value = scale.value;
      scale.value = 1;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -centerX },
        { translateY: -centerY },
        { translateX: focalX.value },
        { translateY: focalY.value },

        { scale: scale.value },

        { translateX: centerX },
        { translateY: centerY },
        { translateX: -focalX.value },
        { translateY: -focalY.value },

        { scale: prevScale.value },
      ],
    };
  });

  const gesture = Gesture.Exclusive(pinchGesture);

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor={styles.background.backgroundColor} />
      <GestureDetector gesture={gesture}>
        <View>
          <Animated.View style={[rStyle]}>
            <FastImage
              source={{
                uri: 'https://images.unsplash.com/photo-1682695796795-cc287af78a2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3570&q=80',
              }}
              style={{
                width,
                height,
              }}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.View style={[focalPointStyle, styles.focalPoint]} />
        </View>
      </GestureDetector>
    </Fragment>
  );
}

export default App;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    borderRadius: 20,
    top: -10,
    left: -10,
    backgroundColor: 'red',
  },
});
