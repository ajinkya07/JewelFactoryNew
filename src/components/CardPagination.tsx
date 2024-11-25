import {StyleProp, View, ViewStyle} from 'react-native';
import React, {useEffect} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type CardPaginationProps = {
  style?: StyleProp<ViewStyle> | undefined;
  length: number;
  index: number;
  fillColor: string;
  width?: number;
};

const CardPagination = ({
  style,
  length,
  index,
  fillColor,
  width = 77,
}: CardPaginationProps) => {
  const FILL_WIDTH = width / length;

  const leftAnimation = useSharedValue(FILL_WIDTH * index);

  useEffect(() => {
    leftAnimation.value = withTiming(FILL_WIDTH * index, {
      duration: 200,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FILL_WIDTH, index]);

  const progressAnimationStyle = useAnimatedStyle(() => {
    return {
      left: leftAnimation.value,
    };
  });

  return (
    <View
      style={[
        styles.progressBarBackground,
        style,
        {backgroundColor: `${fillColor}33`, width: width},
      ]}>
      <Animated.View
        style={[
          styles.progressAnimation,
          {
            width: FILL_WIDTH,
            backgroundColor: fillColor,
          },
          progressAnimationStyle,
        ]}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  progressBarBackground: {
    height: '3rem',
    borderRadius: '100rem',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '10rem',
  },
  progressAnimation: {
    height: '3rem',
    borderRadius: '100rem',
  },
});

export default CardPagination;
