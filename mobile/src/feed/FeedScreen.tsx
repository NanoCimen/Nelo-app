import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../shared/constants/colors';
import { FeedPost } from '../shared/types';
import { getFeed } from '../shared/services/mockData';

const FeedPostItem: React.FC<{ post: FeedPost }> = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatarUrl }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.postUserText}>
              <Text style={styles.userName}>{post.user.name}</Text>{' '}
              <Text style={styles.postAction}>ranked</Text>{' '}
              <Text style={styles.userName}>{post.restaurant.name}</Text>
            </Text>
            <View style={styles.postMeta}>
              <Ionicons name="location-outline" size={10} color={Colors.nelo.subtle} />
              <Text style={styles.metaText}>{post.restaurant.zone}</Text>
              <Text style={styles.metaText}>•</Text>
              <Text style={styles.metaText}>5 visits</Text>
            </View>
          </View>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{post.rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* Photo */}
      <View style={styles.photoContainer}>
        <Image source={{ uri: post.photos[0] }} style={styles.photo} />
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons
            name={post.isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>

      {/* Notes */}
      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>NOTES</Text>
        <Text style={styles.notesText}>{post.notes}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <View style={styles.actionButtons}>
          <View style={styles.actionItem}>
            <Ionicons name="heart-outline" size={20} color={Colors.nelo.black} />
            <Text style={styles.actionCount}>{post.likes}</Text>
          </View>
        </View>
        <View style={styles.actionRight}>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
          <Ionicons name="bookmark-outline" size={20} color={Colors.nelo.black} />
        </View>
      </View>
    </View>
  );
};

export default function FeedScreen() {
  const [posts, setPosts] = useState<FeedPost[]>([]);

  useEffect(() => {
    getFeed().then(setPosts);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>nelo</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="calendar-outline" size={22} color={Colors.nelo.black} />
            <Ionicons name="notifications-outline" size={22} color={Colors.nelo.black} />
            <Ionicons name="menu-outline" size={22} color={Colors.nelo.black} />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={16} color={Colors.gray[400]} style={styles.searchIcon} />
          <TextInput
            placeholder="Search restaurants, members..."
            placeholderTextColor={Colors.gray[400]}
            style={styles.searchInput}
          />
        </View>

        {/* Filters */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="location-outline" size={14} color={Colors.nelo.black} />
            <Text style={styles.filterText}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
            <Ionicons name="trending-up-outline" size={14} color={Colors.white} />
            <Text style={styles.filterTextActive}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="people-outline" size={14} color={Colors.nelo.black} />
            <Text style={styles.filterText}>Friends</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Feed Content */}
      <ScrollView style={styles.feedContent} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <FeedPostItem key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nelo.bg,
  },
  header: {
    backgroundColor: Colors.nelo.bg,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.nelo.orange,
    fontFamily: 'System',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.nelo.black,
  },
  filtersContainer: {
    marginBottom: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(226, 226, 226, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: Colors.nelo.black,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.nelo.black,
  },
  filterTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  feedContent: {
    flex: 1,
    paddingTop: 8,
  },
  postContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  userDetails: {
    flex: 1,
  },
  postUserText: {
    fontSize: 14,
    color: Colors.nelo.black,
    lineHeight: 18,
  },
  userName: {
    fontWeight: 'bold',
  },
  postAction: {
    fontWeight: 'normal',
    color: Colors.nelo.subtle,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  metaText: {
    fontSize: 10,
    color: Colors.nelo.subtle,
  },
  ratingBadge: {
    backgroundColor: Colors.nelo.bg,
    borderWidth: 1,
    borderColor: 'rgba(226, 226, 226, 0.5)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.nelo.black,
  },
  photoContainer: {
    width: '100%',
    aspectRatio: 16 / 14,
    backgroundColor: Colors.gray[100],
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesContainer: {
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.nelo.subtle,
    letterSpacing: 1.2,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  notesText: {
    fontSize: 14,
    color: Colors.nelo.black,
    lineHeight: 20,
    fontWeight: 'normal',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionCount: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.nelo.black,
  },
  actionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.nelo.subtle,
  },
});

