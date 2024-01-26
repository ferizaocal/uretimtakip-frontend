import React from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Label from '../Text/Label';
import dayjs from 'dayjs';
import ArrowRightSvg from '../../svg/ArrowRightSvg';
import I18n from '../../lang/_i18n';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import useThemeColors from '../../constant/useColor';
import {OrderResponse} from '../../dto/Response/OrderResponse';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {deleteOrderById} from '../../services/OrderService';

interface OrderCardProps {
  item?: OrderResponse;
  width?: any;
  handlePress?: () => void;
  handleDeletePress?: (id: number) => void;
}
export default function OrderCard(props: OrderCardProps) {
  const width = props.width
    ? props.width
    : Dimensions.get('window').width / 2 - 25;
  const {language} = useSelector((state: AppState) => state.app);
  const colors = useThemeColors();
  const {handlePress, item} = props;

  let totalQuantity =
    item?.orderItems?.reduce?.((total, item) => total + item.quantity, 0) || 0;
  return (
    <Pressable
      onPress={() => {
        handlePress?.();
      }}
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 10,
        width: width,
        marginBottom: 10,
      }}>
      <View
        style={{
          backgroundColor: colors.orderCardHeaderColor,
          height: 25,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginBottom: 10,
          borderTopLeftRadius: 10,
        }}>
        <Label
          label={I18n.t('homescreen_order_productcode', {locale: language})}
          font="Raleway-SemiBold"
          sx={{color: '#fff', fontSize: 11}}
        />
        <Label
          label={item?.productionCode || ''}
          font="Raleway-Bold"
          sx={{color: '#fff', fontSize: 13}}
        />
      </View>
      <View style={styles.col}>
        <Label
          label={I18n.t('homecreen_order_customer', {locale: language})}
          font="Raleway-Bold"
          sx={{color: '#594E3C', fontSize: 10}}
        />
        <Label
          label={
            item?.customerFirstName && item.customerLastName
              ? `${item?.customerFirstName} ${item?.customerLastName}`
              : '-'
          }
          font="Raleway-Bold"
          sx={{color: '#594E3C', fontSize: 10}}
        />
      </View>
      <View style={styles.col}>
        <Label
          label={I18n.t('homescreen_order_orderno', {locale: language})}
          font="Raleway-Bold"
          sx={{color: '#594E3C', fontSize: 10}}
        />
        <Label
          label={item?.id.toString() || '-'}
          font="Raleway-Bold"
          sx={{color: '#594E3C', fontSize: 10}}
        />
      </View>
      <View style={styles.col}>
        <Label
          label={I18n.t('homescreen_order_quantity', {locale: language})}
          sx={{
            fontFamily: 'Raleway-Bold',
            color: '#594E3C',
            fontSize: 10,
          }}
        />
        <Label
          label={totalQuantity.toString() || ''}
          sx={{
            fontFamily: 'Raleway-Bold',
            color: '#594E3C',
            fontSize: 10,
          }}
        />
      </View>
      <View style={styles.col}>
        <Label
          label={I18n.t('homescreen_order_date', {locale: language})}
          font="Raleway-Bold"
          sx={{color: '#594E3C', fontSize: 10}}
        />
        <Label
          label={dayjs(new Date(2011, 11, 11)).format('DD.MM.YYYY')}
          font="Raleway-SemiBold"
          sx={{color: '#594E3C', fontSize: 10, fontWeight: 'bold'}}
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
          width: '90%',
          backgroundColor: colors.headerBackground,
          height: 0.5,
        }}></View>
      <View
        style={{
          marginTop: 2,
          marginRight: 5,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Uyarı',
              `${item?.productionCode} ürün kodlu siparişi silmek istiyor musunuz?`,
              [
                {
                  text: 'İptal',
                },
                {
                  text: 'Sil',
                  onPress: async () => {
                    props.handleDeletePress?.(Number(item?.id));
                  },
                },
              ],
            );
          }}
          style={{
            width: 100,
            height: 30,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <FontAwesomeIcon color={colors.iconColor} icon={faTrash} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  col: {
    marginBottom: 6,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
