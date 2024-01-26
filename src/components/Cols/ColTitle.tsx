import {View, Text} from 'react-native';
import React from 'react';
import Label from '../Text/Label';

const ColTitle = (props: {name: string; marginTop?: number}) => {
  var marginTop = props.marginTop ? props.marginTop : 10;
  return (
    <View style={{paddingVertical: 5, marginTop: marginTop, marginBottom: 5}}>
      <Label
        font="Raleway-Bold"
        sx={{
          color: '#D8B267',
          fontSize: 16,
        }}
        label={props.name}
      />
    </View>
  );
};
export default ColTitle;
