import {Image, SafeAreaView, View} from 'react-native';
import React from 'react';
import LoginForm from '../sections/Auth/LoginForm';
import {TextileImage} from '../utils/Data';

export default function Login() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d1dfbb'}}>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={TextileImage} />
      </View>
      <LoginForm />
    </SafeAreaView>
  );
}
