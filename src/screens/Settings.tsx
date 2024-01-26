import React, {useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableOpacityProps,
  Pressable,
} from 'react-native';

import {faAngleRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import I18n from '../lang/_i18n';
import Label from '../components/Text/Label';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Popover from '../components/Popover/Popover';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../store';
import {AppActions} from '../store/slice/appSlice';
import {
  SettingList_Language,
  SettingList_Operations,
  SettingList_Production,
} from '../utils/Data';
import ColTitle from '../components/Cols/ColTitle';
import ColBackground from '../components/Cols/ColBackground';
import Col from '../components/Cols/Col';
import Container from '../components/Container/Container';
import Header from '../components/Header/ScreenHeader';

export default function Settings(props: any) {
  const popoverRef = useRef<any>(null);
  const {language} = useSelector((x: AppState) => x.app);
  const {roles} = useSelector((x: AppState) => x.role);
  const dispatch = useDispatch();
  const handleOpenPopover = () => {
    if (popoverRef.current) {
      popoverRef.current.openPopover();
    }
  };
  const handleClosePopover = () => {
    if (popoverRef.current) {
      popoverRef.current.closePopover();
    }
  };
  const SelectedLanguage = () =>
    SettingList_Language.find(x => x.shortName === language);
  return (
    <Container>
      <Header title="settings" />
      <Container mx={20} mt={15}>
        <ColTitle
          name={I18n.t('settingsscreen_production_Title', {locale: language})}
        />
        <ColBackground>
          {SettingList_Production({lang: language}).map((item, index) => (
            <Col
              onPress={() => props.navigation.navigate(item.route)}
              key={index}
              name={item.name}
              icon={
                <FontAwesomeIcon
                  icon={faAngleRight}
                  color="#D8B267"
                  size={25}
                />
              }
            />
          ))}
        </ColBackground>
        <ColTitle
          name={I18n.t('settingsscreen_operations_title', {locale: language})}
        />
        <ColBackground>
          {SettingList_Operations({lang: language}).map((item, index) => (
            <Col
              onPress={() => props.navigation.navigate(item.route)}
              key={index}
              name={item.name}
              icon={
                <FontAwesomeIcon
                  icon={faAngleRight}
                  color="#D8B267"
                  size={25}
                />
              }
            />
          ))}
        </ColBackground>
        <ColTitle name={I18n.t('settingscreen_language', {locale: language})} />
        <ColBackground>
          <Col
            onPress={handleOpenPopover}
            name={SelectedLanguage()?.name}
            icon={SelectedLanguage()?.icon}
          />
        </ColBackground>
      </Container>
      <Popover popoverRef={popoverRef}>
        <View style={styles.popoverHeader}>
          <Label
            font="Raleway-SemiBold"
            sx={{
              fontSize: 16,
              color: '#5F5E70',
            }}
            label={I18n.t('settingscreen_popover_language', {
              locale: language,
            })}></Label>
          <Pressable onPress={() => handleClosePopover()}>
            <Label
              sx={{
                fontSize: 15,
                color: '#5F5E70',
              }}
              label={I18n.t('bottomtab_popover_close', {
                locale: language,
              })}></Label>
          </Pressable>
        </View>
        <View style={styles.popoverItem}>
          {SettingList_Language.map((button, index) => (
            <FlagButton
              onPress={() => {
                dispatch(AppActions.setLanguage(button.shortName));
                handleClosePopover();
              }}
              key={index}
              icon={button.icon}
              label={button.name}
              isActive={button.shortName === language}
            />
          ))}
        </View>
      </Popover>
    </Container>
  );
}
interface ProductionButtonProps extends TouchableOpacityProps {
  label: string;
  icon?: any;
  isActive?: boolean;
}
const FlagButton = (props: ProductionButtonProps) => {
  const {label, icon, ...rest} = props;
  return (
    <TouchableOpacity
      {...rest}
      style={{
        ...styles.flagButton,
        backgroundColor: '#f2f2f2',
        borderColor: props.isActive ? '#111' : '#f2f2f2',
        borderWidth: 0.5,
      }}>
      {icon}
      <Label
        font="Raleway-Bold"
        sx={{
          fontSize: 8,
          color: '#333',
          marginTop: 5,
        }}
        label={label}></Label>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  col: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverHeader: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popoverItem: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flagButton: {
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});
