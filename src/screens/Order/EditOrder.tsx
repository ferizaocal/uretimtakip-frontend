import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/ScreenHeader';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import SelectPlaceHolder from '../../components/Placeholder/SelectPlaceHolder';
import Input from '../../components/Input/Input';
import Button from '../../components/Buttons/Default';
import SelectCustomer from '../../components/SelectionList/SelectCustomer';
import SelectProductCode from '../../components/SelectionList/SelectProductCode';
import SelectAgeGroup from '../../components/SelectionList/SelectAgeGroup';
import Label from '../../components/Text/Label';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import FormContainer from '../../components/Container/FormContainer';
import CustomerResponse from '../../dto/Response/CustomerResponse';
import ProductionCodeResponse from '../../dto/Response/ProductionCodeResponse';
import CreateOrderRequest from '../../dto/Request/CreateOrderRequest';
import CreateOrderItemRequest from '../../dto/Request/CreateOrderItemRequest';
import {objectToCheckReturnBoolean} from '../../utils/Helper';
import {addOrder} from '../../services/OrderService';

export default function EditOrder(props: any) {
  const colors = useThemeColors();
  var addRef = useRef<BottomSheet>(null);
  const [contentType, setContentType] = useState<
    'CUSTOMER' | 'PRODUCT_CODE' | 'AGE_GROUP'
  >('CUSTOMER');
  const [addBottomSheetShow, setAddBottomSheetShow] = useState(false);

  const [selectedOrderItemIndex, setSelectedOrderItemIndex] = useState(0);
  const [selectedProductionCode, setSelectedProductionCode] = useState(
    {} as ProductionCodeResponse,
  );
  const [selectedCustomer, setSelectedCustomer] = useState(
    {} as CustomerResponse,
  );
  const [createOrderRequest, setCreateOrderRequest] =
    useState<CreateOrderRequest>({
      customerId: 0,
      productionCodeId: 0,
      orderItems: [] as CreateOrderItemRequest[],
    });

  const requestFormCheck = () => {
    var checkJson = {
      customerId: createOrderRequest.customerId === 0 ? false : true,
      productionCodeId:
        createOrderRequest.productionCodeId === 0 ? false : true,
      orderItems:
        createOrderRequest.orderItems.length === 0 ||
        createOrderRequest.orderItems.filter(
          x => x.ageGroupId === 0 || x.quantity === 0,
        ).length > 0
          ? false
          : true,
    };
    return objectToCheckReturnBoolean(checkJson);
  };
  const save = async () => {
    await addOrder(createOrderRequest).then(x => {
      if (x.data.isSuccessful) {
        Alert.alert('Başarılı', 'Sipariş başarıyla eklendi.', [
          {text: 'Tamam', onPress: () => props.navigation.goBack()},
        ]);
      } else {
        Alert.alert('Hata', x?.data?.exceptionMessage || 'Bir hata oluştu.');
      }
    });
  };
  return (
    <Container>
      <Header
        extraTitle="Sipariş Düzenle"
        rightIcon={faTrash}
        rightIconPress={() => {
          Alert.alert(
            'Sipariş Sil',
            'Siparişi silmek istediğinize emin misiniz?',
            [
              {text: 'İptal', onPress: () => {}},
              {text: 'Sil', onPress: () => {}},
            ],
          );
        }}
      />
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FormContainer>
            <View
              style={{
                flex: 1,
                padding: 20,
                borderRadius: 10,
              }}>
              <SelectPlaceHolder
                onPress={() => {
                  setAddBottomSheetShow(true);
                  setContentType('CUSTOMER');
                }}
                selectedValue={
                  selectedCustomer?.firstName && selectedCustomer?.lastName
                    ? `${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`
                    : 'Seçiniz'
                }
                label="Müşteri"
              />
              <SelectPlaceHolder
                onPress={() => {
                  setAddBottomSheetShow(true);
                  setContentType('PRODUCT_CODE');
                }}
                selectedValue={
                  selectedProductionCode?.code
                    ? selectedProductionCode?.code
                    : 'Seçiniz'
                }
                label="Ürün Kodu"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomWidth: 2,
                  paddingBottom: 10,
                  marginBottom: 10,
                }}>
                <Label
                  font="Raleway-Bold"
                  sx={{
                    fontSize: 15,
                    color: '#868686',
                  }}
                  label="Yaş Grubu"
                />
                <TouchableOpacity
                  onPress={() => {
                    let temp = [...createOrderRequest.orderItems];
                    temp.push({
                      ageGroupId: 0,
                      description: '',
                      quantity: 0,
                    });
                    setCreateOrderRequest({
                      ...createOrderRequest,
                      orderItems: temp,
                    });
                  }}
                  activeOpacity={0.7}>
                  <FontAwesomeIcon
                    size={25}
                    color={colors.iconColor}
                    icon={faPlusCircle}
                  />
                </TouchableOpacity>
              </View>
              {createOrderRequest.orderItems?.map((x, index) => {
                return (
                  <View
                    style={{
                      borderWidth: 1.5,
                      marginBottom: 10,
                      padding: 10,
                      borderRadius: 10,
                      borderColor: '#87575c',
                    }}
                    key={index}>
                    <SelectPlaceHolder
                      onPress={() => {
                        setSelectedOrderItemIndex(index);
                        setAddBottomSheetShow(true);
                        setContentType('AGE_GROUP');
                      }}
                      selectedValue={x?.age?.age || 'Seçiniz'}
                      label={`${index + 1}. Yaş Grubu`}
                    />

                    <Input
                      keyboardType="number-pad"
                      onChangeText={e => {
                        let temp = [...createOrderRequest.orderItems];
                        temp[index].quantity = e.length === 0 ? 0 : parseInt(e);
                        setCreateOrderRequest({
                          ...createOrderRequest,
                          orderItems: temp,
                        });
                      }}
                      value={x?.quantity?.toString()}
                      label="Miktar"
                    />
                    <Input
                      sx={{height: 100, verticalAlign: 'top'}}
                      label="Açıklama"
                      value={x?.description}
                      onChangeText={e => {
                        let temp = [...createOrderRequest.orderItems];
                        temp[index].description = e;
                        setCreateOrderRequest({
                          ...createOrderRequest,
                          orderItems: temp,
                        });
                      }}
                      multiline={true}
                    />
                    <View
                      style={{
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          let temp = [...createOrderRequest.orderItems];
                          temp.splice(index, 1);
                          setCreateOrderRequest({
                            ...createOrderRequest,
                            orderItems: temp,
                          });
                        }}>
                        <FontAwesomeIcon
                          color={colors.iconColor}
                          icon={faTrash}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </FormContainer>
        </View>
        <View style={{flex: 0.15, marginHorizontal: 20}}>
          <Button
            onPress={save}
            disabled={requestFormCheck()}
            label="Kaydet"
            sx={{marginTop: 20}}
          />
        </View>
      </View>
      <CustomBottomSheet
        ref={addRef}
        snapPoints={['90%']}
        handleClose={(value: boolean) => {
          setAddBottomSheetShow(value);
        }}
        isOpen={addBottomSheetShow}>
        {contentType === 'CUSTOMER' && (
          <SelectCustomer
            isModalOpen={addBottomSheetShow}
            setSelectedItem={item => {
              setSelectedCustomer(item);
              setCreateOrderRequest({
                ...createOrderRequest,
                customerId: item.id,
              });
              addRef.current?.close();
              setAddBottomSheetShow(false);
            }}
            selectedItem={selectedCustomer}
            goBack={() => {
              addRef.current?.close();
              setAddBottomSheetShow(false);
            }}
          />
        )}
        {contentType === 'PRODUCT_CODE' && (
          <SelectProductCode
            setSelectedItem={item => {
              setSelectedProductionCode(item);
              setCreateOrderRequest({
                ...createOrderRequest,
                productionCodeId: item.id,
              });
              addRef.current?.close();
              setAddBottomSheetShow(false);
            }}
            selectedItem={selectedProductionCode}
            isModalOpen={addBottomSheetShow}
            goBack={() => {
              addRef.current?.close();
              setAddBottomSheetShow(false);
            }}
          />
        )}

        {contentType === 'AGE_GROUP' && (
          <SelectAgeGroup
            isModalOpen={addBottomSheetShow}
            setSelectedItem={item => {
              let temp = [...createOrderRequest.orderItems];
              temp[selectedOrderItemIndex].ageGroupId = item.id;
              temp[selectedOrderItemIndex].age = item;
              setCreateOrderRequest({
                ...createOrderRequest,
                orderItems: temp,
              });
              addRef.current?.close();
              setAddBottomSheetShow(false);
            }}
            selectedItem={
              createOrderRequest.orderItems[selectedOrderItemIndex].age
            }
            goBack={() => {
              addRef.current?.close();
              setAddBottomSheetShow(false);
            }}
          />
        )}
      </CustomBottomSheet>
    </Container>
  );
}
