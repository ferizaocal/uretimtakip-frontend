import {View, Text, Alert, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/ScreenHeader';
import Button from '../../components/Buttons/Default';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '../../store/slice/authSlice';
import useThemeColors from '../../constant/useColor';
import Label from '../../components/Text/Label';
import {
  completedUserOperation,
  getUserOperationByActive,
  getUserOperationByCompleted,
} from '../../services/UserOperationService';
import {ProductionTrackingResponse} from '../../dto/Response/ProductionTrackingResponse';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import ProductionTrackingCard from '../../components/ProductionTrackingCard/ProductionTrackingCard';
import {AppState} from '../../store';
import {faGripVertical, faSignOut} from '@fortawesome/free-solid-svg-icons';
import {AppActions} from '../../store/slice/appSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ListSvg from '../../svg/ListSvg';
import I18n from 'i18n-js';
import {CircleButton} from '../../components/Buttons/CircleButton';
import {getNextOperation} from '../../services/OperationService';
import Loading from '../../components/Loading/Loading';
import OperationResponse from '../../dto/Response/OperationResponse';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import SelectUserByOperationNumber from '../../components/SelectionList/SelectUserByOperationNumber';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import UserResponse from '../../dto/Response/UserResponse';
import CreateOperationCompleteRequest from '../../dto/Request/CreateOperationCompleteRequest';

export default function Home() {
  const dispatch = useDispatch();
  const colors = useThemeColors();
  const user = useSelector((state: AppState) => state.auth.user);
  const {listType, language} = useSelector((state: AppState) => state.app);
  const [selectedButton, setSelectedButton] = useState(0);
  const [loading, setLoading] = useState(true);
  const [productionTrackings, setProductionTrackings] = useState<
    Array<ProductionTrackingResponse>
  >([]);
  const [postLoading, setPostLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState({} as UserResponse);
  const [nextOperation, setNextOperation] = useState({} as OperationResponse);
  const [activeProductionModelId, setActiveProductionModelId] = useState(0);
  var ref = useRef<BottomSheet>(null);
  const [createNextOperationRequest, setCreateNextOperationRequest] = useState(
    {} as CreateOperationCompleteRequest,
  );
  const [userShow, setUserShow] = useState(false);
  useEffect(() => {
    if (selectedButton === 0) {
      loadByActive();
    }
    if (selectedButton === 1) {
      loadByCompleted();
    }
  }, [selectedButton]);

  const loadByActive = async () => {
    await getUserOperationByActive()
      .then(res => {
        setProductionTrackings(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const loadByCompleted = async () => {
    await getUserOperationByCompleted()
      .then(res => {
        setProductionTrackings(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getNext = async (trackingId: number, currentOperationId: number) => {
    setPostLoading(true);
    await getNextOperation(trackingId, currentOperationId)
      .then(async res => {
        if (res.data.isSuccessful) {
          if (
            res.data.entity.operationName.includes('Mağaza') ||
            res.data.entity.operationName.includes('Store')
          ) {
            await save();
          } else {
            setNextOperation(res.data.entity);
            setUserShow(true);
          }
        }
      })
      .finally(() => {
        setPostLoading(false);
      });
  };
  const save = async () => {
    setUserShow(false);
    setSelectedUser({} as UserResponse);
    await completedUserOperation(createNextOperationRequest).then(res => {
      if (res.data.isSuccessful) {
        Alert.alert(
          'Başarılı',
          'İşlem başarıyla tamamlandı.' +
            res?.data?.entity?.operationName +
            ' aktarıldı.',
          [
            {
              text: 'Tamam',
              onPress: async () => {
                loadByActive();
              },
            },
          ],
        );
      }
    });
  };
  return (
    <Container postLoading={postLoading}>
      <Header
        rightIcon={faSignOut}
        rightIconPress={() => {
          Alert.alert(
            'Çıkış Yap',
            'Çıkış yapmak istediğinize emin misiniz?',
            [
              {
                text: 'İptal',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Evet',
                onPress: () => {
                  dispatch(AuthActions.setUser(null));
                },
              },
            ],
            {cancelable: false},
          );
        }}
        isGoBackShow={false}
        extraTitle={
          user?.firstName && user?.lastName
            ? `${user?.firstName} ${user?.lastName}`
            : '-'
        }></Header>
      <Container mt={20} mx={20}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: 10,
            height: 60,
          }}>
          <Button
            activeOpacity={0.7}
            label={'Bekleyen'}
            labelSx={{color: selectedButton === 0 ? '#fff' : colors.saveButton}}
            sx={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.saveButton,
              backgroundColor:
                selectedButton === 0 ? colors.saveButton : 'transparent',
            }}
            onPress={() => {
              setSelectedButton(0);
            }}></Button>

          <Button
            activeOpacity={0.7}
            label={'Tamamlanan'}
            labelSx={{color: selectedButton === 1 ? '#fff' : colors.saveButton}}
            sx={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.saveButton,
              backgroundColor:
                selectedButton === 1 ? colors.saveButton : 'transparent',
            }}
            onPress={() => {
              setSelectedButton(1);
            }}></Button>
        </View>

        <Container isLoading={loading}>
          <CustomFlatList
            isSearchable
            filter={(
              item: ProductionTrackingResponse,
              search: string,
              index: number,
            ) => {
              return (
                item.partyNumber?.toString()?.includes(search) ||
                item.productionCode?.code.includes(search)
              );
            }}
            handleRefresh={() => {
              setLoading(true);
              if (selectedButton === 0) {
                loadByActive();
              }
              if (selectedButton === 1) {
                loadByCompleted();
              }
            }}
            contentInset={{bottom: 90}}
            style={{zIndex: 3, height: '90%'}}
            contentContainerStyle={{justifyContent: 'space-between'}}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={productionTrackings}
            renderItem={({
              item,
              index,
            }: {
              item: ProductionTrackingResponse;
              index: number;
            }) => {
              return (
                <ProductionTrackingCard
                  onPress={async () => {
                    if (selectedButton === 0) {
                      setCreateNextOperationRequest({
                        userOperationId: item?.userOperation?.id,
                        productTrackingId: item?.id,
                      });
                      await setActiveProductionModelId(
                        Number(item?.productionModel?.id),
                      );
                      await getNext(
                        Number(item?.id),
                        Number(item?.userOperation.id),
                      );
                    }
                  }}
                  item={item}
                  key={index}
                />
              );
            }}
          />
        </Container>
      </Container>
      <CircleButton
        onPress={() => {
          dispatch(
            AppActions.setListType(listType === 'grid' ? 'list' : 'grid'),
          );
        }}
        isSvg={listType === 'grid' ? true : false}
        icon={listType === 'grid' ? <ListSvg color="#fff" /> : faGripVertical}
      />
      {userShow && (
        <CustomBottomSheet
          snapPoints={['90%']}
          handleClose={(value: boolean) => {
            setUserShow(value);
          }}
          isOpen={userShow}
          ref={ref}>
          <SelectUserByOperationNumber
            productionModel={activeProductionModelId}
            isModalOpen={userShow}
            operationNumber={nextOperation?.operationNumber}
            setSelectedItem={item => {
              setSelectedUser(item);
              setCreateNextOperationRequest({
                ...createNextOperationRequest,
                targetUserId: item.id,
              });
            }}
            selectedItem={selectedUser}
          />
          <Button
            sx={{marginVertical: 20, marginHorizontal: 10}}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert(
                'İşlemi Tamamla',
                'İşlemi tamamlamak istediğinize emin misiniz?',
                [
                  {
                    text: 'İptal',
                    onPress: () => {
                      setUserShow(false);
                      setSelectedUser({} as UserResponse);
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'Evet',
                    onPress: async () => {
                      await save();
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            disabled={Object.keys(selectedUser).length === 0 ? true : false}
            label={'SEÇİNİZ'}></Button>
        </CustomBottomSheet>
      )}
    </Container>
  );
}
