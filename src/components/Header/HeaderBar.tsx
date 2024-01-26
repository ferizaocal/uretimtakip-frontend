import React from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../../constant/useColor';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export interface HeaderBarProp extends TouchableOpacityProps {
  label: String;
  iconLeft?: IconProp;

  leftButton?: TouchableOpacityProps;

  color?: {iconLeft: '#fff'; label: '#fff'};
}

const HeaderBar: React.FC<HeaderBarProp> = ({
  label,
  iconLeft,
  leftButton,
  color = {iconLeft: '#594E3C', label: '#594E3C'},
}) => {
  const colors = useThemeColors();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.headerBackground,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {iconLeft && (
        <TouchableOpacity
          {...leftButton}
          style={{
            position: 'absolute',
            bottom: 0,
            padding: 10,
            left: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <FontAwesomeIcon color={color.iconLeft} size={22} icon={iconLeft} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          padding: 10,
          color: '#594E3C',
        }}>
        {label}
      </Text>
    </SafeAreaView>
  );
};
export default HeaderBar;
