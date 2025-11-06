import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Info, Sparkles, Check } from 'lucide-react';
import { FoodListing, User } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';

interface PostListingProps {
  onSubmit: (listing: Omit<FoodListing, 'id' | 'postedDate'>) => void;
  onCancel: () => void;
  user: User;
}

const cities = [
  'Gaborone', 'Francistown', 'Maun', 'Serowe', 'Molepolole',
  'Kasane', 'Palapye', 'Lobatse', 'Selibe Phikwe', 'Kanye',
  'Mochudi', 'Mahalapye',
];

const categories: Array<{ value: FoodListing['category']; label: string; labelTn: string; icon: string }> = [
  { value: 'vegetables', label: 'Vegetables', labelTn: 'Merogo', icon: '🥬' },
  { value: 'fruit', label: 'Fruit', labelTn: 'Maungo', icon: '🍎' },
  { value: 'bread', label: 'Bread & Bakery', labelTn: 'Borotho', icon: '🍞' },
  { value: 'grains', label: 'Grains & Seeds', labelTn: 'Dijô le Dipeu', icon: '🌾' },
  { value: 'dairy', label: 'Dairy', labelTn: 'Maši', icon: '🥛' },
  { value: 'other', label: 'Other', labelTn: 'Tse Dingwe', icon: '🍱' },
];

const pickupLocations = [
  'School', 'Clinic', 'Kgotla', 'Community Center',
  'Police Station', 'Community Hall', 'Church', 'Library', 'Other',
];

export function PostListing({ onSubmit, onCancel, user }: PostListingProps) {
  const { t, language } = useLanguage();
  const { showNewListingNotification } = useNotifications();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: user.city,
    category: 'vegetables' as FoodListing['category'],
    quantity: '',
    postedBy: user.name,
    pickupLocation: '',
    customPickupLocation: '',
    availableUntil: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
    if (formData.pickupLocation === 'Other' && !formData.customPickupLocation.trim()) {
      newErrors.customPickupLocation = 'Please specify the pickup location';
    }
    if (!formData.availableUntil) newErrors.availableUntil = 'Available until date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const pickupLocationValue = formData.pickupLocation === 'Other' 
      ? formData.customPickupLocation 
      : formData.pickupLocation;

    showNewListingNotification(formData.title, formData.city);
    
    onSubmit({
      title: formData.title,
      description: formData.description,
      location: formData.city,
      city: formData.city,
      category: formData.category,
      quantity: formData.quantity,
      postedBy: formData.postedBy,
      pickupLocation: `${pickupLocationValue}, ${formData.city}`,
      availableUntil: new Date(formData.availableUntil),
    });
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Background Decoration */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-10 right-10 text-9xl">🌾</div>
        <div className="absolute bottom-20 left-20 text-9xl">🥬</div>
        <div className="absolute top-1/2 left-1/3 text-9xl">🍎</div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.button
          onClick={onCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 group"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to listings
        </motion.button>

        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-800">{t('post.title')}</h2>
            </div>
            <p className="text-gray-600">{t('post.subtitle')}</p>
          </motion.div>

          {/* Info Box */}
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-5 mb-8 flex gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <strong>Everything on Moraka is 100% free!</strong>
              </p>
              <p className="mb-2">
                Your contact information will be shared with people who request your food. 
                Coordination happens via WhatsApp or SMS.
              </p>
              <p>
                Choose a trusted public location for pickup to ensure safety for everyone.
              </p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Food Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block mb-2 text-gray-700">
                {t('post.foodTitle')} *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder={language === 'en' ? 'e.g., Fresh Vegetables from Garden' : 'sekai., Merogo e Mesha go Tswa mo Tshingwaneng'}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.title ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.title && (
                <motion.p
                  className="text-red-600 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.title}
                </motion.p>
              )}
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block mb-3 text-gray-700">
                {t('post.category')} *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.value}
                    type="button"
                    onClick={() => updateField('category', cat.value)}
                    className={`p-4 border-2 rounded-xl text-center transition-all ${
                      formData.category === cat.value
                        ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="text-4xl block mb-2"
                      animate={formData.category === cat.value ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {cat.icon}
                    </motion.span>
                    <span className="text-sm">{language === 'en' ? cat.label : cat.labelTn}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block mb-2 text-gray-700">
                {t('post.description')} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder={language === 'en' ? 'Describe the food - quality, freshness, how much, etc.' : 'Tlhalosa dijo - boleng, go foufala, bokae, jj.'}
                rows={4}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.description ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.description && (
                <motion.p className="text-red-600 text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.description}
                </motion.p>
              )}
            </motion.div>

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block mb-2 text-gray-700">
                {t('post.quantity')} *
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => updateField('quantity', e.target.value)}
                placeholder="e.g., 5kg, 12 loaves, 20 pieces"
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.quantity ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.quantity && (
                <motion.p className="text-red-600 text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.quantity}
                </motion.p>
              )}
            </motion.div>

            {/* City */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block mb-2 text-gray-700">
                {t('post.city')} *
              </label>
              <select
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer ${
                  errors.city ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <motion.p className="text-red-600 text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.city}
                </motion.p>
              )}
            </motion.div>

            {/* Pickup Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label className="block mb-2 text-gray-700">
                {t('post.pickup')} *
              </label>
              <select
                value={formData.pickupLocation}
                onChange={(e) => updateField('pickupLocation', e.target.value)}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer ${
                  errors.pickupLocation ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <option value="">Select a pickup location type</option>
                {pickupLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.pickupLocation && (
                <motion.p className="text-red-600 text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.pickupLocation}
                </motion.p>
              )}
            </motion.div>

            {/* Custom Pickup Location */}
            <AnimatePresence>
              {formData.pickupLocation === 'Other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block mb-2 text-gray-700">
                    Specify Pickup Location *
                  </label>
                  <input
                    type="text"
                    value={formData.customPickupLocation}
                    onChange={(e) => updateField('customPickupLocation', e.target.value)}
                    placeholder="e.g., Main Market, Village Square"
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      errors.customPickupLocation ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.customPickupLocation && (
                    <motion.p className="text-red-600 text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {errors.customPickupLocation}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Available Until */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <label className="block mb-2 text-gray-700">
                {t('post.availableUntil')} *
              </label>
              <input
                type="date"
                value={formData.availableUntil}
                onChange={(e) => updateField('availableUntil', e.target.value)}
                min={today}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.availableUntil ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.availableUntil && (
                <motion.p className="text-red-600 text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.availableUntil}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Buttons */}
            <motion.div
              className="flex gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('post.cancel')}
              </motion.button>
              <motion.button
                type="submit"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('post.submit')}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Info Footer */}
        <motion.div
          className="mt-6 text-center text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span>Remember: Everything on Moraka is free and built on the spirit of botho</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
