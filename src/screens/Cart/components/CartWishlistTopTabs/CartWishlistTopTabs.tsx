import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {Animated, FlatList, Pressable, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {observer} from 'mobx-react';
import {getCartWishlistTabs} from './TabsData';
import {styles} from './CartWishlistTopTabs.styles';
import {colors} from '../../../../utils/colors';
import {isDefined} from '../../../../utils/helper';

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = observer(({state, navigation}: any) => {
  const scrollRef = useRef<FlatList>(null);
  const supportedTopTabs = getCartWishlistTabs();

  const defaultTab = state.index;
  const scrollToCurrentTab = (currentIndex: any) => {
    scrollRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
      viewOffset: 100,
    });
  };

  const onScrollToIndexFailed = () => {
    setTimeout(() => {
      scrollToCurrentTab(defaultTab);
    }, 50);
  };

  const renderItem = ({item, index}: any) => {
    const currentTab = supportedTopTabs[item.name];
    const label = currentTab?.name;
    const source = currentTab?.source;

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

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: item.key,
      });
    };

    return (
      <Pressable
        accessibilityState={isFocused ? {selected: true} : {}}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.flexRow}>
          {/* <Image source={source} style={styles.tabIcon} /> */}
          <Text
            style={[
              styles.titleText,
              !isFocused && {
                color: colors.gray,
              },
            ]}>
            {label}
          </Text>
        </View>
        <View
          style={[
            styles.topBar,
            {
              opacity: isFocused ? 1 : 0,
            },
          ]}
        />
      </Pressable>
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
});

const CartWishlistTopTabs = memo(() => {
  const supportedTopTabs = getCartWishlistTabs();

  const tabsData = ['cart', 'wishlist'];
  const tabs = tabsData
    .map(key => {
      return supportedTopTabs[key];
    })
    .filter(tab => tab);
  console.log('tabs', tabs);

  const tabsUi = useMemo(() => {
    return (
      <>
        {tabs.map((item, index) => (
          <Tab.Screen key={index} name={item.key} component={item.component} />
        ))}
      </>
    );
  }, []);

  const tabBar = useCallback(props => {
    return <CustomTabBar {...props} tabs={tabs} />;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        lazyPreloadDistance: 0,
      }}
      tabBar={tabBar}
      initialRouteName={tabsData[0]}>
      {tabsUi}
    </Tab.Navigator>
  );
});

export default CartWishlistTopTabs;
