import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Container/Container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Label from '../Text/Label';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import SelectionListProps from './SelectionListProps';
import FormControl from '../FormControl/FormControl';
import RadioButton from '../RadioButton/RadioButton';
import CustomFlatList from '../Flatlist/CustomFlatList';
import AgeGroupResponse from '../../dto/Response/AgeGroupResponse';
import {getAllAgeGroups} from '../../services/AgeGroupService';
interface SelectAgeGroupProps extends SelectionListProps {}
export default function SelectAgeGroup(props: SelectAgeGroupProps) {
  const {goBack, setSelectedItem} = props;
  const colors = useThemeColors();
  const [loading, setLoading] = useState(true);
  const [ageGroups, setAgeGroups] = useState<Array<AgeGroupResponse>>([]);

  useEffect(() => {
    loadAgeGroups();
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

  const handleSelectedItem = (value: any) => {
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
      <Container bgColor="white" mb={30} isLoading={loading}>
        <CustomFlatList
          isSearchable
          searchStyle={{marginBottom: 5}}
          filter={(item: AgeGroupResponse, search: string, index: number) => {
            return (
              item.age.toLowerCase().includes(search.toLowerCase()) ||
              item.age.toLowerCase().includes(search.toLowerCase())
            );
          }}
          handleRefresh={() => {}}
          notFoundText="No Age group found"
          data={ageGroups}
          renderItem={({
            item,
            index,
          }: {
            item: AgeGroupResponse;
            index: number;
          }) => {
            return (
              <FormControl
                onPress={() => {
                  handleSelectedItem(item);
                }}
                key={index}
                label={`${item.age}`}
                component={
                  <RadioButton
                    checked={props?.selectedItem?.id === item.id}
                    onPress={() => {
                      handleSelectedItem(item);
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
}
