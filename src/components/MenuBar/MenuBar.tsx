import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import MenuSvg from '../../svg/MenuSvg';

interface MenuBarProps extends TouchableOpacityProps {
  icon: React.ReactNode;
}
export default function MenuBar(props: MenuBarProps) {
  return <TouchableOpacity {...props}>{props.icon}</TouchableOpacity>;
}
