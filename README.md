# Nelo - Restaurant Discovery App for Dominican Republic

A mobile-first restaurant discovery and social platform inspired by Beli, adapted for the Dominican Republic market. Nelo combines restaurant discovery, ratings & reviews, and lightweight social features with a focus on verified, real activity rather than fake engagement.

## 📱 Product Overview

**Name:** Nelo (placeholder)  
**Platforms:** iOS & Android (Cross-platform: React Native + Expo + TypeScript)  
**Primary Language:** Spanish (Dominican Spanish)  
**Target Market:** Dominican Republic (residents and visitors)

### Core Promise
Trusted, activity-verified restaurant discovery + lightweight social feed that encourages real visits and check-ins.

---

## 🏗️ Technical Architecture

### Technology Stack

#### Frontend (Mobile)
- **Framework:** React Native with Expo
- **Language:** TypeScript
- **UI Framework:** React Native Paper / NativeBase (modern, customizable components)
- **Navigation:** React Navigation (stack, tab, drawer)
- **State Management:** Zustand or Redux Toolkit
- **Maps:** React Native Maps (Google Maps / Apple Maps integration)
- **Image Handling:** Expo Image Picker, Expo Image Manipulator
- **Location:** Expo Location
- **Notifications:** Expo Notifications

#### Backend
- **Runtime:** Node.js with Express or NestJS
- **Database:** PostgreSQL (primary), Redis (caching, sessions)
- **Authentication:** Firebase Auth or Auth0 (supports phone OTP, social login)
- **File Storage:** AWS S3 or Cloudinary (images, receipts)
- **OCR:** Google Cloud Vision API or Tesseract.js (receipt verification)
- **Search:** Elasticsearch or Algolia (restaurant search)

#### Infrastructure
- **Hosting:** AWS / Vercel / Railway
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry, LogRocket
- **Analytics:** Mixpanel / Amplitude

### Project Structure

```
nelo-app/
├── mobile/                    # React Native Expo app
│   ├── src/
│   │   ├── screens/          # Screen components
│   │   ├── components/       # Reusable UI components
│   │   ├── navigation/       # Navigation setup
│   │   ├── services/         # API calls, auth, etc.
│   │   ├── store/            # State management
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Helper functions
│   │   ├── hooks/            # Custom React hooks
│   │   └── constants/        # App constants, i18n
│   ├── assets/               # Images, fonts, etc.
│   ├── app.json              # Expo config
│   └── package.json
├── web/                       # Web prototype (Vite + React)
│   ├── components/           # UI components
│   ├── services/             # Mock services
│   ├── types.ts              # TypeScript types
│   ├── App.tsx               # Main app component
│   ├── index.tsx             # Entry point
│   ├── index.html            # HTML template
│   ├── vite.config.ts        # Vite configuration
│   └── package.json
├── backend/                   # Node.js backend API
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── services/         # Business logic
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, validation, etc.
│   │   └── utils/            # Utilities
│   └── package.json
├── admin-portal/             # Web admin portal (React/Next.js)
│   ├── src/
│   │   ├── pages/            # Admin pages
│   │   ├── components/       # Admin components
│   │   └── services/         # API services
│   └── package.json
└── shared/                   # Shared types, utilities
    └── types/                # Common TypeScript interfaces
```

**Note:** The `web/` directory contains a working prototype/demo of the Nelo UI built with Vite + React. This serves as a reference for the mobile app's design and UX patterns. The prototype includes Spanish UI, Dominican restaurant data, and demonstrates the core user flows.

---

## 🎯 MVP Features Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [x] Project setup and architecture
- [ ] Authentication system
  - Email/password registration
  - Phone number + OTP (SMS)
  - Social login (Google, Apple)
  - Session management
- [ ] User profile setup
  - Profile picture, name, bio
  - Privacy settings
  - Language preference (Spanish)

### Phase 2: Core Discovery (Weeks 3-4)
- [ ] Restaurant database & seeding
  - Initial restaurant data (Santo Domingo, Punta Cana, etc.)
  - Basic CRUD operations
- [ ] Restaurant discovery screens
  - List view with filters
  - Map view with clustering
  - Search functionality
