import {Path, Svg} from 'react-native-svg';

import {View, Text} from 'react-native';
import React from 'react';

export default function GermanyFlagSvg() {
  return (
    <Svg width="24" height="25" viewBox="0 0 33 25" fill="none">
      <Path d="M0.25 16.25H32.25V24.25H0.25V16.25Z" fill="#FFCE00" />
      <Path d="M0.25 0.25H32.25V8.25H0.25V0.25Z" fill="black" />
      <Path d="M0.25 8.25H32.25V16.25H0.25V8.25Z" fill="#DD0000" />
    </Svg>
  );
}
