import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableOpacityProps,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import Label from '../Text/Label';
import useThemeColors from '../../constant/useColor';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {OperationActions} from '../../store/slice/operationSlice';
import FabricFromModelResponse from '../../dto/Response/FabricFromModelResponse';

interface FabricMenuProps extends TouchableOpacityProps {
  fabrics: FabricFromModelResponse[];
  selectedFabric: any;
  setSelectedFabric: (fabric: any) => void;
}

export default function FabricMenu(props: FabricMenuProps) {
  const colors = useThemeColors();
  const {fabrics, selectedFabric, setSelectedFabric} = props;

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{columnGap: 10}}
      horizontal
      data={[...fabrics]?.sort?.((a, b) =>
        a.brandName > b.brandName ? 1 : -1,
      )}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setSelectedFabric(item);
            }}
            key={index}
            style={{
              height: 35,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
              minWidth: 80,
              backgroundColor:
                selectedFabric?.id === item.id
                  ? colors.primary
                  : colors.screenBackgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.primary,
            }}>
            <Label
              sx={{
                color: selectedFabric.id === item.id ? '#fff' : colors.primary,
                fontSize: 13,
              }}
              label={item?.brandName?.toUpperCase()}
            />
            {selectedFabric?.id === item.id && (
              <View style={{position: 'absolute', right: -2, top: -3}}>
                <FontAwesomeIcon
                  size={20}
                  icon={faCheckCircle}
                  color="#f2f2f2"
                />
              </View>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
}
