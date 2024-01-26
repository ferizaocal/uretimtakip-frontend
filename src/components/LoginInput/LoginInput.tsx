import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Label from '../Text/Label';

interface LoginInputProps extends TextInputProps {
  icon?: IconProp;
  svg?: React.ReactNode;
  iconSize?: number;
  iconColor?: string;
  title: string;
  sx?: StyleProp<ViewStyle>;
}

export default function LoginInput({
  icon,
  svg,
  iconColor = '#868686',
  iconSize = 17,
  title,
  sx,
  ...rest
}: LoginInputProps) {
  return (
    <View style={sx}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon && (
          <FontAwesomeIcon color={iconColor} icon={icon} size={iconSize} />
        )}
        {svg && svg}
        <Label
          label={title}
          font="Raleway-Bold"
          sx={{
            fontSize: 15,
            color: '#868686',
            marginLeft: 5,
          }}
        />
      </View>
      <TextInput
        style={{
          height: 30,
          fontFamily: 'Raleway-Bold',
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#C9C9C9',
        }}
        {...rest}
      />
    </View>
  );
}
