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
import {
  getFindAllByUserOperationNumberAndProductionModelId,
  getUserByOperationNumber,
} from '../../services/UserService';
import UserModelResponse from '../../dto/Response/UserModelResponse';
interface SelectCustomerProps extends SelectionListProps {
  operationNumber: number;
  productionModel?: number;
  iconShow?: boolean;
}
export default function SelectUserByOperationNumber(
  props: SelectCustomerProps,
) {
  const {goBack} = props;
  const colors = useThemeColors();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Array<UserModelResponse>>([]);
  useEffect(() => {
    if (props.isModalOpen) {
      setLoading(true);
      if (props.productionModel) {
        getLoadUsersByProductionModelId();
      } else {
        getLoadUsers();
      }
    }
  }, [props.isModalOpen]);

  const getLoadUsers = async () => {
    await getUserByOperationNumber(props.operationNumber)
      .then(res => {
        setUsers(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getLoadUsersByProductionModelId = async () => {
    await getFindAllByUserOperationNumberAndProductionModelId(
      props.operationNumber,
      Number(props.productionModel),
    )
      .then(res => {
        setUsers(res.data.list);
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
        {props.iconShow && (
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
        )}
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="Kullanıcı" />
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
            setUsers([]);
            setLoading(true);
            getLoadUsers();
          }}
          notFoundText="No user found"
          data={users}
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
