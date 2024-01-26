import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useRef} from 'react';

import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import MenuBar from '../MenuBar/MenuBar';
import SearchBar from '../SearchBar/SearchBar';
import {
  closeSearchOpacity,
  dismissKeyboard,
  fadeOutSearchResult,
  initInputWidth,
  openSearchOpacity,
  showHomePageWithAnimation,
  startInputWidth,
} from './Animated';
import MenuSvg from '../../svg/MenuSvg';
import useThemeColors from '../../constant/useColor';

interface HeaderProps {
  navigation: any;
  isSearchAppier?: boolean;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  opacity: Animated.Value;
  pageAnimation: Animated.Value;
}
const {Value} = Animated;
export default function Header({
  navigation,
  isFocused,
  setIsFocused,
  opacity,
  pageAnimation,
  isSearchAppier,
}: HeaderProps) {
  const inputWidth = useRef(new Animated.Value(100)).current;
  const searchOpacityButton = useRef(new Animated.Value(0)).current;
  const keyboardHeight = new Value(0);

  useEffect(() => {
    initInputWidth(inputWidth);
  }, []);

  const handleFocus = () => {
    startInputWidth(inputWidth);
    openSearchOpacity(searchOpacityButton);
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (isFocused) {
      dismissKeyboard(keyboardHeight);
      showHomePageWithAnimation(pageAnimation);
      fadeOutSearchResult(opacity, setIsFocused);
      closeSearchOpacity(searchOpacityButton);
      initInputWidth(inputWidth);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        marginTop: Platform.OS === 'ios' ? 0 : 20,
      }}>
      <MenuBar
        activeOpacity={0.7}
        onPress={() => {
          navigation.openDrawer();
        }}
        icon={<MenuSvg />}
      />
      <View style={{flex: 1}}>
        {isSearchAppier === undefined && (
          <Animated.View style={{width: inputWidth}}>
            <SearchBar
              sx={{
                marginLeft: 20,
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Animated.View>
        )}
      </View>
      {isFocused && (
        <Animated.View style={{opacity: searchOpacityButton}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBlur}
            style={{marginLeft: 5}}>
            <FontAwesomeIcon color="#5F5E70" icon={faClose} size={20} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
