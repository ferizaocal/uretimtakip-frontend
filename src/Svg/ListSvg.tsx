import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function ListSvg({color = '#5F5E70'}: SvgProps) {
  return (
    <Svg width="15" height="25" viewBox="0 0 20 17" fill={color}>
      <Path
        d="M0 10.5H6V16.5H0M14 4.5H8V6.5H14M0 6.5H6V0.5H0M8 0.5V2.5H20V0.5M8 16.5H14V14.5H8M8 12.5H20V10.5H8"
        fill={color}
      />
    </Svg>
  );
}
