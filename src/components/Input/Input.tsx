import {
  View,
  Text,
  TextInputProps,
  TextInput,
  StyleSheet,
  Animated,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Label from '../Text/Label';
import useThemeColors from '../../constant/useColor';
import bottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';

interface InputProps extends TextInputProps {
  label?: string;
  bottomSheet?: boolean;
  sx?: StyleProp<TextStyle>;
}
export default function Input(props: InputProps) {
  const {label, bottomSheet} = props;
  const colors = useThemeColors();

  return (
    <View>
      {label && (
        <Label
          label={label}
          font="Raleway-Bold"
          sx={{
            fontSize: 15,
            color: '#868686',
          }}
        />
      )}

      {bottomSheet ? (
        <BottomSheetTextInput
          autoFocus={false}
          style={[
            {
              ...styles.input,
              borderColor: colors.borderColor,
              color: colors.inputColor,
            },
            props.sx,
          ]}
          {...props}
        />
      ) : (
        <TextInput
          autoFocus={false}
          style={[
            {
              ...styles.input,
              borderColor: colors.borderColor,
              color: colors.inputColor,
            },
            props.sx,
          ]}
          {...props}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    fontFamily: 'Raleway-Regular',
    fontWeight: 'bold',
  },
});
