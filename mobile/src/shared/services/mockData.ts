import { FeedPost, UserProfile, Restaurant } from '../types';

// Mock Data
const USERS: Record<string, UserProfile> = {
  u1: {
    id: 'u1',
    name: 'Juan Pérez',
    handle: '@juanp',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    stats: { following: 2, followers: 2, reviews: 12 },
    favoriteCategories: ['Brunch', 'Mexicano', 'Italiano'],
  },
  u2: {
    id: 'u2',
    name: 'Isabella Ramirez',
    handle: '@isabella_r',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    stats: { following: 342, followers: 1205, reviews: 84 },
    favoriteCategories: ['Sushi', 'Fine Dining', 'Cafe'],
  },
  u3: {
    id: 'u3',
    name: 'Carlos Hernandez',
    handle: '@carlosh',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
    stats: { following: 210, followers: 180, reviews: 45 },
    favoriteCategories: ['Carnes', 'Burgers', 'Criollo'],
  },
  u4: {
    id: 'u4',
    name: 'Sofia Martinez',
    handle: '@sofiam',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    stats: { following: 520, followers: 890, reviews: 112 },
    favoriteCategories: ['Italiano', 'Brunch', 'Mariscos'],
  },
};

const RESTAURANTS: Record<string, Restaurant> = {
  r1: { id: 'r1', name: 'La Cafetera', zone: 'Serrallés', category: 'Cafe', priceRange: '$$', lat: 0, lng: 0 },
  r2: { id: 'r2', name: 'SBG', zone: 'Evaristo Morales', category: 'Carnes', priceRange: '$$$$', lat: 0, lng: 0 },
  r3: { id: 'r3', name: 'Mitre', zone: 'Naco', category: 'Sushi', priceRange: '$$$', lat: 0, lng: 0 },
  r4: { id: 'r4', name: 'La Dolcerie', zone: 'Piantini', category: 'Brunch', priceRange: '$$', lat: 0, lng: 0 },
  r5: { id: 'r5', name: 'Pepperoni', zone: 'Piantini', category: 'Italiano', priceRange: '$$$$', lat: 0, lng: 0 },
  r6: { id: 'r6', name: 'Atarazana', zone: 'Gazcue', category: 'Mariscos', priceRange: '$$$', lat: 0, lng: 0 },
  r7: { id: 'r7', name: 'Ajuala', zone: 'Piantini', category: 'Fine Dining', priceRange: '$$$$', lat: 0, lng: 0 },
  r8: { id: 'r8', name: 'El Meson', zone: 'Bella Vista', category: 'Criollo', priceRange: '$$$', lat: 0, lng: 0 },
};

const POSTS: FeedPost[] = [
  {
    id: 'p1',
    userId: 'u2',
    user: USERS.u2,
    restaurantId: 'r1',
    restaurant: RESTAURANTS.r1,
    rating: 8.5,
    photos: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=525&fit=crop',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=525&fit=crop',
    ],
    notes: 'Mi lugar favorito para trabajar y tomar café. El café es excelente y tienen opciones de comida saludable. Ambiente perfecto.',
    timestamp: '2h',
    likes: 30,
    comments: 1,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 'p2',
    userId: 'u3',
    user: USERS.u3,
    restaurantId: 'r2',
    restaurant: RESTAURANTS.r2,
    rating: 9.5,
    photos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=525&fit=crop',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=525&fit=crop',
    ],
    notes: 'Las carnes están en otro nivel. El ribeye está perfectamente cocido y los acompañamientos son deliciosos. Servicio impecable.',
    timestamp: '5h',
    likes: 45,
    comments: 4,
    isBookmarked: true,
    isLiked: true,
  },
  {
    id: 'p3',
    userId: 'u4',
    user: USERS.u4,
    restaurantId: 'r3',
    restaurant: RESTAURANTS.r3,
    rating: 9.4,
    photos: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=525&fit=crop'],
    notes: 'El sushi más fresco que he probado en la ciudad. El ambiente es muy chic y los cócteles son buenísimos.',
    timestamp: '1d',
    likes: 82,
    comments: 12,
    isBookmarked: false,
    isLiked: true,
  },
  {
    id: 'p4',
    userId: 'u2',
    user: USERS.u2,
    restaurantId: 'r4',
    restaurant: RESTAURANTS.r4,
    rating: 8.8,
    photos: ['https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=525&fit=crop'],
    notes: 'El brunch de los domingos es obligatorio. Los pancakes de ricotta son una nube.',
    timestamp: '2d',
    likes: 120,
    comments: 8,
    isBookmarked: true,
    isLiked: false,
  },
];

export const getFeed = async (): Promise<FeedPost[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(POSTS), 600));
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  return USERS.u1;
};

export const getFriends = async (): Promise<UserProfile[]> => {
  return [USERS.u2, USERS.u3, USERS.u4];
};

export const getUserLists = async (): Promise<{ want: Restaurant[]; visited: Restaurant[] }> => {
  return {
    want: [RESTAURANTS.r5, RESTAURANTS.r3, RESTAURANTS.r2, RESTAURANTS.r6],
    visited: [RESTAURANTS.r5, RESTAURANTS.r3, RESTAURANTS.r2],
  };
};

