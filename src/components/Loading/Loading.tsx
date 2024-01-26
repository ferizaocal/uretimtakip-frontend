import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
      }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
