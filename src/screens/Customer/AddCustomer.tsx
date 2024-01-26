import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/ScreenHeader';
import Input from '../../components/Input/Input';
import Button from '../../components/Buttons/Default';
import CreateCustomerRequest from '../../dto/Request/CreateCustomerRequest';
import FormContainer from '../../components/Container/FormContainer';
import {ValidationFields, objectToCheckReturnBoolean} from '../../utils/Helper';
import {addCustomer} from '../../services/CustomerService';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import I18n from 'i18n-js';

export default function AddCustomer(props: any) {
  const {language} = useSelector((state: AppState) => state.app);
  const [createRequestForm, setCreateRequestForm] = useState(
    {} as CreateCustomerRequest,
  );

  const handleChangeCreateRequestForm = (
    key: keyof CreateCustomerRequest,
    value: any,
  ) => {
    setCreateRequestForm({
      ...createRequestForm,
      [key]: value,
    });
  };
  const save = async () => {
    await addCustomer(createRequestForm)
      .then(res => {
        if (res.data.isSuccessful) {
          Alert.alert('Başarılı', 'Müşteri başarıyla eklendi', [
            {text: 'Tamam', onPress: () => props.navigation.goBack()},
          ]);
        } else {
          Alert.alert(
            'Hata',
            res.data?.exceptionMessage || 'Müşteri eklenemedi.',
            [{text: 'Tamam'}],
          );
        }
      })
      .catch(er => {
        console.log(er, 'Hata');
      });
  };
  const checkForm = () => {
    var checkForm = objectToCheckReturnBoolean({
      ...createRequestForm,
      email: ValidationFields.email.regex.test(createRequestForm.email)
        ? true
        : false,
    });
    return checkForm;
  };

  return (
    <Container>
      <Header extraTitle={I18n.t('add_customers', {locale: language})} />
      <Container mx={20} mt={30}>
        <FormContainer>
          <Input
            value={createRequestForm.firstName}
            onChangeText={text => {
              handleChangeCreateRequestForm('firstName', text);
            }}
            label={'Ad'}
          />
          <Input
            value={createRequestForm.lastName}
            onChangeText={text => {
              handleChangeCreateRequestForm('lastName', text);
            }}
            label={'Soyad'}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            value={createRequestForm.email}
            onChangeText={text => {
              handleChangeCreateRequestForm('email', text);
            }}
            label={'Eposta'}
          />
          <Input
            value={createRequestForm.phone}
            onChangeText={text => {
              handleChangeCreateRequestForm('phone', text);
            }}
            label={'Telefon'}
          />
          <Input
            value={createRequestForm.address}
            onChangeText={text => {
              handleChangeCreateRequestForm('address', text);
            }}
            label={'Adress'}
          />
          <Input
            value={createRequestForm.distrinct}
            onChangeText={text => {
              handleChangeCreateRequestForm('distrinct', text);
            }}
            label={'İlçe'}
          />
          <Input
            value={createRequestForm.city}
            onChangeText={text => {
              handleChangeCreateRequestForm('city', text);
            }}
            label={'Şehir'}
          />
          <Input
            value={createRequestForm.postalCode}
            onChangeText={text => {
              handleChangeCreateRequestForm('postalCode', text);
            }}
            label={'Posta Kodu'}
          />
          <Input
            value={createRequestForm.country}
            onChangeText={text => {
              handleChangeCreateRequestForm('country', text);
            }}
            label={'Ülke'}
          />
        </FormContainer>
      </Container>
      <Container flex={0.12} mx={20}>
        <Button
          disabled={checkForm()}
          onPress={save}
          activeOpacity={0.8}
          label={'KAYDET'}
        />
      </Container>
    </Container>
  );
}
