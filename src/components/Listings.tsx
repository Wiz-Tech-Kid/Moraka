import { motion } from 'motion/react';
import { Search, Filter, MapPin, Calendar, Gift, ArrowRight, Sparkles, Zap, Plus } from 'lucide-react';
import { Listing, ViewType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface ListingsProps {
  listings: Listing[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onViewListing: (listing: Listing) => void;
  onNavigate: (view: ViewType) => void;
  newListingIds?: Set<string>;
}

const cities = [
  'all',
  'Gaborone',
  'Francistown',
  'Maun',
  'Serowe',
  'Molepolole',
  'Kasane',
  'Palapye',
  'Lobatse',
  'Kanye',
  'Mochudi',
];

const categoryIcons: Record<string, string> = {
  vegetables: '🥬',
  bread: '🍞',
  fruit: '🍎',
  grains: '🌾',
  dairy: '🥛',
  'food-other': '🍱',
  clothing: '👕',
  kitchen: '🍽️',
  education: '📚',
  household: '🏠',
  other: '📦',
};

export function Listings({
  listings,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  onViewListing,
  onNavigate,
  newListingIds = new Set(),
}: ListingsProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categoryGroups = [
    { id: 'all', label: 'All Items', icon: '🎁' },
    { id: 'food', label: 'Food', icon: '🍎' },
    { id: 'clothing', label: 'Clothing', icon: '👕' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'kitchen', label: 'Kitchen', icon: '🍽️' },
    { id: 'household', label: 'Household', icon: '🏠' },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = selectedCity === 'all' || listing.city === selectedCity;
    
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'food' && ['vegetables', 'bread', 'fruit', 'grains', 'dairy', 'food-other'].includes(listing.category)) ||
      listing.category === selectedCategory;
    
    return matchesSearch && matchesCity && matchesCategory;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 text-9xl">🌾</div>
        <div className="absolute bottom-20 left-20 text-9xl">🍎</div>
        <div className="absolute top-40 left-40 text-8xl">👕</div>
        <div className="absolute bottom-40 right-40 text-8xl">📚</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-gray-800">{t('listings.title')}</h2>
          <p className="text-gray-600">
            {t('listings.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          className="mb-6 flex gap-3 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categoryGroups.map((group) => (
            <motion.button
              key={group.id}
              onClick={() => setSelectedCategory(group.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all border-2 ${
                selectedCategory === group.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{group.icon}</span>
              <span>{group.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('listings.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* City Filter */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === 'all' ? t('listings.allCities') : city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCity !== 'all' || selectedCategory !== 'all') && (
            <motion.div
              className="mt-4 flex items-center gap-2 flex-wrap"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <motion.span
                  className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:bg-orange-200 rounded-full p-0.5 ml-1"
                  >
                    ✕
                  </button>
                </motion.span>
              )}
              {selectedCity !== 'all' && (
                <motion.span
                  className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  City: {selectedCity}
                  <button
                    onClick={() => setSelectedCity('all')}
                    className="hover:bg-orange-200 rounded-full p-0.5 ml-1"
                  >
                    ✕
                  </button>
                </motion.span>
              )}
              {selectedCategory !== 'all' && (
                <motion.span
                  className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  Category: {categoryGroups.find(g => g.id === selectedCategory)?.label}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="hover:bg-orange-200 rounded-full p-0.5 ml-1"
                  >
                    ✕
                  </button>
                </motion.span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <p className="text-gray-800">
              <span className="text-2xl mr-2">{filteredListings.length}</span>
              {t('listings.available')}
            </p>
          </div>
          <motion.button
            onClick={() => onNavigate('post')}
            className="text-green-600 hover:text-green-700 flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Have something to share?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🔍</span>
            </div>
            <h3 className="mb-3 text-gray-800">{t('listings.noResults')}</h3>
            <p className="text-gray-600 mb-8">
              {t('listings.noResultsDesc')}
            </p>
            <motion.button
              onClick={() => onNavigate('post')}
              className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Post Your Items
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
                onClick={() => onViewListing(listing)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image */}
                {listing.imageUrl ? (
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    <ImageWithFallback
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      {newListingIds.has(listing.id) && (
                        <motion.span
                          className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs flex items-center gap-1 shadow-lg"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Zap className="w-3 h-3" />
                          NEW
                        </motion.span>
                      )}
                      <motion.span
                        className="px-3 py-1.5 bg-green-500 text-white rounded-full text-xs flex items-center gap-1 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Gift className="w-3 h-3" />
                        {t('listings.free')}
                      </motion.span>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex items-center justify-center relative">
                    <motion.span
                      className="text-7xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {categoryIcons[listing.category]}
                    </motion.span>
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      {newListingIds.has(listing.id) && (
                        <motion.span
                          className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs flex items-center gap-1 shadow-lg"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Zap className="w-3 h-3" />
                          NEW
                        </motion.span>
                      )}
                      <span className="px-3 py-1.5 bg-green-500 text-white rounded-full text-xs flex items-center gap-1 shadow-lg">
                        <Gift className="w-3 h-3" />
                        {t('listings.free')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {t(`cat.${listing.category}`)}
                    </span>
                  </div>

                  <h3 className="mb-2 text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {listing.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {listing.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <span className="truncate">{listing.location} • {listing.pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <span>Available for {formatDate(listing.availableUntil)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800">{listing.quantity}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Posted by {listing.postedBy}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
