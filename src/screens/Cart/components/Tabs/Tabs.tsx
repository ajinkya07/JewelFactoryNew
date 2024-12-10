import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {Animated, FlatList, Pressable, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getCartWishlistTabs} from './TabsData';
import {observer} from 'mobx-react';
import {styles} from './Tabs.styles';
import {colors} from '../../../../utils/colors';
import {isDefined} from '../../../../utils/helper';
import Cart from '../../Cart/Cart';

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = observer(
  ({state, descriptors, navigation, position, tabs}: any) => {
    const scrollRef = useRef<FlatList>(null);
    const supportedTopTabs = getCartWishlistTabs;

    const defaultTab = state.index;
    const scrollToCurrentTab = (currentIndex: any) => {
      scrollRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
        viewOffset: 100,
      });
    };

    useEffect(() => {
      const inputRange = tabs.map((_, i) => i);
      let backgroundColor = 'transparent';

      backgroundColor = position.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => {
          return tabs[i]?.backgroundColor;
        }),
      });
    }, [tabs]);

    const onScrollToIndexFailed = _ => {
      setTimeout(() => {
        scrollToCurrentTab(defaultTab);
      }, 50);
    };

    const renderItem = ({item, index}) => {
      const {options} = descriptors[item.key];
      const currentTab = supportedTopTabs[item.name];
      const label = currentTab?.name;

      const isFocused = state.index === index;

      const onPress = () => {
        navigateToTab();
      };

      const navigateToTab = () => {
        scrollToCurrentTab(index);

        const event = navigation.emit({
          type: 'tabPress',
          target: item.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(item.name, item.params);
        }
      };

      return (
        <View>
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}>
            <Text style={[styles.tabTitle, !isFocused && {color: colors.gray}]}>
              {label}
            </Text>
          </Pressable>
          <View
            style={[
              styles.topBar,
              {
                opacity: isFocused ? 1 : 0,
              },
            ]}
          />
        </View>
      );
    };

    useEffect(() => {
      if (isDefined(defaultTab)) {
        scrollToCurrentTab(defaultTab);
      }
    }, [defaultTab]);

    return (
      <Animated.View style={styles.headerContainer}>
        <FlatList
          horizontal
          ref={scrollRef}
          initialNumToRender={state.routes?.length}
          onScrollToIndexFailed={onScrollToIndexFailed}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          data={state.routes}
          renderItem={renderItem}
        />
      </Animated.View>
    );
  },
);

const Tabs = memo(() => {
  const supportedTopTabs = getCartWishlistTabs;
  const tabsList = ['cart', 'wishlist'];

  // const tabs = tabsList
  //   .map((key,i) => {
  //     return supportedTopTabs[i].key
  //   })
  //   .filter(tab => tab);

  const tabsUi = useMemo(() => {
    return (
      <>
        {supportedTopTabs.map((item, index) => (
          <Tab.Screen key={index} name={tabsList[index]} component={Cart} />
        ))}
      </>
    );
  }, []);

  const tabBar = useCallback((props: any) => {
    return <CustomTabBar {...props} tabs={supportedTopTabs} />;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        lazyPreloadDistance: 0,
      }}
      tabBar={tabBar}
      initialRouteName={tabsList[0]}>
      {tabsUi}
    </Tab.Navigator>
  );
});

export default Tabs;
