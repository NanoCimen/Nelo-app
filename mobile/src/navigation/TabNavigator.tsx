import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../shared/constants/colors';
import FeedScreen from '../feed/FeedScreen';
import ListsScreen from '../lists/ListsScreen';
import FriendsScreen from '../social/FriendsScreen';
import ProfileScreen from '../profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.nelo.black,
        tabBarInactiveTintColor: Colors.nelo.subtle,
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Keep tab bar white for contrast
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          paddingBottom: 8,
          paddingTop: 8,
          height: 84,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          fontFamily: 'System',
        },
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? 'newspaper' : 'newspaper-outline';
            return <Ionicons name={iconName as any} size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Lists"
        component={ListsScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarLabel: 'Listas',
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? 'list' : 'list-outline';
            return <Ionicons name={iconName as any} size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarLabel: 'Personas',
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? 'people' : 'people-outline';
            return <Ionicons name={iconName as any} size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? 'person-circle' : 'person-circle-outline';
            return <Ionicons name={iconName as any} size={26} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
