import React, { Fragment } from 'react';
import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Matrix4, identity4, multiply4 } from './Matrix4';
import { vec3, concat } from './MatrixHelpers';

const imageUri =
  'https://images.unsplash.com/photo-1694537745659-65925587aa9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2775&q=80';
const minZoomScale = 1;
const maxZoomScale = 4;

function App() {
  const { width, height } = useWindowDimensions();

  const origin = useSharedValue(vec3(0, 0, 0));
  const offset = useSharedValue(identity4);
  const matrix = useSharedValue(identity4);

  const reset = () => {
    'worklet';

    // @ts-ignore
    offset.value = withTiming(identity4);
    // @ts-ignore
    matrix.value = withTiming(identity4);
  };

  const getMatrixValues = () => {
    return {
      scale: matrix.value[0],
      translateX: matrix.value[12],
      translateY: matrix.value[13],
    };
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
      const { scale } = getMatrixValues();

      if (scale > maxZoomScale) {
        const maxScaleMatrix = concat(matrix.value, origin.value, [{ scale: 3 / scale }]);

        // @ts-ignore
        matrix.value = withTiming(maxScaleMatrix);
      } else if (scale < minZoomScale) {
        reset();
      }
    });

  const panGesture = Gesture.Pan().onChange(e => {
    const { scale, translateX, translateY } = getMatrixValues();
    const maxOffsetX = width * (1 - scale);
    const maxOffsetY = height * (1 - scale);

    /**
     * translateX + e.changeX < 0 => keep in mind that the starting point in the top left angle of the screen
     * so the pan movement to the right subtract and do not add to the current position
     */
    const canPanX = translateX + e.changeX < 0 && Math.abs(translateX + e.changeX) <= Math.abs(maxOffsetX);
    if (canPanX) {
      matrix.value = multiply4(Matrix4.translate(e.changeX, 0, 0), matrix.value);
    }

    /**
     * translateY + e.changeY < 0 => keep in mind that the starting point in the top left angle of the screen
     * so the pan movement to the right subtract and do not add to the current position
     */
    const canPanY = translateY + e.changeY < 0 && Math.abs(translateY + e.changeY) <= Math.abs(maxOffsetY);
    if (canPanY) {
      matrix.value = multiply4(Matrix4.translate(0, e.changeY, 0), matrix.value);
    }
  });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onBegin(e => {
      origin.value = [e.x, e.y, 0];
      offset.value = matrix.value;
    })
    .onEnd(() => {
      const { scale } = getMatrixValues();
      const newScale = scale + 1;
      if (newScale < maxZoomScale) {
        // @ts-ignore
        matrix.value = withTiming(concat(offset.value, origin.value, [{ scale: newScale }]));
      } else {
        reset();
      }
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

  const gesture = Gesture.Race(pinchGesture, doubleTapGesture, panGesture);

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor={styles.background.backgroundColor} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[rStyle]}>
          <FastImage source={{ uri: imageUri }} style={{ width, height }} resizeMode="contain" />
        </Animated.View>
      </GestureDetector>
    </Fragment>
  );
}

export default App;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
  },
});
