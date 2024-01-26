import TurkeyFlagSvg from '../svg/Flags/TurkeyFlagSvg';
import EnglishFlagSvg from '../svg/Flags/EnglishFlagSvg';
import GermanyFlagSvg from '../svg/Flags/GermanyFlagSvg';
import I18n from '../lang/_i18n';
import ChinaFlagSvg from '../svg/Flags/ChinaFlagSvg';
import RouteTypes from '../types/RouteTypes';
import BabyPijamaSvg from '../svg/Clothes/BabyPijamaSvg';
import TshirtSvg from '../svg/Clothes/TshirtSvg';
import JeansPantsSvg from '../svg/Clothes/JeansPantsSvg';
import JacketSvg from '../svg/Clothes/JacketSvg';
import SkirtSvg from '../svg/Clothes/SkirtSvg';

export const SettingList_Production = ({lang}: {lang: string}) => [
  {
    name: I18n.t('settingsscreen_productions', {locale: lang}),
    route: RouteTypes.PRODUCTIONS_SCREEN,
  },
  {
    name: I18n.t('settingsscreen_production_agegroup', {locale: lang}),
    route: RouteTypes.AGE_GROUPS_SCREEN,
  },
];
export const SettingList_Operations = ({lang}: {lang: string}) => [
  {
    name: I18n.t('settingsscreen_operations', {locale: lang}),
    route: RouteTypes.OPERATIONS_SCREEN,
  },
];
export const SettingList_Language = [
  {
    shortName: 'tr',
    name: 'Türkçe',
    icon: <TurkeyFlagSvg />,
  },
  {
    shortName: 'en',
    name: 'English',
    icon: <EnglishFlagSvg />,
  },
  {
    shortName: 'de',
    name: 'Deutsch',
    icon: <GermanyFlagSvg />,
  },
  {
    shortName: 'zh',
    name: '中文',
    icon: <ChinaFlagSvg />,
  },
];
//Production Model
export const Clothes = [
  {
    name: 'Bebek Pijama',
    iconName: (iconColor?: string) => (
      <BabyPijamaSvg color={iconColor ? iconColor : '#fff'} />
    ),
  },
  {
    name: 'Tişört',
    iconName: (iconColor?: string) => (
      <TshirtSvg color={iconColor ? iconColor : '#fff'} />
    ),
  },
  {
    name: 'Pantolon',
    iconName: (iconColor?: string) => (
      <JeansPantsSvg color={iconColor ? iconColor : '#fff'} />
    ),
  },
  {
    name: 'Ceket',
    iconName: (iconColor?: string) => (
      <JacketSvg color={iconColor ? iconColor : '#fff'} />
    ),
  },
  {
    name: 'Etek',
    iconName: (iconColor?: string) => (
      <SkirtSvg color={iconColor ? iconColor : '#fff'} />
    ),
  },
];
export const getFindIconByName = (name: string, iconColor?: string) => {
  return Clothes.find(x => x.name === name)?.iconName(iconColor);
};

// ICON
export const TextileImage = require('../../assets/image/tekstil-removebg-preview.png');
