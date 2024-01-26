import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function GridSvg({color = '#5F5E70'}: SvgProps) {
  return (
    <Svg width="24" height="20" viewBox="0 0 24 25" fill={color}>
      <Path
        d="M4 2.5H20C20.5304 2.5 21.0391 2.71071 21.4142 3.08579C21.7893 3.46086 22 3.96957 22 4.5V20.5C22 21.0304 21.7893 21.5391 21.4142 21.9142C21.0391 22.2893 20.5304 22.5 20 22.5H4C2.92 22.5 2 21.6 2 20.5V4.5C2 3.96957 2.21071 3.46086 2.58579 3.08579C2.96086 2.71071 3.46957 2.5 4 2.5ZM4 4.5V11.5H11V4.5H4ZM4 20.5H11V13.5H4V20.5ZM20 20.5V13.5H13V20.5H20ZM20 4.5H13V11.5H20V4.5Z"
        fill={color}
      />
    </Svg>
  );
}
