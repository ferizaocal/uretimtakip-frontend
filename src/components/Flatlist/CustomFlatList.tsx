import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import CustomListProps from './CustomListProps';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import SearchBar from '../SearchBar/SearchBar';
import ColBackground from '../Cols/ColBackground';
import I18n from 'i18n-js';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';

export default function CustomFlatList(props: CustomListProps | any) {
  const [onRefresh, setOnRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const {language} = useSelector((state: AppState) => state.app);
  const GetData = () => {
    if (props.data) {
      if (props.filter && props.sort) {
        return props.data
          .sort(props.sort)
          .filter((item: any, index: any) =>
            props.filter != undefined
              ? props.filter(item, search, index)
              : item,
          );
      } else {
        if (props.sort) {
          return props.data.sort(props.sort);
        } else if (props.filter) {
          return props.data.filter((item: any, index: any) =>
            props.filter != undefined
              ? props.filter(item, search, index)
              : item,
          );
        } else {
          return props.data;
        }
      }
    } else {
      return [];
    }
  };

  return (
    <>
      {props.isSearchable && (
        <SearchBar
          onChangeText={(text: string) => {
            setSearch(text);
          }}
          placeholder={props.searchPlaceholder}
          value={search}
          sx={[{marginBottom: 15}, props.searchStyle]}
          inputStyleProps={{
            borderRadius: 4,
          }}
        />
      )}
      {GetData() && GetData().length != 0 ? (
        !props.isBottomSheet ? (
          <FlatList
            {...props}
            contentContainerStyle={props?.contentContainerStyle}
            data={GetData() as any}
            keyExtractor={(item, index) => index.toString()}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.5}
            renderItem={props.renderItem}
            refreshControl={
              <RefreshControl
                refreshing={onRefresh}
                onRefresh={() => {
                  setOnRefresh(true);
                  if (props.handleRefresh) {
                    props.handleRefresh();
                  }
                  setOnRefresh(false);
                }}
              />
            }
          />
        ) : (
          <BottomSheetFlatList
            {...props}
            data={GetData() as any}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            renderItem={props.renderItem}
            refreshControl={
              <RefreshControl
                refreshing={onRefresh}
                onRefresh={() => {
                  setOnRefresh(true);
                  if (props.handleRefresh) {
                    props.handleRefresh();
                  }
                  setOnRefresh(false);
                }}
              />
            }
          />
        )
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {props.notFoundText ||
              I18n.t('warning_productions', {locale: language})}
          </Text>
        </View>
      )}
    </>
  );
}
