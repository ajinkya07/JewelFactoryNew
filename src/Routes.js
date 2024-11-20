import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {observer, Observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {StatusBar, View, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigationRef} from './utils/NavigationService';
import RootStore from './stores/RootStore';

import Login from './screens/OnBoarding/Login/Login';
import Home from './screens/Home/Home';
import Category from './screens/Categories/Categories';
import {colors} from './utils/colors';
import SplashVideoScreen from './components/SplashScreen/SplashScreen';
import Register from './screens/OnBoarding/Register/Register';
import ForgotPassword from './screens/OnBoarding/ForgotPassword/ForgotPassword';

const routeOptions = {
  headerShown: false,
  headerShadowVisible: false,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
  ...TransitionPresets.SlideFromRightIOS,
};

const CardCentreStackOptions = RootStore.appStore.isiOS
  ? {
      headerShown: false,
      presentation: 'modal',
      gesturesEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }
  : {
      headerShown: false,
      ...defaultHeaderOptions,
    };

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * App Initialize page
 */
const AuthLoadingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoading}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * Login Stack Screens
 */
const LoginStack = observer(() => {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});

const ICON_WIDTH = 24;
const ICON_HEIGHT = 24;

export const bottomTabsConfig = {
  home: 'home',
  deposits: 'deposits',
  scanQR: 'scanQR',
  offers: 'offers',
  menu: 'menu',
};

const TabBarBottom = observer(() => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={Home}
      screenOptions={TabBarScreenOptions}>
      <Tab.Screen
        name={Home}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return (
              <SvgHomeFocusedIcon
                fill={focused ? colors.brandColor : colors.black}
                width={ICON_WIDTH}
                height={ICON_HEIGHT}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({focused}) => {
            return (
              <SvgHomeFocusedIcon
                fill={focused ? colors.brandColor : colors.black}
                width={ICON_WIDTH}
                height={ICON_HEIGHT}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused}) => {
            return (
              <SvgHomeFocusedIcon
                fill={focused ? colors.brandColor : colors.black}
                width={ICON_WIDTH}
                height={ICON_HEIGHT}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Custimise"
        component={Custimise}
        options={{
          tabBarLabel: 'Custimise',
          tabBarIcon: ({focused}) => {
            return (
              <SvgHomeFocusedIcon
                fill={focused ? colors.brandColor : colors.black}
                width={ICON_WIDTH}
                height={ICON_HEIGHT}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({focused}) => {
            return (
              <SvgHomeFocusedIcon
                fill={focused ? colors.brandColor : colors.black}
                width={ICON_WIDTH}
                height={ICON_HEIGHT}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
});

const MainApp = observer(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabBarBottom"
        component={TabBarBottom}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});

const modalStyleStackOptions = RootStore.appStore.isiOS
  ? {
      headerShown: false,
      presentation: 'modal',
      gesturesEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }
  : {
      headerShown: false,
      ...defaultHeaderOptions,
    };

const defaultHeaderOptions = {
  headerShadowVisible: false,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
};

const AppStack = () => (
  <Observer>
    {() => (
      <>
        {!RootStore.appStore.showAuthLoading ? (
          <SplashVideoScreen />
        ) : RootStore.appStore.showPreLogin ? (
          <LoginStack />
        ) : RootStore.appStore.isLoggedIn ? (
          <MainApp />
        ) : null}
      </>
    )}
  </Observer>
);

const TopLevelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Routes = observer(({}) => {
  useEffect(() => {
    const barStyle = 'light-content';
    setTimeout(() => {
      StatusBar.setBarStyle(barStyle);
      if (RootStore.appStore.isAndroid) {
        StatusBar.setBackgroundColor(colors.white);
      }
    }, 400);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: true,
        colors: {
          ...DefaultTheme.colors,
          background: colors.white,
        },
      }}>
      <TopLevelStack />
    </NavigationContainer>
  );
});

const ModalCardOverlay = () => {
  return <View style={[styles.flex, {backgroundColor: `${colors.white}99`}]} />;
};

const presentationModalOptions = {
  headerShown: false,
  cardOverlayEnabled: true,
  cardOverlay: () => <ModalCardOverlay />,
  presentation: 'transparentModal',
  gestureEnabled: false,
  ...TransitionPresets.BottomSheetAndroid,
};

const TabBarScreenOptions = () => {
  return {
    tabBarShowLabel: true,
    headerShown: false,
    tabBarStyle: {
      height: RootStore.appStore.isiOS ? 86 : 72,
      backgroundColor: colors.white,
      borderTopWidth: 0,
      paddingTop: RootStore.appStore.isiOS ? 12 : 12,
      paddingBottom: RootStore.appStore.isiOS ? 34 : 16,
      elevation: 0,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: RootStore.languageStore.fontFamilySemiBold,
      lineHeight: 18,
    },
    tabBarActiveTintColor: colors.brandColor,
    tabBarInactiveTintColor: colors.gray,
  };
};

const styles = EStyleSheet.create({
  tabIcon: {
    height: '20rem',
    width: '20rem',
  },
  flex: {
    flex: 1,
  },
  redDotContainer: {position: 'absolute'},
});

export default Routes;
