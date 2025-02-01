import React, {Component, useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import RootStore from '../../stores/RootStore';
import {styles} from './Menu.styles';
import {observer} from 'mobx-react';
import {MENU_OPTIONS} from './MenuItemsData';
import {colors} from '../../utils/colors';
import {strings} from '../../utils/strings';
import ListItemComponent from '../../components/ListItemComponent/ListItemComponent';
import PressableComponent, {
  PRESSABLE_ALIGN,
  PRESSABLE_BTN_TYPE,
} from '../../components/PressableComponent/PressableComponent';
import {constatnts} from '../../utils/constants';
import {openLink, openNativeShare} from '../../utils/helper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {urls} from '../../network/urls';
import EditProfileModal from './EditProfileModal/EditProfileModal';

const Menu = () => {
  const navigation = useNavigation();
  const [userData, setUserDetails] = useState({
    fullName: '',
  });

  const userId = RootStore.appStore.userId;
  const data = RootStore.homeStore.allParameterData || {};

  const aboutUS = (data as any)?.about_us || '';
  const privacyPolicy = (data as any)?.privacy_policy || '';
  const termsConditions = (data as any)?.terms_and_conditions || '';

  const orderHistoryUrl = `${urls.webUrl}ClientOrderHistory?user_id=${userId}`;

  const callEmail = `${urls.imageUrl}adminApp/Call_Email_Us`;

  useEffect(() => {
    setDetails();
  }, []);

  useEffect(() => {
    const params = new FormData();
    params.append('user_id', userId);
    RootStore.homeStore.getProfilApi(params);
  }, [userId]);

  const setDetails = async () => {
    let value = await AsyncStorage.getItem('fullName');

    if (value) {
      setUserDetails({
        ...userData,
        ['fullName']: value,
      });
    }
  };

  const onPressMuskseed = () => {
    openLink(constatnts.muskseedWebUrl);
  };

  const onPressMenuOption = (id: string) => {
    switch (id) {
      case strings.exclusive:
        // @ts-ignore
        navigation.navigate('Exclusive');
        break;
      case strings.deleteAccount:
        // @ts-ignore
        RootStore.appStore.setFields('isComingSoonVisible', true);
        break;
      case strings.orderHistory:
        // @ts-ignore
        navigation.navigate('WebviewComponent', {
          title: strings.orderHistory,
          url: orderHistoryUrl,
        });
        break;
      case strings.aboutUs:
        // @ts-ignore
        navigation.navigate('WebviewComponent', {
          title: strings.aboutUs,
          url: aboutUS,
        });
        break;
      case strings.privacyPolicy:
        // @ts-ignore
        navigation.navigate('WebviewComponent', {
          title: strings.privacyPolicy,
          url: privacyPolicy,
        });
        break;
      case strings.termsCondition:
        // @ts-ignore
        navigation.navigate('WebviewComponent', {
          title: strings.termsCondition,
          url: termsConditions,
        });
        break;

      case strings.connectWithUs:
        RootStore.appStore.setFields('isContactUsModalVisible', true);
        break;
      case strings.shareApp:
        openNativeShare();
        break;

      case strings.logout:
        RootStore.appStore.resetStoreOnLogout();
        break;

      default:
        break;
    }
  };

  const onPressEdit = () => {
    RootStore.menuStore.setFields('isEditModalVisible', true);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View style={styles.menuListContainer}>
          <View style={styles.nameRow}>
            <View>
              <Text style={styles.name}>{userData.fullName}</Text>
            </View>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.TEXT}
              onPress={onPressEdit}
              text={strings.edit}
              align={PRESSABLE_ALIGN.LEFT}
              colorConfig={{
                pressedBgColor: colors.hyperlinkPressed,
              }}
              pressableStyle={styles.editPressed}
              textStyle={styles.editText}
            />
          </View>
          <View style={styles.menuItemsView}>
            {MENU_OPTIONS().map((items, key) => {
              return (
                <View
                  key={`menu-options-${key}`}
                  style={[
                    styles.groupStyle,
                    {backgroundColor: colors.bgColor},
                  ]}>
                  {items.values.map((item, index) => {
                    return (
                      <ListItemComponent
                        key={`items-${index}`}
                        onPress={() => onPressMenuOption(item.id)}
                        icon={item?.icon}
                        title={item?.method}
                        viewRightStyle={[
                          styles.viewRightStyle,
                          {
                            borderColor: colors.black,
                            backgroundColor: colors.red,
                          },
                        ]}
                        isDividerVisible={index !== items.values.length - 1}
                        titleColor={
                          item.id === strings.logout
                            ? colors.error
                            : colors.black
                        }
                        iconColor={
                          item.id === strings.logout
                            ? colors.error
                            : colors.black
                        }
                      />
                    );
                  })}
                </View>
              );
            })}
          </View>

          <View style={styles.footer}>
            <Text style={styles.version}>{strings.version} 1.0.0</Text>
            <Text style={styles.madeWithLove}>
              {strings.madeWithLove}{' '}
              <Text onPress={onPressMuskseed} style={styles.muskseed}>
                {strings.muskseed}
              </Text>
            </Text>
          </View>

          {/* Edit Profile modal */}
          <EditProfileModal
            isModalVisible={RootStore.menuStore.isEditModalVisible}
            setModalVisible={(toggleValue: boolean) => {
              RootStore.menuStore.setFields('isEditModalVisible', toggleValue);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Menu);
