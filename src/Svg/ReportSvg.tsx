import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function ReportSvg() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 9H18.5L13 3.5V9ZM6 2H14L20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C4.89 22 4 21.1 4 20V4C4 2.89 4.89 2 6 2ZM7 20H9V14H7V20ZM11 20H13V12H11V20ZM15 20H17V16H15V20Z"
        fill="#594E3C"
      />
    </Svg>
  );
}
