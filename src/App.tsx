import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Listings } from './components/Listings';
import { PostListing } from './components/PostListing';
import { ListingDetail } from './components/ListingDetail';
import { AuthPage } from './components/AuthPage';
// Uncomment these imports when you're ready to use Supabase:
// import { fetchListings, createListing, subscribeToListings } from './lib/supabase';

export interface Listing {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  category: 'vegetables' | 'bread' | 'fruit' | 'grains' | 'dairy' | 'food-other' | 
            'clothing' | 'kitchen' | 'education' | 'household' | 'other';
  quantity: string;
  postedBy: string;
  postedDate: Date;
  pickupLocation: string;
  availableUntil: Date;
  imageUrl?: string;
}

export interface User {
  name: string;
  phone: string;
  city: string;
}

const initialListings: Listing[] = [
  {
    id: '1',
    title: 'Fresh Vegetables from Garden',
    description: 'We have extra spinach, tomatoes, and carrots from our garden. All organic and freshly picked this morning. Everything is free - just come and collect!',
    location: 'Maun',
    city: 'Maun',
    category: 'vegetables',
    quantity: '5kg mixed vegetables',
    postedBy: 'Kabo M.',
    postedDate: new Date('2025-11-05'),
    pickupLocation: 'Maun Primary School',
    availableUntil: new Date('2025-11-08'),
    imageUrl: 'https://images.unsplash.com/photo-1624668430039-0175a0fbf006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBoYXJ2ZXN0fGVufDF8fHx8MTc2MjM1MTEwOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Unsold Bread - End of Day',
    description: 'Our bakery has leftover whole wheat and brown bread from today. Still fresh and perfect for families. Completely free!',
    location: 'Gaborone',
    city: 'Gaborone',
    category: 'bread',
    quantity: '12 loaves',
    postedBy: 'Mma Botlhale Bakery',
    postedDate: new Date('2025-11-06'),
    pickupLocation: 'Broadhurst Community Hall',
    availableUntil: new Date('2025-11-07'),
  },
  {
    id: '3',
    title: 'Children\'s Clothes (Age 5-8)',
    description: 'My kids have outgrown these clothes. All clean and in good condition - shirts, pants, dresses. Perfect for primary school children!',
    location: 'Gaborone',
    city: 'Gaborone',
    category: 'clothing',
    quantity: 'Bag of 15 items',
    postedBy: 'Kefilwe P.',
    postedDate: new Date('2025-11-05'),
    pickupLocation: 'Gaborone West Clinic',
    availableUntil: new Date('2025-11-12'),
    imageUrl: 'https://images.unsplash.com/photo-1622218286192-95f6a20083c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc2MjU0OTMyNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'School Supplies - Notebooks & Pens',
    description: 'Extra school supplies from bulk purchase. Notebooks, pens, pencils, erasers. Great for students!',
    location: 'Francistown',
    city: 'Francistown',
    category: 'education',
    quantity: '20 notebooks, 30 pens',
    postedBy: 'Thato\'s Supplies',
    postedDate: new Date('2025-11-06'),
    pickupLocation: 'Francistown Library',
    availableUntil: new Date('2025-11-10'),
    imageUrl: 'https://images.unsplash.com/photo-1683879025805-a268b690613e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdXBwbGllcyUyMGJvb2tzfGVufDF8fHx8MTc2MjU0OTMyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'Kitchen Utensils - Plates & Bowls',
    description: 'Moving house and have extra plates, bowls, cups. All clean and usable. Come take what you need!',
    location: 'Maun',
    city: 'Maun',
    category: 'kitchen',
    quantity: '12 plates, 8 bowls, 6 cups',
    postedBy: 'Lesego M.',
    postedDate: new Date('2025-11-04'),
    pickupLocation: 'Maun Community Center',
    availableUntil: new Date('2025-11-09'),
    imageUrl: 'https://images.unsplash.com/photo-1731156679850-e73fbc21564c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdXRlbnNpbHMlMjBwb3RzfGVufDF8fHx8MTc2MjU0OTMyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: 'Mangoes from Farm',
    description: 'Ripe mangoes, perfect for eating or making juice. Too many for our family, so sharing with the community!',
    location: 'Kasane',
    city: 'Kasane',
    category: 'fruit',
    quantity: '20+ mangoes',
    postedBy: 'Tshepo L.',
    postedDate: new Date('2025-11-04'),
    pickupLocation: 'Kasane Clinic',
    availableUntil: new Date('2025-11-09'),
  },
  {
    id: '7',
    title: 'Baby Clothes & Blankets',
    description: 'Gently used baby clothes (0-12 months) and soft blankets. My baby has grown out of them. All washed and ready!',
    location: 'Molepolole',
    city: 'Molepolole',
    category: 'clothing',
    quantity: '25 pieces',
    postedBy: 'Kgomotso R.',
    postedDate: new Date('2025-11-05'),
    pickupLocation: 'Molepolole Police Station',
    availableUntil: new Date('2025-11-11'),
  },
  {
    id: '8',
    title: 'Books for Primary School',
    description: 'Extra reading books and textbooks. Good condition. Perfect for students who need extra study materials.',
    location: 'Serowe',
    city: 'Serowe',
    category: 'education',
    quantity: '15 books',
    postedBy: 'Dineo K.',
    postedDate: new Date('2025-11-06'),
    pickupLocation: 'Serowe Kgotla',
    availableUntil: new Date('2025-11-13'),
  },
  {
    id: '9',
    title: 'Sorghum (Mabele)',
    description: 'Extra sorghum from our harvest. Good quality and ready to use. Free for anyone who needs it.',
    location: 'Palapye',
    city: 'Palapye',
    category: 'grains',
    quantity: '10kg',
    postedBy: 'Gorata K.',
    postedDate: new Date('2025-11-03'),
    pickupLocation: 'Palapye Primary School',
    availableUntil: new Date('2025-11-10'),
  },
  {
    id: '10',
    title: 'Pots and Pans Set',
    description: 'Upgrading my kitchen, these pots and pans are still in good condition. Someone can definitely use them!',
    location: 'Lobatse',
    city: 'Lobatse',
    category: 'kitchen',
    quantity: '3 pots, 2 pans',
    postedBy: 'Boitumelo T.',
    postedDate: new Date('2025-11-05'),
    pickupLocation: 'Lobatse Community Hall',
    availableUntil: new Date('2025-11-12'),
  },
  {
    id: '11',
    title: 'Bedding - Sheets & Pillowcases',
    description: 'Extra bedding from our home. Clean, good quality. 2 sets of sheets and pillowcases.',
    location: 'Kanye',
    city: 'Kanye',
    category: 'household',
    quantity: '2 complete sets',
    postedBy: 'Thabo S.',
    postedDate: new Date('2025-11-06'),
    pickupLocation: 'Kanye Clinic',
    availableUntil: new Date('2025-11-10'),
    imageUrl: 'https://images.unsplash.com/photo-1759176171251-bb1f2788343f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZWhvbGQlMjBpdGVtcyUyMGJlZGRpbmd8ZW58MXx8fHwxNzYyNTQ5MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '12',
    title: 'Fresh Milk',
    description: 'We have surplus fresh milk from our dairy. Must be collected today or tomorrow. Absolutely free!',
    location: 'Mochudi',
    city: 'Mochudi',
    category: 'dairy',
    quantity: '5 litres',
    postedBy: 'Letsatsi Dairy',
    postedDate: new Date('2025-11-06'),
    pickupLocation: 'Mochudi Community Center',
    availableUntil: new Date('2025-11-07'),
  },
];

