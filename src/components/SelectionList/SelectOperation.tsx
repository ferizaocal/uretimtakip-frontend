import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import useThemeColors from '../../constant/useColor';
import Container from '../Container/Container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import Label from '../Text/Label';
import FormControl from '../FormControl/FormControl';
import RadioButton from '../RadioButton/RadioButton';
import SelectOperationProps from './SelectOperationProps';

interface SelectOperation extends SelectOperationProps {}
export default function SelectOperation(props: SelectOperationProps) {
  const {goBack, setSelectedItem} = props;
  const colors = useThemeColors();
  const handleSelectedItem = (value: string) => {
    setSelectedItem?.(value);
  };
  return (
    <Container mx={10} bgColor="#fff">
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
        <Label font="Raleway-Bold" sx={{fontSize: 20}} label="Yaş Grupları" />
      </View>
      <Container bgColor="white">
        <FormControl
          onPress={() => {
            handleSelectedItem('Genç');
          }}
          label={'Genç'}
          component={
            <RadioButton
              onPress={() => {
                handleSelectedItem('Genç');
              }}
              checked={props.selectedItem === 'Genç'}
            />
          }
        />
        <FormControl
          onPress={() => {
            handleSelectedItem('Yetişkin');
          }}
          label={'Yetişkin'}
          component={
            <RadioButton
              onPress={() => {
                handleSelectedItem('Yetişkin');
              }}
              checked={props.selectedItem === 'Yetişkin'}
            />
          }
        />
      </Container>
    </Container>
  );
}
