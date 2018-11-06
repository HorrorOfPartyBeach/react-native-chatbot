import React from 'react';
import { Platform, StatusBar, Alert } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  NavigationActions
} from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';
// import { Button } from 'react-native-elements';
// import { onSignOut } from './auth';

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Messages from './screens/Messages';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
      headerStyle
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      headerStyle
    }
  }
});

export const SignedIn = createMaterialTopTabNavigator(
  {
    Messages: {
      screen: Messages,
      navigationOptions: {
        tabBarLabel: 'Messages',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="wechat" size={30} color={tintColor} />
        )
      }
    },

    Logout: {
      screen: SignedOut,
      navigationOptions: ({ navigation }) => ({
        tabBarOnPress: (scene, jumpToIndex) => {
          return Alert.alert(
            'Confirmation required',
            'Do you really want to logout?',
            [
              {
                text: 'Accept',
                onPress: () => {
                  navigation.dispatch(
                    NavigationActions.navigate({ routeName: 'SignIn' })
                  );
                }
              },
              { text: 'Cancel' }
            ]
          );
        }
      })
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};
