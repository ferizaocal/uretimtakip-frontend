import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface BackdropProps extends BottomSheetBackdropProps {
  onPress?: () => void;
}
const Backdrop = ({animatedIndex, style, onPress}: BackdropProps) => {
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(0,0,0,0.7)',
      },
    ],
    [style],
  );

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress && onPress();
      }}
      style={containerStyle}
    />
  );
};

export default Backdrop;
