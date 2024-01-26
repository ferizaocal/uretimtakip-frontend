import React from 'react';

import StackNavigaton from './StackNavigator';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';

export default function DrawerNavigator() {
  return <StackNavigaton />;
}
