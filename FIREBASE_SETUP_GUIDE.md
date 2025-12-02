# Firebase Setup Guide for Nelo

## Quick Start

This guide will help you replace the mock data with real Firebase backend integration.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name it "Nelo" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Add Firebase to Your App

### For iOS
1. In Firebase Console, click iOS icon
2. Enter iOS Bundle ID: `com.nelo.app`
3. Download `GoogleService-Info.plist`
4. Add it to your project

### For Android
1. In Firebase Console, click Android icon
2. Enter Android package name: `com.nelo.app`
3. Download `google-services.json`
4. Add it to your project

## Step 3: Enable Firebase Services

### Authentication
1. Go to Authentication > Sign-in method
2. Enable:
   - Email/Password
   - Google (optional)
   - Phone (for OTP login)

### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in production mode (we'll add rules later)
4. Choose location: `us-central1` (or closest to Dominican Republic)

### Cloud Storage
1. Go to Storage
2. Click "Get started"
3. Start in production mode
4. Use default location

## Step 4: Install Firebase SDK

```bash
cd mobile
npm install firebase
```

## Step 5: Configure Firebase in Your App

1. Open `src/shared/services/firebase.ts`
2. Replace the placeholder config:

```typescript
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};
```

3. Uncomment the initialization code:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## Step 6: Set Up Firestore Collections

### Recommended Structure

```
/users/{userId}
  - id: string
  - name: string
  - handle: string
  - avatarUrl: string
  - stats: {
      following: number
      followers: number
      reviews: number
    }
  - favoriteCategories: string[]
  - createdAt: timestamp

/restaurants/{restaurantId}
  - id: string
  - name: string
  - zone: string
  - category: string
  - priceRange: string
  - lat: number
  - lng: number
  - photos: string[]
  - averageRating: number
  - totalReviews: number
  - createdAt: timestamp

/posts/{postId}
  - id: string
  - userId: string
  - restaurantId: string
  - rating: number
  - photos: string[]
  - notes: string
  - likes: number
  - likedBy: string[]
  - timestamp: timestamp

/users/{userId}/lists/{listType}/restaurants/{restaurantId}
  - (restaurant data duplicated for quick access)

/users/{userId}/friends/{friendId}
  - userId: string
  - friendId: string
  - status: 'pending' | 'accepted'
  - createdAt: timestamp
```

## Step 7: Update Firestore Security Rules

Go to Firestore > Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data and write to their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;

      // User lists
      match /lists/{listType}/restaurants/{restaurantId} {
        allow read: if request.auth != null;
        allow write: if request.auth.uid == userId;
      }

      // User friends
      match /friends/{friendId} {
        allow read: if request.auth != null;
        allow write: if request.auth.uid == userId;
      }
    }

    // Restaurants are readable by all authenticated users
    match /restaurants/{restaurantId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write (use admin SDK)
    }

    // Posts are readable by all, writable by owner
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 8: Update Cloud Storage Rules

Go to Storage > Rules and add:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User avatars
    match /users/{userId}/avatar/{filename} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // Post photos
    match /posts/{postId}/{filename} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Restaurant photos (admin only)
    match /restaurants/{restaurantId}/{filename} {
      allow read: if request.auth != null;
      allow write: if false; // Use admin SDK or Cloud Functions
    }
  }
}
```

## Step 9: Implement Authentication

Update `src/shared/services/firebase.ts` and uncomment the auth functions. Example:

```typescript
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const FirebaseAuth = {
  signUp: async (email: string, password: string, displayName: string): Promise<UserProfile> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userProfile: UserProfile = {
      id: user.uid,
      name: displayName,
      handle: `@${displayName.toLowerCase().replace(/\s+/g, '')}`,
      avatarUrl: '',
      stats: { following: 0, followers: 0, reviews: 0 },
      favoriteCategories: [],
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userProfile;
  },

  signIn: async (email: string, password: string): Promise<UserProfile> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return FirebaseUsers.getUserProfile(userCredential.user.uid);
  },
};
```

## Step 10: Switch from Mock to Real Data

In your screens, replace mock data imports:

**Before:**
```typescript
import { getFeed } from '../shared/services/mockData';
```

**After:**
```typescript
import { FirebaseFeed } from '../shared/services/firebase';

// In your component
useEffect(() => {
  const loadFeed = async () => {
    try {
      const posts = await FirebaseFeed.getFeed(currentUser.id);
      setPosts(posts);
    } catch (error) {
      console.error('Error loading feed:', error);
    }
  };
  loadFeed();
}, []);
```

## Step 11: Seed Initial Data

Create a script or use Firebase Console to add initial restaurants:

```typescript
// Example: Add restaurants manually in Firebase Console
// or create a seed script

const initialRestaurants = [
  {
    name: 'La Dolcerie',
    zone: 'Piantini',
    category: 'Brunch',
    priceRange: '$$',
    lat: 18.4655,
    lng: -69.9517,
  },
  {
    name: 'Mitre',
    zone: 'Naco',
    category: 'Sushi',
    priceRange: '$$$',
    lat: 18.4711,
    lng: -69.9306,
  },
  // ... more restaurants
];
```

## Step 12: Test Your Integration

1. Start your app: `npm start`
2. Create a test account
3. Try adding a restaurant to your list
4. Post a review
5. Check Firebase Console to see the data

## Helpful Resources

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Storage Docs](https://firebase.google.com/docs/storage)
- [React Native Firebase](https://rnfirebase.io/) (alternative SDK with better native support)

## Common Issues

### "Firebase not initialized"
Make sure you uncommented the initialization code in `firebase.ts`

### "Permission denied"
Check your Firestore security rules

### "Network request failed"
Ensure you're running on a real device or have internet in simulator

### Images not uploading
Check Cloud Storage rules and make sure you have the correct permissions

## Alternative: Use React Native Firebase

For better performance and native features, consider using `@react-native-firebase/app` instead of the web SDK:

```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/auth
npm install @react-native-firebase/firestore
npm install @react-native-firebase/storage
```

This requires additional native setup but provides better performance and offline support.

---

**Need Help?** Check the Firebase Console logs and error messages for detailed debugging information.
