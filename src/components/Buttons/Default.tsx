import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import React from 'react';
import Label from '../Text/Label';
import useThemeColors from '../../constant/useColor';

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  children?: React.ReactNode;
  sx?: StyleProp<ViewStyle>;
  labelSx?: StyleProp<TextStyle>;
  class?: any;
  label?: any;
}
export default function Button(props: ButtonProps) {
  const {isLoading, label, children} = props;
  const colors = useThemeColors();
  const opacityColor = colors.saveButton + '80';
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: props.disabled ? opacityColor : colors.saveButton,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        },
        props.sx,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={'#fff'} />
      ) : props.label ? (
        <Label
          font="Raleway-SemiBold"
          sx={[
            {
              fontSize: 15,
              color: '#fff',
            },
            props.labelSx,
          ]}
          label={label}
        />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
