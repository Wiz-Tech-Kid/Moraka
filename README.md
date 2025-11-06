# 🌾 Moraka

**A Free Community Food Sharing Platform for Botswana**

_"Abelana Dijo, Aga Setšhaba, Lwantsha Mošito"_  
_"Share Food, Build Community, Fight Waste"_

---

## 📖 Table of Contents

- [Overview](#overview)
- [Core Philosophy](#core-philosophy)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Data Model](#data-model)
- [Animation & Design System](#animation--design-system)
- [Localization](#localization)
- [Getting Started](#getting-started)
- [Feature Deep Dive](#feature-deep-dive)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🌍 Overview

**Moraka** is a compassionate, community-driven web platform designed to combat food waste and hunger across Botswana by connecting households, farmers, shops, and community centers. The platform enables free food sharing with zero barriers—no payments, no barter, no complex systems—just neighbors helping neighbors in the spirit of **botho** (Ubuntu).

### Vision

To create a sustainable food-sharing ecosystem across Botswana where surplus food finds its way to those who need it, reducing waste while strengthening community bonds through the cultural principle of botho—the belief that "I am because we are."

### Target Users

- **Households** with surplus food from gardens or bulk purchases
- **Farmers** with extra produce from harvests
- **Local shops & bakeries** with unsold but fresh inventory
- **Community centers** coordinating food distribution
- **Families** seeking access to fresh, free food

---

## 💚 Core Philosophy

### Botho-Centered Design

Moraka is built on Botswana's cultural principle of **botho** (Ubuntu)—community care, compassion, and mutual support. This philosophy permeates every aspect of the platform:

- **100% Free**: No payments, no bartering, no transactions—pure community sharing
- **Trust-Based**: No complex verification systems—relies on community trust
- **Local-First**: Pickup at familiar, safe community locations (schools, clinics, kgotla offices)
- **Culturally Appropriate**: Bilingual (English/Setswana) with culturally resonant imagery and language

### Design Principles

1. **Accessibility First**: Simple, intuitive interface suitable for all digital literacy levels
2. **Mobile-First**: Optimized for mobile devices commonly used in Botswana
3. **Visual & Engaging**: Rich imagery and animations to create emotional connection
4. **Community Trust**: Transparent information with social sharing capabilities
5. **Low-Friction**: Minimal steps from discovery to connection

---

## ✨ Key Features

### 1. **Highly Animated Landing Experience**

- **Hero Section**: Full-screen animated hero with parallax-scrolling background image of Botswana agricultural fields
- **Animated Statistics**: Real-time counting animations showing impact (meals shared, families helped, food saved)
- **Floating Food Emojis**: Persistent animated food particles (🌾, 🥬, 🍎) in top-left corner across all pages
- **Scroll-Based Animations**: Elements fade, slide, and scale as users scroll
- **Image Integration**: Authentic images of Botswana farming communities, markets, and agriculture

### 2. **Immersive Authentication**

- **Split-Screen Design**: Left side features rotating images of hands sharing food and community unity
- **Image Carousel**: Auto-rotating images (every 5 seconds) with smooth transitions
- **Prop-Based Auth**: No real authentication backend—uses props for user state management
- **Simple Registration**: Name, phone, city—minimal friction to start sharing

### 3. **Comprehensive Food Listings**

- **Dynamic Search & Filtering**: Real-time search by food name, filter by city and category
- **"NEW" Badge System**: Simulated real-time updates showing fresh listings posted within 24 hours
- **Category Icons**: Visual category system (vegetables, fruit, bread, grains, dairy, other)
- **City-Based Organization**: Users can filter by 12 major Botswana cities
- **Vibrant Food Photography**: Each listing includes high-quality Unsplash images

### 4. **Interactive Listing Detail**

- **Full Details View**: Comprehensive information about quantity, pickup location, availability
- **Google Maps Integration**: "Get Directions" button linking to Google Maps for pickup locations
- **Social Sharing**: WhatsApp, SMS, and Facebook sharing with pre-populated messages
- **Contact Options**: Direct WhatsApp and SMS links to connect with food providers
- **Responsive Design**: Seamless experience on mobile and desktop

### 5. **Intuitive Food Posting**

- **Multi-Step Form**: Guided form for posting surplus food listings
- **Category Selection**: Visual category picker with icons
- **City Dropdown**: All major Botswana cities pre-populated
- **Pickup Location Types**: Predefined safe community locations (schools, clinics, kgotla, markets, community centers)
- **Date Picker**: Calendar interface for setting food availability
- **Instant Toast Notifications**: Success/error feedback using Sonner

### 6. **Bilingual Support (English/Setswana)**

- **Complete Localization**: Every UI element translated to Setswana
- **Context-Aware Translations**: Culturally appropriate translations reflecting Botswana's linguistic nuances
- **Easy Language Toggle**: Header-based language switcher
- **130+ Translation Keys**: Comprehensive coverage across all components

### 7. **Interactive Map View**

- **Location Visualization**: Leaflet-based interactive map showing food listings
- **Marker Clustering**: Organized view of multiple listings in same area
- **Category-Colored Markers**: Visual distinction by food category
- **Popup Details**: Quick preview of listings on map
- **Directions Integration**: One-click Google Maps navigation

### 8. **Notification System**

- **Toast Messages**: Non-intrusive notifications for user actions
- **Context Provider**: Centralized notification management
- **Success/Error States**: Clear feedback for all user interactions
- **Auto-Dismiss**: Notifications automatically dismiss after set duration

### 9. **Real-Time Updates** (Simulated)

- **"NEW" Badge Logic**: Automatic badge for listings posted within 24 hours
- **Prepared for Live Updates**: Architecture supports optional realtime subscriptions (no active realtime backend by default)
- **Optimistic UI Updates**: Immediate feedback while data syncs

### 10. **Social Sharing Integration**

- **WhatsApp**: Pre-formatted messages with listing details
- **SMS**: Native SMS composition with shareable links
- **Facebook**: Social sharing for broader reach
- **Custom Share Messages**: Contextual sharing text in both English and Setswana

---

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 18** - Component-based UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server

### **Styling & UI**

- **Tailwind CSS v4.0** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
  - 40+ pre-built components (Button, Card, Dialog, Form, Select, etc.)
  - Radix UI primitives for accessibility
  - Customizable with Tailwind

### **Animation Libraries**

- **Motion (Framer Motion)** - Primary animation library
  - Scroll-based animations with `useScroll`, `useTransform`
  - Component animations with `motion` components
  - In-view animations with `useInView`
  - Animation controls with `useAnimationControls`
- **GSAP-Ready** - Architecture supports GSAP integration
- **CSS Transitions** - Hardware-accelerated transitions for performance

### **Icons & Assets**

- **Lucide React** - Beautiful, consistent icon system (150+ icons)
- **Unsplash API** - High-quality stock photography
- **ImageWithFallback Component** - Graceful image loading with fallbacks

### **State Management**

- **React Context API**
  - `LanguageContext` - Bilingual translation management
  - `NotificationContext` - Toast notification system
- **React Hooks** - useState, useEffect, useRef for local state

### **Backend & Database**

This app runs with local mock data by default (no external backend required). The codebase was prepared for an optional backend in the past, but all runtime external backend integration has been removed. If you decide to add a backend later, update the architecture and API layers accordingly.

### **Maps & Location**

- **Leaflet** - Interactive map library
- **React Leaflet** - React bindings for Leaflet
- **Google Maps Integration** - Directions and navigation

### **Form Handling**

- **React Hook Form 7.55.0** - Performant form management
- **Zod** (Ready for validation) - TypeScript-first schema validation

### **Notifications**

- **Sonner** - Beautiful toast notification system

### **Development Tools**

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

---

## 🏗️ Architecture

### **Application Structure**

Moraka follows a **component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────┐
│              App.tsx (Root)                 │
│  - Routing Logic (View State Management)   │
│  - Global Providers (Language, Notify)     │
│  - Mock Data Management                     │
└─────────────┬───────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼────┐      ┌──────▼──────┐
│ Header │      │   Pages     │
└────────┘      └──────┬──────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
  ┌─────▼─────┐  ┌────▼────┐  ┌──────▼──────┐
  │  Landing  │  │  Auth   │  │ FoodListings│
  │   Page    │  │  Page   │  │    Page     │
  └───────────┘  └─────────┘  └──────┬──────┘
                                      │
                          ┌───────────┴───────────┐
                    ┌─────▼──────┐      ┌────────▼────────┐
                    │  Listing   │      │  PostListing    │
                    │   Detail   │      │      Form       │
                    └────────────┘      └─────────────────┘
```

### **Data Flow Architecture**

```
┌──────────────────────────────────────────────────────────┐
│                     User Actions                         │
└────────────────────┬─────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼─────┐          ┌─────▼──────┐
  │  Local   │          │  Backend   │ (Optional)
  │  State   │          │           │
    └────┬─────┘          └─────┬──────┘
         │                      │
         │    ┌─────────────────┘
         │    │
    ┌────▼────▼─────┐
    │  UI Updates   │
    │  + Animations │
    └───────────────┘
```

**Current State**: Mock data managed in `App.tsx`  
**Future State**: Optional backend integration (infrastructure-ready architecture)

### **Context Architecture**

```
App.tsx
  └─ LanguageProvider
      └─ NotificationProvider
          └─ Application Components
              ├─ useLanguage() hook → translations
              └─ useNotification() hook → toast()
```

### **Routing Architecture**

Simple view-state routing without external router library:

```typescript
type ViewType = 
  | 'landing' 
  | 'auth' 
  | 'browse' 
  | 'post' 
  | 'detail';

const [currentView, setCurrentView] = useState<ViewType>('landing');
```

Benefits:
- Zero routing dependencies
- Instant view transitions
- Simple state management
- Perfect for single-page application scope

---

## 📁 Project Structure

```
moraka/
│
├── components/
│   ├── ui/                          # shadcn/ui component library
│   │   ├── button.tsx               # Button component
│   │   ├── card.tsx                 # Card component
│   │   ├── dialog.tsx               # Modal dialogs
│   │   ├── form.tsx                 # Form components
│   │   ├── input.tsx                # Input fields
│   │   ├── select.tsx               # Select dropdowns
│   │   ├── calendar.tsx             # Date picker
│   │   ├── badge.tsx                # Badges (NEW, FREE)
│   │   ├── avatar.tsx               # User avatars
│   │   ├── sonner.tsx               # Toast notifications
│   │   └── ...                      # 40+ other components
│   │
│   ├── figma/
│   │   └── ImageWithFallback.tsx    # Image component with fallback
│   │
│   ├── Header.tsx                   # Main navigation header
│   ├── LandingPage.tsx              # Animated landing page
│   ├── AuthPage.tsx                 # Split-screen authentication
│   ├── FoodListings.tsx             # Browse listings page
│   ├── ListingDetail.tsx            # Individual listing detail
│   ├── PostListing.tsx              # Create new listing form
│   ├── LocationMap.tsx              # Interactive map component
│   └── ShareButton.tsx              # Social sharing functionality
│
├── contexts/
│   ├── LanguageContext.tsx          # Bilingual translation system
│   └── NotificationContext.tsx      # Toast notification manager
│
├── lib/
│   └── (api clients)                # API client stubs / utilities
│
├── styles/
│   └── globals.css                  # Global styles & Tailwind config
│
├── guidelines/
│   └── Guidelines.md                # Project development guidelines
│
├── App.tsx                          # Root application component
├── Attributions.md                  # Image & asset attributions
└── README.md                        # This file
```

---

## 🧩 Component Architecture

### **Core Components**

#### **1. App.tsx**
**Purpose**: Application root and orchestration  
**Responsibilities**:
- View state management (routing)
- Global state providers (Language, Notification)
- Mock data management
- User authentication state
- Persistent floating food emoji animations

**Key State**:
```typescript
currentView: ViewType           // Current page view
user: User | null               // Authenticated user
listings: FoodListing[]         // All food listings
selectedListing: FoodListing    // Detail view listing
```

#### **2. Header.tsx**
**Purpose**: Global navigation and branding  
**Features**:
- Moraka branding with tagline
- Navigation menu (Home, Browse, Post, Profile)
- Language switcher (EN/TN)
- Responsive mobile menu
- Animated menu transitions

#### **3. LandingPage.tsx**
**Purpose**: Marketing and conversion landing page  
**Features**:
- Parallax hero section with Botswana agricultural imagery
- Animated statistics counters (meals, families, food saved)
- "How It Works" section with step-by-step guide
- Community values showcase (Botho, Trust, Local-First)
- Call-to-action buttons
- Floating food particle animations
- Scroll-based reveal animations

**Animation Techniques**:
- `useScroll` + `useTransform` for parallax
- `useInView` for on-scroll reveals
- Custom `AnimatedCounter` component
- `FoodParticle` floating animations

#### **4. AuthPage.tsx**
**Purpose**: User authentication/registration  
**Features**:
- Split-screen layout
- Auto-rotating image carousel (5-second intervals)
- Simple registration form (name, phone, city)
- Images focused on community and food sharing
- Smooth transitions between carousel images

**Images Theme**: Hands sharing food, community gatherings, market scenes

#### **5. FoodListings.tsx**
**Purpose**: Browse and search available food  
**Features**:
- Real-time search by food name
- City filter dropdown (12 cities)
- Category filter chips
- "NEW" badge for recent listings (<24 hours)
- "FREE" badge on all listings
- Responsive grid layout (1-3 columns)
- Empty state handling
- Click to view detail

**Filtering Logic**:
```typescript
// Multi-criteria filtering
listings
  .filter(search match)
  .filter(city match)
  .filter(category match)
```

#### **6. ListingDetail.tsx**
**Purpose**: Detailed view of single food listing  
**Features**:
- Large food image display
- Complete listing information
- Quantity, pickup location, availability dates
- Contact options (WhatsApp, SMS)
- Google Maps directions integration
- Social sharing buttons
- Back navigation

**Social Sharing**:
- WhatsApp: `wa.me` link with pre-formatted message
- SMS: `sms:` protocol with message body
- Facebook: `facebook.com/sharer` with URL

#### **7. PostListing.tsx**
**Purpose**: Create new food listing  
**Features**:
- Multi-field form with validation
- Category selector with icons
- City dropdown (12 cities)
- Pickup location type selector
- Date picker for availability
- Image URL input (future: upload)
- Toast notifications on submit
- Form state management

**Form Fields**:
- Food title
- Category (vegetables, fruit, bread, grains, dairy, other)
- Description
- Quantity
- City
- Pickup location type
- Available until date
- Posted by name
- Contact phone
- Image URL (optional)

#### **8. LocationMap.tsx**
**Purpose**: Interactive map visualization  
**Features**:
- Leaflet-based map centered on Botswana
- Marker for each listing
- Category-based marker colors
- Popup with listing preview
- Zoom/pan controls
- Responsive sizing

#### **9. ShareButton.tsx**
**Purpose**: Social sharing functionality  
**Features**:
- Multi-platform sharing (WhatsApp, SMS, Facebook)
- Bilingual share messages
- Icon-based buttons
- Mobile-optimized sharing

---

### **Context Providers**

#### **LanguageContext.tsx**
**Purpose**: Bilingual translation system

**Features**:
- 130+ translation keys
- English and Setswana support
- `useLanguage()` hook for components
- `t(key)` translation function

**Translation Structure**:
```typescript
translations = {
  'hero.title': {
    en: 'Share Food, Build Community',
    tn: 'Abelana Dijo, Aga Setšhaba'
  }
}
```

**Usage**:
```typescript
const { t, language, setLanguage } = useLanguage();
<h1>{t('hero.title')}</h1>
```

#### **NotificationContext.tsx**
**Purpose**: Toast notification management

**Features**:
- Centralized notification system
- Success, error, info, warning types
- Bilingual notifications
- Auto-dismiss functionality
- Queue management

**Usage**:
```typescript
const { notify } = useNotification();
notify.success(t('post.success'));
```

---

## 📊 Data Model

### **FoodListing Interface**

```typescript
interface FoodListing {
  id: string;                    // Unique identifier
  title: string;                 // Food title (e.g., "Fresh Vegetables")
  description: string;           // Detailed description
  location: string;              // City/area
  city: string;                  // Major city
  category: Category;            // Food category
  quantity: string;              // Amount (e.g., "5kg mixed vegetables")
  postedBy: string;              // Name or organization
  postedDate: Date;              // When posted
  pickupLocation: string;        // Specific pickup spot
  availableUntil: Date;          // Expiration date
  imageUrl?: string;             // Optional food image
}
```

### **User Interface**

```typescript
interface User {
  name: string;                  // Full name
  phone: string;                 // Contact phone
  city: string;                  // User's city
}
```

### **Categories**

```typescript
type Category = 
  | 'vegetables'  // 🥬 Merogo
  | 'fruit'       // 🍎 Maungo
  | 'bread'       // 🍞 Borotho
  | 'grains'      // 🌾 Dijô
  | 'dairy'       // 🥛 Maši
  | 'other';      // 📦 Tse Dingwe
```

### **Cities Supported**

```typescript
const cities = [
  'Gaborone',      // Capital
  'Francistown',   // Second largest
  'Maun',          // Tourism hub
  'Kasane',        // North
  'Palapye',       // Central
  'Serowe',        // Central
  'Molepolole',    // South
  'Kanye',         // South
  'Mochudi',       // South-East
  'Mogoditshane',  // Greater Gaborone
  'Lobatse',       // South
  'Selibe Phikwe'  // East
];
```

### **Pickup Location Types**

```typescript
const pickupLocations = [
  'School',            // Dikolo
  'Clinic',            // Dikiliniki
  'Kgotla',            // Traditional meeting place
  'Community Center',  // Diphatla tsa setšhaba
  'Market',            // Mmaraka
];
```

---

## 🎨 Animation & Design System

### **Color Palette (Warm, Earthy)**

```css
/* Primary Colors - Orange/Terracotta */
--primary-orange: #EA580C;    /* Orange-600 */
--primary-dark: #C2410C;      /* Orange-700 */
--primary-light: #FB923C;     /* Orange-400 */

/* Accent Colors */
--accent-red: #DC2626;        /* Red-600 */
--accent-green: #16A34A;      /* Green-600 */
--accent-amber: #F59E0B;      /* Amber-500 */

/* Neutrals */
--gray-50: #FAFAFA;
--gray-100: #F5F5F5;
--gray-900: #171717;

/* Semantic Colors */
--success: #16A34A;
--error: #DC2626;
--warning: #F59E0B;
--info: #0284C7;
```

### **Typography**

```css
/* Tailwind default typography preserved */
/* Font sizes, weights, line-heights controlled via globals.css */

/* Headers scale from H1 to H6 */
/* Body text optimized for readability */
/* Mobile-responsive scaling */
```

### **Animation Patterns**

#### **1. Scroll-Based Animations**
```typescript
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
```

#### **2. In-View Animations**
```typescript
const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
/>
```

#### **3. Floating Particles**
```typescript
<motion.div
  animate={{
    y: [-30, 30, -30],
    x: [-20, 20, -20],
    rotate: [0, 360],
    opacity: [0.1, 0.3, 0.1],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  🌾
</motion.div>
```

#### **4. Stagger Children**
```typescript
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map(item => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

### **Design Tokens**

```css
/* Border Radius */
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

/* Spacing Scale (Tailwind default) */
/* 4px base unit, exponential scale */
```

---

## 🌐 Localization

### **Translation System**

**Languages Supported**:
- **English (en)** - Primary language
- **Setswana (tn)** - National language of Botswana

**Coverage**: 130+ translation keys across:
- Navigation and headers
- Landing page content
- Authentication flow
- Food listing interface
- Form labels and validation
- Notifications and feedback
- Categories and locations

### **Cultural Considerations**

**Setswana Translations**:
- Culturally appropriate word choices
- Respect for traditional terms (e.g., "kgotla" for traditional meeting place)
- Natural phrasing, not literal translations
- Community-oriented language reflecting botho

**Examples**:
```typescript
'values.botho.desc': {
  en: 'Rooted in our culture of community care...',
  tn: 'E tswa mo setsong sa rona sa tlhokomelo ya setšhaba...'
}
```

### **Implementation**

**Translation Hook**:
```typescript
const { t, language, setLanguage } = useLanguage();

// Usage
<h1>{t('hero.title')}</h1>
<button onClick={() => setLanguage('tn')}>Setswana</button>
```

**Adding Translations**:
```typescript
// In contexts/LanguageContext.tsx
export const translations = {
  'new.key': {
    en: 'English text',
    tn: 'Setswana text'
  }
};
```

---

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** 18+ and npm/yarn/pnpm
- Modern web browser
 - **Node.js** 18+ and npm/yarn/pnpm
 - Modern web browser

### **Installation**

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/moraka.git
cd moraka
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open browser**:
```
http://localhost:5173
```

### Environment

No environment variables are required for the default local/mock setup. If you add an external backend later, document its required variables in a new file.

---

---

## 🔍 Feature Deep Dive

### **1. Real-Time Updates (Simulated)**

**Current Implementation**:
- "NEW" badge appears on listings posted within last 24 hours
- Logic: `postedDate > Date.now() - 24 hours`
- Visual indicator for fresh content

**Optional realtime backend**:
- The architecture is prepared for optional realtime subscriptions (no realtime backend is enabled by default).
  This can be implemented with an external backend if desired.

### **2. Social Sharing**

**WhatsApp Integration**:
```typescript
const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
  `Hi! I saw your listing "${title}" on Moraka. Is it still available?`
)}`;
```

**SMS Integration**:
```typescript
const smsUrl = `sms:${phone}?body=${encodeURIComponent(
  `Moraka: ${title} in ${city}`
)}`;
```

**Facebook Sharing**:
```typescript
const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  window.location.href
)}`;
```

### **3. Image Management**

**Current**:
- Unsplash API for demo images
- `ImageWithFallback` component handles failed loads
- Graceful degradation

**Future**:
- Optional storage/backend integration for image uploads and CDN delivery
  (no storage backend is enabled by default).

### **4. Location Services**

**Google Maps Integration**:
```typescript
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  pickupLocation + ', ' + city + ', Botswana'
)}`;
```

**Interactive Map**:
- Leaflet for map rendering
- OpenStreetMap tiles
- Category-based marker styling
- Popup information cards

### **5. Accessibility**

- **Semantic HTML**: Proper heading hierarchy, landmark roles
- **Keyboard Navigation**: All interactive elements keyboard-accessible
- **Screen Reader Support**: ARIA labels, descriptions
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Visible focus indicators
- **Form Labels**: Properly associated labels for all inputs

### **6. Performance Optimization**

- **Code Splitting**: Dynamic imports for route-based splitting
- **Image Optimization**: Lazy loading, responsive images
- **Animation Performance**: Hardware-accelerated CSS transforms
- **Bundle Size**: Tree-shaking, minimal dependencies
- **Caching**: Service worker ready (PWA-ready architecture)

---

## 🗺️ Development Roadmap

### **Phase 1: Core Features** ✅ COMPLETE
- [x] Landing page with animations
- [x] Authentication flow
- [x] Food listings browse
- [x] Listing detail view
- [x] Post listing form
- [x] Bilingual support (EN/TN)
- [x] Social sharing
- [x] Map integration
- [x] Notification system
- [x] Notification system

### **Phase 2: Backend Integration** 🚧 READY
- [ ] Connect to backend
- [ ] Enable real-time subscriptions (optional)
- [ ] User authentication
- [ ] Image uploads / storage integration
- [ ] Database migrations
- [ ] Row Level Security (RLS) policies

### **Phase 3: Enhanced Features** 📋 PLANNED
- [ ] User profiles and history
- [ ] Favorites/bookmarks system
- [ ] Push notifications (PWA)
- [ ] Advanced search filters
- [ ] Messaging between users
- [ ] Rating and review system
- [ ] Community leaderboards
- [ ] Monthly impact reports

### **Phase 4: Mobile & Scale** 🔮 FUTURE
- [ ] Progressive Web App (PWA) with offline support
- [ ] Native mobile apps (React Native)
- [ ] SMS-based interface for feature phones
- [ ] Admin dashboard
- [ ] Analytics and insights
- [ ] Partnership integrations (NGOs, food banks)
- [ ] Multi-country expansion

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Ways to Contribute**

1. **Report Bugs**: Open an issue with detailed reproduction steps
2. **Suggest Features**: Share ideas for improving the platform
3. **Improve Translations**: Help refine Setswana translations
4. **Submit Code**: Fork, branch, and submit pull requests
5. **Documentation**: Improve guides and documentation
6. **Design**: Contribute UI/UX improvements

### **Development Guidelines**

- Follow existing code style and conventions
- Write meaningful commit messages
- Test thoroughly on mobile and desktop
- Ensure accessibility standards are met
- Update documentation for new features
- Maintain bilingual support for all user-facing text

### **Pull Request Process**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request with detailed description

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

### **Inspiration**

This project is inspired by the spirit of **botho** (Ubuntu) in Botswana—the cultural principle that emphasizes community, compassion, and mutual support. Moraka aims to bring this timeless value into the digital age.

### **Technology**

Built with modern web technologies and open-source libraries:
- React team for the amazing framework
- Vercel for Tailwind CSS
- shadcn for the component library
- Motion team for animation library
- Unsplash for beautiful imagery
 - Motion team for animation library
 - Unsplash for beautiful imagery

### **Community**

Thank you to the people of Botswana for the cultural wisdom that makes this platform meaningful and necessary.

---

## 📞 Contact & Support

**Project Maintainer**: Moraka Development Team  
**Website**: [moraka.co.bw](#) _(coming soon)_  
**Email**: [hello@moraka.co.bw](#) _(coming soon)_

**Report Issues**: [GitHub Issues](https://github.com/yourusername/moraka/issues)  
**Discussions**: [GitHub Discussions](https://github.com/yourusername/moraka/discussions)

---

## 🌟 Star the Project

If you find Moraka valuable, please consider:
- ⭐ Starring the repository
- 🐦 Sharing on social media
- 💬 Spreading the word in your community
- 🤝 Contributing to the project

Together, we can build a platform that truly embodies the spirit of botho and creates real impact in fighting hunger and food waste across Botswana.

---

**Built with ❤️ in Botswana, for Botswana**

_"Abelana Dijo, Aga Setšhaba, Lwantsha Mošito"_
