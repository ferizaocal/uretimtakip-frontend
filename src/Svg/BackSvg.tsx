import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function BackSvg({color = '#D8B267'}: SvgProps) {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill={color}>
      <Path
        d="M15.9392 17.2868L11.3592 12.7068L15.9392 8.11679L14.5292 6.70679L8.52917 12.7068L14.5292 18.7068L15.9392 17.2868Z"
        fill={color}
      />
    </Svg>
  );
}
