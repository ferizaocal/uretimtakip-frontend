import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function FormContainer(props: {children: React.ReactNode}) {
  return (
    <KeyboardAwareScrollView
      extraHeight={130}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{flex: 1}}>
      {props.children}
    </KeyboardAwareScrollView>
  );
}
