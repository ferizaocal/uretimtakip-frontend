import React, {useEffect, useState} from 'react';
import Button from '../components/Buttons/Default';
import Header from '../components/Header/ScreenHeader';
import Input from '../components/Input/Input';
import Container from '../components/Container/Container';
import I18n from '../lang/_i18n';
import {useSelector} from 'react-redux';
import {AppState} from '../store';
import {getUser, updateUserById} from '../services/UserService';
import {Alert} from 'react-native';

export default function Profile(props: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const {language} = useSelector((state: AppState) => state.app);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadProfile();
    });
  }, []);

  const loadProfile = async () => {
    await getUser().then(res => {
      setFirstName(res.data.entity.firstName);
      setLastName(res.data.entity.lastName);
    });
  };

  return (
    <Container>
      <Header title={'profile'} />
      <Container mx={20} mt={30}>
        <Input
          value={firstName}
          onChangeText={text => {
            setFirstName(text);
          }}
          label={I18n.t('profilescreen_name', {locale: language})}
        />
        <Input
          value={lastName}
          onChangeText={text => {
            setLastName(text);
          }}
          label={I18n.t('profilescreen_surname', {locale: language})}
        />

        <Button
          onPress={async () => {
            await updateUserById({
              id: 0,
              firstName: firstName,
              lastName: lastName,
            }).then(res => {
              if (res.data.isSuccessful) {
                Alert.alert('Başarılı', 'Profiliniz güncellendi.', [
                  {
                    text: 'Tamam',
                    onPress: () => {
                      props.navigation.goBack();
                    },
                  },
                ]);
              }
            });
          }}
          style={{marginBottom: 10}}
          label={I18n.t('profilescreen_button', {locale: language})}
        />
      </Container>
    </Container>
  );
}
