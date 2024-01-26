import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import SearchSvg from '../../svg/SearchSvg';
import I18n from '../../lang/_i18n';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import useThemeColors from '../../constant/useColor';
interface SearchBarProps extends TextInputProps {
  sx?: StyleProp<ViewStyle>;
  inputStyleProps?: StyleProp<TextStyle>;
  placeholder?: string;
}
export default function SearchBar(props: SearchBarProps) {
  const colors = useThemeColors();
  const {language} = useSelector((state: AppState) => state.app);
  return (
    <View style={[props.sx]}>
      <View style={{position: 'absolute', zIndex: 10, left: 18, top: 12}}>
        <SearchSvg color={colors.iconColor} />
      </View>
      <TextInput
        {...props}
        autoFocus={false}
        placeholderTextColor={'#999999'}
        placeholder={
          props.placeholder ||
          I18n.t('homescreen_search_placeholder', {
            locale: language,
          })
        }
        style={[
          props.inputStyleProps,
          {
            backgroundColor: '#fff',
            borderColor: '#F2F2F2',
            borderWidth: 1,
            borderRadius: 40,
            height: 40,
            fontWeight: 'bold',
            fontSize: 13,
            color: '#999999',
            paddingHorizontal: 43,
            paddingVertical: 6,
          },
        ]}
      />
    </View>
  );
}
