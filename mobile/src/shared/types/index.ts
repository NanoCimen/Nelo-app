export type Zone = 'Piantini' | 'Naco' | 'Bella Vista' | 'Gazcue' | 'Zona Colonial' | 'Evaristo Morales' | 'Serrallés' | 'Los Cacicazgos' | 'Crown Heights, Brooklyn' | 'Park Slope, Brooklyn' | 'Santo Domingo';

export type Category = 'Brunch' | 'Sushi' | 'Italiano' | 'Mexicano' | 'Burgers' | 'Cafe' | 'Fine Dining' | 'Criollo' | 'Mariscos' | 'Carnes' | 'Español';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string | number;
  stats: {
    following: number;
    followers: number;
    reviews: number;
  };
  favoriteCategories: Category[];
}

export interface Restaurant {
  id: string;
  name: string;
  zone: Zone;
  address: string;
  category: Category;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  lat: number;
  lng: number;
}

export interface FeedPost {
  id: string;
  userId: string;
  user: UserProfile;
  restaurantId: string;
  restaurant: Restaurant;
  rating: number; // 0.0 - 10.0
  photos: (string | number)[];
  notes: string;
  timestamp: string;
  likes: number;
  comments: number;
  bookmarks: number;
  isBookmarked: boolean;
  isLiked: boolean;
  withFriend?: string; // Name of friend
  visitCount?: number;
}

export type Tab = 'feed' | 'lists' | 'friends' | 'profile';
