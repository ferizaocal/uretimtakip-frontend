import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {faAngleLeft, faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import {AppState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import {CircleButton} from '../components/Buttons/CircleButton';
import CustomBottomSheet from '../components/BottomSheet/CustomBottomSheet';
import Button from '../components/Buttons/Default';
import Header from '../components/Header/ScreenHeader';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import SelectPlaceHolder from '../components/Placeholder/SelectPlaceHolder';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import FormControl from '../components/FormControl/FormControl';
import RadioButton from '../components/RadioButton/RadioButton';
import {fetchOperationsByActive} from '../store/slice/operationSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../constant/useColor';
import Label from '../components/Text/Label';
import CreateRoleRequest from '../dto/Request/CreateRoleRequest';
import {RoleActions, fetchRoles} from '../store/slice/roleSlice';
import OperationResponse from '../dto/Response/OperationResponse';
import {objectToCheckReturnBoolean} from '../utils/Helper';
import {createRole, getRoles, updateRole} from '../services/RoleService';
import ColBackground from '../components/Cols/ColBackground';
import Col from '../components/Cols/Col';
import UpdateRoleRequest from '../dto/Request/UpdateRoleRequest';
import RouteTypes from '../types/RouteTypes';

export default function Roles(props: any) {
  const dispatch = useDispatch<any>();
  const colors = useThemeColors();
  const {createRoleDto, updateRoleDto, roles, buttonLoading, pageLoading} =
    useSelector((state: AppState) => state.role);
  const [addBottomSheetShow, setAddBottomSheetShow] = useState(false);
  const [editBottomSheetShow, setEditBottomSheetShow] = useState(false);
  var addRef = useRef<BottomSheet>(null);
  var editRef = useRef<BottomSheet>(null);
  const [contentType, setContentType] = useState<'ADD' | 'OPERATION'>('ADD');
  const [selectedOperation, setSelectedOperation] = useState<OperationResponse>(
    {} as OperationResponse,
  );

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadRoles();
    });
  }, []);
  const loadRoles = async () => {
    dispatch(fetchRoles());
  };
  const checkCreateRoleFormInputs = () => {
    var checkJson = {
      name: createRoleDto.name,
      operationId: createRoleDto.operationId === 0 ? false : true,
    };
    return objectToCheckReturnBoolean(checkJson);
  };
  const checkUpdateRoleFormInputs = () => {
    var checkJson = {
      name: updateRoleDto.name,
      operationId: updateRoleDto.operationId === 0 ? false : true,
    };
    return objectToCheckReturnBoolean(checkJson);
  };
  const handleChangeForm = (key: keyof CreateRoleRequest, value: any) => {
    let newCreateRoleDto = {...createRoleDto} as any;
    newCreateRoleDto[key] = value;
    dispatch(RoleActions.setCreateRoleDto(newCreateRoleDto));
  };
  const handleChangeUpdateForm = (key: keyof UpdateRoleRequest, value: any) => {
    let newUpdateRoleDto = {...updateRoleDto} as any;
    newUpdateRoleDto[key] = value;
    dispatch(RoleActions.setUpdateRoleDto(newUpdateRoleDto));
  };

  const handleSave = async () => {
    dispatch(RoleActions.setButtonLoading(true));
    await createRole(createRoleDto)
      .then(res => {
        if (res.data.isSuccessful) {
          dispatch(RoleActions.addRole(res.data.entity));
          addRef.current?.close();
          setAddBottomSheetShow(false);
        } else {
          Alert.alert('Hata', res.data.exceptionMessage || '');
        }
      })
      .finally(() => {
        dispatch(RoleActions.setButtonLoading(false));
      });
  };
  const handleUpdate = async () => {
    dispatch(RoleActions.setButtonLoading(true));
    await updateRole(updateRoleDto)
      .then(res => {
        if (res.data.isSuccessful) {
          dispatch(RoleActions.updateRole(res.data.entity));
          editRef.current?.close();
          setEditBottomSheetShow(false);
        } else {
          Alert.alert('Hata', res.data.exceptionMessage || '');
        }
      })
      .finally(() => {
        dispatch(RoleActions.setButtonLoading(false));
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.screenBackgroundColor}}>
      <Header title="roles" />
      <Container isLoading={pageLoading} mx={20} mt={30}>
        <ColBackground>
          {[...roles]
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((el, index) => (
              <Col
                onPress={() => {
                  dispatch(RoleActions.setSelectedRole(el));
                  props.navigation.navigate(RouteTypes.USERS_SCREEN);
                }}
                activeOpacity={0.8}
                key={index}
                name={el.name}
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(RoleActions.setUpdateRoleDto(el));
                      setEditBottomSheetShow(true);
                    }}
                    activeOpacity={0.7}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      color={colors.iconColor}
                      size={20}
                    />
                  </TouchableOpacity>
                }
              />
            ))}
        </ColBackground>
      </Container>
      <CircleButton
        onPress={() => {
          setAddBottomSheetShow(true);
        }}
        icon={faPlus}
      />
      <CustomBottomSheet
        ref={addRef}
        snapPoints={contentType === 'ADD' ? ['40%'] : ['90%']}
        handleClose={(value: boolean) => {
          setContentType('ADD');
          setAddBottomSheetShow(value);
        }}
        isOpen={addBottomSheetShow}>
        {contentType === 'ADD' && (
          <View style={styles.container}>
            <SelectPlaceHolder
              onPress={() => {
                setContentType('OPERATION');
              }}
              selectedValue={selectedOperation?.operationName || 'Seçiniz'}
              label="Yönetilen Süreç"
            />
            <Input
              value={createRoleDto.name}
              onChangeText={(value: string) => {
                handleChangeForm('name', value);
              }}
              label="Rol Adı"
              bottomSheet
            />
            <Button
              isLoading={buttonLoading}
              disabled={checkCreateRoleFormInputs()}
              onPress={handleSave}
              label="Kaydet"
              sx={{marginTop: 20}}
            />
          </View>
        )}
        {contentType === 'OPERATION' && (
          <SelectOperations
            handleChangeRoleDto={entity => {
              dispatch(RoleActions.setCreateRoleDto(entity));
            }}
            roleDto={createRoleDto}
            setSelectedOperation={setSelectedOperation}
            goBack={() => {
              setContentType('ADD');
            }}
          />
        )}
      </CustomBottomSheet>
      <CustomBottomSheet
        ref={editRef}
        snapPoints={contentType === 'ADD' ? ['40%'] : ['90%']}
        handleClose={(value: boolean) => {
          setContentType('ADD');
          setEditBottomSheetShow(value);
        }}
        isOpen={editBottomSheetShow}>
        {contentType === 'ADD' && (
          <View style={styles.container}>
            <SelectPlaceHolder
              onPress={() => {
                setContentType('OPERATION');
              }}
              selectedValue={updateRoleDto?.operationName || 'Seçiniz'}
              label="Yönetilen Süreç"
            />
            <Input
              value={updateRoleDto.name}
              onChangeText={(value: string) => {
                handleChangeUpdateForm('name', value);
              }}
              label="Rol Adı"
              bottomSheet
            />
            <Button
              isLoading={buttonLoading}
              disabled={checkUpdateRoleFormInputs()}
              onPress={handleUpdate}
              label="Kaydet"
              sx={{marginTop: 20}}
            />
          </View>
        )}
        {contentType === 'OPERATION' && (
          <SelectOperations
            handleChangeRoleDto={entity => {
              dispatch(RoleActions.setUpdateRoleDto(entity));
            }}
            roleDto={updateRoleDto}
            setSelectedOperation={setSelectedOperation}
            goBack={() => {
              setContentType('ADD');
            }}
          />
        )}
      </CustomBottomSheet>
    </View>
  );
}

