import React from 'react';
import Container from '../components/Container/Container';

import Input from '../components/Input/Input';
import Button from '../components/Buttons/Default';
import Header from '../components/Header/ScreenHeader';
import {useSelector} from 'react-redux';
import {AppState} from '../store';
import I18n from '../lang/_i18n';

export default function UpdatePassword() {
  const {language} = useSelector((state: AppState) => state.app);
  return (
    <Container>
      <Header extraTitle={I18n.t('updatepassword_title', {locale: language})} />
      <Container mx={20} mt={30}>
        <Input
          label={I18n.t('currentpassword_title', {locale: language})}
          secureTextEntry={true}
        />
        <Input
          label={I18n.t('newpassword_title', {locale: language})}
          secureTextEntry={true}
        />
        <Button
          style={{marginBottom: 10}}
          label={I18n.t('updatepasswordscreen_button', {locale: language})}
        />
      </Container>
    </Container>
  );
}
