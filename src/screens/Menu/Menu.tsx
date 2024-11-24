import React, {Component} from 'react';
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
  PRESSABLE_ALIGN_CONFIG,
  PRESSABLE_BTN_TYPE,
} from '../../components/PressableComponent/PressableComponent';
import {constatnts} from '../../utils/constants';
import {openLink} from '../../utils/helper';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();

  const onPressLogOut = () => {
    RootStore.appStore.setFields('isLoggedIn', false);
    RootStore.appStore.setFields('showPreLogin', true);
  };

  const onPressMuskseed = () => {
    openLink(constatnts.muskseedWebUrl);
  };

  const onPressMenuOption = (id: string) => {
    switch (id) {
      case strings.aboutUs:
        // @ts-ignore
        navigation.navigate('WebviewComponent', {
          title: strings.aboutUs,
          url: constatnts.muskseedWebUrl,
        });
        break;

      default:
        break;
    }
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
              <Text style={styles.name}>Ajinkya</Text>
              <Text style={styles.name}>Palvankar</Text>
            </View>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.TEXT}
              onPress={() => null}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Menu);
