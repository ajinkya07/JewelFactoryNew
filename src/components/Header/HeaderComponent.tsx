import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Observer} from 'mobx-react';
import IconPack from '../../utils/IconPack';
import {colors} from '../../utils/colors';
import {styles} from './HeaderComponent.styles';
import BackHeader from '../BackHeader';
import RootStore from '../../stores/RootStore';
import Divider from '../Divider';
import {strings} from '../../utils/strings';

const HeaderComponent = ({
  isBack = true,
  text,
  onBackPress,
  textStyle,
  rightIcon1 = true,
  rightIcon2,
  rightIcon3,
  rightIcon4,
  headerOuterContentStyle,
  showAppIcon = false,
  onFirstIconPress,
  onThirdIconPress,
  onFourthIconPress,
  onBellIconPress,
  showDivider = true,
}: any) => {
  const navigation = useNavigation();

  const onPressContactUs = () => {
    onFirstIconPress
      ? onFirstIconPress()
      : RootStore.appStore.setFields('isContactUsModalVisible', true);
  };
  const onSearchIconPress = () => {
    RootStore.homeStore.setFields('isSearchModalVisible', true);
  };

  const navigateToCart = () => {
    // @ts-ignore
    onFourthIconPress ? onFourthIconPress() : navigation.navigate('Cart');
    RootStore.cartStore.callCartWishlistApis();
  };

  return (
    <Observer>
      {() => (
        <>
          <View style={styles.headerStyle}>
            {isBack && (
              // @ts-ignore
              <BackHeader onPress={onBackPress} />
            )}
            {showAppIcon && !isBack && (
              <View style={styles.flexRow}>
                {/* <Image
                  source={IconPack.APP_LOGO}
                  style={{width: 50, height: 50, marginLeft: 10}}
                  resizeMode="contain"
                /> */}
                <Text style={styles.appname}>{strings.appName}</Text>
              </View>
            )}
            <View
              style={{
                ...styles.headerInnerContentStyle,
                ...headerOuterContentStyle,
              }}>
              <Text style={{...styles.headerText, ...textStyle}}>{text}</Text>
            </View>

            <View style={styles.flexRow}>
              {rightIcon2 && (
                <TouchableOpacity
                  onPress={onSearchIconPress}
                  style={{marginHorizontal: 8}}>
                  <Image
                    style={styles.iconStyle}
                    resizeMode="contain"
                    source={IconPack.SEARCH}
                  />
                </TouchableOpacity>
              )}
              {rightIcon3 && (
                <TouchableOpacity
                  onPress={() => onThirdIconPress()}
                  style={{marginHorizontal: 8}}>
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
                  onPress={() => onBellIconPress()}
                  style={{marginHorizontal: 8}}>
                  <Image
                    style={styles.imageIconStyle}
                    resizeMode="contain"
                    source={IconPack.BELL}
                  />
                </TouchableOpacity>
              )}
              {rightIcon1 && (
                <TouchableOpacity
                  onPress={onPressContactUs}
                  style={{marginHorizontal: 8}}>
                  <Image
                    style={styles.imageIconStyle}
                    resizeMode="contain"
                    source={IconPack.HEADPHONE}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {showDivider && <Divider style={styles.divider} />}
        </>
      )}
    </Observer>
  );
};

export default HeaderComponent;
