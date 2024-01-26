import React, {useContext, useEffect, useRef, useState} from 'react';
import Home from '../../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import HomeSvg from '../../svg/HomeSvg';
import FabricSvg from '../../svg/FabricSvg';
import ProductionTrackingSvg from '../../svg/ProductionTrackingSvg';
import JacketSvg from '../../svg/Clothes/JacketSvg';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacityProps,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from 'react-native';
import TshirtSvg from '../../svg/Clothes/TshirtSvg';
import Label from '../../components/Text/Label';
import BabyPijamaSvg from '../../svg/Clothes/BabyPijamaSvg';
import JeansPantsSvg from '../../svg/Clothes/JeansPantsSvg';
import ScarfSvg from '../../svg/Clothes/ScarfSvg';
import ShirtSvg from '../../svg/Clothes/ShirtSvg';
import ShortPantsSvg from '../../svg/Clothes/ShortPantsSvg';
import SkirtSvg from '../../svg/Clothes/SkirtSvg';
import RouteTypes from '../../types/RouteTypes';
import Product from '../../screens/Product/Products';
import ProductionTracking from '../../screens/ProductionTracking';
import Fabric from '../../screens/Fabric/Fabric';
import useThemeColors from '../../constant/useColor';
import I18n from '../../lang/_i18n';
import Popover from '../../components/Popover/Popover';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import QuestionMarkSvg from '../../svg/QuestionMarkSvg';
import {AppActions} from '../../store/slice/appSlice';
import {getFindIconByName} from '../../utils/Data';
import {ClothesButton} from '../../components/Buttons/ClothesButton';
import {updateActiveProductionModelToUser} from '../../services/UserService';
import {
  ProductionModelActions,
  fetchActiveProductionModels,
} from '../../store/slice/productionModelSlice';
import Container from '../../components/Container/Container';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';

const Tab = createBottomTabNavigator();
const Clothes = ({language}: {language: string}) => [
  {icon: (props?: any) => <BabyPijamaSvg {...props} />, label: 'Bebek Pijama'},
  {icon: (props?: any) => <JacketSvg {...props} />, label: 'Ceket'},
  {icon: (props?: any) => <JeansPantsSvg {...props} />, label: 'Pantolon'},
  {icon: (props?: any) => <ScarfSvg {...props} />, label: 'Atkı'},
  {icon: (props?: any) => <ShirtSvg {...props} />, label: 'Gömlek'},
  {icon: (props?: any) => <ShortPantsSvg {...props} />, label: 'Şort'},
  {icon: (props?: any) => <SkirtSvg {...props} />, label: 'Etek'},
  {icon: (props?: any) => <TshirtSvg {...props} />, label: 'Tişört'},
];

