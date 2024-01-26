import {Animated, Dimensions, Easing, Keyboard} from 'react-native';

export const initInputWidth = (inputWidth: Animated.Value) => {
  Animated.timing(inputWidth, {
    toValue: Dimensions.get('window').width - 60,
    duration: 0,
    useNativeDriver: false,
  }).start();
};

export const openSearchOpacity = (searchOpacityButton: Animated.Value) => {
  Animated.timing(searchOpacityButton, {
    toValue: 1,
    duration: 150,
    useNativeDriver: true,
  }).start();
};

export const closeSearchOpacity = (searchOpacityButton: Animated.Value) => {
  Animated.timing(searchOpacityButton, {
    toValue: 0,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

export const startInputWidth = (inputWidth: Animated.Value) => {
  Animated.timing(inputWidth, {
    toValue: Dimensions.get('window').width - 85,
    duration: 300,
    useNativeDriver: false,
  }).start();
};

export const dismissKeyboard = (keyboardHeight: Animated.Value) => {
  Animated.timing(keyboardHeight, {
    toValue: 0,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(() => Keyboard.dismiss());
};
export const showHomePageWithAnimation = (pageAnimation: Animated.Value) => {
  return Animated.timing(pageAnimation, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
};
export const fadeOutSearchResult = (
  opacity: Animated.Value,
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  Animated.timing(opacity, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  }).start(() => {
    setIsFocused(false);
  });
};