- [ ] Restaurant detail screen
  - Photos, address, hours
  - Menu display (images or structured)
  - Contact info, payment methods
  - Tags and categories
  - Average price indicator

### Phase 3: Reviews & Ratings (Weeks 5-6)
- [ ] Ratings system
  - Star ratings (1-5)
  - Category ratings (food, service, ambience, price)
  - Aggregate scores and breakdowns
- [ ] Review creation
  - Text reviews with photos
  - Review editing/deletion
- [ ] Review display
  - Chronological and helpful sorting
  - Review filtering
  - Report/flag functionality

### Phase 4: Activity & Verification (Weeks 7-8)
- [ ] Check-in system
  - Manual check-in ("I'm here" button)
  - Location verification
  - QR code scanning (future)
- [ ] Receipt verification
  - Photo upload
  - OCR processing (optional, MVP can be manual)
  - Verified visit badges
- [ ] Activity feed
  - Personal activity history
  - Visit timeline

### Phase 5: Social Features (Weeks 9-10)
- [ ] Friends/Connections system
  - Find and follow users
  - Connection requests (optional)
- [ ] Social feed
  - Friends' check-ins
  - Friends' reviews and photos
  - Saved lists updates
- [ ] Privacy controls
  - Public, connections-only, private settings

### Phase 6: Lists & Collections (Week 11)
- [ ] Saved lists
  - Create custom lists
  - Add/remove restaurants
  - List sharing (public or with connections)
- [ ] Default collections
  - "Want to try"
  - "Favorites"
  - "Been there"

### Phase 7: Maps & Navigation (Week 12)
- [ ] Map integration
  - Google Maps / Apple Maps
  - Directions integration
  - Restaurant pin clustering
- [ ] Location services
  - "Open now" filtering
  - Distance-based sorting
  - Current location detection

### Phase 8: Notifications (Week 13)
- [ ] Push notification setup
  - Friend activity notifications
  - Review mentions
  - Reservation reminders (future)
- [ ] In-app notifications
  - Notification center
  - Notification preferences

### Phase 9: Admin Portal (Weeks 14-16)
- [ ] Restaurant owner dashboard
  - Claim restaurant profile
  - Update restaurant info
  - Upload menu and photos
  - Respond to reviews
  - View analytics
- [ ] Business verification
  - Document upload
  - Verification workflow
- [ ] Admin moderation
  - Review moderation queue
  - Spam detection
  - Restaurant verification

### Phase 10: Polish & Launch Prep (Weeks 17-20)
- [ ] Localization
  - Dominican Spanish translations
  - Currency formatting (DOP)
  - Date/time formatting
- [ ] Performance optimization
- [ ] Testing
  - Unit tests
  - Integration tests
  - E2E tests
- [ ] App store preparation
  - Screenshots, descriptions
  - Privacy policy, terms of service
  - Compliance review

---

## 🔑 Core Features Detail

### 1. User Accounts & Authentication

**Methods:**
- Email/password registration and login
- Phone number + OTP (SMS via Twilio or similar)
- Social login: Google, Apple Sign In

**User Profile:**
- Display name, profile photo
- Bio/description
- Location (city, neighborhood)
- Privacy settings
- Language preference

**Security:**
- JWT token-based sessions
- Refresh token rotation
- Rate limiting on auth endpoints

### 2. Restaurant Discovery

**Browse & Search:**
- Search by name, cuisine, neighborhood
- Filters:
  - Price range ($$$ to $)
  - Rating threshold
  - Open now
  - Cuisine type
  - Payment methods
  - Features (delivery, takeout, reservations)

**Views:**
- **List View:** Cards with photo, name, rating, price, distance
- **Map View:** Clustered pins, tap for quick info

**Restaurant Detail:**
- Hero image gallery
- Name, rating, price range
- Address with map preview
- Opening hours (day-by-day)
- Phone number (click to call)
- Menu (images or structured list)
- Payment methods accepted
- Tags (cuisine, ambiance, features)
- Average check amount
- Reviews section
- Check-in button
- Save to list options
- Directions button

### 3. Ratings & Reviews

**Review Creation:**
- Overall star rating (1-5)
- Category ratings:
  - Food quality
  - Service
  - Ambiance
  - Value/Price
