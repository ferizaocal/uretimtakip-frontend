import {View, Text, Alert, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../components/Container/Container';
import Header from '../components/Header/ScreenHeader';
import {CircleButton} from '../components/Buttons/CircleButton';
import {faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Buttons/Default';
import CustomBottomSheet from '../components/BottomSheet/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import Input from '../components/Input/Input';
import {
  addAgeGroup,
  deleteAgeGroup,
  getAllAgeGroups,
  updateAgeGroup,
} from '../services/AgeGroupService';
import AgeGroupResponse from '../dto/Response/AgeGroupResponse';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import Col from '../components/Cols/Col';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../constant/useColor';
import I18n from 'i18n-js';
import {useSelector} from 'react-redux';
import {AppState} from '../store';

export default function AgeGroups(props: any) {
  const colors = useThemeColors();
  var addBottomSheetRef = useRef<BottomSheet>(null);
  var editBottomSheetRef = useRef<BottomSheet>(null);
  const [loading, setLoading] = useState(true);
  const [addBottomSheetShow, setAddBottomSheetShow] = useState(false);
  const [editBottomSheetShow, setEditBottomSheetShow] = useState(false);
  const [ageGroups, setAgeGroups] = useState<Array<AgeGroupResponse>>([]);
  const [age, setAge] = useState('');
  const [selectedAge, setSelectedAge] = useState({} as AgeGroupResponse);
  const {language} = useSelector((state: AppState) => state.app);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setLoading(true);
      loadAgeGroups();
    });
  }, []);

  const loadAgeGroups = async () => {
    await getAllAgeGroups()
      .then(res => {
        setAgeGroups(res.data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const save = async () => {
    await addAgeGroup(age)
      .then(res => {
        if (res.data.isSuccessful) {
          Alert.alert('Başarılı', 'Yaş Grubu Eklendi', [
            {
              text: 'Tamam',
              onPress: () => {
                setAgeGroups([...ageGroups, res.data.entity]);
                addBottomSheetRef.current?.close();
                setAddBottomSheetShow(false);
                setAge('');
              },
            },
          ]);
        } else {
          Alert.alert('Error', res.data.exceptionMessage || 'Hata');
        }
      })
      .catch(er => {
        Alert.alert('Error', er);
      });
  };
  const update = async () => {
    await updateAgeGroup(selectedAge.id, selectedAge.age)
      .then(res => {
        if (res.data.isSuccessful) {
          Alert.alert('Başarılı', 'Yaş Grubu Güncellendi', [
            {
              text: 'Tamam',
              onPress: () => {
                setAgeGroups(
                  ageGroups.map(x => {
                    if (x.id === res.data.entity.id) {
                      return res.data.entity;
                    }
                    return x;
                  }),
                );
                editBottomSheetRef.current?.close();
                setEditBottomSheetShow(false);
              },
            },
          ]);
        } else {
          Alert.alert('Error', res.data.exceptionMessage || 'Hata');
        }
      })
      .catch(er => {
        Alert.alert('Error', er);
      });
  };
  const handleDelete = async () => {
    Alert.alert('Uyarı', 'Silmek istediğinize emin misiniz?', [
      {
        text: 'Hayır',
      },
      {
        text: 'Evet',
        onPress: async () => {
          await deleteAgeGroup(selectedAge.id)
            .then(res => {
              if (res.data.isSuccessful) {
                Alert.alert('Başarılı', 'Yaş Grubu Silindi', [
                  {
                    text: 'Tamam',
                    onPress: () => {
                      setAgeGroups(
                        ageGroups.filter(x => x.id !== selectedAge.id),
                      );
                    },
                  },
                ]);
              }
            })
            .finally(() => {
              setSelectedAge({} as AgeGroupResponse);
              editBottomSheetRef.current?.close();
              setEditBottomSheetShow(false);
            });
        },
      },
    ]);
  };
  return (
    <Container>
      <Header
        extraTitle={I18n.t('settingsscreen_production_agegroup', {
          locale: language,
        })}
      />
      <Container isLoading={loading} mx={20} mt={20}>
        <CustomFlatList
          contentContainerStyle={{
            backgroundColor: '#fff',
            borderRadius: 7,
          }}
          isSearchable
          filter={(item: AgeGroupResponse, search: string, index: number) => {
            return item.age.toLowerCase().includes(search.toLowerCase());
          }}
          handleRefresh={async () => {
            setLoading(true);
            await loadAgeGroups();
          }}
          data={ageGroups}
          notFoundText={I18n.t('warning_age_group', {locale: language})}
          renderItem={({item, index}: any) => {
            return (
              <Col
                onPress={() => {
                  setSelectedAge(item);
                  setEditBottomSheetShow(true);
                }}
                activeOpacity={0.8}
                key={index}
                name={`${item.age}`}
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAge(item);
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

      <CustomBottomSheet
        ref={addBottomSheetRef}
        snapPoints={['30%']}
        handleClose={(value: boolean) => {
          setAddBottomSheetShow(value);
        }}
        isOpen={addBottomSheetShow}>
        <Container mx={20} mb={30} bgColor="white">
          <Input
            value={age}
            onChangeText={value => setAge(value)}
            bottomSheet
            label="Yaş Grubu"
          />
          <Button
            onPress={save}
            disabled={age.length < 1}
            sx={{marginTop: 20}}
            activeOpacity={0.8}
            label={'KAYDET'}></Button>
        </Container>
      </CustomBottomSheet>
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
              value={selectedAge?.age}
              onChangeText={text => setSelectedAge({...selectedAge, age: text})}
              bottomSheet
              label="Yaş Grubu"
            />
            <View style={{flexDirection: 'row', columnGap: 10}}>
              <Button
                onPress={update}
                disabled={selectedAge?.age?.length < 1}
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
