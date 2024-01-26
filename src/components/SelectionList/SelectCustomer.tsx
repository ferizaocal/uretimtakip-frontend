import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Container/Container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Label from '../Text/Label';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import SelectionListProps from './SelectionListProps';
import {getAllCustomers} from '../../services/CustomerService';
import FormControl from '../FormControl/FormControl';
import RadioButton from '../RadioButton/RadioButton';
import CustomerResponse from '../../dto/Response/CustomerResponse';
import CustomFlatList from '../Flatlist/CustomFlatList';
interface SelectCustomerProps extends SelectionListProps {}
export default function SelectCustomer(props: SelectCustomerProps) {
  const {goBack} = props;
  const colors = useThemeColors();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Array<CustomerResponse>>([]);
  useEffect(() => {
    if (props.isModalOpen) {
      setLoading(true);
      getLoadCustomers();
    }
  }, [props.isModalOpen]);

  const getLoadCustomers = async () => {
    await getAllCustomers()
      .then(res => {
        setCustomers(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSelect = (item: any) => {
    props.setSelectedItem?.(item);
  };
  return (
    <Container mx={10} bgColor="#fff">
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
          }}
          hitSlop={20}
          onPress={goBack}>
          <FontAwesomeIcon
            color={colors.iconColor}
            icon={faAngleLeft}
            size={28}
          />
        </TouchableOpacity>
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="MÜŞTERİLER" />
      </View>
      <Container bgColor="white" mb={30} isLoading={loading}>
        <CustomFlatList
          isSearchable
          searchStyle={{marginBottom: 5}}
          filter={(item: CustomerResponse, search: string, index: number) => {
            return (
              item.firstName.toLowerCase().includes(search.toLowerCase()) ||
              item.lastName.toLowerCase().includes(search.toLowerCase())
            );
          }}
          handleRefresh={() => {
            setCustomers([]);
            setLoading(true);
            getLoadCustomers();
          }}
          notFoundText="No customer found"
          data={customers}
          renderItem={({item, index}: any) => {
            return (
              <FormControl
                onPress={() => {
                  handleSelect(item);
                }}
                key={index}
                label={`${item.firstName} ${item.lastName}`}
                component={
                  <RadioButton
                    checked={props?.selectedItem?.id === item.id}
                    onPress={() => {
                      handleSelect(item);
                    }}
                  />
                }
              />
            );
          }}
        />
      </Container>
    </Container>
  );
}
