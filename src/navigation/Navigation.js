import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from '@tabs/TabNavigator';
import * as NavigationService from '@values/NavigationService';

const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function TabStack() {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator">
        <Stack.Screen
          name="TabNavigator"
          component={TabStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const handleScreenNavigation = (navigateTo, params) => {
  NavigationService.navigate(navigateTo, params || {});
};

export const handleScreenNavigationGoBack = params => {
  NavigationService.goBack(params || {});
};

export const handleTabJumpTo = (jumpTo, params) => {
  NavigationService.jumpTo(jumpTo, params || {});
};

export default RootNavigator;
