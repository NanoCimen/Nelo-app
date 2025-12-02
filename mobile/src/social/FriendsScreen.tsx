import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../shared/constants/colors';
import { UserProfile } from '../shared/types';
import { getFriends } from '../shared/services/mockData';

export default function FriendsScreen() {
  const [friends, setFriends] = useState<UserProfile[]>([]);

  useEffect(() => {
    getFriends().then(setFriends);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Amigos</Text>
        <Text style={styles.subtitle}>Siguiendo a {friends.length} amigos</Text>

        <ScrollView style={styles.friendsList} showsVerticalScrollIndicator={false}>
          {friends.map((friend) => (
            <View key={friend.id} style={styles.friendCard}>
              <View style={styles.friendHeader}>
                <Image source={{ uri: friend.avatarUrl }} style={styles.friendAvatar} />
                <View style={styles.friendInfo}>
                  <View style={styles.friendNameRow}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    <Text style={styles.friendTime}>Hace 12 meses</Text>
                  </View>
                  <View style={styles.friendActivity}>
                    <View style={styles.onlineIndicator} />
                    <Text style={styles.activityText}>visitó</Text>
                  </View>
                </View>
              </View>

              <View style={styles.restaurantPreview}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1563729768640-d01d85a703d9?w=100',
                  }}
                  style={styles.restaurantPreviewImage}
                />
                <View style={styles.restaurantPreviewInfo}>
                  <Text style={styles.restaurantPreviewName}>La Dolcerie</Text>
                  <Text style={styles.restaurantPreviewRating}>★ 5.0</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Additional demo item */}
          <View style={styles.friendCard}>
            <View style={styles.friendHeader}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
                }}
                style={styles.friendAvatar}
              />
              <View style={styles.friendInfo}>
                <View style={styles.friendNameRow}>
                  <Text style={styles.friendName}>Carlos Hernandez</Text>
                  <Text style={styles.friendTime}>Hace 12 meses</Text>
                </View>
                <View style={styles.friendActivity}>
                  <Ionicons name="bookmark" size={10} color={Colors.gray[400]} />
                  <Text style={styles.activityText}>agregó a su lista</Text>
                </View>
              </View>
            </View>

            <View style={styles.restaurantPreview}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100',
                }}
                style={styles.restaurantPreviewImage}
              />
              <View style={styles.restaurantPreviewInfo}>
                <Text style={styles.restaurantPreviewName}>SBG</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nelo.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.nelo.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.nelo.subtle,
    marginBottom: 32,
  },
  friendsList: {
    flex: 1,
  },
  friendCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  friendHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendInfo: {
    flex: 1,
  },
  friendNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.nelo.black,
  },
  friendTime: {
    fontSize: 12,
    color: Colors.nelo.subtle,
  },
  friendActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onlineIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  activityText: {
    fontSize: 12,
    color: Colors.nelo.subtle,
  },
  restaurantPreview: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.nelo.bg,
    padding: 8,
    borderRadius: 12,
  },
  restaurantPreviewImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.gray[200],
  },
  restaurantPreviewInfo: {
    justifyContent: 'center',
  },
  restaurantPreviewName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.nelo.black,
    marginBottom: 4,
  },
  restaurantPreviewRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.nelo.orange,
  },
});

