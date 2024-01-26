import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/ScreenHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import {getAllCustomers} from '../../services/CustomerService';
import CustomerResponse from '../../dto/Response/CustomerResponse';
import ColBackground from '../../components/Cols/ColBackground';
import Col from '../../components/Cols/Col';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import {CircleButton} from '../../components/Buttons/CircleButton';
import RouteTypes from '../../types/RouteTypes';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import I18n from 'i18n-js';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';

export default function Customers(props: any) {
  const colors = useThemeColors();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([] as CustomerResponse[]);
  const {language} = useSelector((state: AppState) => state.app);
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setLoading(true);
      loadCustomers();
    });
  }, []);
  const loadCustomers = async () => {
    await getAllCustomers()
      .then(res => {
        setCustomers(res.data.list);
      })
      .catch(er => {
        console.log(er, 'hata customer');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container>
      <Header
        extraTitle={I18n.t('drawercontentscreen_customers', {locale: language})}
      />
      <Container mx={20} mt={20} isLoading={loading}>
        <CustomFlatList
          isSearchable
          filter={(item: CustomerResponse, search: string, index: number) => {
            return (
              item.firstName.toLowerCase().includes(search.toLowerCase()) ||
              item.lastName.toLowerCase().includes(search.toLowerCase())
            );
          }}
          data={customers}
          sort={(a: CustomerResponse, b: CustomerResponse) =>
            a.id < b.id ? 1 : -1
          }
          notFoundText="No customer found"
          renderItem={({item, index}: any) => {
            return (
              <Col
                mb={3}
                activeOpacity={0.8}
                key={index}
                name={`${item.firstName} ${item.lastName}`}
              />
            );
          }}
        />
      </Container>
      <CircleButton
        onPress={() => {
          props.navigation.navigate(RouteTypes.ADD_CUSTOMER_SCREEN);
        }}
        icon={faPlus}
      />
    </Container>
  );
}
