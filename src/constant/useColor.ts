import useColorScheme from './colorScheme';

const Colors = {
  light: {
    screenBackgroundColor: '#f0ebe5',
    productionTrackindBottomBgColor: '#C7BAAD',
    orderCardHeaderColor: '#C7BAAD',
    primary: '#87575c',
    textColor: '#f0ebe5',
    headerColor: '#D7C9BC',
    menuBackground: '#d1dfbb',
    headerBackground: '#d1dfbb',
    menuIcon: '#87575c',
    addButton: '#87575c',
    saveButton: '#87575c',
    backgroundColor: 'f0ebe5',
    loadingColor: '#87575c',
    iconColor: '#87575c',
    drawerContentBgColor: '#d1dfbb',
    borderColor: '#C9C9C9',
    inputColor: '#5F5E70',
    textWhite: '#fff',
  },
  dark: {
    screenBackgroundColor: '#f5f5f5',
    productionTrackindBottomBgColor: '#C7BAAD',
    orderCardHeaderColor: '#C7BAAD',
    primary: '#87575c',
    textColor: '#f0ebe5',
    headerColor: '#D7C9BC',
    menuBackground: '#d1dfbb',
    headerBackground: '#d1dfbb',
    menuIcon: '#87575c',
    addButton: '#87575c',
    saveButton: '#87575c',
    backgroundColor: '#f0ebe5',
    drawerContentBgColor: '#d1dfbb',
    loadingColor: '#87575c',
    iconColor: '#87575c',
    borderColor: '#C9C9C9',
    inputColor: '#5F5E70',
    textWhite: '#fff',
  },
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
};

export default useThemeColors;
