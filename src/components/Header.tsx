import { motion, AnimatePresence } from 'motion/react';
import { Menu, Plus, List, Home, Globe2, LogOut, User as UserIcon, Bell } from 'lucide-react';
import { ViewType, User } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  user: User;
  onLogout: () => void;
}

// Floating Food Particle for persistent animation
function FloatingEmoji({ emoji, delay = 0 }: { emoji: string; delay?: number }) {
  return (
    <motion.div
      className="absolute text-2xl opacity-30 pointer-events-none z-[100]"
      style={{ left: '5%', top: '15%' }}
      initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [-20, 20, -20],
        x: [-15, 15, -15],
        rotate: [0, 180, 360],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 6 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}

export function Header({ currentView, onNavigate, user, onLogout }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Simulate notification updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount(prev => (prev < 5 ? prev + 1 : 0));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Persistent floating animation in top left corner */}
      <div className="fixed top-20 left-4 pointer-events-none z-[100]">
        <FloatingEmoji emoji="🌾" delay={0} />
        <motion.div
          className="absolute text-xl opacity-25"
          style={{ left: '40px', top: '30px' }}
          animate={{
            y: [-15, 15, -15],
            x: [-10, 10, -10],
            rotate: [0, -180, -360],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 7,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🥬
        </motion.div>
        <motion.div
          className="absolute text-xl opacity-25"
          style={{ left: '-20px', top: '50px' }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            rotate: [0, 360],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍎
        </motion.div>
      </div>

      <motion.header 
        className="bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg sticky top-0 z-50 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">🌾</span>
              </motion.div>
              <div>
                <h1 className="tracking-wide text-xl">{t('app.name')}</h1>
                <p className="text-xs text-orange-100">{t('app.tagline')}</p>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <motion.button
                onClick={() => onNavigate('landing')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'landing' 
                    ? 'bg-white/20 shadow-lg' 
                    : 'hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span>{t('nav.home')}</span>
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('listings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'listings' || currentView === 'detail'
                    ? 'bg-white/20 shadow-lg' 
                    : 'hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="w-5 h-5" />
                <span>{t('nav.browse')}</span>
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('post')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'post' 
                    ? 'bg-green-700 shadow-lg' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                <span>{t('nav.post')}</span>
              </motion.button>

              {/* Notification Bell */}
              <motion.button
                className="relative p-2 hover:bg-white/10 rounded-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-5 h-5" />
                <AnimatePresence>
                  {notificationCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {notificationCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Language Toggle */}
              <div className="ml-2 bg-white/10 backdrop-blur-md rounded-lg p-1 flex gap-1">
                <motion.button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-md transition-all text-sm ${
                    language === 'en'
                      ? 'bg-white text-orange-600'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EN
                </motion.button>
                <motion.button
                  onClick={() => setLanguage('tn')}
                  className={`px-3 py-1.5 rounded-md transition-all text-sm ${
                    language === 'tn'
                      ? 'bg-white text-orange-600'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  TN
                </motion.button>
              </div>

              {/* User Menu */}
              <div className="ml-2 relative">
                <motion.button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm">{user.name.split(' ')[0]}</span>
                </motion.button>

                {showMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.city}</p>
                    </div>
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg"
              onClick={() => setShowMenu(!showMenu)}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {showMenu && (
            <motion.div
              className="md:hidden mt-4 pt-4 border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { onNavigate('landing'); setShowMenu(false); }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                    currentView === 'landing' ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  {t('nav.home')}
                </button>
                <button
                  onClick={() => { onNavigate('listings'); setShowMenu(false); }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                    currentView === 'listings' ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <List className="w-5 h-5" />
                  {t('nav.browse')}
                </button>
                <button
                  onClick={() => { onNavigate('post'); setShowMenu(false); }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-5 h-5" />
                  {t('nav.post')}
                </button>
                <div className="flex gap-2 px-4 py-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-2 rounded-lg ${
                      language === 'en' ? 'bg-white text-orange-600' : 'bg-white/10'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('tn')}
                    className={`flex-1 py-2 rounded-lg ${
                      language === 'tn' ? 'bg-white text-orange-600' : 'bg-white/10'
                    }`}
                  >
                    Setswana
                  </button>
                </div>
                <div className="px-4 py-2 border-t border-white/20 mt-2">
                  <p className="text-sm mb-1">{user.name}</p>
                  <p className="text-xs text-orange-100 mb-3">{user.city}</p>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 flex items-center gap-2 justify-center"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
}