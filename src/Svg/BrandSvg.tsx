import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function BrandSvg() {
  return (
    <Svg width="24" height="24" fill="#594E3C" viewBox="0 0 640 512">
      <Path d="M24 64H56 80V88v88 80 80 88 24H56 24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8V360H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8V280H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8V200H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8V112H24C10.7 112 0 101.3 0 88S10.7 64 24 64zm88 0H528V448H112V64zM640 88c0 13.3-10.7 24-24 24h-8v40h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v32h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v32h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v40h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H584 560V424 336 256 176 88 64h24 32c13.3 0 24 10.7 24 24z" />
    </Svg>
  );
}