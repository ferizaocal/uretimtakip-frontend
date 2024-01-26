import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Label from '../Text/Label';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';

interface SelectPlaceHolderProps extends TouchableOpacityProps {
  label?: string;
  selectedValue?: string;
  icon?: any;
  iconShow?: boolean;
}

export default function SelectPlaceHolder(props: SelectPlaceHolderProps) {
  const {label, selectedValue} = props;
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
      <TouchableOpacity
        {...props}
        activeOpacity={props.activeOpacity || 0.7}
        style={{...styles.holder, borderColor: colors.borderColor}}>
        <Label
          sx={{color: colors.inputColor, fontWeight: 'bold'}}
          label={selectedValue || 'Seçiniz'}
        />
        {props.iconShow === undefined && (
          <FontAwesomeIcon
            icon={props.icon || faAngleRight}
            color={colors.iconColor}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  holder: {
    marginTop: 5,
    height: 40,

    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Raleway-Regular',
    fontWeight: 'bold',
  },
});
