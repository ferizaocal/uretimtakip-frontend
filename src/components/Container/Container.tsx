import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import useThemeColors from '../../constant/useColor';
import Loading from '../Loading/Loading';

interface ContainerProps {
  bgColor?: string;
  children?: any;
  isLoading?: boolean;
  loadingColor?: string;
  postLoading?: boolean;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  h?: any;
  flex?: number;
}

export default function Container(props: ContainerProps) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        backgroundColor: props.bgColor
          ? props.bgColor
          : colors.screenBackgroundColor,
        flex: props.flex ? props.flex : 1,
        marginHorizontal: props.mx ? props.mx : 0,
        marginVertical: props.my ? props.my : 0,
        marginTop: props.mt ? props.mt : 0,
        marginBottom: props.mb ? props.mb : 0,
        paddingHorizontal: props.px ? props.px : 0,
        paddingVertical: props.py ? props.py : 0,
        paddingTop: props.pt ? props.pt : 0,
        paddingBottom: props.pb ? props.pb : 0,
        height: props.h ? props.h : 'auto',
      }}>
      {props.isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            color={props.loadingColor || colors.loadingColor}
            size="small"
          />
        </View>
      ) : (
        <>
          {props.postLoading && <Loading />}
          {props.children}
        </>
      )}
    </View>
  );
}
