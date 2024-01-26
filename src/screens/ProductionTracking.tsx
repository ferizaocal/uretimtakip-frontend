import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header/Header';
import SearchResults from '../components/SearchResult/SearchResult';
import Button from '../components/Buttons/Default';

import ProductionTrackingCard from '../components/ProductionTrackingCard/ProductionTrackingCard';
import Label from '../components/Text/Label';
import I18n from '../lang/_i18n';
import FilterSvg from '../svg/FilterSvg';
import ListSvg from '../svg/ListSvg';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGripVertical} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../store';
import {AppActions} from '../store/slice/appSlice';
import OperationMenu from '../components/OperationMenu/OperationMenu';
import {
  OperationActions,
  fetchOperationsByActive,
} from '../store/slice/operationSlice';
import Container from '../components/Container/Container';
import useThemeColors from '../constant/useColor';

import CustomFlatList from '../components/Flatlist/CustomFlatList';
import {ProductionTrackingResponse} from '../dto/Response/ProductionTrackingResponse';
import {fetchProductionTrackings} from '../store/slice/productionTracking';
import ProductionExit from '../components/ProductionTracking/ProductionExit';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {CircleButton} from '../components/Buttons/CircleButton';
import ProductionTrackingSvg from '../svg/ProductionTrackingSvg';

export default function ProductionTracking(props: any) {
  const colors = useThemeColors();
  const dispatch = useDispatch<any>();
  const {language} = useSelector((state: AppState) => state.app);
  const {listType} = useSelector((state: AppState) => state.app);
  const operationLoading = useSelector(
    (state: AppState) => state.operation.pageLoading,
  );
  const {loading, productionTrackings} = useSelector(
    (state: AppState) => state.productionTracking,
  );
  const {selectedOperation, operations} = useSelector(
    (x: AppState) => x.operation,
  );

  const [opacity] = useState(new Animated.Value(0));
  const [pageAnimation] = useState(new Animated.Value(1));
  const [isFocused, setIsFocused] = useState<boolean>(false);

  var productionExitRef = useRef<BottomSheet>(null);
  const [productionExitShow, setProductionExitShow] = useState(false);
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      dispatch(fetchOperationsByActive());
      if (selectedOperation?.id) {
        loadGetProductTrackings();
      }
    });
  }, []);
  useEffect(() => {
    if (operations) {
      dispatch(OperationActions.setSelectedOperation(operations[0]));
    }
  }, [operations]);

  useEffect(() => {
    if (selectedOperation?.id) {
      loadGetProductTrackings();
    }
  }, [selectedOperation]);
  const loadGetProductTrackings = async () => {
    dispatch(fetchProductionTrackings(selectedOperation?.id));
  };
  const Section = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{marginTop: 15}}>
          <OperationMenu />
        </View>
        <View
          style={{
            marginTop: 15,
            marginBottom: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Label
            font="Raleway-Bold"
            sx={{fontSize: 15, color: '#5F5E70'}}
            label={I18n.t('homescreen_trackingtitle', {locale: language})}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  AppActions.setListType(listType === 'grid' ? 'list' : 'grid'),
                );
              }}
              activeOpacity={0.7}
              style={{marginRight: 10}}>
              {listType === 'grid' ? (
                <ListSvg />
              ) : (
                <FontAwesomeIcon color="#5F5E70" icon={faGripVertical} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Container isLoading={loading}>
          <CustomFlatList
            handleRefresh={() => {
              loadGetProductTrackings();
            }}
            contentInset={{bottom: 90}}
            style={{zIndex: 3, height: '90%'}}
            contentContainerStyle={{justifyContent: 'space-between'}}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={listType === 'grid' ? 2 : 1}
            data={productionTrackings}
            renderItem={({
              item,
              index,
            }: {
              item: ProductionTrackingResponse;
              index: number;
            }) => {
              return <ProductionTrackingCard item={item} key={index} />;
            }}
          />
        </Container>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.screenBackgroundColor,
        flex: 1,
      }}>
      <View style={{marginHorizontal: 20, flex: 1}}>
        <Header
          isSearchAppier={false}
          pageAnimation={pageAnimation}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          opacity={opacity}
          navigation={props.navigation}
        />
        <Container
          bgColor={colors.screenBackgroundColor}
          isLoading={operationLoading}>
          {isFocused ? <SearchResults opacity={opacity} /> : <Section />}
        </Container>
      </View>
      <CircleButton
        isSvg={true}
        onPress={() => setProductionExitShow(true)}
        icon={<ProductionTrackingSvg />}
      />
      {productionExitShow && (
        <ProductionExit
          ref={productionExitRef}
          handleClose={(value: boolean) => {
            productionExitRef.current?.close();
            setProductionExitShow(value);
          }}
          isOpen={productionExitShow}
          snapPoints={['90%']}
        />
      )}
    </SafeAreaView>
  );
}
