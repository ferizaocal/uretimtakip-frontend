import React, {useEffect, useState} from 'react';
import {Animated, View} from 'react-native';
import Label from '../Text/Label';
import I18n from '../../lang/_i18n';
import {AppState} from '../../store';
import {useSelector} from 'react-redux';

interface SearchResultsProps {
  opacity: Animated.Value;
}
const SearchResults = (props: SearchResultsProps) => {
  const {language} = useSelector((state: AppState) => state.app);
  const {opacity} = props;
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    return Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{opacity}}>
      <View>
        <Label
          font="Raleway-Bold"
          sx={{marginTop: 15, color: '#5F5E70', fontSize: 15}}
          label={I18n.t('homescreen_searchresult_title', {locale: language})}
        />
      </View>
    </Animated.View>
  );
};

export default SearchResults;
