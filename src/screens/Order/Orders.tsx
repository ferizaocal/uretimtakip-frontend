import React, {useEffect, useRef, useState} from 'react';
import {faAngleLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../../components/SearchBar/SearchBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import {CircleButton} from '../../components/Buttons/CircleButton';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import Header from '../../components/Header/ScreenHeader';
import Container from '../../components/Container/Container';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import SelectPlaceHolder from '../../components/Placeholder/SelectPlaceHolder';
import Input from '../../components/Input/Input';
import Button from '../../components/Buttons/Default';
import FormControl from '../../components/FormControl/FormControl';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Label from '../../components/Text/Label';
import useThemeColors from '../../constant/useColor';
import RouteTypes from '../../types/RouteTypes';
import {OrderResponse} from '../../dto/Response/OrderResponse';
import {deleteOrderById, getOrders} from '../../services/OrderService';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';

export default function Orders(props: any) {
  var addRef = useRef<BottomSheet>(null);
  const [contentType, setContentType] = useState<
    'ADD' | 'CUSTOMER' | 'PRODUCT_CODE' | 'AGE_GROUP'
  >('ADD');

  const [addBottomSheetShow, setAddBottomSheetShow] = useState(false);

  const [orders, setOrders] = useState([] as OrderResponse[]);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadOrders();
    });
  }, []);
  const loadOrders = async () => {
    await getOrders().then(res => {
      setOrders(res.data.list);
    });
  };
  return (
    <Container>
      <Header title="orders" />
      <Container mx={20} mt={20}>
        <CustomFlatList
          isSearchable
          filter={(item: OrderResponse, text: string) => {
            return (
              item.productionCode.toLowerCase().includes(text.toLowerCase()) ||
              item.customerFirstName
                .toLowerCase()
                .includes(text.toLowerCase()) ||
              item.id.toString().includes(text.toLowerCase()) ||
              item.customerLastName.toLowerCase().includes(text.toLowerCase())
            );
          }}
          sort={(a: OrderResponse, b: OrderResponse) => {
            return b.id - a.id;
          }}
          handleRefresh={async () => {
            setOrders([]);
            await loadOrders();
          }}
          data={orders}
          renderItem={({item}: {item: OrderResponse}) => {
            return (
              <OrderCard
                handleDeletePress={async (id: number) => {
                  await deleteOrderById(id).then(res => {
                    console.log(res.data);
                    loadOrders();
                  });
                }}
                item={item}
                width="100%"
              />
            );
          }}
        />
      </Container>
      <CircleButton
        onPress={() => {
          props.navigation.navigate(RouteTypes.ADD_ORDERS_SCREEN);
        }}
        icon={faPlus}
      />
      <CustomBottomSheet
        ref={addRef}
        snapPoints={contentType === 'ADD' ? ['70%'] : ['90%']}
        handleClose={(value: boolean) => {
          setContentType('ADD');
          setAddBottomSheetShow(value);
        }}
        isOpen={addBottomSheetShow}>
        {contentType === 'ADD' && (
          <View style={styles.container}>
            <SelectPlaceHolder
              onPress={() => {
                setContentType('CUSTOMER');
              }}
              selectedValue={'Seçiniz'}
              label="Müşteri"
            />
            <SelectPlaceHolder
              onPress={() => {
                setContentType('PRODUCT_CODE');
              }}
              selectedValue={'Seçiniz'}
              label="Ürün Kodu"
            />
            <SelectPlaceHolder
              onPress={() => {
                setContentType('AGE_GROUP');
              }}
              selectedValue={'Seçiniz'}
              label="Yaş Grubu"
            />

            <Input label="Miktar" bottomSheet />
            <Button label="Kaydet" sx={{marginTop: 20}} />
          </View>
        )}
        {contentType === 'CUSTOMER' && (
          <SelectCustomer
            goBack={() => {
              setContentType('ADD');
            }}
          />
        )}
        {contentType === 'PRODUCT_CODE' && (
          <SelectProductCode
            goBack={() => {
              setContentType('ADD');
            }}
          />
        )}
        {contentType === 'AGE_GROUP' && (
          <SelectAgeGroup
            goBack={() => {
              setContentType('ADD');
            }}
          />
        )}
      </CustomBottomSheet>
    </Container>
  );
}
const SelectCustomer = (props: {goBack: () => void}) => {
  const colors = useThemeColors();

  const {goBack} = props;

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
    </Container>
  );
};
const SelectProductCode = (props: {goBack: () => void}) => {
  const colors = useThemeColors();

  const {goBack} = props;

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
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="ÜRÜN KODU" />
      </View>
    </Container>
  );
};
const SelectAgeGroup = (props: {goBack: () => void}) => {
  const colors = useThemeColors();

  const {goBack} = props;

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
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="YAŞ GRUBU" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  popoverHeader: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginTop: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
  },
});
