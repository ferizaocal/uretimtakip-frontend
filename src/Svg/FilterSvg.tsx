import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function FilterSvg({color = '#5F5E70'}: SvgProps) {
  return (
    <Svg width="25" height="25" fill={color} viewBox="0 0 25 25">
      <Path
        d="M6.1665 13.601H18.1665V11.601H6.1665M3.1665 6.60095V8.60095H21.1665V6.60095M10.1665 18.601H14.1665V16.601H10.1665V18.601Z"
        fill={color}
      />
    </Svg>
  );
}