export type ViewType = 'landing' | 'listings' | 'post' | 'detail';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [newListingIds, setNewListingIds] = useState<Set<string>>(new Set());

  // 🚀 SUPABASE INTEGRATION: Load listings from Supabase
  // Uncomment this when you've set up Supabase:
  /*
  useEffect(() => {
    const loadListings = async () => {
      const data = await fetchListings();
      if (data) {
        // Convert Supabase data format to app format
        const formattedListings = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          location: item.location,
          city: item.city,
          category: item.category,
          quantity: item.quantity,
          postedBy: item.posted_by,
          postedDate: new Date(item.created_at),
          pickupLocation: item.pickup_location,
          availableUntil: new Date(item.available_until),
          imageUrl: item.image_url,
        }));
        setListings(formattedListings);
      }
    };

    loadListings();

    // Set up real-time subscription
    const subscription = subscribeToListings((payload) => {
      console.log('Real-time update:', payload);
      loadListings(); // Reload listings on any change
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  */

  // Simulate real-time new listings
  useEffect(() => {
    if (!user) return;

    const simulateNewListing = () => {
      const newListings = [
        {
          title: 'Fresh Bananas',
          description: 'Ripe bananas, perfect for eating or baking!',
          city: 'Mochudi',
          category: 'fruit' as const,
          quantity: '2kg',
          postedBy: 'Mpho T.',
          pickupLocation: 'Mochudi Community Center, Mochudi',
        },
        {
          title: 'School Backpack',
          description: 'Gently used school bag in good condition. Perfect for primary school!',
          city: 'Kasane',
          category: 'education' as const,
          quantity: '1 backpack',
          postedBy: 'Olebile M.',
          pickupLocation: 'Kasane Police Station, Kasane',
        },
        {
          title: 'Women\'s Clothing',
          description: 'Size M/L women\'s tops and skirts. Clean and in good condition.',
          city: 'Lobatse',
          category: 'clothing' as const,
          quantity: '8 items',
          postedBy: 'Masego L.',
          pickupLocation: 'Lobatse Clinic, Lobatse',
        },
      ];

      const randomListing = newListings[Math.floor(Math.random() * newListings.length)];
      const newListing: Listing = {
        ...randomListing,
        id: `new-${Date.now()}`,
        location: randomListing.city,
        postedDate: new Date(),
        availableUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      };

      setListings(prev => [newListing, ...prev]);
      setNewListingIds(prev => new Set(prev).add(newListing.id));

      // Remove "new" badge after 30 seconds
      setTimeout(() => {
        setNewListingIds(prev => {
          const next = new Set(prev);
          next.delete(newListing.id);
          return next;
        });
      }, 30000);
    };

    const interval = setInterval(simulateNewListing, 45000);
    return () => clearInterval(interval);
  }, [user]);

  const handleAuth = (userData: User) => {
    setUser(userData);
    
    // 🚀 SUPABASE INTEGRATION: Save user to Supabase
    // Uncomment this when you've set up Supabase:
    /*
    const saveUser = async () => {
      try {
        await createUser({
          name: userData.name,
          phone: userData.phone,
          city: userData.city,
        });
      } catch (error) {
        console.error('Error saving user:', error);
      }
    };
    saveUser();
    */
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const handlePostListing = (newListing: Omit<Listing, 'id' | 'postedDate'>) => {
    const listing: Listing = {
      ...newListing,
      id: Date.now().toString(),
      postedDate: new Date(),
    };
    setListings([listing, ...listings]);
    setCurrentView('listings');

    // 🚀 SUPABASE INTEGRATION: Save listing to Supabase
    // Uncomment this when you've set up Supabase:
    /*
    const saveListing = async () => {
      try {
        await createListing({
          title: newListing.title,
          description: newListing.description,
          location: newListing.location,
          city: newListing.city,
          category: newListing.category,
          quantity: newListing.quantity,
          posted_by: newListing.postedBy,
          posted_by_user_id: null, // Set this to actual user ID if you have user auth
          pickup_location: newListing.pickupLocation,
          available_until: newListing.availableUntil.toISOString(),
          image_url: newListing.imageUrl,
          phone_contact: user?.phone || '',
          is_available: true,
        });
      } catch (error) {
        console.error('Error saving listing:', error);
      }
    };
    saveListing();
    */
  };

  const handleViewListing = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setSelectedListing(null);
    setCurrentView('listings');
  };

  // Show auth page if user not logged in
  if (!user) {
    return (
      <LanguageProvider>
        <NotificationProvider>
          <AuthPage onAuth={handleAuth} />
          <Toaster position="top-right" richColors />
        </NotificationProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-amber-50">
          <Header 
            currentView={currentView}
            onNavigate={setCurrentView}
            user={user}
            onLogout={handleLogout}
          />
          
          {currentView === 'landing' && (
            <LandingPage onNavigate={setCurrentView} />
          )}
          
          {currentView === 'listings' && (
            <Listings
              listings={listings}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              onViewListing={handleViewListing}
              onNavigate={setCurrentView}
              newListingIds={newListingIds}
            />
          )}
          
          {currentView === 'post' && (
            <PostListing
              onSubmit={handlePostListing}
              onCancel={() => setCurrentView('listings')}
              user={user}
            />
          )}
          
          {currentView === 'detail' && selectedListing && (
            <ListingDetail
              listing={selectedListing}
              onBack={handleBack}
            />
          )}
        </div>
        <Toaster position="top-right" richColors />
      </NotificationProvider>
    </LanguageProvider>
  );
}