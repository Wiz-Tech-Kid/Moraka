import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, MessageCircle, Facebook, Twitter, Mail } from 'lucide-react';
import { FoodListing } from '../App';
import { useNotifications } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ShareButtonProps {
  listing: FoodListing;
  variant?: 'button' | 'icon';
}

export function ShareButton({ listing, variant = 'button' }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showSuccessNotification } = useNotifications();
  const { language } = useLanguage();

  const shareUrl = `https://moraka.bw/listing/${listing.id}`;
  const shareText = language === 'en' 
    ? `Check out this free food on Moraka: ${listing.title} in ${listing.city}. ${listing.quantity} available!`
    : `Bona dijo tse di mahala mo Moraka: ${listing.title} kwa ${listing.city}. ${listing.quantity} di le teng!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showSuccessNotification('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
    showSuccessNotification('Opening WhatsApp...');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    showSuccessNotification('Opening Facebook...');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    showSuccessNotification('Opening Twitter...');
  };

  const handleEmailShare = () => {
    const subject = `Free Food Available: ${listing.title}`;
    const body = `${shareText}\n\nView details: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showSuccessNotification('Opening email...');
  };

  const handleSMSShare = () => {
    const body = `${shareText} ${shareUrl}`;
    window.location.href = `sms:?&body=${encodeURIComponent(body)}`;
    showSuccessNotification('Opening SMS...');
  };

  return (
    <div className="relative">
      {variant === 'button' ? (
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </motion.button>
      ) : (
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Share2 className="w-5 h-5 text-gray-600" />
        </motion.button>
      )}

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
            />

            {/* Share Menu */}
            <motion.div
              className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <div className="mb-4">
                <h3 className="text-gray-800 mb-1">Share this listing</h3>
                <p className="text-sm text-gray-600">Help spread the word about this food</p>
              </div>

              <div className="space-y-2">
                {/* WhatsApp */}
                <motion.button
                  onClick={handleWhatsAppShare}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-all group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800">WhatsApp</p>
                    <p className="text-xs text-gray-600">Share to contacts</p>
                  </div>
                </motion.button>

                {/* SMS */}
                <motion.button
                  onClick={handleSMSShare}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800">SMS</p>
                    <p className="text-xs text-gray-600">Send via text message</p>
                  </div>
                </motion.button>

                {/* Facebook */}
                <motion.button
                  onClick={handleFacebookShare}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Facebook className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800">Facebook</p>
                    <p className="text-xs text-gray-600">Share on your timeline</p>
                  </div>
                </motion.button>

                {/* Twitter */}
                <motion.button
                  onClick={handleTwitterShare}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 transition-all group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Twitter className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800">Twitter</p>
                    <p className="text-xs text-gray-600">Tweet to followers</p>
                  </div>
                </motion.button>

                {/* Email */}
                <motion.button
                  onClick={handleEmailShare}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800">Email</p>
                    <p className="text-xs text-gray-600">Send via email</p>
                  </div>
                </motion.button>

                {/* Copy Link */}
                <div className="pt-2 border-t border-gray-200">
                  <motion.button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-all group"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      {copied ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Copy className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-800">{copied ? 'Link Copied!' : 'Copy Link'}</p>
                      <p className="text-xs text-gray-600 truncate">{shareUrl}</p>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
