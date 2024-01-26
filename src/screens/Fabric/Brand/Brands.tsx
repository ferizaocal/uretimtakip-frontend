import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/ScreenHeader';
import {CircleButton} from '../../../components/Buttons/CircleButton';
import {faAngleRight, faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import CustomBottomSheet from '../../../components/BottomSheet/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Buttons/Default';
import {
  addFabricBrand,
  deleteFabricBrand,
  getAllFabricBrands,
  updateFabricBrand,
} from '../../../services/FabricBrandService';
import CreateFabricBrandRequest from '../../../dto/Request/CreateFabricBrandRequest';
import {objectToCheckReturnBoolean} from '../../../utils/Helper';
import FabricBrandWithModelResponse from '../../../dto/Response/FabricBrandWithModelResponse';
import CustomFlatList from '../../../components/Flatlist/CustomFlatList';
import Col from '../../../components/Cols/Col';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../../../constant/useColor';
import RouteTypes from '../../../types/RouteTypes';
import UpdateFabricBrandRequest from '../../../dto/Request/UpdateFabricBrandRequest';
import {deleteFabricModel} from '../../../services/FabricBrandModelService';

export default function Brands(props: any) {
  const colors = useThemeColors();
  var addBottomSheetRef = useRef<BottomSheet>(null);
  var editBottomSheetRef = useRef<BottomSheet>(null);
  const [addBottomSheetShow, setAddBottomSheetShow] = useState(false);
  const [editBottomSheetShow, setEditBottomSheetShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fabricBrands, setFabricBrands] = useState<
    Array<FabricBrandWithModelResponse>
  >([]);
  const [createRequestForm, setCreateRequestForm] = useState(
    {} as CreateFabricBrandRequest,
  );
  const [updateRequestForm, setUpdateRequestForm] = useState(
    {} as UpdateFabricBrandRequest,
  );
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadFabricBrands();
    });
  }, []);

  const loadFabricBrands = async () => {
    await getAllFabricBrands()
      .then(res => {
        setFabricBrands(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const save = async () => {
    await addFabricBrand(createRequestForm)
      .then(res => {
        if (res.data.isSuccessful) {
          setFabricBrands([...fabricBrands, res.data.entity as any]);
        }
      })
      .finally(() => {
        addBottomSheetRef.current?.close();
        setCreateRequestForm({} as CreateFabricBrandRequest);
        setAddBottomSheetShow(false);
      });
  };
  const update = async () => {
    await updateFabricBrand(updateRequestForm).then(res => {
      if (res.data.isSuccessful) {
        let temp = fabricBrands.map(x => {
          if (x.id == updateRequestForm.id) {
            return {
              ...x,
              name: updateRequestForm.name,
            };
          } else {
            return x;
          }
        });
        setFabricBrands(temp);
        Alert.alert('Başarılı', 'Model Güncellendi', [
          {
            text: 'Tamam',
            onPress: () => {
              setUpdateRequestForm({} as UpdateFabricBrandRequest);
              setEditBottomSheetShow(false);
            },
          },
        ]);
      }
    });
  };
  const handleDelete = async () => {
    Alert.alert(
      'Emin misiniz?',
      'Bu markayı silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            await deleteFabricBrand(updateRequestForm.id).then(res => {
              if (res.data.isSuccessful) {
                setUpdateRequestForm({} as UpdateFabricBrandRequest);
                setEditBottomSheetShow(false);
                var temp = fabricBrands.filter(
                  x => x.id != updateRequestForm.id,
                );
                setFabricBrands(temp);
              }
            });
          },
        },
      ],
    );
  };
  const checkForm = () => {
    var json = {
      name: createRequestForm.name,
    };
    return objectToCheckReturnBoolean(json);
  };
  return (
    <Container>
      <Header extraTitle="Marka" />
      <Container isLoading={loading} mx={20} mt={20}>
        <CustomFlatList
          contentContainerStyle={{backgroundColor: '#fff', borderRadius: 7}}
          isSearchable
          filter={(item, searchText) => {
            return item?.name?.toLowerCase().includes(searchText.toLowerCase());
          }}
          data={fabricBrands}
          renderItem={({
            item,
            index,
          }: {
            item: FabricBrandWithModelResponse;
            index: number;
          }) => {
            return (
              <Col
                mb={3}
                onPress={() => {
                  props.navigation.navigate(RouteTypes.FABRIC_MODELS_SCREEN, {
                    id: item.id,
                  });
                }}
                activeOpacity={0.8}
                key={index}
                name={`${item?.name}`}
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setUpdateRequestForm(item);
                      setEditBottomSheetShow(true);
                    }}
                    hitSlop={15}
                    activeOpacity={0.7}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      color={colors.iconColor}
                      size={20}
                    />
                  </TouchableOpacity>
                }
              />
            );
          }}
        />
      </Container>
      <CircleButton
        onPress={() => {
          setAddBottomSheetShow(true);
        }}
        icon={faPlus}
      />
      {addBottomSheetShow && (
        <CustomBottomSheet
          ref={addBottomSheetRef}
          snapPoints={['30%']}
          handleClose={(value: boolean) => {
            setAddBottomSheetShow(value);
          }}
          isOpen={addBottomSheetShow}>
          <Container mx={20} mb={30} bgColor="white">
            <Input
              value={createRequestForm?.name}
              onChangeText={(value: string) => {
                setCreateRequestForm({...createRequestForm, name: value});
              }}
              bottomSheet
              label="Marka"
            />
            <Button
              onPress={save}
              disabled={checkForm()}
              sx={{marginTop: 20}}
              activeOpacity={0.8}
              label={'KAYDET'}></Button>
          </Container>
        </CustomBottomSheet>
      )}
      {editBottomSheetShow && (
        <CustomBottomSheet
          ref={editBottomSheetRef}
          snapPoints={['30%']}
          handleClose={(value: boolean) => {
            setEditBottomSheetShow(value);
          }}
          isOpen={editBottomSheetShow}>
          <Container mx={20} mb={30} bgColor="white">
            <Input
              value={updateRequestForm?.name}
              onChangeText={(value: string) => {
                setUpdateRequestForm({...updateRequestForm, name: value});
              }}
              bottomSheet
              label="Marka"
            />
            <View style={{flexDirection: 'row', columnGap: 10}}>
              <Button
                onPress={update}
                disabled={updateRequestForm?.name?.length < 1}
                sx={{marginTop: 20, flex: 1}}
                activeOpacity={0.8}
                label={'KAYDET'}></Button>
              <Button
                onPress={handleDelete}
                sx={{marginTop: 20, flex: 0.3}}
                activeOpacity={0.8}
                label={'SİL'}></Button>
            </View>
          </Container>
        </CustomBottomSheet>
      )}
    </Container>
  );
}