const SelectOperations = (props: {
  roleDto: any;
  handleChangeRoleDto: (entity: any) => void;
  goBack: () => void;
  setSelectedOperation: (operation: OperationResponse) => void;
}) => {
  const dispatch = useDispatch<any>();
  const colors = useThemeColors();
  const {operations, pageLoading} = useSelector(
    (state: AppState) => state.operation,
  );

  const {goBack, setSelectedOperation, roleDto, handleChangeRoleDto} = props;
  useEffect(() => {
    dispatch(fetchOperationsByActive());
  }, []);

  return (
    <Container mx={10} bgColor="#fff" isLoading={pageLoading}>
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
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="SÜREÇLER" />
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <FormControl
            onPress={() => {
              setSelectedOperation(item);
              let newRoleDto = {...roleDto} as any;
              if (item.operationName === undefined) {
                newRoleDto['name'] = item.operationName;
              }
              newRoleDto['operationId'] = item.id;
              if (newRoleDto['operationName'] != undefined) {
                newRoleDto['operationName'] = item.operationName;
              }
              handleChangeRoleDto(newRoleDto);
              goBack();
            }}
            label={item.operationName}
            component={
              <RadioButton checked={roleDto.operationId === item.id} />
            }
          />
        )}
        data={operations}
      />
    </Container>
  );
};

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
