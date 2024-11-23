import React, {Component} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import RootStore from '../../stores/RootStore';
import {styles} from './Menu.styles';
import {observer} from 'mobx-react';
import {MENU_OPTIONS} from './MenuItemsData';
import {colors} from '../../utils/colors';
import {strings} from '../../utils/strings';
import ListItemComponent from '../../components/ListItemComponent/ListItemComponent';

const Menu = () => {
  const onPressLogOut = () => {
    RootStore.appStore.setFields('isLoggedIn', false);
    RootStore.appStore.setFields('showPreLogin', true);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollContainer}>
        <View style={styles.menuListContainer}>
          {MENU_OPTIONS().map((items, _) => {
            return (
              <View
                style={[styles.groupStyle, {backgroundColor: colors.bgColor}]}>
                {items.values.map((item, index) => {
                  return (
                    <ListItemComponent
                      key={`menu-options-${index}`}
                      onPress={() => null}
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
                        item.id === strings.logout ? colors.error : colors.black
                      }
                      iconColor={
                        item.id === strings.logout ? colors.error : colors.black
                      }
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Menu);
