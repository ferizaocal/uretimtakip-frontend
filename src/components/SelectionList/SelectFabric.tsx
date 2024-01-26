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
import FabricResponse from '../../dto/Response/FabricResponse';
import {getFabrics} from '../../services/FabricService';
interface SelectFabricProps extends SelectionListProps {}
export default function SelectFabric(props: SelectFabricProps) {
  const {goBack} = props;
  const colors = useThemeColors();
  const [loading, setLoading] = useState(true);
  const [fabrics, setFabrics] = useState<Array<FabricResponse>>([]);
  useEffect(() => {
    if (props.isModalOpen) {
      setLoading(true);
      getLoadFabrics();
    }
  }, [props.isModalOpen]);

  const getLoadFabrics = async () => {
    await getFabrics()
      .then(res => {
        setFabrics(res.data.list);
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
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="KUMAŞLAR" />
      </View>
      <Container bgColor="white" mb={30} isLoading={loading}>
        <CustomFlatList
          isSearchable
          searchStyle={{marginBottom: 5}}
          filter={(item: FabricResponse, search: string, index: number) => {
            return (
              item?.brandName?.toLowerCase().includes(search.toLowerCase()) ||
              item?.fabricModel?.toLowerCase().includes(search.toLowerCase())
            );
          }}
          handleRefresh={() => {
            setFabrics([]);
            setLoading(true);
            getLoadFabrics();
          }}
          notFoundText="No fabrics found"
          data={fabrics}
          renderItem={({
            item,
            index,
          }: {
            item: FabricResponse;
            index: number;
          }) => {
            return (
              <FormControl
                onPress={() => {
                  handleSelect(item);
                }}
                key={index}
                label={`${item.brandName} ${item.fabricModel}`}
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
