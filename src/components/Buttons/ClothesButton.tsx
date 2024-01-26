import {
  View,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import React, {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Label from '../Text/Label';
import useThemeColors from '../../constant/useColor';

interface ClothesButtonProps extends TouchableOpacityProps {
  icon: any;
  label?: string;
  shadown?: boolean;
  bottom?: number;
  isSelected?: boolean;
}
export const ClothesButton = memo((props: ClothesButtonProps) => {
  let bottom = props.bottom ? props.bottom : 30;
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[
        {
          ...styles.circleButon,
          bottom: bottom,
          backgroundColor: props.isSelected ? colors.menuIcon : 'lightgray',
        },
        styles.shadown,
      ]}>
      {props.icon}
      {props.label && (
        <Label
          numberOfLines={1}
          sx={{fontSize: 10, color: '#fff', lineHeight: 20, maxWidth: 50}}
          label={props.label}></Label>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  circleButon: {
    height: 70,
    width: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  shadown: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
