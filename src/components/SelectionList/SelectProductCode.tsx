import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Container/Container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Label from '../Text/Label';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import SelectionListProps from './SelectionListProps';
import {getAllProductionCodes} from '../../services/ProductionCodeService';
import ProductionCodeResponse from '../../dto/Response/ProductionCodeResponse';
import CustomFlatList from '../Flatlist/CustomFlatList';
import FormControl from '../FormControl/FormControl';
import RadioButton from '../RadioButton/RadioButton';
interface SelectProductCodeProps extends SelectionListProps {}
export default function SelectProductCode(props: SelectProductCodeProps) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([] as ProductionCodeResponse[]);
  const {goBack} = props;
  const colors = useThemeColors();
  useEffect(() => {
    if (props.isModalOpen) {
      setLoading(true);
      loadProductionCodes();
    }
  }, [props.isModalOpen]);
  const loadProductionCodes = async () => {
    await getAllProductionCodes()
      .then(res => {
        if (res.data.isSuccessful) {
          setProducts(res.data.list);
        }
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
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="Ürün Kodları" />
      </View>
      <Container bgColor="white" mb={30} isLoading={loading}>
        <CustomFlatList
          isSearchable
          searchStyle={{marginBottom: 5}}
          filter={(
            item: ProductionCodeResponse,
            search: string,
            index: number,
          ) => {
            return item.code.toLowerCase().includes(search.toLowerCase());
          }}
          handleRefresh={() => {
            setProducts([]);
            setLoading(true);
            loadProductionCodes();
          }}
          notFoundText="No customer found"
          data={products}
          renderItem={({item, index}: any) => {
            return (
              <FormControl
                onPress={() => {
                  handleSelect(item);
                }}
                key={index}
                label={`${item.code}`}
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
