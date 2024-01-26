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
import {
  deleteProductionCode,
  getProductionCodeHistoryById,
} from '../../services/ProductionCodeService';
import ProductionCodeResponse from '../../dto/Response/ProductionCodeResponse';
import ProductionCodeHistory from '../../dto/Response/ProductionCodeHistory';

export default function ProductionDetail(props: any) {
  const productionCode: ProductionCodeResponse = props?.route?.params?.item;
  const colors = useThemeColors();

  const [loading, setLoading] = useState(true);
  const [histories, setHistories] = useState<Array<ProductionCodeHistory>>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    loadHistories();
  }, [productionCode]);
  const loadHistories = async () => {
    await getProductionCodeHistoryById(productionCode.id)
      .then(res => {
        setHistories(res.data.list);
        setTotalQuantity(
          res?.data?.list?.reduce((a, b) => a + (b?.quantity || 0), 0),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteFabricById = async () => {
    await deleteProductionCode(productionCode.id).then(res => {
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
        extraTitle="Products"
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
                  await props.navigation.goBack();
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
          label="Ürün Kodu"
          selectedValue={productionCode?.code ? productionCode?.code : '-'}
        />
        <SelectPlaceHolder
          iconShow={false}
          activeOpacity={1}
          label="Stok Miktarı"
          selectedValue={`${totalQuantity}`}
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
                    name={`${item.quantity}`}
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
                </View>
              );
            }}
          />
        </Container>
      </Container>
    </Container>
  );
}