export default function BottomTab() {
  const dispatch = useDispatch<any>();
  const colors = useThemeColors();
  const {production, language} = useSelector((state: AppState) => state.app);
  var productionBottomSheetRef = useRef<any>(null);
  const {activeProductionModels, loading} = useSelector(
    (state: AppState) => state.productionModel,
  );
  var popoverRef = useRef<any>(null);

  useEffect(() => {
    if (Object.keys(production).length === 0) {
      dispatch(fetchActiveProductionModels());
    }
    console.log(Object.keys(production).length);
  }, [production]);

  const handleOpenPopover = () => {
    if (popoverRef.current) {
      dispatch(fetchActiveProductionModels());
      popoverRef.current.openPopover();
    }
  };

  const handleClosePopover = () => {
    if (popoverRef.current) {
      popoverRef.current.closePopover();
    }
  };

  const SelectedProduction = () =>
    Clothes({language}).find(c => c.label === production.name);
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => (
          <CustomTabBar closePopover={handleClosePopover} {...props} />
        )}>
        <Tab.Screen
          options={{
            tabBarIcon: props => <HomeSvg color={props.color} />,
          }}
          name={RouteTypes.HOME_BOTTOM_TAB}
          component={Home}></Tab.Screen>
        <Tab.Screen
          options={{
            tabBarIcon: props => <FabricSvg color={props.color} />,
          }}
          name={RouteTypes.FABRIC_BOTTOM_TAB}
          component={Fabric}></Tab.Screen>
        <Tab.Screen
          options={{
            tabBarIcon: props => <ProductionTrackingSvg color={props.color} />,
          }}
          name={RouteTypes.PRODUCTIONTRACKING_BOTTOM_TAB}
          component={ProductionTracking}></Tab.Screen>
        <Tab.Screen
          options={{
            tabBarIcon: props => {
              if (SelectedProduction && Object.keys(production).length != 0) {
                return SelectedProduction()?.icon({...props});
              } else {
                return <QuestionMarkSvg {...props} />;
              }
            },
          }}
          name={RouteTypes.PRODUCT_BOTTOM_TAB}
          listeners={({navigation, route}) => ({
            tabLongPress: e => {
              handleOpenPopover();
            },
          })}
          component={Product}></Tab.Screen>
      </Tab.Navigator>
      <Popover popoverRef={popoverRef}>
        <View style={styles.popoverHeader}>
          <Label
            font="Raleway-SemiBold"
            sx={{
              fontSize: 16,
              color: '#5F5E70',
            }}
            label={I18n.t('bottomtab_popover_product', {
              locale: language,
            })}></Label>
          <Pressable onPress={() => handleClosePopover()}>
            <Label
              sx={{
                fontSize: 15,
                color: '#5F5E70',
              }}
              label={I18n.t('bottomtab_popover_close', {
                locale: language,
              })}></Label>
          </Pressable>
        </View>

        <Container bgColor="white" isLoading={loading}>
          <View style={styles.popoverItem}>
            {activeProductionModels?.map((el, index) => {
              let isActive = el.id === production.id;
              return (
                <ClothesButton
                  onPress={async () => {
                    dispatch(AppActions.setProduction(el));
                    await updateActiveProductionModelToUser(el.id);
                    handleClosePopover();
                  }}
                  key={index}
                  icon={getFindIconByName(
                    el.name,
                    isActive ? '#fff' : colors.iconColor,
                  )}
                  label={el.name}
                  isSelected={isActive}
                />
              );
            })}
          </View>
        </Container>
      </Popover>
      <CustomBottomSheet
        ref={productionBottomSheetRef}
        isFixed={true}
        bgColor={colors.screenBackgroundColor}
        showIndicator={false}
        snapPoints={['50%']}
        handleClose={() => {}}
        isOpen={Object.keys(production).length === 0}>
        <SafeAreaView style={{...styles.popoverHeader, marginHorizontal: 20}}>
          <Label
            font="Raleway-SemiBold"
            sx={{
              fontSize: 16,
              color: '#5F5E70',
            }}
            label={I18n.t('bottomtab_popover_product', {
              locale: language,
            })}></Label>
        </SafeAreaView>

        <Container isLoading={loading} mx={20}>
          <View style={styles.popoverItem}>
            {activeProductionModels?.map((el, index) => {
              let isActive = el.id === production.id;
              return (
                <ClothesButton
                  onPress={async () => {
                    dispatch(AppActions.setProduction(el));
                    await updateActiveProductionModelToUser(el.id);
                    productionBottomSheetRef?.current?.close();
                  }}
                  key={index}
                  icon={getFindIconByName(
                    el.name,
                    isActive ? '#fff' : colors.iconColor,
                  )}
                  label={el.name}
                  isSelected={isActive}
                />
              );
            })}
          </View>
        </Container>
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    zIndex: 99,
    width: '100%',
    height: Dimensions.get('window').height - 70,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  popoverContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,

    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    padding: 10,
    elevation: 5,
    zIndex: 100,
  },
  popoverHeader: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popoverItem: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  productionButton: {
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#D8B267',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});
