import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function PasswordSvg(props: {
  height?: any;
  width?: any;
  color?: string;
  strokeWidth?: string;
}) {
  return (
    <Svg
      width={props.width || 22}
      height={props.width || 22}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M16.4235 9.4478V7.3008C16.4235 4.7878 14.3855 2.7498 11.8725 2.7498C9.35949 2.7388 7.31349 4.7668 7.30249 7.2808V7.3008V9.4478"
        stroke={props.color || '#868686'}
        strokeWidth={props.strokeWidth || '1.5'}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.6832 21.2496H8.04224C5.94824 21.2496 4.25024 19.5526 4.25024 17.4576V13.1686C4.25024 11.0736 5.94824 9.3766 8.04224 9.3766H15.6832C17.7772 9.3766 19.4752 11.0736 19.4752 13.1686V17.4576C19.4752 19.5526 17.7772 21.2496 15.6832 21.2496Z"
        stroke={props.color || '#868686'}
        strokeWidth={props.strokeWidth || '1.5'}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.863 14.2027V16.4237"
        stroke={props.color || '#868686'}
        strokeWidth={props.strokeWidth || '1.5'}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
