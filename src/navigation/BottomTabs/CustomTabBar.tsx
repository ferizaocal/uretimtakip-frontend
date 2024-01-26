import React, {useContext, useEffect} from 'react';
import {View, Pressable} from 'react-native';
import RouteTypes from '../../types/RouteTypes';
import useThemeColors from '../../constant/useColor';

const CustomTabBar = ({state, descriptors, navigation, closePopover}: any) => {
  const colors = useThemeColors();
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label = options.title || route.name;
        const icon = options.tabBarIcon;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (route.name !== RouteTypes.PRODUCT_BOTTOM_TAB) {
            closePopover();
          }
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          const event = navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
          if (route.name !== RouteTypes.PRODUCT_BOTTOM_TAB) {
            closePopover();
          }
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            style={{
              backgroundColor: '#F5F5F5',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 70,
            }}
            key={index}>
            <Pressable
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                {
                  padding: 10,
                  flex: 1,
                },
                isFocused && {
                  shadowColor: colors.iconColor,
                  shadowOffset: {width: 0, height: 4},
                  shadowOpacity: 1,
                  shadowRadius: 15,
                  elevation: 5,
                },
              ]}>
              {icon({color: isFocused ? colors.iconColor : '#C9C9C9'})}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};
export default CustomTabBar;
