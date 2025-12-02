export type Zone = 'Piantini' | 'Naco' | 'Bella Vista' | 'Gazcue' | 'Colonial Zone' | 'Evaristo Morales' | 'Serrallés' | 'Los Cacicazgos';

export type Category = 'Brunch' | 'Sushi' | 'Italiano' | 'Mexicano' | 'Burgers' | 'Cafe' | 'Fine Dining' | 'Criollo' | 'Mariscos' | 'Carnes';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
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
  photos: string[];
  notes: string;
  timestamp: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
  isLiked: boolean;
}

export type Tab = 'feed' | 'lists' | 'friends' | 'profile';

