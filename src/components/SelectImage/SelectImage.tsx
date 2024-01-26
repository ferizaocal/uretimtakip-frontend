import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera, faClose, faImage} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

interface SelectImageProps {
  selectedImage: ImagePickerResponse;
  setSelectedImage: (pickerImage: ImagePickerResponse) => void;
}

export default function SelectImage(props: SelectImageProps) {
  const colors = useThemeColors();
  const {selectedImage, setSelectedImage} = props;
  const handleLaunchCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        includeBase64: true,
      },
      async response => {
        if (response.didCancel) {
        } else if (response.errorMessage) {
        } else {
          if (response.assets) {
            setSelectedImage(response);
          }
        }
      },
    );
  };

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 1,
      },
      async response => {
        if (response.didCancel) {
        } else if (response.errorMessage) {
        } else {
          if (response.assets) {
            setSelectedImage(response);
          }
        }
      },
    );
  };
  return Object.keys(selectedImage).length === 0 ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={handleImagePicker}
        activeOpacity={0.7}
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon size={50} color={colors.iconColor} icon={faImage} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLaunchCamera}
        activeOpacity={0.7}
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon size={50} color={colors.iconColor} icon={faCamera} />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{height: 150, width: 150, resizeMode: 'contain'}}
        source={{
          uri:
            selectedImage.assets != undefined
              ? selectedImage.assets[0].uri
              : '',
        }}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setSelectedImage({})}
        style={{
          height: 30,
          width: 30,
          backgroundColor: '#fff',
          shadowColor: '#333',
          shadowOffset: {
            height: 2,
            width: 1,
          },
          shadowOpacity: 0.13,
          shadowRadius: 3.84,
          position: 'absolute',
          top: 0,
          right: 90,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon icon={faClose} />
      </TouchableOpacity>
    </View>
  );
}
