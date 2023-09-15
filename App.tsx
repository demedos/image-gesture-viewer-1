import React, { Fragment } from 'react';
import { StatusBar, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Matrix4, identity4, multiply4 } from './Matrix4';
import { vec3, concat } from './MatrixHelpers';

function App() {
  const { width, height } = useWindowDimensions();

  const origin = useSharedValue(vec3(0, 0, 0));
  const offset = useSharedValue(identity4);

  // This will hold all the transformations
  const matrix = useSharedValue(identity4);

  const reset = () => {
    'worklet';

    // @ts-ignore
    offset.value = withTiming(identity4);
    // @ts-ignore
    matrix.value = withTiming(identity4);
  };

  const pinchGesture = Gesture.Pinch()
    .onBegin(e => {
      origin.value = [e.focalX, e.focalY, 0];
      offset.value = matrix.value;
    })
    .onChange(e => {
      matrix.value = concat(offset.value, origin.value, [{ scale: e.scale }]);
    })
    .onEnd(() => {
      if (matrix.value[0] < 1) {
        reset();
      }
    });

  const panGesture = Gesture.Pan().onChange(e => {
    matrix.value = multiply4(Matrix4.translate(e.changeX, e.changeY, 0), matrix.value);
  });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      reset();
    });

  // @ts-ignore
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { matrix: matrix.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const gesture = Gesture.Race(doubleTapGesture, pinchGesture, panGesture);

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor={styles.background.backgroundColor} />
      <GestureDetector gesture={gesture}>
        <View>
          <Animated.View style={[rStyle]}>
            <FastImage
              source={{
                uri: 'https://images.unsplash.com/photo-1694537745659-65925587aa9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2775&q=80',
              }}
              style={{
                width,
                height,
              }}
              resizeMode="contain"
            />
          </Animated.View>
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
