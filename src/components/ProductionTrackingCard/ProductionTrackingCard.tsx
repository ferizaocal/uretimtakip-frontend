import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  PressableProps,
  Dimensions,
} from 'react-native';
import React from 'react';
import Label from '../Text/Label';
import dayjs from 'dayjs';
import AngleRightSvg from '../../svg/AngleRightSvg';
import WashingSvg from '../../svg/WashingSvg';
import MeterSvg from '../../svg/MeterSvg';
import AgeGroupSvg from '../../svg/AgeGroupSvg';
import I18n from '../../lang/_i18n';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import useThemeColors from '../../constant/useColor';
import {ProductionTrackingResponse} from '../../dto/Response/ProductionTrackingResponse';
import {getOperationIcon} from '../../utils/Helper';

interface ProductionTrackingCardProps extends PressableProps {
  item: ProductionTrackingResponse;
}

export default function ProductionTrackingCard({
  ...props
}: ProductionTrackingCardProps) {
  const {listType} = useSelector((state: AppState) => state.app);

  return listType === 'list' ? (
    <ListCard {...props} />
  ) : (
    <GridCard {...props} />
  );
}
const GridCard = (props: any) => {
  const colors = useThemeColors();
  const {language} = useSelector((state: AppState) => state.app);
  const item: ProductionTrackingResponse = props.item;
  const user = useSelector((state: AppState) => state.auth.user);
  const isAdmin = user?.roles?.find(x => x.name.includes('Admin'));
  return (
    <Pressable {...props} style={styles.container}>
      <View style={{margin: 10}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 7,
          }}>
          <View style={styles.imageContainer}></View>
        </View>
        <View style={styles.col}>
          <Label
            label={I18n.t('homescreen_tracking_productcode', {
              locale: language,
            })}
            font="Raleway-Bold"
            sx={{color: '#594E3C', fontSize: 10}}
          />
          <Label
            label={item?.productionCode?.code || '-'}
            font="Raleway-Bold"
            sx={{color: '#594E3C', fontSize: 10}}
          />
        </View>
        <View style={styles.col}>
          <Label
            label={I18n.t('homescreen_tracking_partyno', {locale: language})}
            font="Raleway-Bold"
            sx={{color: '#594E3C', fontSize: 10}}
          />
          <Label
            label={item?.partyNumber?.toString() || '-'}
            font="Raleway-Bold"
            sx={{color: '#594E3C', fontSize: 10}}
          />
        </View>
        <View style={styles.col}>
          <Label
            label={I18n.t('homescreen_tracking_quantity', {locale: language})}
            font="Raleway-Bold"
            sx={{color: '#594E3C', fontSize: 10}}
          />
          <Label
            label={item?.totalQuantity?.toString() || '-'}
            font="Raleway-Bold"
            sx={{color: '#594E3C', fontSize: 10}}
          />
        </View>
        <View style={{...styles.col, marginBottom: 0}}>
          <Label
            label={I18n.t('homescreen_tracking_date', {locale: language})}
            font="Raleway-Bold"
            sx={{color: '#594E3C', fontSize: 10}}
          />
          <Label
            label={dayjs(item?.createdDate).format('DD.MM.YYYY')}
            font="Raleway-SemiBold"
            sx={{
              color: '#594E3C',
              fontSize: 10,
              fontWeight: 'bold',
              fontStyle: 'normal',
            }}
          />
        </View>
      </View>
      <View
        style={[
          styles.info,
          {backgroundColor: colors.productionTrackindBottomBgColor},
        ]}>
        <TouchableOpacity
          activeOpacity={isAdmin ? 0.7 : 1}
          style={[styles.infoCol, styles.infoColBottomWidth]}>
          <View style={styles.tracking}>
            {getOperationIcon(
              item?.userOperation?.operation?.operationName,
              17,
              20,
            )}
            <View style={styles.trackingInfo}>
              <Label
                label={
                  item?.userOperation
                    ? `${item?.userOperation?.firstName} ${item?.userOperation?.lastName}`
                    : '-'
                }
                font="Raleway-Bold"
                sx={{color: '#594E3C', fontSize: 9}}
              />
              <Label
                label={dayjs(item?.userOperation?.createdDate).format(
                  'DD.MM.YYYY',
                )}
                font="Raleway-SemiBold"
                sx={{
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                }}
              />
            </View>
          </View>
          <View style={styles.trackingButton}>
            {isAdmin && <AngleRightSvg />}
          </View>
        </TouchableOpacity>
        <View style={[styles.infoCol]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MeterSvg />
            <Label
              label={`${item?.totalMetre?.toFixed(2)}m`}
              font="Raleway-Bold"
              sx={{color: '#fff', fontSize: 9, marginLeft: 5}}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AgeGroupSvg />
            <Label
              label={`${item?.ageGroup ? item?.ageGroup?.age : '-'} ${I18n.t(
                'homescreen_tracking_age',
                {
                  locale: language,
                },
              )}`}
              font="Raleway-Bold"
              sx={{color: '#fff', fontSize: 9, marginLeft: 5}}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const ListCard = (props: any) => {
  const {language} = useSelector((state: AppState) => state.app);
  const colors = useThemeColors();
  const item: ProductionTrackingResponse = props.item;
  const user = useSelector((state: AppState) => state.auth.user);
  const isAdmin = user?.roles?.find(x => x.name.includes('Admin'));
  return (
    <Pressable {...props} style={styles.containerList}>
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={styles.imageContainerList}></View>
        </View>

        <View style={styles.rightList}>
          <View style={styles.rightTop}>
            <View style={styles.colList}>
              <Label
                label={I18n.t('homescreen_tracking_productcode', {
                  locale: language,
                })}
                font="Raleway-Bold"
                sx={{color: '#594E3C', fontSize: 10}}
              />
              <Label
                label={item?.productionCode?.code || '-'}
                font="Raleway-Bold"
                sx={{color: '#594E3C', fontSize: 10}}
              />
            </View>
            <View style={styles.colList}>
              <Label
                label={I18n.t('homescreen_tracking_partyno', {
                  locale: language,
                })}
                font="Raleway-Bold"
                sx={{color: '#594E3C', fontSize: 10}}
              />
              <Label
                label={item?.partyNumber?.toString() || '-'}
                font="Raleway-Bold"
                sx={{color: '#594E3C', fontSize: 10}}
              />
            </View>
            <View style={styles.colList}>
              <Label
                label={I18n.t('homescreen_tracking_quantity', {
                  locale: language,
                })}
                font="Raleway-Bold"
                sx={{color: '#594E3C', fontSize: 10}}
              />
              <Label
                label={item?.totalQuantity?.toString() || '-'}
                font="Raleway-Bold"
                sx={{color: '#594E3C', fontSize: 10}}
              />
            </View>
            <View style={{...styles.colList, marginBottom: 0}}>
              <Label
                label={I18n.t('homescreen_tracking_date', {locale: language})}
                font="Raleway-Bold"
                sx={{color: '#594E3C', fontSize: 10}}
              />
              <Label
                label={dayjs(item?.createdDate).format('DD.MM.YYYY')}
                font="Raleway-SemiBold"
                sx={{
                  color: '#594E3C',
                  fontSize: 10,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                }}
              />
            </View>
          </View>
          <View style={styles.rightBottom}>
            <View
              style={[
                styles.infoList,
                {backgroundColor: colors.productionTrackindBottomBgColor},
              ]}>
              <TouchableOpacity
                activeOpacity={isAdmin ? 0.7 : 1}
                style={[styles.infoCol, styles.infoColBottomWidth]}>
                <View style={styles.tracking}>
                  {getOperationIcon(
                    item?.userOperation?.operation?.operationName,
                    17,
                    20,
                  )}
                  <View style={styles.trackingInfo}>
                    <Label
                      label={
                        item?.userOperation?.firstName &&
                        item?.userOperation?.lastName
                          ? `${item?.userOperation?.firstName} ${item?.userOperation?.lastName}`
                          : item?.userOperation?.operation?.operationName
                      }
                      font="Raleway-Bold"
                      sx={{color: '#594E3C', fontSize: 9}}
                    />
                    <Label
                      label={dayjs(item?.userOperation?.createdDate).format(
                        'DD.MM.YYYY',
                      )}
                      font="Raleway-SemiBold"
                      sx={{
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    ...styles.trackingButton,
                    alignItems: 'center',
                    marginRight: 3,
                  }}>
                  {isAdmin && <AngleRightSvg />}
                </View>
              </TouchableOpacity>
              <View style={[{...styles.infoCol, marginRight: 15}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MeterSvg />
                  <Label
                    label={`${item?.totalMetre?.toFixed(2)}m`}
                    font="Raleway-Bold"
                    sx={{color: '#fff', fontSize: 9, marginLeft: 5}}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AgeGroupSvg />
                  <Label
                    label={`1-3 ${I18n.t('homescreen_tracking_age', {
                      locale: language,
                    })}`}
                    font="Raleway-Bold"
                    sx={{color: '#fff', fontSize: 9, marginLeft: 5}}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width / 2 - 25,
    height: 225,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  containerList: {
    marginRight: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width - 25,
    height: 150,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  imageContainer: {
    width: 150,
    height: 65,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
  imageContainerList: {
    width: 130,
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
  rightList: {
    flex: 1,
    marginLeft: 5,
  },
  rightTop: {
    marginLeft: 5,
  },
  rightBottom: {
    marginTop: 12,
  },
  col: {
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colList: {
    marginRight: 20,

    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',

    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
  },
  infoList: {
    justifyContent: 'center',
    flexDirection: 'column',

    paddingHorizontal: 5,
    paddingBottom: 4,
  },
  infoCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoColBottomWidth: {
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
  },
  tracking: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
  },
  trackingInfo: {
    paddingLeft: 5,
    flexDirection: 'column',
  },
  trackingButton: {
    flex: 0.15,
  },
});
