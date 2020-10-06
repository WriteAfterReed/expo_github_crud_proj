import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

// Imports for new screens
import FollowersScreen from '../screens/FollowersScreen'; // Add in new screen for follow
import FollowingScreen from '../screens/FollowingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RepoScreen from '../screens/RepoScreen';
import NoteScreen from '../screens/NoteScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

// const LinksStack = createStackNavigator(
//   {
//     Links: LinksScreen,
//   },
//   config
// );

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
//   ),
// };

// LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

// This is for adding the New pages to the nav bar
const ProfileStack = createStackNavigator(
  {
    Links: ProfileScreen,
  },
  config
);
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};
ProfileStack.path = '';

const RepoStack = createStackNavigator(
  {
    Links: RepoScreen,
  },
  config
);
RepoStack.navigationOptions = {
  tabBarLabel: 'Repos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'} />
  ),
};
RepoStack.path = '';


const FollowersStack = createStackNavigator(
  {
    Followers: FollowersScreen,
  },
  config
);
FollowersStack.navigationOptions = {
  tabBarLabel: 'Followers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'} />
  ),
};
FollowersStack.path = '';
// NEW NAV PIECE
const FollowingStack = createStackNavigator(
  {
    Following: FollowingScreen,
  },
  config
);
FollowingStack.navigationOptions = {
  tabBarLabel: 'Following',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
  ),
};
FollowingStack.path = '';
// End new Code


const NoteStack = createStackNavigator(
  {
    Notifications: NoteScreen,
  },
  config
);
NoteStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-info' : 'md-info'} />
  ),
};
NoteStack.path = '';




const tabNavigator = createBottomTabNavigator({
  // HomeStack,
  // SettingsStack,
  // LinksStack,
  // Add in the new pages to the nav bar
  ProfileStack,
  RepoStack,
  FollowersStack,
  FollowingStack,
  NoteStack,
});

tabNavigator.path = '';

export default tabNavigator;
