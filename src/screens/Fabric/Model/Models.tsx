import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/ScreenHeader';
import CreateFabricModelRequest from '../../../dto/Request/CreateFabricModelRequest';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CustomBottomSheet from '../../../components/BottomSheet/CustomBottomSheet';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Buttons/Default';
import {objectToCheckReturnBoolean} from '../../../utils/Helper';
import {faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import {CircleButton} from '../../../components/Buttons/CircleButton';
import {
  addFabricModel,
  deleteFabricModel,
  getFabricModelsByBrandId,
  updateFabricModel,
} from '../../../services/FabricBrandModelService';
import CustomFlatList from '../../../components/Flatlist/CustomFlatList';
import FabricModelResponse from '../../../dto/Response/FabricModelResponse';
import Col from '../../../components/Cols/Col';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../../../constant/useColor';
import UpdateFabricModelRequest from '../../../dto/Request/UpdateFabricModelRequest';

export default function Models(props: any) {
  const colors = useThemeColors();
  var addBottomSheetRef = useRef<BottomSheet>(null);
  var editBottomSheetRef = useRef<BottomSheet>(null);
  const [loading, setLoading] = useState(true);
  const [addBottomSheetShow, setAddBottomSheetShow] = useState(false);
  const [editBottomSheetShow, setEditBottomSheetShow] = useState(false);
  const [createRequestForm, setCreateRequestForm] = useState({
    fabricBrandId: props.route.params.id,
  } as CreateFabricModelRequest);
  const [updateRequestForm, setUpdateRequestForm] = useState(
    {} as UpdateFabricModelRequest,
  );
  const [fabricModels, setFabricModels] = useState([] as FabricModelResponse[]);
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadFabricModels();
    });
  }, []);

  const loadFabricModels = async () => {
    await getFabricModelsByBrandId(props.route.params.id)
      .then(res => {
        setFabricModels(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const save = async () => {
    await addFabricModel(createRequestForm).then(res => {
      if (res.data.isSuccessful) {
        props.navigation.goBack();
      }
    });
  };
  const checkForm = () => {
    var json = {
      name: createRequestForm.name,
    };
    return objectToCheckReturnBoolean(json);
  };
  const update = async () => {
    await updateFabricModel(updateRequestForm).then(res => {
      if (res.data.isSuccessful) {
        let temp = fabricModels.map(x => {
          if (x.id == updateRequestForm.id) {
            return {
              ...x,
              name: updateRequestForm.name,
            };
          } else {
            return x;
          }
        });
        setFabricModels(temp);
        Alert.alert('Başarılı', 'Model Güncellendi', [
          {
            text: 'Tamam',
            onPress: () => {
              setUpdateRequestForm({} as UpdateFabricModelRequest);
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
      'Bu modeli silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            await deleteFabricModel(updateRequestForm.id).then(res => {
              if (res.data.isSuccessful) {
                setUpdateRequestForm({} as UpdateFabricModelRequest);
                setEditBottomSheetShow(false);
                var temp = fabricModels.filter(
                  x => x.id != updateRequestForm.id,
                );
                setFabricModels(temp);
              }
            });
          },
        },
      ],
    );
  };
  return (
    <Container>
      <Header extraTitle="Model" />
      <Container mx={20} mt={20} isLoading={loading}>
        <CustomFlatList
          contentContainerStyle={{backgroundColor: '#fff', borderRadius: 7}}
          isSearchable
          filter={(item, searchText) => {
            return item?.name?.toLowerCase().includes(searchText.toLowerCase());
          }}
          data={fabricModels}
          renderItem={({
            item,
            index,
          }: {
            item: FabricModelResponse;
            index: number;
          }) => {
            return (
              <Col
                mb={3}
                onPress={() => {
                  setUpdateRequestForm(item);
                  setEditBottomSheetShow(true);
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
              value={createRequestForm.name}
              onChangeText={(value: string) => {
                setCreateRequestForm({...createRequestForm, name: value});
              }}
              bottomSheet
              label="Model"
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
              value={updateRequestForm.name}
              onChangeText={(value: string) => {
                setUpdateRequestForm({...updateRequestForm, name: value});
              }}
              bottomSheet
              label="Model"
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
