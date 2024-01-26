import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Label from '../Text/Label';

interface ColProps extends TouchableOpacityProps {
  leftIcon?: any;
  name?: string;
  nameColor?: string;
  icon?: any;
  active?: boolean;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  flex?: number;
}
const Col = (props: ColProps) => {
  const opacityColor = props.active ? '#CCCCCC80' : '#fff';
  return (
    <TouchableOpacity
      {...props}
      style={{
        marginHorizontal: props.mx || 0,
        marginVertical: props.my || 0,
        marginTop: props.mt || 0,
        marginBottom: props.mb || 0,
        marginLeft: props.ml || 0,
        marginRight: props.mr || 0,
        borderRadius: 7,
        paddingHorizontal: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        paddingVertical: 10,
        backgroundColor: opacityColor,
        flex: props.flex || 0,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.leftIcon}
        <Label
          font="Raleway-Bold"
          sx={{
            marginLeft: 10,
            color: props?.nameColor || '#5F5E70',
            fontSize: 16,
          }}
          label={props.name ? props.name : ''}
        />
      </View>
      {props.icon}
    </TouchableOpacity>
  );
};
export default Col;
