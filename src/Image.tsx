import { StyleSheet } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type ImageProps = {
  uri: string;
  width: number;
  height: number;
};

const Image = (props: ImageProps) => {
  const { uri, width, height } = props;

  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const imageCenterX = width / 2;
  const imageCenterY = height / 2;

  // @ts-ignore
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -imageCenterX },
        { translateY: -imageCenterY },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: imageCenterX },
        { translateY: imageCenterY },
      ],
    };
  });

  const pinchGesture = Gesture.Pinch().onChange(event => {
    scale.value = event.scale;
    focalX.value = event.focalX;
    focalY.value = event.focalY;
  });

  const gesture = Gesture.Exclusive(pinchGesture);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[rStyle]}>
        <FastImage
          source={{
            uri,
          }}
          style={[
            styles.image,
            {
              width,
              height,
            },
          ]}
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default Image;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
