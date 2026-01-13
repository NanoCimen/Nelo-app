import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  Animated,
  Modal,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../shared/constants/colors';
import { FeedPost } from '../shared/types';
import { getFeed, getCurrentUser } from '../shared/services/mockData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Card height for snap scrolling: header (~86) + image ((width-32) * 1.1) + notes (~80)
const CARD_HEIGHT = Math.round(86 + ((SCREEN_WIDTH) * 1.1) + 80);

// System font (SF Pro on iOS, Roboto on Android)
const SYSTEM_FONT = 'System';

// Format timestamp: show hours if < 24h, otherwise show date
const formatTimestamp = (timestamp: string): string => {
  try {
    // Try to parse as ISO date string (production format)
    const postDate = new Date(timestamp);
    const now = new Date();
    
    // Check if it's a valid date
    if (!isNaN(postDate.getTime())) {
      const diffMs = now.getTime() - postDate.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours < 24 && diffHours >= 0) {
        const hours = Math.floor(diffHours);
        return hours === 0 ? 'Ahora' : `${hours}h`;
      } else {
        // Format as "DD MMM" format
        const day = postDate.getDate();
        const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        const month = monthNames[postDate.getMonth()];
        return `${day} ${month}`;
      }
    }
    
    // If it's already in "28 nov" format (mock data), return as is
    // In future, we can parse this format if needed
    return timestamp;
  } catch (e) {
    // If parsing fails, return the original timestamp
    return timestamp;
  }
};

// Get rating color based on rating value
const getRatingColor = (rating: number): string => {
  if (rating >= 0 && rating < 6.0) {
    return '#FF3B30'; // Red
  } else if (rating >= 6.0 && rating < 7.0) {
    return '#FF9500'; // Orange
  } else if (rating >= 7.0 && rating < 8.0) {
    return '#FFCC00'; // Yellow
  } else if (rating >= 8.0 && rating < 9.0) {
    return '#28CD41'; // Light Green
  } else if (rating >= 9.0 && rating <= 10.0) {
    return '#00D084'; // Dark Green
  }
  return '#22C55E'; // Default green fallback
};