- Review text (optional but encouraged)
- Photo upload (multiple)
- Verified visit badge (if check-in/receipt provided)

**Review Display:**
- Sort by: newest, highest rated, most helpful
- Filter by rating
- Show verified badges prominently
- Aggregate scores and breakdowns
- Review pagination

**Review Moderation:**
- Automated spam detection
- Report functionality
- Human moderation queue
- Rate limiting (e.g., max 5 reviews/day for new users)

### 4. Activity & Verification

**Check-in Flow:**
1. User taps "Check in" on restaurant detail
2. System verifies location (within X meters of restaurant)
3. Optional: Request receipt photo
4. Save check-in to user activity
5. Grant "verified visit" badge if receipt provided

**Verification Methods:**
- **Location-based:** GPS verification
- **Receipt:** Photo upload + OCR (optional in MVP)
- **QR Code:** Future feature (restaurant-issued codes)

**Activity Feed:**
- Personal history of check-ins and reviews
- Timeline view
- Filter by date, restaurant type

### 5. Social Feed & Friends

**Connections System:**
- "Connections" (not "friends" to avoid dating semantics)
- Find users by username, phone, email
- Follow/Unfollow model (or mutual connection requests)
- Privacy controls:
  - Who can see your activity
  - Who can send connection requests

**Feed:**
- Friends' check-ins (with restaurant link)
- Friends' new reviews
- Friends' saved lists updates
- Restaurant recommendations from friends
- Filter feed by activity type

### 6. Saved Lists & Collections

**List Types:**
- Default: "Want to try", "Favorites", "Been there"
- Custom lists: User-created (e.g., "Brunch spots", "Date night")

**Features:**
- Add/remove restaurants
- Reorder restaurants (drag & drop)
- Share lists (public URL or with connections)
- Follow others' public lists
- List notes/descriptions

### 7. Search & Ranking

**Search:**
- Full-text search (restaurant names, cuisines, tags)
- Auto-complete suggestions
- Search history

**Sorting Options:**
- Highest rated
- Most popular (by check-ins)
- Nearest
- Most reviewed
- Recently opened

**Recommendations:**
- Based on user's check-ins and preferences
- "Restaurants near you"
- "Similar to [restaurant]"
- "Trending in [neighborhood]"

### 8. Maps, Directions & Reservations

**Maps:**
- Integration with native maps (Apple Maps, Google Maps)
- Clustered pins for nearby restaurants
- Tap pin for quick info card
- Full-screen map view

**Directions:**
- "Get directions" button opens native maps app
- Walking, driving, transit options

**Reservations:**
- Phone number link (click to call)
- Future: Integration with reservation platforms
- Reservation reminders (if linked)

### 9. Notifications

**Push Notifications:**
- Friend activity (check-ins, reviews)
- New follower/connection
- Review mentions
- Restaurant updates (if following restaurant)
- Reservation reminders

**In-App Notifications:**
- Notification center
- Mark as read/unread
- Notification preferences per type

### 10. Admin / Business Portal (Web)

**Restaurant Owner Features:**
- Claim restaurant (verification required)
- Update restaurant info
- Upload photos (multiple)
- Upload/update menu
- Manage opening hours
- Respond to reviews
- View analytics:
  - Total check-ins
  - Review statistics
  - Popular times
  - Demographics (if available)

**Business Verification:**
- Upload business documents
- Phone verification
- Email verification
- Admin approval workflow

**Admin Features:**
- Moderation queue
- Spam detection dashboard
- User management
- Restaurant verification
- Analytics dashboard

---

## 🌍 Localization & Local Considerations

### Language
- **Primary:** Spanish (Dominican Spanish)
- **Currency:** Dominican Peso (DOP) - format: RD$ 500 or 500 DOP
- **Date/Time:** DD/MM/YYYY format, 12-hour or 24-hour time
- **Common phrases:**
  - "¿Qué tal?" instead of "¿Cómo estás?"
  - Use "usted" or "tú" appropriately (likely "tú" for informal app)
  - Local cuisine terms: "mofongo", "sancocho", "tostones", etc.

### Payment Methods
- Cash (dominant)
- Credit/debit cards
- Mobile payments (if applicable locally)
- Bank transfers (rare for restaurants)

