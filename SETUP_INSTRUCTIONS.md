# Nelo MVP - Setup Instructions

## Overview

This is your ultra-simple Nelo MVP built with React Native and Expo. The app matches your design specifications and includes placeholder Firebase integration for when you're ready to connect the backend.

## What's Been Completed

✅ Fixed the app.json error (removed experimental Android settings)
✅ Set up brand colors (#FF4D00 orange, #FFF5E6 background)
✅ Updated all screens to match your screenshots
✅ Simplified Feed screen (removed comments, kept likes only)
✅ Updated tab navigation labels and icons
✅ Updated mock data with Dominican restaurant names
✅ Created Firebase service placeholders for easy backend integration

## Installation & Running

### 1. Install Dependencies

```bash
cd /Users/alejandrocimentada/.claude-worktrees/mobile/beautiful-bell/mobile
npm install
```

### 2. Start the Development Server

```bash
npm start
```

This will start the Expo development server.

### 3. Run on Your Device

#### Option A: Expo Go App (Recommended for MVP testing)
1. Install Expo Go from the App Store (iOS) or Google Play (Android)
2. Scan the QR code shown in your terminal with your phone camera
3. The app will open in Expo Go

#### Option B: iOS Simulator (Mac only)
```bash
npm run ios
```

#### Option C: Android Emulator
```bash
npm run android
```

## Features Implemented

### 1. Feed Screen
- Clean header with Nelo logo (#FF4D00)
- Search bar for restaurants and members
- Three filter tabs: Nearby, Trending (active), Friends
- Feed posts showing:
  - User avatar and name
  - Restaurant name and location
  - Rating badge
  - Food photos
  - Notes/review text
  - Like count and bookmark icon
  - Timestamp

### 2. Lists Screen (Mis Lugares)
- Segmented control: "Quiero Ir" / "Visitados"
- "Ver Mapa" button (placeholder)
- Restaurant cards with:
  - Image
  - Name, zone, and category
  - Rating
  - "Visitado" badge
  - Delete button

### 3. Friends/Social Feed Screen (Leaderboard)
- Title: "Amigos"
- Subtitle showing friend count
- Friend activity cards showing:
  - Friend avatar and name
  - Activity type (visitó, agregó a su lista, publicó opinión)
  - Restaurant preview with image and name
  - Timestamp

### 4. Profile Screen
- Profile photo
- Name and handle
- Stats: Following, Followers, Reviews
- "Edit Profile" button
- Favorite Categories section
- Settings menu:
  - Settings
  - Notifications
  - Share App
  - Help & Support
  - Log Out
- App version number

### 5. Bottom Tab Navigation
- Feed (document icon)
- Your Lists (list icon)
- Leaderboard (trophy icon)
- Profile (person icon)

## Firebase Integration

When you're ready to connect Firebase:

1. **Create a Firebase project**
   - Go to https://console.firebase.google.com
   - Create a new project
   - Enable Authentication, Firestore, and Storage

2. **Install Firebase SDK**
   ```bash
   npm install firebase
   ```

3. **Update Firebase config**
   - Open `src/shared/services/firebase.ts`
   - Replace the placeholder config with your actual Firebase credentials
   - Uncomment the initialization code

4. **Replace mock data**
   - Update `src/shared/services/mockData.ts` to call Firebase functions instead
   - Or create a new service layer that switches between mock and real data

## File Structure

```
mobile/
├── App.tsx                          # Main app entry
├── app.json                         # Expo configuration
├── src/
│   ├── feed/
│   │   └── FeedScreen.tsx          # Home feed with posts
│   ├── lists/
│   │   └── ListsScreen.tsx         # User's restaurant lists
│   ├── social/
│   │   └── FriendsScreen.tsx       # Friend activity feed
│   ├── profile/
│   │   └── ProfileScreen.tsx       # User profile
│   ├── navigation/
│   │   └── TabNavigator.tsx        # Bottom tab navigation
│   └── shared/
│       ├── constants/
│       │   └── colors.ts            # Brand colors
│       ├── types/
│       │   └── index.ts             # TypeScript types
│       └── services/
│           ├── mockData.ts          # Mock data for development
│           └── firebase.ts          # Firebase placeholders
```

## Brand Guidelines

- **Primary Color**: #FF4D00 (Nelo Orange)
- **Background**: #FFF5E6 (Cream)
- **Text**: #1A1A1A (Dark)
- **Logo Font**: Shrikhand (Note: Custom font needs to be loaded separately)

## Next Steps

1. **Run the app** using the instructions above
2. **Test all screens** to ensure they match your requirements
3. **Set up Firebase** when ready to add backend functionality
4. **Add custom fonts** if you want to use Shrikhand for the logo
5. **Add Google Maps** integration for the map features
6. **Implement actual authentication** flow
7. **Add image upload** functionality for photos

## Troubleshooting

### Error: "expected dynamic type 'boolean', but had type 'string'"
**Fixed!** This was caused by experimental Android settings in app.json. They've been removed.

### App not loading in Expo Go
- Make sure you're on the same Wi-Fi network as your computer
- Try restarting the Expo development server
- Clear Expo Go cache in the app settings

### Images not loading
- Mock data uses Unsplash URLs which require internet connection
- Some images may fail to load due to rate limiting

## Support

If you encounter any issues:
1. Check the Expo documentation: https://docs.expo.dev
2. Review the Firebase setup guide: https://firebase.google.com/docs
3. Ensure all dependencies are installed correctly

---

**Built with**: React Native, Expo, TypeScript
**Last Updated**: December 2025
**Version**: 0.1.0 MVP
