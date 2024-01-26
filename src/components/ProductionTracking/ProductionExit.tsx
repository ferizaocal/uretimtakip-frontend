import {View, Text, TouchableOpacity, Alert, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomBottomSheet, {
  CustomBottomSheetProps,
} from '../BottomSheet/CustomBottomSheet';
import Container from '../Container/Container';
import Input from '../Input/Input';
import Button from '../Buttons/Default';
import SelectPlaceHolder from '../Placeholder/SelectPlaceHolder';
import Label from '../../components/Text/Label';
import useThemeColors from '../../constant/useColor';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import SelectUserByOperationNumber from '../SelectionList/SelectUserByOperationNumber';
import CreateProductionTrackingRequest from '../../dto/Request/CreateProductionTrackingRequest';
import UserModelResponse from '../../dto/Response/UserModelResponse';
import {getOperationIcon, objectToCheckReturnBoolean} from '../../utils/Helper';
import SelectProductCode from '../SelectionList/SelectProductCode';
import ProductionCodeResponse from '../../dto/Response/ProductionCodeResponse';
import AgeGroupResponse from '../../dto/Response/AgeGroupResponse';
import SelectAgeGroup from '../SelectionList/SelectAgeGroup';
import SelectFabric from '../SelectionList/SelectFabric';
import FabricResponse from '../../dto/Response/FabricResponse';
import CreateFabricRequest from '../../dto/Request/CreateFabricRequest';
import CreateProductionFabricRequest from '../../dto/Request/CreateProductionFabricRequest';
import CustomFlatList from '../Flatlist/CustomFlatList';
import FormContainer from '../Container/FormContainer';
import SelectImage from '../SelectImage/SelectImage';
import {ImagePickerResponse} from 'react-native-image-picker';
import {addProductionTracking} from '../../services/ProductionTrackingService';
import {AxiosError} from 'axios';

interface ProductionExitProps extends CustomBottomSheetProps {}

const ProductionExit = React.forwardRef(
  (props: ProductionExitProps, ref: any) => {
    const colors = useThemeColors();
    const [usersShow, setUsersShow] = useState(true);
    const [productionExitShow, setProductionExitShow] = useState(false);
    const [productionCodeShow, setProductionCodeShow] = useState(false);
    const [ageGroupShow, setAgeGroupShow] = useState(false);
    const [fabricShow, setFabricShow] = useState(false);

    const [createRequestForm, setCreateRequestForm] = useState(
      {} as CreateProductionTrackingRequest,
    );
    const [selectedUser, setSelectedUser] = useState({} as UserModelResponse);
    const [selectedProductionCode, setSelectedProductionCode] = useState(
      {} as ProductionCodeResponse,
    );
    const [selectedAgeGroup, setSelectedAgeGroup] = useState(
      {} as AgeGroupResponse,
    );
    const [selectedFabric, setSelectedFabric] = useState({} as FabricResponse);
    const [selectedImage, setSelectedImage] = useState<ImagePickerResponse>({});
    useEffect(() => {
      if (props.isOpen) {
        setUsersShow(true);
      }
    }, [props.isOpen]);
    const checkObject = () => {
      var check = {
        userId: createRequestForm.userId === 0 ? false : true,
        productionCodeId:
          createRequestForm.productionCodeId === 0 ? false : true,
        ageGroupId: createRequestForm.ageGroupId === 0 ? false : true,
        fabrics:
          createRequestForm.fabrics != undefined &&
          createRequestForm.fabrics.length === 0
            ? false
            : createRequestForm?.fabrics?.some(
                x => x.quantity === 0 || x.metre === 0,
              )
            ? false
            : true,
      };
      let result = objectToCheckReturnBoolean(check);

      return result;
    };
    const handleChangeForm = (
      key: keyof CreateProductionFabricRequest,
      value: any,
      index: number,
    ) => {
      let temps = createRequestForm.fabrics as any;
      temps[index][key] = value;
      setCreateRequestForm({...createRequestForm, fabrics: temps});
    };
    const save = async () => {
      if (
        createRequestForm.fabrics === undefined ||
        createRequestForm.fabrics.length === 0
      ) {
        Alert.alert('Uyarı', 'Çıkış yapabilmek için kumaş eklemelisiniz');
        return;
      }

      await addProductionTracking(createRequestForm, selectedImage)
        .then(res => {
          if (res.data.isSuccessful) {
            Alert.alert('Başarılı', 'Üretim çıkışı başarıyla kaydedildi', [
              {
                text: 'Tamam',
                onPress: () => {
                  props.handleClose && props.handleClose(false);
                },
              },
            ]);
          } else {
            Alert.alert(
              'Hata',
              res?.data?.exceptionMessage || 'Bir Hata Oluştu.',
            );
          }
        })
        .catch((er: AxiosError) => {
          console.log(er.request, 'hata');
        });
    };
    return (
      <>
        {usersShow && (
          <CustomBottomSheet
            snapPoints={['90%']}
            handleClose={(value: boolean) => {
              props.handleClose && props.handleClose(value);
              setUsersShow(value);
              ref.current?.close();
            }}
            isOpen={usersShow}
            ref={ref}>
            <SelectUserByOperationNumber
              isModalOpen={usersShow}
              operationNumber={1}
              setSelectedItem={item => {
                setSelectedUser(item);
                setCreateRequestForm({
                  ...createRequestForm,
                  userId: item.id,
                });
              }}
              selectedItem={selectedUser}
            />
            <Button
              sx={{marginVertical: 20, marginHorizontal: 10}}
              activeOpacity={0.8}
              onPress={() => {
                setUsersShow(false);
                setProductionExitShow(true);
              }}
              disabled={createRequestForm?.userId ? false : true}
              label={'SEÇİNİZ'}></Button>
          </CustomBottomSheet>
        )}
        {productionExitShow && (
          <CustomBottomSheet
            isOpen={productionExitShow}
            snapPoints={['90%']}
            handleClose={(value: boolean) => {
              setProductionExitShow(value);
            }}>
            <Container mx={20} mb={30} bgColor="white">
              {/* <SelectImage
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              /> */}
              <FormContainer>
                <View
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.borderColor,
                    marginBottom: 15,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {getOperationIcon?.(selectedUser.operationName)}
                  <Label
                    sx={{
                      color: colors.inputColor,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}
                    label={`${selectedUser.firstName} ${selectedUser.lastName}`}
                  />
                </View>
                <Input
                  bottomSheet
                  label="Parti numarası"
                  value={createRequestForm?.partyNumber}
                  onChangeText={text => {
                    setCreateRequestForm({
                      ...createRequestForm,
                      partyNumber: text,
                    });
                  }}
                />
                <SelectPlaceHolder
                  onPress={() => {
                    setProductionCodeShow(true);
                  }}
                  selectedValue={selectedProductionCode?.code}
                  label="Ürün Kodu"
                />
                <SelectPlaceHolder
                  onPress={() => {
                    setAgeGroupShow(true);
                  }}
                  selectedValue={selectedAgeGroup?.age}
                  label="Yaş Grubu"
                />
                <Input
                  bottomSheet
                  label="Açıklama"
                  multiline={true}
                  sx={{height: 100}}
                  value={createRequestForm.description}
                  onChangeText={text => {
                    setCreateRequestForm({
                      ...createRequestForm,
                      description: text,
                    });
                  }}
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
                    label="Kumaşlar"
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setFabricShow(true);
                    }}>
                    <FontAwesomeIcon
                      size={25}
                      color={colors.iconColor}
                      icon={faPlusCircle}
                    />
                  </TouchableOpacity>
                </View>
                {createRequestForm?.fabrics?.map((y, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.borderColor,
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <Label
                          sx={{
                            color: colors.iconColor,
                            fontWeight: 'bold',
                          }}
                          label={`${i + 1}. ${y?.fabric?.brandName} ${
                            y?.fabric?.fabricModel
                          }`}
                        />
                      </View>
                      <View
                        style={{
                          columnGap: 5,
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Input
                          value={y.quantity.toString()}
                          onChangeText={text => {
                            handleChangeForm('quantity', text, i);
                          }}
                          sx={{width: Dimensions.get('screen').width / 2 - 40}}
                          label={`Adet`}
                        />
                        <Input
                          value={y.metre.toString()}
                          onChangeText={text => {
                            handleChangeForm('metre', text, i);
                          }}
                          sx={{width: Dimensions.get('screen').width / 2 - 40}}
                          label={`Metre`}
                        />
                      </View>
                      <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            let temps = [...createRequestForm.fabrics];
                            temps.splice(i, 1);

                            setCreateRequestForm({
                              ...createRequestForm,
                              fabrics: temps,
                            });
                          }}>
                          <FontAwesomeIcon
                            size={18}
                            color={colors.iconColor}
                            icon={faTrash}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </FormContainer>
              <Button
                onPress={save}
                disabled={checkObject()}
                sx={{marginTop: 20}}
                activeOpacity={0.8}
                label={'KAYDET'}></Button>
            </Container>
          </CustomBottomSheet>
        )}
        {productionCodeShow && (
          <CustomBottomSheet
            snapPoints={['90%']}
            handleClose={(value: boolean) => {
              setProductionCodeShow(value);
            }}
            isOpen={productionCodeShow}>
            <SelectProductCode
              selectedItem={selectedProductionCode}
              setSelectedItem={item => {
                setSelectedProductionCode(item);
                setCreateRequestForm({
                  ...createRequestForm,
                  productionCodeId: item.id,
                });
                setProductionCodeShow(false);
              }}
              isModalOpen={productionCodeShow}
              goBack={() => {
                setProductionCodeShow(false);
              }}
            />
          </CustomBottomSheet>
        )}
        {ageGroupShow && (
          <CustomBottomSheet
            snapPoints={['90%']}
            handleClose={(value: boolean) => {
              setAgeGroupShow(value);
            }}
            isOpen={ageGroupShow}>
            <SelectAgeGroup
              selectedItem={selectedAgeGroup}
              setSelectedItem={item => {
                setSelectedAgeGroup(item);
                setCreateRequestForm({
                  ...createRequestForm,
                  ageGroupId: item.id,
                });
                setAgeGroupShow(false);
              }}
              isModalOpen={ageGroupShow}
              goBack={() => {
                setAgeGroupShow(false);
              }}
            />
          </CustomBottomSheet>
        )}
        {fabricShow && (
          <CustomBottomSheet
            snapPoints={['90%']}
            handleClose={(value: boolean) => {
              setFabricShow(value);
            }}
            isOpen={fabricShow}>
            <SelectFabric
              selectedItem={selectedFabric}
              setSelectedItem={item => {
                var check = createRequestForm?.fabrics?.find(
                  c => c.fabricId === item.id,
                );
                if (check) {
                  Alert.alert('Uyarı', 'Bu kumaş zaten mevcut');
                  return;
                }
                setSelectedFabric(item);
                let temp = createRequestForm?.fabrics;
                if (createRequestForm.fabrics === undefined) {
                  temp = [];
                }
                let fabricData: CreateProductionFabricRequest = {
                  fabricId: item.id,
                  quantity: 0,
                  metre: 0,
                  fabric: item,
                };
                temp.push(fabricData);
                setCreateRequestForm({...createRequestForm, fabrics: temp});
                setFabricShow(false);
                setSelectedFabric({} as FabricResponse);
              }}
              isModalOpen={fabricShow}
              goBack={() => {
                setFabricShow(false);
              }}
            />
          </CustomBottomSheet>
        )}
      </>
    );
  },
);
export default ProductionExit;