// Animated Icon
const AnimatedIcon = ({
  name,
  size,
  color,
  focused,
}: {
  name: any;
  size: number;
  color: string;
  focused?: boolean;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.3,
          useNativeDriver: true,
          speed: 50,
          bounciness: 15,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 15,
        }),
      ]).start();
    }
  }, [focused, scaleAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

// Helper function to convert image source to Image component format
// Handles both string URLs (remote images) and number (local require() images)
// If string, it's a remote URL - use { uri: ... }
// If number, it's a local require() - use directly
const getImageSource = (source: string | number) => {
  if (typeof source === 'string') {
    return { uri: source };
  }
  return source; // number from require()
};

// Image Carousel Component with Dot Indicators
// Handles both string URLs (remote images) and number (local require() images)
const ImageCarousel: React.FC<{
  photos: (string | number)[];
  onPress?: () => void;
}> = ({ photos, onPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const maxPhotos = Math.min(photos.length, 5); // Max 5 photos

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / SCREEN_WIDTH);
    if (index !== activeIndex && index >= 0 && index < maxPhotos) {
      setActiveIndex(index);
      Haptics.selectionAsync();
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        bounces={true}
      >
        {photos.slice(0, maxPhotos).map((photo, index) => (
          <TouchableOpacity key={index} onPress={onPress} activeOpacity={1}>
            <Image
              source={getImageSource(photo)}
              style={styles.carouselImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Dot Indicators - 12px above bottom */}
      {maxPhotos > 1 && (
        <View style={styles.dotContainer}>
          {photos.slice(0, maxPhotos).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const FeedPostItem: React.FC<{ post: FeedPost; currentUserId?: string }> = ({ post, currentUserId }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarks);
  const [isFavoriteDish, setIsFavoriteDish] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const isPostAuthor = currentUserId === post.userId;

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
  };

  const handleComment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Handle comment action - could open comment modal
  };

  const handleBookmark = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newIsBookmarked = !isBookmarked;
    setIsBookmarked(newIsBookmarked);
    setBookmarkCount((prev) => (newIsBookmarked ? prev + 1 : prev - 1));
  };

  const handleFavoriteDish = () => {
    if (isPostAuthor) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setIsFavoriteDish(!isFavoriteDish);
    }
  };

  // Bookmarked post (no photos)
  if (post.photos.length === 0 && post.rating === 0) {
    return (
      <View style={styles.postContainer}>
        <View style={styles.headerRowBookmark}>
          <Image source={getImageSource(post.user.avatarUrl as string | number)} style={styles.avatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerText}>
              <Text style={styles.userName}>{post.user.name}</Text>
              <Text style={styles.actionText}> bookmarked </Text>
              <Text style={styles.restaurantName}>{post.restaurant.name}</Text>
              <Text style={styles.actionText}> and </Text>
              <Text style={styles.restaurantName}>1 other</Text>
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={10} color="#9CA3AF" />
              <Text style={styles.locationText}>{post.restaurant.address}</Text>
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.actionsContainer}>
          {/* Text Row */}
          <View style={styles.actionsTextRow}>
            <View style={styles.leftTextActions}>
              <Text style={styles.actionTextLabel}>
                {likeCount} me gusta{likeCount !== 1 ? 's' : ''}
              </Text>
              <Text style={styles.actionTextLabel}>
                {commentCount} comentario{commentCount !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
          {/* Icons Row */}
          <View style={styles.actionsRow}>
            <View style={styles.leftActions}>
              <TouchableOpacity style={styles.actionItem} onPress={handleLike}>
                <AnimatedIcon
                  name={isLiked ? 'heart' : 'heart-outline'}
                  size={26}
                  color={isLiked ? '#EF4444' : Colors.nelo.black}
                  focused={isLiked}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem} onPress={handleComment}>
                <Ionicons name="chatbubble-outline" size={24} color={Colors.nelo.black} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="send" size={24} color={Colors.nelo.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.rightActions}>
              <Text style={styles.dateText}>{formatTimestamp(post.timestamp)}</Text>
              <TouchableOpacity onPress={handleBookmark}>
                <AnimatedIcon
                  name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={Colors.nelo.black}
                  focused={isBookmarked}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Stacked layout: Header -> Image -> Notes (fills viewport)
  return (
    <>
      <View style={styles.cardContainer}>
        {/* Header Section - Above Image */}
        <View style={styles.postHeaderSection}>
          <View style={styles.headerRow}>
            <Image source={getImageSource(post.user.avatarUrl as string | number)} style={styles.headerAvatar} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerUserText}>
                <Text style={styles.headerUserHandle}>{post.user.handle}</Text>
                <Text style={styles.headerFillText}>{' en '}</Text>
                <Text style={styles.headerRestaurantName}>{post.restaurant.name}</Text>
                {post.withFriend ? (
                  <>
                    <Text style={styles.headerFillText}>{' con '}</Text>
                    <Text style={styles.headerFriendHandle}>{post.withFriend}</Text>
                  </>
                ) : null}
              </Text>
              <View style={styles.headerLocationRow}>
                <Ionicons name="location-sharp" size={12} color="#6B7280" />
                <Text style={styles.headerLocationText} numberOfLines={1}>{post.restaurant.address}</Text>
              </View>
            </View>
            {/* Rating Badge */}
            <View style={styles.headerRatingBadge}>
              <Text style={[styles.headerRatingText, { color: getRatingColor(post.rating) }]}>
                {post.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Image Carousel - Middle */}
        <View style={styles.imageSection}>
          <ImageCarousel 
            photos={post.photos} 
            onPress={() => setShowDetailModal(true)}
          />
          
          {/* Engagement Actions - Overlayed on Image */}
          <View style={styles.imageEngagementOverlay}>
            <TouchableOpacity style={styles.imageEngagementItem} onPress={handleLike}>
              <Ionicons 
                name={isLiked ? 'heart' : 'heart-outline'} 
                size={22} 
                color="white" 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageEngagementItem} onPress={handleComment}>
              <Ionicons name="chatbubble-outline" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageEngagementItem}>
              <Feather name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notes Section - Below Image */}
        <TouchableOpacity 
          style={styles.notesSection} 
          onPress={() => setShowDetailModal(true)}
          activeOpacity={0.5}
        >
          {post.notes ? (
            <Text style={styles.notesText} numberOfLines={3} ellipsizeMode="tail">
              <Text style={styles.notesLabel}>Notas: </Text>
              {post.notes}
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setShowDetailModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={28} color="#111827" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Full Image Carousel */}
            <ImageCarousel photos={post.photos} />
            
            {/* Content */}
            <View style={styles.modalBody}>
              {/* Header */}
              <View style={styles.modalHeaderRow}>
                <Image source={getImageSource(post.user.avatarUrl as string | number)} style={styles.modalAvatar} />
                <View style={styles.modalUserInfo}>
                  <Text style={styles.modalUserName}>{post.user.name}</Text>
                  <Text style={styles.modalUserAction}>ranked {post.restaurant.name}</Text>
                  {post.withFriend && (
                    <Text style={styles.modalUserAction}>with {post.withFriend}</Text>
                  )}
                </View>
                <View style={styles.modalRatingBadge}>
                  <Text style={styles.modalRatingText}>{post.rating.toFixed(1)}</Text>
                </View>
              </View>
              
              {/* Location */}
              <View style={styles.modalLocationRow}>
                <Ionicons name="location-sharp" size={14} color="#6B7280" />
                <Text style={styles.modalLocationText}>{post.restaurant.address}</Text>
              </View>
              
              {/* Full Notes */}
              {post.notes && (
                <View style={styles.modalNotesContainer}>
                  <Text style={styles.modalNotesLabel}>NOTES</Text>
                  <Text style={styles.modalNotesText}>{post.notes}</Text>
                </View>
              )}
              
              {/* Engagement Stats */}
              <View style={styles.modalStatsRow}>
                <Text style={styles.modalStatsText}>
                  {likeCount} me gusta{likeCount !== 1 ? 's' : ''}
                </Text>
                <Text style={styles.modalStatsText}>
                  {commentCount} comentario{commentCount !== 1 ? 's' : ''}
                </Text>
                <Text style={styles.modalStatsText}>
                  {bookmarkCount} guardado{bookmarkCount !== 1 ? 's' : ''}
                </Text>
              </View>
              
              {/* Timestamp */}
              <Text style={styles.modalTimestamp}>{formatTimestamp(post.timestamp)}</Text>
              
              {/* Action Icons */}
              <View style={styles.modalActionsRow}>
                <TouchableOpacity style={styles.modalActionButton} onPress={handleLike}>
                  <Ionicons 
                    name={isLiked ? 'heart' : 'heart-outline'} 
                    size={24} 
                    color={isLiked ? '#EF4444' : '#111827'} 
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalActionButton} onPress={handleComment}>
                  <Ionicons name="chatbubble-outline" size={24} color="#111827" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalActionButton}>
                  <Feather name="send" size={24} color="#111827" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalActionButton} onPress={handleBookmark}>
                  <Ionicons 
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
                    size={24} 
                    color="#111827" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default function FeedScreen() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();

  useEffect(() => {
    getFeed().then(setPosts);
    getCurrentUser().then((user) => setCurrentUserId(user.id));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <Text style={styles.logo}>nelo</Text>
          <View style={styles.topIcons}>
            <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
              <Ionicons name="calendar-outline" size={20} color={Colors.nelo.black} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
              <Ionicons name="notifications-outline" size={20} color={Colors.nelo.black} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
              <Ionicons name="menu-outline" size={22} color={Colors.nelo.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Frosted Glass Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={16} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar restaurantes, miembros..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        {/* Frosted Glass Filters */}
        <View style={styles.filtersRow}>
          <TouchableOpacity
            style={styles.filterPill}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <Ionicons name="navigate" size={11} color={Colors.nelo.black} style={{ marginRight: 4 }} />
            <Text style={styles.filterText}>Cerca</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterPill, styles.filterPillActive]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <Ionicons name="trending-up" size={11} color="white" style={{ marginRight: 4 }} />
            <Text style={styles.filterTextActive}>Tendencia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterPill}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <Ionicons name="people" size={11} color={Colors.nelo.black} style={{ marginRight: 4 }} />
            <Text style={styles.filterText}>Amigos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.feedContent} 
        showsVerticalScrollIndicator={false}
        snapToInterval={CARD_HEIGHT}
        snapToAlignment="start"
        decelerationRate={0.99}
      >
        {posts.map((post) => (
          <FeedPostItem key={post.id} post={post} currentUserId={currentUserId} />
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  logo: {
    fontSize: 26,
    color: '#FF4D00',
    fontFamily: 'Shrikhand_400Regular',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)', // Frosted glass
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    marginHorizontal: 4,
    borderColor: 'rgba(0,0,0,0.05)', // Subtle border
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  filterPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.6)', // Frosted glass
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)', // Subtle border
    marginHorizontal: 4,
  },
  filterPillActive: {
    backgroundColor: Colors.nelo.orange,
    borderColor: Colors.nelo.orange,
  },
  filterText: {
    color: '#111827',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: SYSTEM_FONT,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: SYSTEM_FONT,
  },
  feedContent: {
    flex: 1,
    // No horizontal padding - full width
  },
  
  // ===== Stacked Card Layout =====
  cardContainer: {
    width: SCREEN_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  
  // ===== Header Section (Above Image) =====
  postHeaderSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerUserText: {
    fontSize: 10,
    lineHeight: 14,
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  headerUserHandle: {
    fontWeight: '600',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  headerFillText: {
    fontWeight: '300',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  headerRestaurantName: {
    fontWeight: '600',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  headerFriendHandle: {
    fontWeight: '600',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  headerLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  headerLocationText: {
    fontSize: 8,
    color: '#6B7280',
    fontWeight: '300',
    marginLeft: 1,
    fontFamily: SYSTEM_FONT,
  },
  headerRatingBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  headerRatingText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: SYSTEM_FONT,
  },
  
  // ===== Image Section (Middle) =====
  imageSection: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    position: 'relative',
  },
  imageEngagementOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 15,
  },
  imageEngagementItem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // ===== Carousel Styles =====
  carouselContainer: {
    position: 'relative',
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH * 1.1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  carouselImage: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH * 1.1,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    zIndex: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  
  // ===== Notes Section (Below Image) =====
  notesSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 13,
    maxHeight: 90, // Fixed height for truncation (approx 3 lines)
  },
  notesText: {
    fontSize: 10,
    lineHeight: 12,
    color: '#111827',
    fontWeight: '300',
    fontFamily: SYSTEM_FONT,
  },
  notesLabel: {
    fontWeight: '600',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  
  // ===== Legacy Overlay Styles (for backwards compatibility) =====
  engagementActionsOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  leftEngagementActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rightEngagementActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  engagementActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  engagementCountText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
    fontFamily: SYSTEM_FONT,
  },
  ratingBadgeOverlay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingTextOverlay: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: SYSTEM_FONT,
  },
  heroStarButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  
  // ===== Modal Styles =====
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
  },
  modalBody: {
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modalAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  modalUserInfo: {
    flex: 1,
  },
  modalUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
    fontFamily: SYSTEM_FONT,
  },
  modalUserAction: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: SYSTEM_FONT,
  },
  modalRatingBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  modalRatingText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    fontFamily: SYSTEM_FONT,
  },
  modalLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalLocationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontFamily: SYSTEM_FONT,
  },
  modalNotesContainer: {
    marginBottom: 20,
  },
  modalNotesLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: '#111827',
    marginBottom: 8,
    fontFamily: SYSTEM_FONT,
  },
  modalNotesText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  modalStatsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  modalStatsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  modalTimestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 20,
    fontFamily: SYSTEM_FONT,
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  modalActionButton: {
    padding: 4,
  },
  
  // Legacy styles for bookmarked posts (no photos)
  postContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.05)', // Centered separator line
  },
  headerRowBookmark: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 10,
    lineHeight: 14,
    color: '#111827',
    fontWeight: '300',
    fontFamily: SYSTEM_FONT,
  },
  userName: {
    fontWeight: '600',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  actionText: {
    fontWeight: '100',
    color: 'blue',
    fontFamily: SYSTEM_FONT,
  },
  restaurantName: {
    fontWeight: '600',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },  
  friendName: {
    fontWeight: '300',
    color: 'blue',
    fontFamily: SYSTEM_FONT,
  },
  ratingBadge: {
    width: 32,
    height: 32,
    borderRadius: 16, // Full circle (half of width/height)
    borderWidth: 0.5,
    borderColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
    fontFamily: SYSTEM_FONT,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 8,
    color: '#6B7280',
    marginLeft: 3,
    fontFamily: SYSTEM_FONT,
  },
  visitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  visitText: {
    fontSize: 8,
    color: '#6B7280',
    marginLeft: 3,
    fontFamily: SYSTEM_FONT,
  },
  photosContainer: {
    marginBottom: 10,
    marginLeft: -12,
  },
  photoWrapper: {
    position: 'relative',
    marginLeft: 4,
  },
  postImage: {
    width: 200,
    height: 180,
    gap: 10,
    borderRadius: 16,
  },
  photoStarButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayCount: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayCountText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notesContainerBookmark: {
    marginBottom: 10,
  },
  notesLabelBookmark: {
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: '#111827',
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 5,
    fontFamily: SYSTEM_FONT,
  },
  notesTextBookmark: {
    fontSize: 10,
    lineHeight: 14,
    marginLeft: 5,
    color: '#111827',
    fontWeight: '300',
    fontFamily: SYSTEM_FONT,
  },
  actionsContainer: {
    marginTop: 5,
  },
  actionsTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  leftTextActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionTextLabel: {
    fontSize: 8,
    fontWeight: '300',
    color: '#111827',
    fontFamily: SYSTEM_FONT,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 15,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookmarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 8,
    fontWeight: '300',
    color: '#6B7280',
    fontFamily: SYSTEM_FONT,
  },
});
