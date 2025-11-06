import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Globe2, ArrowRight, Heart, Users, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Normalize and validate Botswana phone numbers
function normalizeBotswanaPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');

  // Accept formats like: +267XXXXXXXX, 267XXXXXXXX, 00267XXXXXXXX, 0XXXXXXXX
  if (digits.startsWith('00267')) {
    const rest = digits.slice(5);
    if (rest.length === 8) return '+267' + rest;
    return null;
  }

  if (digits.startsWith('267')) {
    const rest = digits.slice(3);
    if (rest.length === 8) return '+267' + rest;
    return null;
  }

  if (digits.startsWith('0') && digits.length === 9) {
    const rest = digits.slice(1);
    if (rest.length === 8) return '+267' + rest;
  }

  if (digits.length === 8) {
    return '+267' + digits;
  }

  return null;
}

interface AuthPageProps {
  onAuth: (user: { name: string; phone: string; city: string }) => void;
}

const cities = [
  'Gaborone', 'Francistown', 'Maun', 'Serowe', 'Molepolole',
  'Kasane', 'Palapye', 'Lobatse', 'Selibe Phikwe', 'Kanye',
];

// Enhanced floating animations
const FloatingFood = ({ delay = 0, emoji }: { delay?: number; emoji: string }) => (
  <motion.div
    className="absolute text-4xl opacity-20 pointer-events-none"
    initial={{ y: 0, x: 0, rotate: 0 }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {emoji}
  </motion.div>
);

export function AuthPage({ onAuth }: AuthPageProps) {
  const { language, setLanguage, t } = useLanguage();
  const { showWelcomeNotification } = useNotifications();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
  });
  const [step, setStep] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      url: 'https://www.shutterstock.com/image-photo/closeup-image-two-hands-holding-600nw-2480568529.jpg',
      title: 'Hands Together',
      subtitle: 'Sharing in the spirit of botho'
    },
    {
      url: 'https://images.unsplash.com/photo-1727698947585-3e6703525958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFuZHMlMjBnaXZpbmclMjByZWNlaXZpbmd8ZW58MXx8fHwxNzYyNDM0NTUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Giving & Receiving',
      subtitle: 'Building community through sharing'
    },
    {
      url: 'https://miro.medium.com/v2/1*PdNmqE7yYllwHwSnxwOAFQ.jpeg',
      title: 'Community United',
      subtitle: 'Together we are stronger'
    },
    {
      url: 'https://images.unsplash.com/photo-1729089049653-24312fdca908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoYW5kcyUyMHRvZ2V0aGVyJTIwdW5pdHl8ZW58MXx8fHwxNzYyNDM0NTU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Unity in Action',
      subtitle: 'One community, one purpose'
    },
    {
      url: 'https://images.unsplash.com/photo-1609796574417-09f9675bfd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzaGFyaW5nJTIwbWVhbCUyMHRvZ2V0aGVyfGVufDF8fHx8MTc2MjQzNDU1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Sharing Meals',
      subtitle: 'Every meal shared is love multiplied'
    }
  ];

  // Auto-rotate images
  useState(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Final step: normalize phone and send normalized value to onAuth
      const normalized = normalizeBotswanaPhone(formData.phone);
      const userObj = {
        name: formData.name,
        phone: normalized ?? formData.phone,
        city: formData.city,
      };

      showWelcomeNotification(formData.name);
      onAuth(userObj);
    }
  };

  const canProceed = () => {
    if (step === 0) return formData.name.trim().length > 0;
    if (step === 1) return normalizeBotswanaPhone(formData.phone) !== null;
    if (step === 2) return formData.city.length > 0;
    return false;
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Left Side - Image Showcase (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          >
            <ImageWithFallback
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/60 via-orange-700/50 to-red-600/60" />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                <span className="text-3xl">🌾</span>
              </div>
              <div>
                <h2 className="text-2xl">Moraka</h2>
                <p className="text-sm text-orange-100">Share Food, Share Love</p>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl mb-3">{images[currentImageIndex].title}</h3>
              <p className="text-xl text-orange-100 mb-8">{images[currentImageIndex].subtitle}</p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <div className="text-3xl mb-2">12.5k+</div>
                <div className="text-sm text-orange-100">Meals Shared</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <div className="text-3xl mb-2">3.2k+</div>
                <div className="text-sm text-orange-100">Families Helped</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <div className="text-3xl mb-2">48</div>
                <div className="text-sm text-orange-100">Communities</div>
              </div>
            </motion.div>

            {/* Image indicators */}
            <div className="flex gap-2 mt-8">
              {images.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-12' : 'bg-white/30 w-8'
                  }`}
                  animate={{
                    width: idx === currentImageIndex ? 48 : 32,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 lg:bg-white">
        {/* Animated Background for mobile */}
        <div className="absolute inset-0 lg:hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating Food Emojis */}
        <FloatingFood emoji="🥬" delay={0} />
        <FloatingFood emoji="🍞" delay={1} />
        <FloatingFood emoji="🍎" delay={2} />
        <FloatingFood emoji="🌾" delay={3} />
        <FloatingFood emoji="🥛" delay={4} />

        {/* Language Toggle */}
        <motion.div
          className="absolute top-6 right-6 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-1 flex gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                language === 'en'
                  ? 'bg-white text-orange-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              EN
            </button>
            <button
              onClick={() => setLanguage('tn')}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                language === 'tn'
                  ? 'bg-white text-orange-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              TN
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo - Only show on mobile since it's on left side for desktop */}
            <motion.div
              className="text-center mb-8 lg:hidden"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="inline-block mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-5xl">🌾</span>
                </div>
              </motion.div>
              <motion.h1
                className="text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t('auth.welcome')}
              </motion.h1>
              <motion.p
                className="text-orange-100 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Sparkles className="w-4 h-4" />
                {t('auth.subtitle')}
              </motion.p>
            </motion.div>

            {/* Desktop Title */}
            <motion.div
              className="hidden lg:block text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-gray-800 mb-2">Welcome to Moraka</h1>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                Join our community
              </p>
            </motion.div>

            {/* Form Card */}
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Progress Indicator */}
                <div className="flex gap-2 mb-8">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-2 rounded-full overflow-hidden bg-gray-200"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                        initial={{ width: '0%' }}
                        animate={{ width: step >= i ? '100%' : '0%' }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block mb-2 text-gray-700">
                        {t('auth.name')}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ramsy"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg"
                        autoFocus
                      />
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="phone"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block mb-2 text-gray-700">
                        {t('auth.phone')}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+267 XX XXX XXX"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg"
                        autoFocus
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="city"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block mb-2 text-gray-700">
                        {t('auth.city')}
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg appearance-none cursor-pointer"
                        autoFocus
                      >
                        <option value="">Select your city</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  {step > 0 && (
                    <motion.button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    type="submit"
                    disabled={!canProceed()}
                    className={`flex-1 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                      canProceed()
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={canProceed() ? { scale: 1.02 } : {}}
                    whileTap={canProceed() ? { scale: 0.98 } : {}}
                  >
                    {step === 2 ? t('auth.continue') : 'Next'}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>

              {/* Quick Auth Options */}
              {step === 0 && (
                <motion.div
                  className="mt-8 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-center text-gray-500 text-sm mb-4">
                    {t('auth.or')}
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      type="button"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xl">📱</span>
                      <span className="text-sm">WhatsApp</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xl">💬</span>
                      <span className="text-sm">SMS</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Footer Message */}
            <motion.p
              className="text-center text-white lg:text-gray-600 text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Built with ❤️ for Botswana • Free Forever
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}