import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {observer, Observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {StatusBar, View, Platform, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigationRef} from './utils/NavigationService';
import RootStore from './stores/RootStore';
import Login from './screens/OnBoarding/Login/Login';
import Home from './screens/Home/Home';
import {colors} from './utils/colors';
import Toast from 'react-native-toast-message';
import SplashVideoScreen from './components/SplashScreen/SplashScreen';
import Register from './screens/OnBoarding/Register/Register';
import ForgotPassword from './screens/OnBoarding/ForgotPassword/ForgotPassword';
import IconPack from './utils/IconPack';
import Cart from './screens/Cart/Cart/Cart';
import Customise from './screens/Customise/Customise';
import Menu from './screens/Menu/Menu';
import WebviewComponent from './components/WebviewComponent/WebviewComponent';
import ProductList from './screens/Product/ProductList/ProductList';
import VerifyOTP from './screens/OnBoarding/VerifyOTP/VerifyOTP';
import TopLevelModal from './components/ComingSoon/TopLevelModal';
import SubCategoryList from './screens/Product/SubCategoryList/SubCategoryList';
import Categories from './screens/Categories/Categories';

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
      <Stack.Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});

const TabBarBottom = observer(() => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={'Home'}
      screenOptions={TabBarScreenOptions}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={IconPack.HOME}
                style={[
                  styles.tabIcon,
                  {
                    tintColor: focused ? colors.brandColor : colors.smokeGray,
                  },
                ]}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Category"
        component={Categories}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={IconPack.CATEGORY}
                style={[
                  styles.tabIcon,
                  {
                    tintColor: focused ? colors.brandColor : colors.smokeGray,
                  },
                ]}
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
              <Image
                source={IconPack.CART}
                style={[
                  styles.tabIcon,
                  {
                    tintColor: focused ? colors.brandColor : colors.smokeGray,
                  },
                ]}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Customise"
        component={Customise}
        options={{
          tabBarLabel: 'Customise',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={IconPack.CUSTOMISE}
                style={[
                  styles.tabIcon,
                  {
                    tintColor: focused ? colors.brandColor : colors.smokeGray,
                  },
                ]}
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
              <Image
                source={IconPack.MENU}
                style={[
                  styles.tabIcon,
                  {
                    tintColor: focused ? colors.brandColor : colors.smokeGray,
                  },
                ]}
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
      <Stack.Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebviewComponent"
        component={WebviewComponent}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubCategoryList"
        component={SubCategoryList}
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

const AppStack = () => {
  console.log('RootStore.appStore.isLoggedIn ', RootStore.appStore.isLoggedIn);
  console.log(
    'RootStore.appStore.showPreLogin ',
    RootStore.appStore.showPreLogin,
  );

  return (
    <Observer>
      {() => (
        <>
          {RootStore.appStore.showAuthLoading ? (
            <SplashVideoScreen />
          ) : RootStore.appStore.showPreLogin ? (
            <LoginStack />
          ) : RootStore.appStore.isLoggedIn ? (
            <MainApp />
          ) : null}
          <Toast />
          <TopLevelModal />
        </>
      )}
    </Observer>
  );
};

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
    const barStyle = 'dark-content';
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
      borderTopWidth: 0.5,
      paddingTop: 12,
      paddingBottom: RootStore.appStore.isiOS ? 34 : 16,
      elevation: 0,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: 'Manrope-SemiBold',
      lineHeight: 18,
    },
    tabBarActiveTintColor: colors.brandColor,
    tabBarInactiveTintColor: colors.smokeGray,
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
