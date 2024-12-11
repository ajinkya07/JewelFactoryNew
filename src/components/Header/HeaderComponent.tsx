import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Observer} from 'mobx-react';
import IconPack from '../../utils/IconPack';
import {colors} from '../../utils/colors';
import {styles} from './HeaderComponent.styles';
import BackHeader from '../BackHeader';
import RootStore from '../../stores/RootStore';

const HeaderComponent = ({
  isBack = true,
  text,
  onBackPress,
  textStyle,
  rightIcon1,
  rightIcon2,
  rightIcon3,
  rightIcon4,
  headerOuterContentStyle,
  showAppIcon = false,
  onFirstIconPress,
  onSecondIconPress,
  onThirdIconPress,
  onFourthIconPress,
}: any) => {
  const navigation = useNavigation();

  const onPressContactUs = () => {
    onFirstIconPress()
      ? onFirstIconPress()
      : RootStore.appStore.setFields('isContactUsModalVisible', true);
  };

  return (
    <Observer>
      {() => (
        <>
          <View style={styles.headerStyle}>
            {isBack && (
              // @ts-ignore
              <BackHeader />
            )}
            {showAppIcon && !isBack && (
              <Image
                source={IconPack.APP_LOGO}
                style={{width: 50, height: 50, marginLeft: 10}}
                resizeMode="contain"
              />
            )}
            <View
              style={{
                ...styles.headerInnerContentStyle,
                ...headerOuterContentStyle,
              }}>
              <Text style={{...styles.headerText, ...textStyle}}>{text}</Text>
            </View>

            <View style={styles.flexRow}>
              {rightIcon1 && (
                <TouchableOpacity
                  onPress={onPressContactUs}
                  style={{marginHorizontal: 12}}>
                  <Image
                    style={styles.imageIconStyle}
                    resizeMode="contain"
                    source={IconPack.HEADPHONE}
                  />
                </TouchableOpacity>
              )}
              {rightIcon2 && (
                <TouchableOpacity
                  onPress={() => onSecondIconPress()}
                  style={{marginHorizontal: 12}}>
                  <Image
                    style={styles.imageIconStyle}
                    resizeMode="contain"
                    source={IconPack.SEARCH}
                  />
                </TouchableOpacity>
              )}
              {rightIcon3 && (
                <TouchableOpacity
                  onPress={() => onThirdIconPress()}
                  style={{marginHorizontal: 12}}>
                  <Image
                    style={styles.imageIconStyle}
                    resizeMode="contain"
                    source={IconPack.WISHLIST}
                  />
                  <View style={styles.wishlistCount}>
                    <Text style={styles.wishlistCountText}>2</Text>
                  </View>
                </TouchableOpacity>
              )}
              {rightIcon4 && (
                <TouchableOpacity
                  onPress={() => onFourthIconPress()}
                  style={{marginHorizontal: 12}}>
                  <Image
                    style={styles.imageIconStyle}
                    resizeMode="contain"
                    source={IconPack.CART}
                  />
                  <View style={styles.wishlistCount}>
                    <Text style={styles.wishlistCountText}>2</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              borderBottomColor: colors.divider,
              borderBottomWidth: 0.7,
            }}
          />
        </>
      )}
    </Observer>
  );
};

export default HeaderComponent;
