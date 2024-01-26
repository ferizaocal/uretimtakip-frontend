import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
  View,
  Text,
} from 'react-native';
import SearchResults from '../components/SearchResult/SearchResult';
import ProductionTracking from '../sections/Home/ProductionTracking';
import Orders from '../sections/Home/Orders';
import Header from '../components/Header/Header';
import useThemeColors from '../constant/useColor';
import ProductionExit from '../components/ProductionTracking/ProductionExit';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders, fetchProductionTrackings} from '../store/slice/homeSlice';
import {AppState} from '../store';

export default function Home(props: any) {
  const dispatch = useDispatch<any>();
  const [opacity] = useState(new Animated.Value(0));
  const [pageAnimation] = useState(new Animated.Value(1));
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const colors = useThemeColors();

  let AnimatedHeaderValue = new Animated.Value(0);
  const Sheight = Dimensions.get('window').height;

  const Header_Maximum_Height = 180;
  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Sheight - 550, Sheight - 100, Sheight],
    outputRange: [Header_Maximum_Height, Header_Maximum_Height, 0, 0],
    extrapolate: 'clamp',
  });
  const animateHeaderOpacity = AnimatedHeaderValue.interpolate({
    inputRange: [0, Sheight - 550 / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const {productionTrackings, orders} = useSelector(
    (state: AppState) => state.home,
  );
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      dispatch(fetchOrders());
      dispatch(fetchProductionTrackings());
    });
  }, []);

  const Section = () => {
    return (
      <>
        {orders?.length != 0 && (
          <Animated.View
            style={{
              height: animateHeaderHeight,
              opacity: animateHeaderOpacity,
            }}>
            <Orders />
          </Animated.View>
        )}
        {productionTrackings?.length != 0 && (
          <ProductionTracking AnimatedHeaderValue={AnimatedHeaderValue} />
        )}
        {orders?.length === 0 && productionTrackings?.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.iconColor,
              }}>
              Sipariş ve üretim takibi bulunmamaktadır.
            </Text>
          </View>
        )}
      </>
    );
  };
  return (
    <>
      <Animated.View
        style={{
          opacity: pageAnimation,
          flex: 1,
          backgroundColor: colors.screenBackgroundColor,
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            marginHorizontal: 20,
            backgroundColor: colors.screenBackgroundColor,
          }}>
          <Header
            isSearchAppier={false}
            pageAnimation={pageAnimation}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            opacity={opacity}
            navigation={props.navigation}
          />
          {isFocused ? <SearchResults opacity={opacity} /> : <Section />}
        </SafeAreaView>
      </Animated.View>
    </>
  );
}
