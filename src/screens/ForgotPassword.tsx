import React from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import ForgotPasswordForm from '../sections/Auth/ForgotPasswordForm';
import {TextileImage} from '../utils/Data';

export default function ForgotPassword() {
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
      <ForgotPasswordForm />
    </SafeAreaView>
  );
}
