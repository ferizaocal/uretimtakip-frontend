import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';

import RouteTypes from '../../types/RouteTypes';
import BottomTab from '../BottomTabs/BottomTab';
import Settings from '../../screens/Settings';

import Roles from '../../screens/Roles';
import Orders from '../../screens/Order/Orders';

import Profile from '../../screens/Profile';
import Users from '../../screens/User/Users';
import Productions from '../../screens/Production/Productions';
import {useDispatch, useSelector} from 'react-redux';
import {fetchActiveProductionModels} from '../../store/slice/productionModelSlice';
import Operations from '../../screens/Operation/Operations';
import UpdatePassword from '../../screens/UpdatePassword';
import AddOrder from '../../screens/Order/AddOrder';
import EditOrder from '../../screens/Order/EditOrder';
import Customers from '../../screens/Customer/Customers';
import AddCustomer from '../../screens/Customer/AddCustomer';
import AgeGroups from '../../screens/AgeGroups';
import AddProduct from '../../screens/Product/AddProduct';
import {AppState} from '../../store';
import {View} from 'react-native';
import Home from '../../screens/User/Home';
import Brands from '../../screens/Fabric/Brand/Brands';
import Models from '../../screens/Fabric/Model/Models';
import FabricDetail from '../../screens/Fabric/FabricDetail';
import ProductionDetail from '../../screens/Production/ProductionDetail';
const DrawerNavigation = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export default function StackNavigaton() {
  const user = useSelector((state: AppState) => state.auth.user);

  const isAdmin = user?.roles?.some?.(role =>
    role.name.includes('Admin' || 'ADMIN'),
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAdmin && (
        <>
          <Stack.Screen name="Main" component={DrawerScreen} />
          <Stack.Screen name={RouteTypes.ROLES_SCREEN} component={Roles} />
          <Stack.Screen name={RouteTypes.ORDERS_SCREEN} component={Orders} />
          <Stack.Screen name={RouteTypes.USERS_SCREEN} component={Users} />

          <Stack.Screen name={RouteTypes.PROFILE_SCREEN} component={Profile} />
          <Stack.Screen
            name={RouteTypes.SETTINGS_SCREEN}
            component={Settings}
          />

          <Stack.Screen
            name={RouteTypes.PRODUCTIONS_SCREEN}
            component={Productions}
          />
          <Stack.Screen
            name={RouteTypes.OPERATIONS_SCREEN}
            component={Operations}
          />
          <Stack.Screen
            name={RouteTypes.PROFILE_UPDATE_PASSWORD_SCREEN}
            component={UpdatePassword}
          />
          <Stack.Screen
            name={RouteTypes.ADD_ORDERS_SCREEN}
            component={AddOrder}
          />
          <Stack.Screen
            name={RouteTypes.EDIT_ORDER_SCREEN}
            component={EditOrder}
          />
          <Stack.Screen
            name={RouteTypes.CUSTOMERS_SCREEN}
            component={Customers}
          />
          <Stack.Screen
            name={RouteTypes.ADD_CUSTOMER_SCREEN}
            component={AddCustomer}
          />

          <Stack.Screen
            name={RouteTypes.AGE_GROUPS_SCREEN}
            component={AgeGroups}
          />
          <Stack.Screen
            name={RouteTypes.ADD_PRODUCT_SCREEN}
            component={AddProduct}
          />
          <Stack.Screen
            name={RouteTypes.FABRIC_BRANDS_SCREEN}
            component={Brands}
          />
          <Stack.Screen
            name={RouteTypes.FABRIC_MODELS_SCREEN}
            component={Models}
          />
          <Stack.Screen
            name={RouteTypes.FABRIC_DETAIL_SCREEN}
            component={FabricDetail}
          />
          <Stack.Screen
            name={RouteTypes.PRODUCT_DETAIL_SCREEN}
            component={ProductionDetail}
          />
        </>
      )}
      {!isAdmin && (
        <>
          <Stack.Screen name={RouteTypes.USER_HOME_SCREEN} component={Home} />
        </>
      )}
    </Stack.Navigator>
  );
}
const DrawerScreen = (props: any) => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    loadActiveProductionModels();
  }, []);
  const loadActiveProductionModels = () => {
    dispatch(fetchActiveProductionModels());
  };
  return (
    <DrawerNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <DrawerContent {...props} />
      )}>
      <DrawerNavigation.Screen
        name={RouteTypes.MAIN_BOTTOM_TAB}
        component={BottomTab}
      />
    </DrawerNavigation.Navigator>
  );
};