### UX Expectations
- Fast loading (consider slower networks)
- Offline capability (cache restaurant data)
- Large touch targets
- Clear, simple navigation
- Trust indicators (verified badges, real photos)

### Privacy
- GDPR-like compliance (if applicable)
- Clear data usage policies
- User data export
- Account deletion

---

## 🗄️ Database Schema (High-Level)

### Users
- id, email, phone, display_name, profile_photo, bio, created_at, updated_at
- privacy_settings (JSON)
- preferences (language, currency, etc.)

### Restaurants
- id, name, address, lat, lng, phone, email, website
- opening_hours (JSON)
- price_range, cuisine_types (array), tags (array)
- average_rating, total_reviews
- verified (boolean)
- owner_id (FK to Users, if claimed)

### Reviews
- id, user_id (FK), restaurant_id (FK)
- overall_rating, food_rating, service_rating, ambience_rating, price_rating
- review_text, photos (array of URLs)
- verified_visit (boolean)
- created_at, updated_at
- helpful_count, reported_count

### CheckIns
- id, user_id (FK), restaurant_id (FK)
- check_in_time, latitude, longitude
- receipt_photo_url (optional)
- verified (boolean)

### Lists
- id, user_id (FK), name, description, is_public
- created_at, updated_at

### ListItems
- id, list_id (FK), restaurant_id (FK), added_at, order

### Connections
- id, user_id (FK), connection_id (FK), status (pending/accepted)
- created_at

### Notifications
- id, user_id (FK), type, title, message, data (JSON), read, created_at

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (for mobile app)
- PostgreSQL (or Docker) - for backend
- iOS Simulator (Mac) or Android Emulator - for mobile testing

### Initial Setup

1. **Clone repository**
```bash
git clone <repository-url>
cd nelo-app
```

2. **Install dependencies**
```bash
# Install all dependencies at once
npm run install:all

# Or install individually:
# Mobile app
cd mobile && npm install

# Web prototype
cd web && npm install

# Backend (when created)
cd backend && npm install
```

3. **Environment setup**
- Copy `.env.example` to `.env` in each project directory
- Configure database, API keys, etc.

4. **Run development servers**

**Web Prototype (Quick Start):**
```bash
npm run dev:web
# Opens at http://localhost:3000
```

**Mobile App:**
```bash
npm run dev:mobile
# Then press 'i' for iOS or 'a' for Android
```

**Backend (when implemented):**
```bash
npm run dev:backend
# Runs on port 3001 (or as configured)
```

### Running the Web Prototype

The web prototype (`web/` directory) is a fully functional UI demo that showcases:
- Feed screen with restaurant reviews
- Lists screen ("Quiero Ir" / "Visitados")
- Friends/Leaderboard screen
- Profile screen
- Spanish (Dominican Spanish) localization
- Dominican restaurant data (Santo Domingo zones)

To run:
```bash
cd web
npm install
npm run dev
```

The prototype uses mock data and Tailwind CSS for styling. It serves as a design reference for the mobile app implementation.

---

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Component-based architecture
- Custom hooks for reusable logic
- Type-safe API calls

### Git Workflow
- Feature branches: `feature/feature-name`
- Commit messages: Conventional Commits
- PR reviews required

### Testing
- Unit tests: Jest
- Integration tests: React Native Testing Library
- E2E tests: Detox or Maestro

---

## 📊 Success Metrics (Post-MVP)

- Daily active users (DAU)
- Check-ins per day
- Reviews per day
- Verified visit rate
- User retention (7-day, 30-day)
- Restaurant coverage (number of restaurants)
- Average reviews per restaurant
- Social engagement (connections, feed views)

---

## 🔮 Future Enhancements

- Advanced reservations system (OpenTable-style)
- Restaurant promotions and deals
- User loyalty programs
- Restaurant waitlist management
- Integration with delivery apps
- AR menu viewing
- Voice search
- Group dining features
- Restaurant owner marketing tools

---

## 📄 License

[To be determined]

---

## 🤝 Contributing

[Guidelines to be added]

---

## 📧 Contact

[Contact information to be added]

---

**Last Updated:** 2024
**Version:** 0.1.0 (MVP Planning Phase)

