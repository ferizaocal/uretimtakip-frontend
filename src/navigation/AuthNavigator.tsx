import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import RouteTypes from '../types/RouteTypes';
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RouteTypes.LOGIN_SCREEN} component={Login} />
      <Stack.Screen
        name={RouteTypes.FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
}
