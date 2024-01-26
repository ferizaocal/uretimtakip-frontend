import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import React from 'react';

import Fonts from '../../types/font';
import useThemeColors from '../../constant/useColor';

interface LabelProps extends TextProps {
  label: string;
  font?: Fonts;
  sx?: StyleProp<TextStyle>;
}

export default function Label(prop: LabelProps) {
  const colors = useThemeColors();
  return (
    <Text
      {...prop}
      style={[
        {...styles.label, fontFamily: prop.font, color: colors.textColor},
        prop.sx,
      ]}>
      {prop.label}
    </Text>
  );
}
const styles = StyleSheet.create({
  label: {
    fontFamily: 'Raleway-SemiBold',
  },
});
