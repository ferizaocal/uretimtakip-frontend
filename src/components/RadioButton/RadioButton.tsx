import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../../constant/useColor';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

interface RadioButtonProps extends TouchableOpacityProps {
  checked?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
}
export default function RadioButton(props: RadioButtonProps) {
  const {checked, buttonStyle} = props;
  const colors = useThemeColors();
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.buton,
        checked
          ? {...styles.active, backgroundColor: colors.primary}
          : {...styles.inActive, borderColor: colors.primary},
        buttonStyle,
      ]}>
      {checked && (
        <FontAwesomeIcon
          color={checked ? '#fff' : colors.iconColor}
          icon={faCheck}
        />
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buton: {
    height: 25,
    width: 25,
    borderRadius: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#768093',
  },
  active: {
    borderWidth: 0,
  },
  inActive: {
    borderWidth: 6,
  },
});
