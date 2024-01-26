import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header/Header';
import SearchResults from '../../components/SearchResult/SearchResult';
import Label from '../../components/Text/Label';
import I18n from '../../lang/_i18n';
import FilterSvg from '../../svg/FilterSvg';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import useThemeColors from '../../constant/useColor';
import Container from '../../components/Container/Container';
import {CircleButton} from '../../components/Buttons/CircleButton';
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import SelectPlaceHolder from '../../components/Placeholder/SelectPlaceHolder';
import Button from '../../components/Buttons/Default';
import SelectionListProps from '../../components/SelectionList/SelectionListProps';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import FabricBrandResponse from '../../dto/Response/FabricBrandResponse';
import {getAllFabricBrands} from '../../services/FabricBrandService';
import FormControl from '../../components/FormControl/FormControl';
import RadioButton from '../../components/RadioButton/RadioButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getFabricModelsByBrandId} from '../../services/FabricBrandModelService';
import FabricModelResponse from '../../dto/Response/FabricModelResponse';
import {addFabric, getAllFromFabricModel} from '../../services/FabricService';
import FabricFromModelResponse from '../../dto/Response/FabricFromModelResponse';
import FabricMenu from '../../components/FabricMenu/FabricMenu';
import Col from '../../components/Cols/Col';
import FabricResponse from '../../dto/Response/FabricResponse';
import CreateFabricRequest from '../../dto/Request/CreateFabricRequest';
import {objectToCheckReturnBoolean} from '../../utils/Helper';
import RouteTypes from '../../types/RouteTypes';
export default function Fabric(props: any) {
  const colors = useThemeColors();
  const {language} = useSelector((state: AppState) => state.app);
  const [opacity] = useState(new Animated.Value(0));
  const [pageAnimation] = useState(new Animated.Value(1));
  const [isFocused, setIsFocused] = useState<boolean>(false);
  var addBottomSheetRef = useRef<BottomSheet>(null);
  const [addBottomSheetShow, setAddBottomSheetShow] = useState(false);
  const [bottomSheetContentType, setBottomSheetContentType] = useState<
    'Form' | 'Brand' | 'Model'
  >('Form');
  const [selectedBrandAndModel, setSelectedBrandAndModel] = useState({
    brand: {} as FabricBrandResponse,
    model: {} as FabricModelResponse,
  });
  const [loading, setLoading] = useState(true);
  const [fabrics, setFabrics] = useState([] as FabricFromModelResponse[]);
  const [selectedFabricMenu, setSelectedFabricMenu] = useState(
    {} as FabricFromModelResponse,
  );
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setLoading(true);
      loadFabrics();
      setSelectedBrandAndModel({
        brand: {} as FabricBrandResponse,
        model: {} as FabricModelResponse,
      });
    });
  }, []);

  const loadFabrics = async () => {
    await getAllFromFabricModel()
      .then(res => {
        setFabrics(res.data.list);
        if (res.data.list.length > 0) {
          setSelectedFabricMenu(res.data.list[0]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const saveFabric = async () => {
    let createRequestForm = {
      fabricModelId: selectedBrandAndModel.model.id,
    } as CreateFabricRequest;
    await addFabric(createRequestForm).then(res => {
      if (res.data.isSuccessful) {
        Alert.alert('Başarılı', 'Kumaş Eklendi', [
          {
            text: 'Tamam',
            onPress: () => {
              loadFabrics();
              addBottomSheetRef.current?.close();
              setAddBottomSheetShow(false);
              setSelectedBrandAndModel({
                brand: {} as FabricBrandResponse,
                model: {} as FabricModelResponse,
              });
            },
          },
        ]);
      } else {
        Alert.alert('Hata', res.data.exceptionMessage || 'Hata');
      }
    });
  };
  const Section = () => {
    return (
      <Container isLoading={loading}>
        {fabrics.length !== 0 && (
          <>
            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Label
                font="Raleway-Bold"
                sx={{fontSize: 15, color: '#5F5E70'}}
                label={I18n.t('fabricsscreen_header', {locale: language})}
              />
            </View>
            <View style={{height: 35}}>
              <FabricMenu
                selectedFabric={selectedFabricMenu}
                setSelectedFabric={setSelectedFabricMenu}
                fabrics={fabrics.sort((a, b) =>
                  a.brandName > b.brandName ? 1 : -1,
                )}
              />
            </View>
          </>
        )}
        <Container>
          <View
            style={{
              marginTop: 15,
              marginBottom: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Label
              font="Raleway-Bold"
              sx={{fontSize: 15, color: '#5F5E70'}}
              label={I18n.t('fabricsscreen_title', {locale: language})}
            />
            <TouchableOpacity activeOpacity={0.7}>
              <FilterSvg />
            </TouchableOpacity>
          </View>
          <CustomFlatList
            data={selectedFabricMenu?.fabrics}
            renderItem={({
              item,
              index,
            }: {
              item: FabricResponse;
              index: number;
            }) => {
              return (
                <Col
                  mb={3}
                  onPress={() => {
                    props.navigation.navigate(RouteTypes.FABRIC_DETAIL_SCREEN, {
                      item: item,
                    });
                  }}
                  activeOpacity={0.8}
                  key={index}
                  name={`${item.fabricModel}`}
                  icon={
                    <View
                      style={{
                        flexDirection: 'row',
                        columnGap: 5,
                        alignItems: 'center',
                      }}>
                      <Label
                        sx={{
                          color: colors.iconColor,
                          fontWeight: 'bold',
                        }}
                        label={`${item.totalQuantity}m`}
                      />
                      <TouchableOpacity
                        onPress={() => {}}
                        hitSlop={15}
                        activeOpacity={0.7}>
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          color={colors.iconColor}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
              );
            }}
          />
        </Container>
      </Container>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.screenBackgroundColor,
        flex: 1,
      }}>
      <Container mx={20}>
        <Header
          isSearchAppier={false}
          pageAnimation={pageAnimation}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          opacity={opacity}
          navigation={props.navigation}
        />
        {isFocused ? <SearchResults opacity={opacity} /> : <Section />}
      </Container>
      <CircleButton
        icon={faPlus}
        onPress={() => {
          setAddBottomSheetShow(true);
        }}
      />
      {addBottomSheetShow && (
        <CustomBottomSheet
          bgColor={colors.screenBackgroundColor}
          ref={addBottomSheetRef}
          snapPoints={bottomSheetContentType === 'Form' ? ['35%'] : ['90%']}
          handleClose={(value: boolean) => {
            setAddBottomSheetShow(value);
            addBottomSheetRef.current?.close();
            setSelectedBrandAndModel({
              brand: {} as FabricBrandResponse,
              model: {} as FabricModelResponse,
            });
          }}
          isOpen={addBottomSheetShow}>
          {bottomSheetContentType === 'Form' && (
            <Container mx={20} mb={30}>
              <SelectPlaceHolder
                onPress={() => {
                  setBottomSheetContentType('Brand');
                }}
                selectedValue={selectedBrandAndModel?.brand?.name}
                label="Kumaş Marka"
              />
              <SelectPlaceHolder
                onPress={() => {
                  if (selectedBrandAndModel?.brand?.id === undefined) {
                    Alert.alert('Uyarı', 'Lütfen önce marka seçiniz.');
                    return;
                  }
                  setBottomSheetContentType('Model');
                }}
                selectedValue={selectedBrandAndModel?.model?.name}
                label="Kumaş Model"
              />
              <Button
                disabled={objectToCheckReturnBoolean({
                  brand:
                    Object.keys(selectedBrandAndModel?.brand).length === 0
                      ? false
                      : true,
                  model:
                    Object.keys(selectedBrandAndModel?.model).length === 0
                      ? false
                      : true,
                })}
                onPress={saveFabric}
                sx={{marginVertical: 10}}
                activeOpacity={0.8}
                label={'KAYDET'}></Button>
            </Container>
          )}
          {bottomSheetContentType === 'Brand' && (
            <SelectFabricBrand
              selectedItem={selectedBrandAndModel?.brand}
              setSelectedItem={item => {
                setSelectedBrandAndModel({
                  ...selectedBrandAndModel,
                  brand: item,
                });
                setBottomSheetContentType('Form');
              }}
              goBack={() => {
                setBottomSheetContentType('Form');
              }}
            />
          )}
          {bottomSheetContentType === 'Model' && (
            <SelectFabricModel
              id={selectedBrandAndModel?.brand?.id}
              list={{
                selectedItem: selectedBrandAndModel?.model,
                setSelectedItem: item => {
                  setSelectedBrandAndModel({
                    ...selectedBrandAndModel,
                    model: item,
                  });
                  setBottomSheetContentType('Form');
                },
                goBack: () => {
                  setBottomSheetContentType('Form');
                },
              }}
            />
          )}
        </CustomBottomSheet>
      )}
    </SafeAreaView>
  );
}
const SelectFabricBrand = (props: SelectionListProps) => {
  const colors = useThemeColors();
  const {goBack, setSelectedItem, isModalOpen, selectedItem} = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [brands, setBrands] = useState<Array<FabricBrandResponse>>([]);

  useEffect(() => {
    setLoading(true);
    loadFabricBrands();
  }, [isModalOpen]);

  const loadFabricBrands = async () => {
    await getAllFabricBrands()
      .then(res => {
        setBrands(res.data.list as any);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container mx={20} isLoading={loading}>
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
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="Kumaş Markalar" />
      </View>
      <Container>
        <CustomFlatList
          isSearchable
          sort={(a: FabricBrandResponse, b: FabricBrandResponse) =>
            a.name > b.name ? 1 : -1
          }
          filter={(item: any, searchText: any) => {
            return item?.name?.toLowerCase().includes(searchText.toLowerCase());
          }}
          data={brands}
          renderItem={({
            item,
            index,
          }: {
            item: FabricBrandResponse;
            index: number;
          }) => {
            return (
              <FormControl
                sx={{
                  marginBottom: 0,
                  backgroundColor: '#fff',
                }}
                onPress={() => {
                  setSelectedItem?.(item);
                }}
                key={index}
                label={`${item.name}`}
                component={
                  <RadioButton
                    checked={selectedItem?.id === item.id}
                    onPress={() => {
                      setSelectedItem?.(item);
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
};
const SelectFabricModel = (props: {id: number; list: SelectionListProps}) => {
  const colors = useThemeColors();
  const {id} = props;
  const {goBack, setSelectedItem, isModalOpen, selectedItem} = props.list;

  const [loading, setLoading] = useState<boolean>(true);
  const [fabricModels, setFabricModels] = useState([] as FabricModelResponse[]);
  useEffect(() => {
    setLoading(true);
    loadFabricModels();
  }, [id]);

  const loadFabricModels = async () => {
    await getFabricModelsByBrandId(id)
      .then(res => {
        console.log(res.data);
        setFabricModels(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container mx={20} isLoading={loading}>
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
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="Kumaş Modeller" />
      </View>
      <CustomFlatList
        sort={(a: FabricModelResponse, b: FabricModelResponse) =>
          a.name > b.name ? 1 : -1
        }
        data={fabricModels}
        renderItem={({
          item,
          index,
        }: {
          item: FabricBrandResponse;
          index: number;
        }) => {
          return (
            <FormControl
              onPress={() => {
                setSelectedItem?.(item);
              }}
              sx={{
                backgroundColor: '#fff',
              }}
              key={index}
              label={`${item.name}`}
              component={
                <RadioButton
                  checked={selectedItem?.id === item.id}
                  onPress={() => {
                    setSelectedItem?.(item);
                  }}
                />
              }
            />
          );
        }}
      />
    </Container>
  );
};
