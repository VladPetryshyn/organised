import {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const CustomSheetBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  const {colors} = useTheme();
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [colors.surface, colors.background],
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );
  return <Animated.View pointerEvents="none" style={containerStyle} />;
};
