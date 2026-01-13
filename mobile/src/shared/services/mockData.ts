import { FeedPost, UserProfile, Restaurant } from '../types';

// Import local images for post photos
// Using require() to load local image assets - these return numbers that React Native uses
const paellaImage = require('../../../assets/images/IMG_5242.png');
const sidraImage = require('../../../assets/images/IMG_5241.png');
const alejandroAvatar = require('../../../assets/images/pfp_Alejandro.png');

// Mock Data
const USERS: Record<string, UserProfile> = {
  u1: {
    id: 'u1',
    name: 'Juan Pérez',
    handle: '@juanp',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    stats: { following: 145, followers: 89, reviews: 12 },
    favoriteCategories: ['Brunch', 'Mexicano', 'Italiano'],
  },
  u2: {
    id: 'u2',
    name: 'Alejandro Cimentada',
    handle: '@alejandroc',
    avatarUrl: alejandroAvatar,
    stats: { following: 210, followers: 180, reviews: 45 },
    favoriteCategories: ['Carnes', 'Burgers', 'Criollo'],
  },
  u3: {
    id: 'u3',
    name: 'Sofia Martinez',
    handle: '@sofiam',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    stats: { following: 520, followers: 890, reviews: 112 },
    favoriteCategories: ['Italiano', 'Brunch', 'Mariscos'],
  },
  u4: {
    id: 'u4',
    name: 'Isabella Ramirez',
    handle: '@isabella_r',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    stats: { following: 342, followers: 1205, reviews: 84 },
    favoriteCategories: ['Sushi', 'Fine Dining', 'Cafe'],
  },
};

const RESTAURANTS: Record<string, Restaurant> = {
  r1: {
    id: 'r1',
    name: 'SBG',
    zone: 'Evaristo Morales',
    address: 'Av. Gustavo Mejía Ricart, Evaristo Morales',
    category: 'Carnes',
    priceRange: '$$$$',
    lat: 0,
    lng: 0,
  },
  r2: {
    id: 'r2',
    name: 'Mitre',
    zone: 'Naco',
    address: 'Calle Los Pinos, Naco',
    category: 'Sushi',
    priceRange: '$$$',
    lat: 0,
    lng: 0,
  },
  r3: {
    id: 'r3',
    name: 'La Dolcerie',
    zone: 'Piantini',
    address: 'Av. Abraham Lincoln, Piantini',
    category: 'Brunch',
    priceRange: '$$',
    lat: 0,
    lng: 0,
  },
  r4: {
    id: 'r4',
    name: 'Peperoni',
    zone: 'Piantini',
    address: 'Av. Winston Churchill, Piantini',
    category: 'Italiano',
    priceRange: '$$$$',
    lat: 0,
    lng: 0,
  },
  r5: {
    id: 'r5',
    name: 'Atarazana',
    zone: 'Zona Colonial',
    address: 'Calle Atarazana, Zona Colonial',
    category: 'Mariscos',
    priceRange: '$$$',
    lat: 0,
    lng: 0,
  },
  r6: {
    id: 'r6',
    name: 'Ajuala',
    zone: 'Piantini',
    address: 'Av. Gustavo Mejía Ricart, Piantini',
    category: 'Fine Dining',
    priceRange: '$$$$',
    lat: 0,
    lng: 0,
  },
  r7: {
    id: 'r7',
    name: 'El Meson',
    zone: 'Bella Vista',
    address: 'Calle El Conde, Bella Vista',
    category: 'Criollo',
    priceRange: '$$$',
    lat: 0,
    lng: 0,
  },
  r8: {
    id: 'r8',
    name: 'Vato',
    zone: 'Park Slope, Brooklyn',
    address: '5th Avenue, Park Slope, Brooklyn',
    category: 'Mexicano',
    priceRange: '$$',
    lat: 0,
    lng: 0,
  },
  r9: {
    id: 'r9',
    name: 'Casa de España',
    zone: 'Santo Domingo',
    address: 'Calle Independencia, Santo Domingo',
    category: 'Español',
    priceRange: '$$$',
    lat: 0,
    lng: 0,
  },
};

const POSTS: FeedPost[] = [
  {
    id: 'p1',
    userId: 'u2',
    user: USERS.u2,
    restaurantId: 'r9',
    restaurant: RESTAURANTS.r9,
    rating: 8.6,
    photos: [
      paellaImage, // Paella de mariscos in metal pan
      sidraImage,  // Green glass bottles of sidra in ice bucket
    ],
    notes: 'Naaa, demasiado bueno. Hace mucho que deseaba una paella de mariscos y acompañado de una sidra que me hizo sentir en asturias. 100% debo volver con amigos.',
    timestamp: '28 nov',
    likes: 30,
    comments: 1,
    bookmarks: 15,
    isBookmarked: false,
    isLiked: false,
    visitCount: 1,
  },
  {
    id: 'p2',
    userId: 'u3',
    user: USERS.u3,
    restaurantId: 'r2',
    restaurant: RESTAURANTS.r2,
    rating: 8.2,
    photos: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=600&fit=crop',
    ],
    notes: 'Sushi super fresco y el ambiente de la terraza muy divertido.',
    timestamp: '25 nov',
    likes: 82,
    comments: 12,
    bookmarks: 45,
    isBookmarked: false,
    isLiked: true,
    visitCount: 5,
  },
  {
    id: 'p3',
    userId: 'u4',
    user: USERS.u4,
    restaurantId: 'r3',
    restaurant: RESTAURANTS.r3,
    rating: 8.8,
    photos: [
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=600&fit=crop',
    ],
    notes: 'El brunch de los domingos es obligatorio. Los pancakes de ricotta son una nube.',
    timestamp: '22 nov',
    likes: 120,
    comments: 8,
    bookmarks: 67,
    isBookmarked: true,
    isLiked: false,
    visitCount: 2,
  },
  {
    id: 'p4',
    userId: 'u2',
    user: USERS.u2,
    restaurantId: 'r4',
    restaurant: RESTAURANTS.r4,
    rating: 7.8,
    photos: [
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop',
    ],
    notes: 'Clásico italiano que nunca decepciona. La pasta carbonara es de las mejores de la ciudad.',
    timestamp: '18 nov',
    likes: 55,
    comments: 3,
    bookmarks: 28,
    isBookmarked: false,
    isLiked: true,
    visitCount: 4,
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
    want: [RESTAURANTS.r3, RESTAURANTS.r6, RESTAURANTS.r8],
    visited: [RESTAURANTS.r1, RESTAURANTS.r2, RESTAURANTS.r4],
  };
};
