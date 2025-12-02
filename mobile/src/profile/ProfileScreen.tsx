import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../shared/constants/colors';
import { UserProfile } from '../shared/types';
import { getCurrentUser } from '../shared/services/mockData';

export default function ProfileScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const menuItems = [
    { icon: 'settings-outline', label: 'Settings', color: Colors.nelo.black },
    { icon: 'notifications-outline', label: 'Notifications', color: Colors.nelo.black },
    { icon: 'share-outline', label: 'Share App', color: Colors.nelo.black },
    { icon: 'help-circle-outline', label: 'Help & Support', color: Colors.nelo.black },
    { icon: 'log-out-outline', label: 'Log Out', color: '#EF4444' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.handle}>{user.handle}</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.reviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Categories */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.categoriesTitle}>Favorite Categories</Text>
            <View style={styles.categoriesList}>
              {user.favoriteCategories.map((cat) => (
                <View key={cat} style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{cat}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Settings Menu */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.menuItemLast,
                ]}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                  <Text style={[styles.menuItemText, { color: item.color }]}>
                    {item.label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.gray[300]} />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.version}>Nelo v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nelo.bg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.nelo.bg,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.nelo.subtle,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.nelo.black,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: Colors.white,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.nelo.black,
    marginBottom: 4,
  },
  handle: {
    fontSize: 14,
    color: Colors.nelo.subtle,
    fontWeight: '500',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.nelo.black,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.nelo.subtle,
  },
  editButton: {
    backgroundColor: Colors.nelo.orange,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 32,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
  categoriesContainer: {
    width: '100%',
    marginBottom: 32,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.nelo.black,
    marginBottom: 12,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.nelo.black,
  },
  menuContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  version: {
    fontSize: 12,
    color: Colors.nelo.subtle,
    textAlign: 'center',
    marginBottom: 16,
  },
});

