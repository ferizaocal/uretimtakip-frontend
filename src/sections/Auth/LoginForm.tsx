import {View, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import LoginInput from '../../components/LoginInput/LoginInput';

import Label from '../../components/Text/Label';
import EmailSvg from '../../svg/EmailSvg';
import PasswordSvg from '../../svg/PasswordSvg';
import Button from '../../components/Buttons/Default';
import I18n from '../../lang/_i18n';
import {useNavigation} from '@react-navigation/native';
import {goNavigate} from '../../utils/Helper';
import RouteTypes from '../../types/RouteTypes';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import {postLogin} from '../../services/UserService';
import {AuthActions} from '../../store/slice/authSlice';
import {AppActions} from '../../store/slice/appSlice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const {language} = useSelector((state: AppState) => state.app);
  const navigation = useNavigation();
  const [email, setEmail] = useState('ferizaocal60@gmail.com');
  const [password, setPassword] = useState('admin');
  const handleLogin = async () => {
    await postLogin(email, password)
      .then(res => {
        if (res.data.isSuccessful) {
          dispatch(AppActions.setProduction({}));
          dispatch(AuthActions.setUser(res.data.entity));
        } else {
          Alert.alert('Hata', 'Kullanıcı adı veya şifre hatalı');
        }
      })
      .catch(er => {
        Alert.alert('Hata', 'Kullanıcı adı veya şifre hatalı');
      });
  };
  return (
    <View
      style={{
        backgroundColor: '#f0ebe5',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'absolute',
        width: '100%',
        height: '60%',
        bottom: 0,
      }}>
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <Label
          font="Raleway-Bold"
          sx={{fontSize: 24, marginTop: 10, marginBottom: 30}}
          label={I18n.t('loginscreen_title', {locale: language})}
        />
        <LoginInput
          autoCapitalize="none"
          value={email}
          onChangeText={(text: string) => {
            setEmail(text);
          }}
          autoCorrect={false}
          svg={<EmailSvg />}
          sx={{marginBottom: 30}}
          title={I18n.t('loginscreen_email', {locale: language})}
        />
        <LoginInput
          value={password}
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry={true}
          svg={<PasswordSvg />}
          title={I18n.t('loginscreen_password', {locale: language})}
        />
        {/* <TouchableOpacity
          onPress={() => {
            goNavigate(navigation, RouteTypes.FORGOT_PASSWORD_SCREEN);
          }}
          style={{marginTop: 10}}>
          <Label
            font="Raleway-SemiBold"
            sx={{fontSize: 15, color: '#87575c'}}
            label={I18n.t('loginscreen_forgotpassword', {locale: language})}
          />
        </TouchableOpacity> */}
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={() => {
              handleLogin();
            }}
            activeOpacity={0.8}
            sx={{marginTop: 30, width: '50%'}}>
            <Label
              font="Raleway-SemiBold"
              sx={{fontSize: 15, color: 'white'}}
              label={I18n.t('loginscreen_button', {locale: language})}
            />
          </Button>
        </View>
      </View>
    </View>
  );
}
