import React, {useEffect, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header/Header';
import SearchResults from '../../components/SearchResult/SearchResult';
import Label from '../../components/Text/Label';
import FilterSvg from '../../svg/FilterSvg';
import I18n from '../../lang/_i18n';
import {AppState} from '../../store';
import {useSelector} from 'react-redux';
import Container from '../../components/Container/Container';
import {CircleButton} from '../../components/Buttons/CircleButton';
import {faAngleRight, faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import RouteTypes from '../../types/RouteTypes';
import {getAllProductionCodes} from '../../services/ProductionCodeService';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import Col from '../../components/Cols/Col';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../../constant/useColor';
import ProductionCodeResponse from '../../dto/Response/ProductionCodeResponse';
export default function Product(props: any) {
  const colors = useThemeColors();
  const {language} = useSelector((state: AppState) => state.app);
  const [opacity] = useState(new Animated.Value(0));
  const [pageAnimation] = useState(new Animated.Value(1));
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([] as ProductionCodeResponse[]);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setLoading(true);
      loadProductionCodes();
    });
  }, []);
  const loadProductionCodes = async () => {
    await getAllProductionCodes()
      .then(res => {
        if (res.data.isSuccessful) {
          setProducts(res.data.list);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const Section = () => {
    return (
      <Container>
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 20,
            marginBottom: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Label
            font="Raleway-Bold"
            sx={{fontSize: 15, color: '#5f5e70'}}
            label={I18n.t('productscreen_title', {locale: language})}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <FilterSvg />
          </TouchableOpacity>
        </View>
        <Container mx={20} isLoading={loading} pt={5}>
          <CustomFlatList
            filter={(
              item: ProductionCodeResponse,
              search: string,
              index: number,
            ) => {
              return item?.code?.toLowerCase().includes(search.toLowerCase());
            }}
            handleRefresh={async () => {
              setLoading(true);
              await loadProductionCodes();
            }}
            data={products}
            notFoundText="No products found"
            renderItem={({item, index}: any) => {
              return (
                <Col
                  onPress={() => {
                    props.navigation.navigate(
                      RouteTypes.PRODUCT_DETAIL_SCREEN,
                      {
                        item: item,
                      },
                    );
                  }}
                  mb={3}
                  activeOpacity={0.8}
                  key={index}
                  name={`${item.code}`}
                  icon={
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate(
                          RouteTypes.PRODUCT_DETAIL_SCREEN,
                          {
                            item: item,
                          },
                        );
                      }}
                      hitSlop={15}
                      activeOpacity={0.7}>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        color={colors.iconColor}
                        size={20}
                      />
                    </TouchableOpacity>
                  }
                />
              );
            }}
          />
        </Container>
        <CircleButton
          onPress={() => {
            props.navigation.navigate(RouteTypes.ADD_PRODUCT_SCREEN);
          }}
          icon={faPlus}
        />
      </Container>
    );
  };
  return (
    <SafeAreaView
      style={{backgroundColor: colors.screenBackgroundColor, flex: 1}}>
      <View style={{marginHorizontal: 20}}>
        <Header
          isSearchAppier={false}
          pageAnimation={pageAnimation}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          opacity={opacity}
          navigation={props.navigation}
        />
      </View>
      {isFocused ? <SearchResults opacity={opacity} /> : <Section />}
    </SafeAreaView>
  );
}
