import {Image, Platform, View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Registration from '../views/pages/Registration';
//Dashboard
import Dashboard from '../views/pages/Dashboard';
import CreateNewCast from '../views/pages/Cast/CreateNewCast';
import CastPostPage from '../views/pages/Cast/CastPostPage';
import UserDetailsCast from '../views/pages/UserSection/UserDetailsCast';
import UserDetails from '../views/pages/UserSection/UserDetails';
import InitialLoader from '../views/pages/InitialLoadler';

//Tweet
import Tweet from '../views/pages/Tweet/Timeline';
import AddTweet from '../views/pages/Tweet/AddTweet';
import SingleTweetDetails from '../views/pages/Tweet/SingleTweetDetails';
//User
import User from '../views/pages/UserSection/User';
import Settings from '../views/pages/Settings';
import UserDataUpdate from '../views/pages/UserSection/UserDataUpdate';
import UserDataUpdateField from '../views/pages/UserSection/UserDataUpdateField';
import BasicSettings from '../views/pages/UserSection/BasicSettings';
import UserReview from '../views/pages/UserSection/UserReview';
import ReferralQrCode from '../views/pages/UserSection/ReferralQrCode';
import ReferralQrCodeView from '../views/pages/UserSection/ReferralQrCodeView';
import UserDeposite from '../views/pages/UserSection/UserDeposite';
import UserCoupon from '../views/pages/UserSection/UserCupon';
import Helps from '../views/pages/UserSection/Helps';

import ZoomCall from '../views/pages/UserSection/ZoomCall';
import videoSession from '../views/pages/UserSection/VideoSession';
import UserReviewCast from '../views/pages/UserSection/UserReviewCast';

//Message
import Message from '../views/pages/MessageSection/Message';
import MessageDetails from '../views/pages/MessageSection/MessageDetails';
import Notification from '../views/pages/Notification';

//Search
import Search from '../views/pages/Search/SearchView';
import SearchFilter from '../views/pages/Search/SearchFilter';

import styles from './styles';
import golbalConstants from '../views/Common/GlobalStyles/constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabNavigator = () => {
  let primaryColor = golbalConstants.tabColorSelected;
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let title;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'hand-pointer-o' : 'hand-pointer-o';
            title = '呼ぶ';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
            title = '探す';
          } else if (route.name === 'Message') {
            iconName = focused ? 'comment-o' : 'comment';
            title = 'メッセージ';
          } else if (route.name === 'Tweet') {
            iconName = focused ? 'md-time' : 'md-time';
            title = 'つぶやく';
          } else if (route.name === 'User') {
            title = 'マイページ';
            iconName = focused ? 'user-o' : 'user';
          }

          return (
            <View style={styles.alginmentOfIconText}>
              {route.name === 'Tweet' ? (
                <Ionicons name={iconName} size={size} color={color} />
              ) : (
                <FontAwesome name={iconName} size={size} color={color} />
              )}

              <Text style={focused ? styles.selectedTab : styles.noSelectedTab}>
                {title}
              </Text>
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: golbalConstants.tabColor,
        showLabel: false,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Dashboard" component={DashboardMenu} />
      <Tab.Screen name="Search" component={SearchMenu} />
      <Tab.Screen name="Message" component={MessageSection} />
      <Tab.Screen name="Tweet" component={TweetMenu} />
      <Tab.Screen name="User" component={UserMenu} />
    </Tab.Navigator>
  );
};

const MessageSection = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MessageInitial">
      <Stack.Screen name="MessageInitial" component={Message} />
      <Stack.Screen name="UserDeposite" component={UserDeposite} />
    </Stack.Navigator>
  );
};

const SearchMenu = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchFilter" component={SearchFilter} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="MessageDetails" component={MessageDetails} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  );
};

const TweetMenu = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TweetDetails">
      <Stack.Screen name="TweetDetails" component={Tweet} />
      <Stack.Screen name="AddTweet" component={AddTweet} />
      <Stack.Screen name="SingleTweetDetails" component={SingleTweetDetails} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  );
};

const UserMenu = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="User">
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="UserDataUpdate" component={UserDataUpdate} />
      <Stack.Screen
        name="UserDataUpdateField"
        component={UserDataUpdateField}
      />
      <Stack.Screen name="BasicSettings" component={BasicSettings} />
      <Stack.Screen name="UserReview" component={UserReview} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ReferralQrCode" component={ReferralQrCode} />
      <Stack.Screen name="ReferralQrCodeView" component={ReferralQrCodeView} />
      <Stack.Screen name="UserDeposite" component={UserDeposite} />
      <Stack.Screen name="UserCoupon" component={UserCoupon} />
      <Stack.Screen name="Helps" component={Helps} />
    </Stack.Navigator>
  );
};

const DashboardMenu = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="DashboardMain">
      <Stack.Screen name="DashboardMain" component={Dashboard} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="CreateNewCast" component={CreateNewCast} />
      <Stack.Screen name="CastPostPage" component={CastPostPage} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="MessageDetails" component={MessageDetails} />
      <Stack.Screen name="SingleTweetDetails" component={SingleTweetDetails} />
      <Stack.Screen name="UserDetailsCast" component={UserDetailsCast} />
    </Stack.Navigator>
  );
};

const VideoSession = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="DashboardMain">
      <Stack.Screen name="vCallingCast" component={ZoomCall} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="InitialLoader">
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="InitialLoader" component={InitialLoader} />
        <Stack.Screen name="videoSession" component={videoSession} />
        <Stack.Screen name="UserDeposite" component={UserDeposite} />
        <Stack.Screen name="UserReviewCast" component={UserReviewCast} />
        <Stack.Screen name="MessageDetails" component={MessageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
