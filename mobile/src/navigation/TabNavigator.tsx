import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../shared/constants/colors';
import FeedScreen from '../feed/FeedScreen';
import ListsScreen from '../lists/ListsScreen';
import FriendsScreen from '../social/FriendsScreen';
import ProfileScreen from '../profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.nelo.black,
        tabBarInactiveTintColor: Colors.nelo.subtle,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray[100],
          paddingBottom: 8,
          paddingTop: 8,
          height: 84,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      })}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? 'document-text' : 'document-text-outline';
            return <Ionicons name={iconName as any} size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Lists"
        component={ListsScreen}
        options={{
          tabBarLabel: 'Your Lists',
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? 'list' : 'list-outline';
            return <Ionicons name={iconName as any} size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? 'trophy' : 'trophy-outline';
            return <Ionicons name={iconName as any} size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? 'person-circle' : 'person-circle-outline';
            return <Ionicons name={iconName as any} size={26} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

