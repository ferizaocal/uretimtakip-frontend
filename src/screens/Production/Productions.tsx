import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

import ColBackground from '../../components/Cols/ColBackground';
import Col from '../../components/Cols/Col';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import {CircleButton} from '../../components/Buttons/CircleButton';
import {ClothesButton} from '../../components/Buttons/ClothesButton';
import {AppState} from '../../store';

import {Clothes, getFindIconByName} from '../../utils/Data';
import Button from '../../components/Buttons/Default';
import {
  createProductionModel,
  deleteProductionModel,
  getAllProductionModels,
  updateProductModelStatusById,
} from '../../services/ProductionModelService';
import ProductionModelResponse from '../../dto/Response/ProductionModelResponse';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/ScreenHeader';
import useThemeColors from '../../constant/useColor';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';

export default function Productions(props: any) {
  var addBottomSheetRef = useRef<BottomSheet>(null);
  const colors = useThemeColors();
  const {user} = useSelector((state: AppState) => state.auth);
  const [addBottomSheetShow, setAddBottomSheetShow] = useState(false);
  const [productions, setProductions] = useState<
    Array<ProductionModelResponse>
  >([]);
  const [selectedProduction, setSelectedProduction] = useState({
    name: '',
    iconName: '',
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setLoading(true);
      loadProductions();
    });
  }, []);

  const saveProduction = async () => {
    await createProductionModel({
      name: selectedProduction.name,
      icon: selectedProduction.iconName,
    })
      .then(async res => {
        if (res.data.isSuccessful) {
          addBottomSheetRef.current?.close();
          setAddBottomSheetShow(false);
          await loadProductions();
        } else {
          Alert.alert('Error', res.data.exceptionMessage || 'Hata');
        }
      })
      .catch(er => {
        console.log(er);
      });
  };
  const loadProductions = async () => {
    await getAllProductionModels()
      .then(res => {
        setProductions(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChangeStatus = (id: number) => {
    setProductions(
      productions.map(y => {
        if (y.id === id) {
          return {
            ...y,
            status: y.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
          };
        }
        return y;
      }),
    );
  };
  return (
    <Container>
      <Header title="productionmanager" />
      <Container mx={20} isLoading={loading} mt={30}>
        <CustomFlatList
          contentContainerStyle={{
            backgroundColor: '#fff',
            borderRadius: 7,
          }}
          data={productions}
          renderItem={({item, index}: any) => {
            return (
              <Col
                onPress={() => {
                  Alert.alert(
                    'Uyarı',
                    item.status === 'ACTIVE'
                      ? 'Bu üretim modelini pasif hale getirmek istiyor musunuz?'
                      : 'Bu üretim modelini aktif hale getirmek istiyor musunuz?',
                    [
                      {
                        text: 'Evet',
                        onPress: async () => {
                          await updateProductModelStatusById(item.id).then(
                            res => {
                              if (res.data.isSuccessful) {
                                handleChangeStatus(item.id);
                              }
                            },
                          );
                        },
                      },
                      {
                        text: 'Hayır',
                        onPress: () => {},
                      },
                    ],
                  );
                }}
                activeOpacity={0.8}
                leftIcon={getFindIconByName(item.icon, colors.iconColor)}
                key={index}
                name={item.name}
                active={item.status === 'INACTIVE' ? true : false}
                icon={
                  <TouchableOpacity
                    hitSlop={20}
                    onPress={() => {
                      Alert.alert(
                        'Uyarı',
                        'Silmek istediğinize emin misiniz?',
                        [
                          {
                            text: 'Evet',
                            onPress: async () => {
                              setLoading(true);
                              await deleteProductionModel(item.id)
                                .then(res => {
                                  if (res.data.isSuccessful) {
                                    loadProductions();
                                  }
                                })
                                .finally(() => {
                                  setLoading(false);
                                });
                            },
                          },
                          {
                            text: 'Hayır',
                            onPress: () => {},
                          },
                        ],
                      );
                    }}>
                    <FontAwesomeIcon
                      icon={faTrash}
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
      {!loading && (
        <CircleButton
          onPress={() => {
            setAddBottomSheetShow(true);
          }}
          icon={faPlus}
        />
      )}
      <CustomBottomSheet
        ref={addBottomSheetRef}
        snapPoints={['50%']}
        handleClose={(value: boolean) => {
          setAddBottomSheetShow(value);
        }}
        isOpen={addBottomSheetShow}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            {Clothes.map(el => {
              return (
                <ClothesButton
                  key={el.name}
                  onPress={() => {
                    if (selectedProduction.name == el.name) {
                      setSelectedProduction({
                        name: '',
                        iconName: '',
                      });
                      return;
                    }
                    setSelectedProduction({
                      name: el.name,
                      iconName: el.name,
                    });
                  }}
                  isSelected={selectedProduction.name == el.name}
                  label={el.name}
                  icon={el.iconName()}
                />
              );
            })}
          </View>
        </View>
        <View style={{marginBottom: 50, marginHorizontal: 20}}>
          <Button
            disabled={selectedProduction.name == ''}
            activeOpacity={0.8}
            onPress={saveProduction}
            label={'KAYDET'}
          />
        </View>
      </CustomBottomSheet>
    </Container>
  );
}
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
