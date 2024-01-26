import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import Label from '../Text/Label';

interface FormControlProps extends TouchableOpacityProps {
  label?: string;
  labelPosition?: 'top' | 'right';
  component?: React.ReactNode;
  sx?: StyleProp<ViewStyle>;
}
export default function FormControl(props: FormControlProps) {
  const {label, sx, labelPosition} = props;
  var lblPosition = labelPosition ? labelPosition : 'right';

  return (
    <View>
      {label && lblPosition === 'top' && (
        <Label
          label={label}
          font="Raleway-Bold"
          sx={{
            fontSize: 15,
            color: '#868686',
          }}
        />
      )}
      <TouchableOpacity
        {...props}
        activeOpacity={props.activeOpacity || 0.7}
        style={[
          {
            ...styles.container,
            marginBottom: label && lblPosition === 'top' ? 10 : 5,
          },
          sx,
        ]}>
        {props.component}
        {label && lblPosition === 'right' && (
          <Label
            label={label}
            font="Raleway-Bold"
            sx={{
              fontSize: 13,
              marginLeft: 10,
              color: '#868686',
              position: 'absolute',
              left: 30,
              top: 12,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#f2f2f2',
    marginTop: 7,

    padding: 8,
    borderRadius: 5,
  },
});
