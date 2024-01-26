import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/Drawer/DrawerNavigator';
import {useSelector} from 'react-redux';
import {AppState} from './src/store';
import AuthNavigator from './src/navigation/AuthNavigator';

export default function App() {
  const {user} = useSelector((state: AppState) => state.auth);

  return (
    <NavigationContainer>
      {user != null ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
