import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/ScreenHeader';
import SelectPlaceHolder from '../../components/Placeholder/SelectPlaceHolder';
import Label from '../../components/Text/Label';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../../constant/useColor';
import {
  faHistory,
  faPlusCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import FabricResponse from '../../dto/Response/FabricResponse';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import Input from '../../components/Input/Input';
import Button from '../../components/Buttons/Default';
import CreateFabricHistoryRequest from '../../dto/Request/CreateFabricHistoryRequest';
import {
  addFabricEntry,
  deleteFabricHistory,
  getFabricHistory,
} from '../../services/FabricHistoryService';
import FabricHistoryResponse from '../../dto/Response/FabricHistoryResponse';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import Col from '../../components/Cols/Col';
import dayjs from 'dayjs';
import {deleteFabric} from '../../services/FabricService';

export default function FabricDetail(props: any) {
  const fabric: FabricResponse = props?.route?.params?.item;
  const colors = useThemeColors();

  var addBottomSheetRef = React.useRef<BottomSheet>(null);
  const [addBottomSheetShow, setAddBottomSheetShow] = React.useState(false);
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(true);
  const [histories, setHistories] = useState<Array<FabricHistoryResponse>>([]);
  const [totalQuantity, setTotalQuantity] = useState(fabric.totalQuantity);
  useEffect(() => {
    loadHistories();
  }, [fabric]);
  const loadHistories = async () => {
    await getFabricHistory(fabric.id)
      .then(res => {
        setHistories(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const save = async () => {
    let request: CreateFabricHistoryRequest = {
      fabricId: fabric.id,
      quantity: parseFloat(quantity),
    };
    await addFabricEntry(request).then(async res => {
      if (res.data.isSuccessful) {
        setLoading(false);
        setQuantity('');
        setAddBottomSheetShow(false);
        addBottomSheetRef.current?.close();
        setTotalQuantity(parseFloat(quantity) + totalQuantity);
        await loadHistories();
      } else {
        console.log(res.data);
      }
    });
  };
  const handleDelete = async (id: number, deletedQuantity: any) => {
    await deleteFabricHistory(id).then(res => {
      if (res.data.isSuccessful) {
        setTotalQuantity(totalQuantity - deletedQuantity);
        let temp = histories.filter(item => item.id !== id);
        setHistories(temp);
      }
    });
  };
  const handleDeleteFabricById = async () => {
    await deleteFabric(fabric.id).then(res => {
      if (res.data.isSuccessful) {
        props.navigation.goBack();
      } else {
        Alert.alert('Hata', res?.data?.exceptionMessage || 'Bir hata oluştu');
      }
    });
  };
  return (
    <Container>
      <Header
        extraTitle="Fabric Detail"
        rightIcon={faTrash}
        rightIconPress={() => {
          Alert.alert(
            'Uyarı',
            'Bu işlem geri alınamaz. Silmek istediğinize emin misiniz?',
            [
              {
                text: 'İptal',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Sil',
                onPress: async () => {
                  await handleDeleteFabricById();
                },
              },
            ],
          );
        }}
      />

      <Container mx={20} mt={20}>
        <SelectPlaceHolder
          iconShow={false}
          activeOpacity={1}
          label="Kumaş Adı ve Modeli"
          selectedValue={
            fabric?.brandName && fabric?.fabricModel
              ? `${fabric?.brandName} - ${fabric?.fabricModel}`
              : '-'
          }
        />
        <SelectPlaceHolder
          iconShow={false}
          activeOpacity={1}
          label="Stok Miktarı"
          selectedValue={`${totalQuantity}m`}
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
            label="Stok Geçmişi"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setAddBottomSheetShow(true);
            }}>
            <FontAwesomeIcon
              size={25}
              color={colors.iconColor}
              icon={faPlusCircle}
            />
          </TouchableOpacity>
        </View>
        <Container isLoading={loading}>
          <CustomFlatList
            sort={(a: FabricHistoryResponse, b: FabricHistoryResponse) => {
              return a.id > b.id ? -1 : 1;
            }}
            handleRefresh={async () => {
              setLoading(true);
              await loadHistories();
            }}
            data={histories}
            renderItem={({
              item,
              index,
            }: {
              item: FabricHistoryResponse;
              index: number;
            }) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 10,
                  }}>
                  <Col
                    flex={1}
                    mb={3}
                    onPress={() => {}}
                    activeOpacity={1}
                    key={index}
                    nameColor={item.type === 'IN' ? '#00B761' : '#FF0000'}
                    name={`${item.quantity}m`}
                    icon={
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          columnGap: 10,
                        }}>
                        <Label
                          sx={{
                            color: colors.inputColor,
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}
                          label={dayjs(item.createdDate).format('DD.MM.YYYY')}
                        />
                        <FontAwesomeIcon
                          icon={faHistory}
                          color={colors.iconColor}
                          size={20}
                        />
                      </View>
                    }
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Uyarı',
                        'Bu işlem geri alınamaz. Silmek istediğinize emin misiniz?',
                        [
                          {
                            text: 'İptal',
                            onPress: () => {},
                            style: 'cancel',
                          },
                          {
                            text: 'Sil',
                            onPress: async () => {
                              await handleDelete(item.id, item.quantity);
                            },
                          },
                        ],
                      );
                    }}
                    hitSlop={15}
                    activeOpacity={0.7}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      color={colors.iconColor}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </Container>
      </Container>

      <CustomBottomSheet
        ref={addBottomSheetRef}
        snapPoints={['30%']}
        handleClose={(value: boolean) => {
          setAddBottomSheetShow(value);
        }}
        isOpen={addBottomSheetShow}>
        <Container mx={20} mb={30} bgColor="white">
          <Input
            keyboardType="default"
            bottomSheet
            value={quantity?.toString()}
            onChangeText={value => {
              setQuantity(value);
            }}
            label="Miktar"
          />
          <Button
            onPress={save}
            sx={{marginTop: 20}}
            activeOpacity={0.8}
            label={'KAYDET'}></Button>
        </Container>
      </CustomBottomSheet>
    </Container>
  );
}
