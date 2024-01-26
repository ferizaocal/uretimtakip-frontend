import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';
import Label from '../../components/Text/Label';
import I18n from '../../lang/_i18n';
import {AppState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import useThemeColors from '../../constant/useColor';
import {deleteOrderById, getOrders} from '../../services/OrderService';
import {OrderResponse} from '../../dto/Response/OrderResponse';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import {fetchOrders} from '../../store/slice/homeSlice';
export default function Orders() {
  const colors = useThemeColors();
  const dispatch = useDispatch<any>();
  const {language} = useSelector((state: AppState) => state.app);
  const orders = useSelector((state: AppState) => state.home.orders);

  const loadOrders = async () => {
    dispatch(fetchOrders());
  };

  return (
    <View
      style={
        orders.length === 0
          ? {flex: 1, alignItems: 'center', justifyContent: 'center'}
          : {}
      }>
      {orders?.length > 0 ? (
        <>
          <View style={styles.col}>
            <Label
              font="Raleway-Bold"
              sx={{
                color: '#5F5E70',
                fontSize: 15,
              }}
              label={I18n.t('homescreen_ordertitle', {locale: language})}
            />
            <Label
              font="Raleway-Bold"
              sx={{color: '#D8B267', fontSize: 12}}
              label={I18n.t('global_viewall', {locale: language})}
            />
          </View>
          <CustomFlatList
            onScroll={() => {}}
            scrollEventThrottle={16}
            bounces={false}
            snapToInterval={
              orders?.length === 1
                ? Dimensions.get('screen').width
                : Dimensions.get('screen').width / 2 - 25
            }
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            sort={(a: OrderResponse, b: OrderResponse) => {
              return b.id - a.id;
            }}
            handleRefresh={async () => {
              await loadOrders();
            }}
            data={[...orders]}
            renderItem={({item}: {item: OrderResponse}) => {
              return (
                <OrderCard
                  handleDeletePress={async (id: number) => {
                    await deleteOrderById(id).then(res => {
                      loadOrders();
                      dispatch(fetchOrders());
                    });
                  }}
                  item={item}
                  width={
                    orders?.length === 1
                      ? Dimensions.get('screen').width - 40
                      : Dimensions.get('screen').width / 2 - 25
                  }
                />
              );
            }}
          />
        </>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: colors.iconColor}}>
            Sipariş Bulunamadı
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  col: {
    marginTop: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
