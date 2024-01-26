import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/ScreenHeader';
import Input from '../../components/Input/Input';
import Button from '../../components/Buttons/Default';
import {addProductionCode} from '../../services/ProductionCodeService';

export default function AddProduct(props: any) {
  const [codeName, setCodeName] = useState('');

  const save = async () => {
    await addProductionCode(codeName).then(res => {
      if (res.data.isSuccessful) {
        Alert.alert('Başarılı', 'Ürün kodu başarıyla eklendi.', [
          {text: 'Tamam', onPress: () => props.navigation.goBack()},
        ]);
      } else {
        Alert.alert('Hata', 'Ürün kodu eklenirken bir hata oluştu.');
      }
    });
  };
  return (
    <Container>
      <Header extraTitle="Ürün Kodu Ekle" />
      <Container mx={20} mt={20}>
        <Input
          value={codeName}
          onChangeText={text => setCodeName(text)}
          label="Ürün Kodu"
        />
        <Button
          disabled={codeName.length < 1}
          onPress={() => save()}
          label={'KAYDET'}
          sx={{marginTop: 10}}
        />
      </Container>
    </Container>
  );
}
