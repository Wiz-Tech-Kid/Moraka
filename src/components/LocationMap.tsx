import { motion } from 'motion/react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { FoodListing } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

interface LocationMapProps {
  listing: FoodListing;
}

// Botswana cities coordinates (approximate)
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  'Gaborone': { lat: -24.6282, lng: 25.9231 },
  'Francistown': { lat: -21.1700, lng: 27.5100 },
  'Maun': { lat: -19.9834, lng: 23.4167 },
  'Serowe': { lat: -22.3833, lng: 26.7167 },
  'Molepolole': { lat: -24.4064, lng: 25.4950 },
  'Kasane': { lat: -17.8167, lng: 25.1500 },
  'Palapye': { lat: -22.5467, lng: 27.1250 },
  'Lobatse': { lat: -25.2167, lng: 25.6833 },
  'Selibe Phikwe': { lat: -21.9833, lng: 27.8333 },
  'Kanye': { lat: -24.9667, lng: 25.3333 },
  'Mochudi': { lat: -24.4167, lng: 26.1500 },
  'Mahalapye': { lat: -23.1000, lng: 26.8167 },
};

export function LocationMap({ listing }: LocationMapProps) {
  const { t } = useLanguage();
  const coords = cityCoordinates[listing.city] || cityCoordinates['Gaborone'];

  const openInGoogleMaps = () => {
    const query = encodeURIComponent(`${listing.pickupLocation}, ${listing.city}, Botswana`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const openDirections = () => {
    const query = encodeURIComponent(`${listing.pickupLocation}, ${listing.city}, Botswana`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg">Pickup Location</h3>
            <p className="text-sm text-blue-100">{listing.pickupLocation}</p>
          </div>
        </div>
      </div>

      {/* Visual Map Representation */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 via-green-100 to-blue-100 overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Roads */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#374151" strokeWidth="3" strokeDasharray="10,5" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#374151" strokeWidth="3" strokeDasharray="10,5" />
        </svg>

        {/* Location Marker - Animated */}
        <motion.div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -100%)',
          }}
          initial={{ scale: 0, y: -50 }}
          animate={{ 
            scale: 1, 
            y: [0, -10, 0],
          }}
          transition={{
            scale: { type: "spring", stiffness: 200 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative">
            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Main Pin */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
              <MapPin className="w-6 h-6 text-white" fill="white" />
            </div>
          </div>
        </motion.div>

        {/* Nearby Landmarks (decorative) */}
        <motion.div
          className="absolute left-[30%] top-[30%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-8 h-8 bg-green-500 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-sm">🏫</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-[70%] top-[40%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-sm">🏥</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-[35%] top-[70%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-8 h-8 bg-purple-500 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-sm">🏛️</span>
          </div>
        </motion.div>

        {/* City Name Badge */}
        <motion.div
          className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-800">
            <span className="mr-2">📍</span>
            {listing.city}, Botswana
          </p>
        </motion.div>

        {/* Coordinates */}
        <motion.div
          className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-white font-mono"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {coords.lat.toFixed(4)}°, {coords.lng.toFixed(4)}°
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex gap-3">
          <motion.button
            onClick={openDirections}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Navigation className="w-5 h-5" />
            <span>Get Directions</span>
          </motion.button>

          <motion.button
            onClick={openInGoogleMaps}
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-5 h-5" />
            <span>View in Maps</span>
          </motion.button>
        </div>

        {/* Address Info */}
        <motion.div
          className="mt-4 p-3 bg-white rounded-xl border border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">
                <strong>Pickup Address</strong>
              </p>
              <p className="text-sm text-gray-600">
                {listing.pickupLocation}
              </p>
              <p className="text-sm text-gray-600">
                {listing.city}, Botswana
              </p>
            </div>
          </div>
        </motion.div>

        {/* Helpful Info */}
        <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-900 flex items-start gap-2">
            <span className="text-lg">💡</span>
            <span>
              This is a trusted community location. Always confirm the exact meeting spot with the poster before pickup.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
