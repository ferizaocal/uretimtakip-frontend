import {View, Text} from 'react-native';
import React from 'react';

const ColBackground = (props: {children: React.ReactNode}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 7,
      }}>
      {props.children}
    </View>
  );
};
export default ColBackground;
