import {View, Text} from 'react-native';
import React from 'react';
import {Switch, SwitchProps} from 'react-native-switch';
import Label from '../Text/Label';
interface SwitchProp extends SwitchProps {
  label?: string;
}
export default function CustomSwitch(props: SwitchProp) {
  const {label} = props;
  return (
    <>
      {label && (
        <Label
          label={label}
          font="Raleway-Bold"
          sx={{
            fontSize: 15,
            color: '#868686',
          }}
        />
      )}
      <View
        style={{
          backgroundColor: '#f2f2f2',
          width: 80,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          borderRadius: 100,
          marginTop: 10,
        }}>
        <Switch
          {...props}
          disabled={false}
          activeText={'On'}
          inActiveText={'Off'}
          circleSize={30}
          barHeight={1}
          circleBorderWidth={1}
          circleBorderInactiveColor="#7D8699"
          circleBorderActiveColor="#40A372"
          backgroundActive={'#f2f2f2'}
          backgroundInactive={'#f2f2f2'}
          circleActiveColor={'#40A372'}
          circleInActiveColor={'#7D8699'}
          changeValueImmediately={true}
          innerCircleStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2}
          switchRightPx={2}
          switchWidthMultiplier={2}
          switchBorderRadius={30}
        />
      </View>
    </>
  );
}
