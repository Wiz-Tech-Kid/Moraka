import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, User, Gift, Package, MessageCircle, Phone, Heart } from 'lucide-react';
import { Listing } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShareButton } from './ShareButton';
import { LocationMap } from './LocationMap';

interface ListingDetailProps {
  listing: Listing;
  onBack: () => void;
}

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

export function ListingDetail({ listing, onBack }: ListingDetailProps) {
  const { t } = useLanguage();
  const { showRequestNotification } = useNotifications();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-BW', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Available until end of today';
    if (diffDays === 1) return 'Available until tomorrow';
    return `Available for ${diffDays} more days`;
  };

  const handleContactWhatsApp = () => {
    alert('In a real app, this would open WhatsApp to contact the poster. For now, this is a demo.');
  };

  const handleContactSMS = () => {
    alert('In a real app, this would open SMS to contact the poster. For now, this is a demo.');
  };

  const handleRequestFood = () => {
    showRequestNotification(listing.title);
  };

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 text-9xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {categoryIcons[listing.category]}
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Back Button & Share */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 group"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to all listings
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ShareButton listing={listing} />
          </motion.div>
        </div>

        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image */}
          {listing.imageUrl ? (
            <motion.div
              className="h-96 overflow-hidden bg-gray-100 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ImageWithFallback
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6">
                <motion.span
                  className="px-4 py-2 bg-green-500 text-white rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Gift className="w-5 h-5" />
                  <span>{t('listings.free')}</span>
                </motion.span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="h-96 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex items-center justify-center relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="text-9xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {categoryIcons[listing.category]}
              </motion.span>
              <div className="absolute top-6 right-6">
                <motion.span
                  className="px-4 py-2 bg-green-500 text-white rounded-full flex items-center gap-2 shadow-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Gift className="w-5 h-5" />
                  <span>{t('listings.free')}</span>
                </motion.span>
              </div>
            </motion.div>
          )}

          <div className="p-8">
            {/* Badges */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full">
                {t(`cat.${listing.category}`)}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center gap-2">
                <Heart className="w-4 h-4" />
                100% Free
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="mb-6 text-gray-800 text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {listing.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-700 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {listing.description}
            </motion.p>

            {/* Details Grid */}
            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b-2 border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Package className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('detail.quantity')}</p>
                    <p className="text-gray-900">{listing.quantity}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('detail.pickup')}</p>
                    <p className="text-gray-900">{listing.pickupLocation}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <User className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('detail.postedBy')}</p>
                    <p className="text-gray-900">{listing.postedBy}</p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4 p-4 bg-green-50 rounded-xl"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Calendar className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('detail.availableUntil')}</p>
                    <p className="text-gray-900">{formatDate(listing.availableUntil)}</p>
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      {getDaysUntil(listing.availableUntil)}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Calendar className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('detail.postedOn')}</p>
                    <p className="text-gray-900">{formatDate(listing.postedDate)}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 mb-6 border-2 border-orange-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="mb-6 text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-orange-600" />
                How to Request This Food
              </h3>
              <ol className="space-y-4 text-gray-700 mb-8">
                {[
                  `Click "Request This Food" below to express your interest`,
                  `You'll receive contact information to coordinate with ${listing.postedBy}`,
                  `Arrange pickup time at ${listing.pickupLocation}`,
                  `Collect your food and say thank you!`,
                ].map((step, index) => (
                  <motion.li
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </motion.li>
                ))}
              </ol>

              <motion.button
                onClick={handleRequestFood}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-5 rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 text-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-6 h-6" />
                {t('detail.request')}
              </motion.button>
            </motion.div>

            {/* Quick Contact Options */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                onClick={handleContactWhatsApp}
                className="flex-1 bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                {t('detail.whatsapp')}
              </motion.button>
              <motion.button
                onClick={handleContactSMS}
                className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                {t('detail.sms')}
              </motion.button>
            </motion.div>

            {/* Location Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-8"
            >
              <LocationMap listing={listing} />
            </motion.div>

            {/* Community Trust Message */}
            <motion.div
              className="mt-8 pt-8 border-t-2 border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 flex gap-4 border-2 border-orange-200">
                <motion.span
                  className="text-4xl flex-shrink-0"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🤝
                </motion.span>
                <div className="text-sm text-gray-700">
                  <p className="mb-3">
                    Moraka is built on <span className="italic">botho</span> – our shared values of community and trust.
                  </p>
                  <p>
                    Please be respectful, communicate clearly, and arrive on time for pickup. 
                    Together we can reduce waste and support each other. <span className="text-orange-600">❤️</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
