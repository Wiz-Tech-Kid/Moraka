import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tn';

interface Translations {
  [key: string]: {
    en: string;
    tn: string;
  };
}

export const translations: Translations = {
  // Header
  'app.name': { en: 'Moraka', tn: 'Moraka' },
  'app.tagline': { en: 'Sharing food, building community', tn: 'Go abelana dijo, go aga setšhaba' },
  'nav.home': { en: 'Home', tn: 'Gae' },
  'nav.browse': { en: 'Browse', tn: 'Batla' },
  'nav.post': { en: 'Post Item', tn: 'Tsenya Selo' },
  'nav.profile': { en: 'Profile', tn: 'Profaele' },
  
  // Landing Page
  'hero.title': { en: 'Share Surplus, Build Community, Fight Waste', tn: 'Abelana Tse di Fetetseng, Aga Setšhaba, Lwantsha Mošito' },
  'hero.subtitle': { 
    en: 'Moraka connects households, farmers, shops, and communities across Botswana to share surplus items – food, clothing, household goods, and more. Built on the spirit of botho – because what\'s shared is never wasted.',
    tn: 'Moraka e kopanya malapa, balemi, mabenkeleng le metse mo Botswana go abelana dilo tse di fetetseng – dijo, diaparo, dilo tsa gae le tse dingwe. E agilwe mo moweng wa botho – ka gonne tse di abelanwang ga di latlhege.'
  },
  'hero.browse': { en: 'Browse Listings', tn: 'Batla Dilo' },
  'hero.share': { en: 'Share Surplus Items', tn: 'Abelana Dilo Tse di Fetetseng' },
  
  // Stats
  'stats.meals': { en: 'Meals Shared', tn: 'Dijo Tse di Abelanwang' },
  'stats.families': { en: 'Families Helped', tn: 'Malapa A thusiwa' },
  'stats.waste': { en: 'kg Food Saved', tn: 'kg Ya Dijo E Bolokilwe' },
  'stats.communities': { en: 'Communities', tn: 'Metse' },
  
  // How It Works
  'how.title': { en: 'How Moraka Works', tn: 'Moraka E Dira Jang' },
  'how.step1.title': { en: '1. Post Surplus', tn: '1. Tsenya Dilo' },
  'how.step1.desc': { en: 'List your extra items – food, clothing, household goods, educational supplies. Include your city and pickup location.', tn: 'Kwala dilo tsa gago tse di fetetseng – dijo, diaparo, dilo tsa gae, dilo tsa thuto. Tsenya toropo ya gago le lefelo la go tsaya.' },
  'how.step2.title': { en: '2. Browse Listings', tn: '2. Batla Dilo' },
  'how.step2.desc': { en: 'Search by city to find available items near you. Filter by category and availability.', tn: 'Batla ka toropo go bona dilo tse di leng teng gaufi le wena. Tlhopha ka mofuta le go nna teng.' },
  'how.step3.title': { en: '3. Request & Connect', tn: '3. Kopa & Golagana' },
  'how.step3.desc': { en: 'Contact the poster via WhatsApp or SMS. Agree on pickup time and details.', tn: 'Golagana le yo o tsentseng ka WhatsApp kgotsa SMS. Dumalana ka nako le dintlha tsa go tsaya.' },
  'how.step4.title': { en: '4. Collect Items', tn: '4. Tsaya Dilo' },
  'how.step4.desc': { en: 'Pickup at trusted spots – schools, clinics, kgotla offices, community centers.', tn: 'Tsaya kwa mafelong a a ikanang – dikolo, dikiliniki, makgotla, diphatla tsa setšhaba.' },
  
  // Values
  'values.title': { en: 'Built on Community Values', tn: 'E Agilwe mo Mabakeng a Setšhaba' },
  'values.botho.title': { en: 'Botho (Ubuntu)', tn: 'Botho' },
  'values.botho.desc': { en: 'Rooted in our culture of community care and mutual support. We share because it\'s who we are.', tn: 'E tswa mo setsong sa rona sa tlhokomelo ya setšhaba le thuso e e tshwaraganangang. Re abelana ka gonne ke sone seo re leng sona.' },
  'values.trust.title': { en: 'Community Trust', tn: 'Tshepo ya Setšhaba' },
  'values.trust.desc': { en: 'Everything is free. No payments, no complex systems. Just neighbors helping neighbors.', tn: 'Tsotlhe di mahala. Ga go tuelo, ga go dithulaganyo tse di raraaneng. Ke baagisani fela ba thusa baagisani.' },
  'values.local.title': { en: 'Local First', tn: 'Selegae Pele' },
  'values.local.desc': { en: 'Pickup at familiar, trusted locations in your community. Easy, safe, and accessible.', tn: 'Go tsaya kwa mafelong a a itsegeng, a a ikanyegang mo setšhabeng sa gago. Go bonolo, go sireletsegile, le go fitlhelega.' },
  
  // CTA
  'cta.title': { en: 'Ready to Share or Find Items?', tn: 'O Ikemetse go Abelana kgotsa go Batla Dilo?' },
  'cta.subtitle': { en: 'Join your community in reducing waste and helping those in need across Botswana.', tn: 'Ema le setšhaba sa gago mo go fokotseng mošito le go thusa ba ba tlhokang mo Botswana yotlhe.' },
  'cta.post': { en: 'Post Your Surplus Items', tn: 'Tsenya Dilo Tsa Gago' },
  'cta.find': { en: 'Find Items Near You', tn: 'Batla Dilo Gaufi le Wena' },
  
  // Auth
  'auth.welcome': { en: 'Welcome to Moraka', tn: 'Kamogelo go Moraka' },
  'auth.subtitle': { en: 'Join the movement to end waste and help your community', tn: 'Ema le maitemogelo go fedisa mošito le go thusa setšhaba sa gago' },
  'auth.name': { en: 'Your Name', tn: 'Leina la Gago' },
  'auth.phone': { en: 'Phone Number', tn: 'Nomoro ya Mogala' },
  'auth.city': { en: 'Your City', tn: 'Toropo ya Gago' },
  'auth.continue': { en: 'Continue', tn: 'Tswelela' },
  'auth.or': { en: 'Or continue with', tn: 'Kgotsa tswelela ka' },
  
  // Listings
  'listings.title': { en: 'Browse Available Items', tn: 'Batla Dilo Tse di Leng Teng' },
  'listings.subtitle': { en: 'Find surplus items shared by your community across Botswana', tn: 'Bona dilo tse di fetetseng tse di abelanwang ke setšhaba sa gago mo Botswana' },
  'listings.search': { en: 'Search for items...', tn: 'Batla dilo...' },
  'listings.allCities': { en: 'All Cities', tn: 'Metse Yotlhe' },
  'listings.available': { en: 'items available', tn: 'dilo di le teng' },
  'listings.free': { en: 'Free', tn: 'Mahala' },
  'listings.noResults': { en: 'No listings found', tn: 'Ga go dilo tse di bonweng' },
  'listings.noResultsDesc': { en: 'Try adjusting your search or filters, or be the first to post in your area!', tn: 'Leka go fetola patlo ya gago kgotsa kgaoganyo, kgotsa nna wa ntlha go tsenya kwa kgaolong ya gago!' },
  
  // Post Listing
  'post.title': { en: 'Share Your Surplus Items', tn: 'Abelana Dilo Tsa Gago Tse di Fetetseng' },
  'post.subtitle': { en: 'Help reduce waste and support your community by sharing items you can\'t use', tn: 'Thusa go fokotsa mošito le go tshegetsa setšhaba sa gago ka go abelana dilo tse o sa kgoneng go di dirisa' },
  'post.itemTitle': { en: 'Item Title', tn: 'Leina la Selo' },
  'post.foodTitle': { en: 'Item Title', tn: 'Leina la Selo' },
  'post.category': { en: 'Category', tn: 'Mofuta' },
  'post.description': { en: 'Description', tn: 'Tlhaloso' },
  'post.quantity': { en: 'Quantity', tn: 'Palo' },
  'post.city': { en: 'City', tn: 'Toropo' },
  'post.pickup': { en: 'Pickup Location Type', tn: 'Mofuta wa Lefelo la go Tsaya' },
  'post.availableUntil': { en: 'Available Until', tn: 'E Tla Nna Teng Go Fitlha' },
  'post.postedBy': { en: 'Your Name or Organization', tn: 'Leina la Gago kgotsa Mokgatlo' },
  'post.cancel': { en: 'Cancel', tn: 'Khansela' },
  'post.submit': { en: 'Post Listing', tn: 'Tsenya Dijo' },
  
  // Categories
  'cat.vegetables': { en: 'Vegetables', tn: 'Merogo' },
  'cat.fruit': { en: 'Fruit', tn: 'Maungo' },
  'cat.bread': { en: 'Bread & Bakery', tn: 'Borotho' },
  'cat.grains': { en: 'Grains & Seeds', tn: 'Dijô le Dipeu' },
  'cat.dairy': { en: 'Dairy', tn: 'Maši' },
  'cat.food-other': { en: 'Other Food', tn: 'Dijo Tse Dingwe' },
  'cat.clothing': { en: 'Clothing', tn: 'Diaparo' },
  'cat.kitchen': { en: 'Kitchen Items', tn: 'Dilo Tsa Kichineng' },
  'cat.education': { en: 'Education', tn: 'Thuto' },
  'cat.household': { en: 'Household Items', tn: 'Dilo Tsa Gae' },
  'cat.other': { en: 'Other', tn: 'Tse Dingwe' },
  
  // Detail
  'detail.request': { en: 'Request This Item', tn: 'Kopa Selo Se' },
  'detail.whatsapp': { en: 'Contact via WhatsApp', tn: 'Golagana ka WhatsApp' },
  'detail.sms': { en: 'Contact via SMS', tn: 'Golagana ka SMS' },
  'detail.quantity': { en: 'Quantity', tn: 'Palo' },
  'detail.pickup': { en: 'Pickup Location', tn: 'Lefelo la go Tsaya' },
  'detail.postedBy': { en: 'Posted By', tn: 'E Tsentswe ke' },
  'detail.availableUntil': { en: 'Available Until', tn: 'E Tla Nna Teng Go Fitlha' },
  'detail.postedOn': { en: 'Posted On', tn: 'E Tsentswe ka' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
