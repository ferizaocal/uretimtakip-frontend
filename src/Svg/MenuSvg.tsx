import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';
import useThemeColors from '../constant/useColor';

export default function MenuSvg(props: {color?: string}) {
  const colors = useThemeColors();
  const {color} = props;
  var iconColor = color ? color : colors.iconColor;

  return (
    <Svg width="24" height="17" viewBox="0 0 24 17" fill="none">
      <Path
        strokeWidth={3}
        d="M1 8.33333H12.9014M1 1H23M1 15.6667H23"
        stroke={iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
