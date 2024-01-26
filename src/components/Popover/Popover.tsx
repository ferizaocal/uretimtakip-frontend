import React, {useState, useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import useThemeColors from '../../constant/useColor';

interface IPopoverProps {
  children: React.ReactNode;
  popoverRef: React.MutableRefObject<IPopoverRef | null>;
}

interface IPopoverRef {
  openPopover: () => void;
  closePopover: () => void;
}

const Popover: React.FC<IPopoverProps> = props => {
  const [showPopover, setShowPopover] = useState(false);
  const {children, popoverRef} = props;
  const translateYAnimated = useRef(new Animated.Value(-100)).current;
  const opacityAnimated = useRef(new Animated.Value(0)).current;
  const colors = useThemeColors();

  useEffect(() => {
    return () => {
      closePopover();
    };
  }, []);

  const openPopover = () => {
    setShowPopover(true);
    Animated.spring(translateYAnimated, {
      toValue: 1,
      speed: 5,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnimated, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePopover = () => {
    Animated.parallel([
      Animated.timing(translateYAnimated, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowPopover(false));
  };

  useEffect(() => {
    props.popoverRef.current = {
      openPopover,
      closePopover,
    };
  }, [popoverRef]);

  if (!showPopover) return null;
  return (
    <View style={styles.bgContainer}>
      <Animated.View
        style={[
          styles.popoverContainer,
          {
            transform: [{translateY: translateYAnimated}],
            opacity: opacityAnimated,
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

export default Popover;

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    zIndex: 99,
    width: '100%',
    height: Dimensions.get('window').height - 70,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  popoverContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,

    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    padding: 10,

    zIndex: 100,
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
});
