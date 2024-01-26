import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {memo} from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Label from '../../components/Text/Label';
import UsersSvg from '../../svg/UsersSvg';
import OrderSvg from '../../svg/OrderSvg';
import ReportSvg from '../../svg/ReportSvg';
import SettingsSvg from '../../svg/SettingsSvg';
import UserSvg from '../../svg/UserSvg';
import LogoutSvg from '../../svg/LogoutSvg';
import I18n from '../../lang/_i18n';
import RouteTypes from '../../types/RouteTypes';
import ConfirmationSvg from '../../svg/ConfirmationSvg';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import {AuthActions} from '../../store/slice/authSlice';
import {TextileImage} from '../../utils/Data';
import useThemeColors from '../../constant/useColor';
import PasswordSvg from '../../svg/PasswordSvg';
import BrandSvg from '../../svg/BrandSvg';

interface DrawerButtonProps extends TouchableOpacityProps {
  label: string;
  icon: React.ReactNode;
}
const DrawerButton = memo(function MyDrawerButton(props: DrawerButtonProps) {
  return (
    <TouchableOpacity {...props} style={styles.buttonContainer}>
      {props.icon}
      <Label
        label={props.label}
        font="Raleway-Bold"
        sx={{
          fontSize: 16,
          marginLeft: 14,
          color: '#594E3C',
          textTransform: 'uppercase',
        }}
      />
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 15,
    marginHorizontal: 20,
    paddingVertical: 6,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
});

const DrawerContent = memo(function MyDrawerContent(
  props: DrawerContentComponentProps,
) {
  const colors = useThemeColors();
  const {language} = useSelector((state: AppState) => state.app);
  const dispatch = useDispatch();
  return (
    <View style={drawerContentStyles.container}>
      <SafeAreaView
        style={[
          {
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.drawerContentBgColor,
          },
          drawerContentStyles.shadown,
        ]}>
        <Image source={TextileImage} style={{width: 200, height: 200}} />
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.drawerContentBgColor,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}>
        <ScrollView
          contentContainerStyle={{marginTop: 40}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentInset={{bottom: 50}}>
          <DrawerButton
            onPress={() => props.navigation.navigate(RouteTypes.ROLES_SCREEN)}
            label={I18n.t('drawercontentscreen_users', {locale: language})}
            icon={<UsersSvg />}
          />
          <DrawerButton
            onPress={() =>
              props.navigation.navigate(RouteTypes.CUSTOMERS_SCREEN)
            }
            label={I18n.t('drawercontentscreen_customers', {locale: language})}
            icon={<UsersSvg />}
          />
          <DrawerButton
            onPress={() => props.navigation.navigate(RouteTypes.ORDERS_SCREEN)}
            label={I18n.t('drawercontentscreen_orders', {locale: language})}
            icon={<OrderSvg />}
          />

          <DrawerButton
            onPress={() =>
              props.navigation.navigate(RouteTypes.FABRIC_BRANDS_SCREEN)
            }
            label={I18n.t('drawercontentscreen_brand', {locale: language})}
            icon={<BrandSvg />}
          />
          <DrawerButton
            onPress={() =>
              props.navigation.navigate(RouteTypes.SETTINGS_SCREEN)
            }
            label={I18n.t('drawercontentscreen_settings', {locale: language})}
            icon={<SettingsSvg />}
          />
        </ScrollView>
        <View style={drawerContentStyles.bottom}>
          <DrawerButton
            onPress={() => props.navigation.navigate(RouteTypes.PROFILE_SCREEN)}
            label={I18n.t('drawercontentscreen_profile', {locale: language})}
            icon={<UserSvg />}
          />

          <DrawerButton
            onPress={() => {
              dispatch(AuthActions.setUser(null));
            }}
            label={I18n.t('drawercontentscreen_logout', {locale: language})}
            icon={<LogoutSvg />}
          />
        </View>
      </View>
    </View>
  );
});
export default DrawerContent;

const drawerContentStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2efea',
  },
  shadown: {
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.24,
    elevation: 5,
  },
  bottom: {
    marginBottom: 10,
  },
});
