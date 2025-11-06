import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimationControls } from 'motion/react';
import { Heart, MapPin, Users, ArrowRight, Sparkles, TrendingUp, Star, Image as ImageIcon } from 'lucide-react';
import { ViewType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (view: ViewType) => void;
}

// Animated Counter Component
function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {count.toLocaleString()}{suffix}
      </motion.span>
    </div>
  );
}

// Floating Food Particle
function FoodParticle({ delay = 0, emoji, x, y }: { delay?: number; emoji: string; x: string; y: string }) {
  return (
    <motion.div
      className="absolute text-4xl opacity-20 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [-30, 30, -30],
        x: [-20, 20, -20],
        rotate: [0, 360],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 8 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Super Animated with Image */}
      <motion.section 
        className="relative min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white overflow-hidden flex items-center"
        style={{ opacity: heroOpacity }}
      >
        {/* Hero Background Image with Overlay */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: imageParallax }}
        >
          <ImageWithFallback
            src="https://www.bamb.co.bw/sites/default/files/styles/main-image-homepage/public/BAMB%20-%20Pitsane-167_0.jpg?itok=LnT5YjD9"
            alt="Botswana agricultural fields"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/85 via-orange-700/85 to-red-700/85" />
        </motion.div>

        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 z-[1]"
          animate={{
            background: [
              'linear-gradient(120deg, rgba(249, 115, 22, 0.3) 0%, rgba(234, 88, 12, 0.4) 50%, rgba(220, 38, 38, 0.3) 100%)',
              'linear-gradient(120deg, rgba(234, 88, 12, 0.4) 0%, rgba(220, 38, 38, 0.3) 50%, rgba(249, 115, 22, 0.3) 100%)',
              'linear-gradient(120deg, rgba(220, 38, 38, 0.3) 0%, rgba(249, 115, 22, 0.3) 50%, rgba(234, 88, 12, 0.4) 100%)',
              'linear-gradient(120deg, rgba(249, 115, 22, 0.3) 0%, rgba(234, 88, 12, 0.4) 50%, rgba(220, 38, 38, 0.3) 100%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        <FoodParticle emoji="🥬" x="10%" y="20%" delay={0} />
        <FoodParticle emoji="🍞" x="80%" y="30%" delay={1} />
        <FoodParticle emoji="🍎" x="15%" y="70%" delay={2} />
        <FoodParticle emoji="🌾" x="85%" y="60%" delay={3} />
        <FoodParticle emoji="🥛" x="50%" y="80%" delay={4} />
        <FoodParticle emoji="🍊" x="70%" y="15%" delay={5} />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 z-[2]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />

        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <motion.div 
            className="max-w-3xl"
            style={{ scale: heroScale }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">100% Free • Built on Botho • Community Powered</span>
              </motion.div>

              <motion.h1
                className="mb-6 text-5xl md:text-7xl leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('hero.title').split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-orange-100 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.button
                onClick={() => onNavigate('listings')}
                className="flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.browse')}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => onNavigate('post')}
                className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.share')}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Community in Action - Image Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Community in Action</span>
            </motion.div>
            <h2 className="text-gray-800">Sharing the Spirit of Botho</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Real stories from our community members across Botswana, coming together to share surplus food and fight hunger.
            </p>
          </motion.div>

          {/* Main Featured Image - Large Hero */}
          <motion.div
            className="mb-12 relative rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="relative h-[500px]">
              <ImageWithFallback
                src="https://www.fao.org/images/faoraflibraries/default-album/dsc_0041.jpg?sfvrsn=7ee1e8b8_1"
                alt="Botswana farmers at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-12 text-white"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="inline-block bg-green-600 px-4 py-2 rounded-full text-sm mb-4"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ Featured Story
                </motion.div>
                <h3 className="text-3xl md:text-4xl mb-3">From Our Fields to Your Table</h3>
                <p className="text-lg text-gray-200 max-w-2xl">
                  Local farmers across Botswana working hard to bring fresh, quality produce to communities in need
                </p>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://cax-wp-farmers-prod-uploads.s3.amazonaws.com/app/uploads/2019/09/tomato-crates-field.jpg",
                title: "Fresh Harvests",
                desc: "Tomatoes and vegetables ready for sharing"
              },
              {
                image: "https://images.unsplash.com/photo-1734255620882-77378ba420bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBzZWxsaW5nJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NjI0MzI5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
                title: "Market Vendors",
                desc: "Supporting local markets and small businesses"
              },
              {
                image: "https://images.unsplash.com/photo-1631292171396-26a654f51c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZnJlc2glMjBoYXJ2ZXN0JTIwYmFza2V0c3xlbnwxfHx8fDE3NjI0MzI5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
                title: "Organic Goodness",
                desc: "Farm-fresh produce from local gardens"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Animated overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/20 transition-all duration-300"
                  />
                </div>
                
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional wide image showcase */}
          <motion.div
            className="mt-12 grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl h-64"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src="https://resources.pamgolding.co.za/content/properties/202508/2009434/h/2009434_H_125.jpg?w=1000"
                alt="Agricultural land in Botswana"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/70 to-transparent flex items-center">
                <div className="p-8 text-white">
                  <h3 className="mb-2">Rich Farmlands</h3>
                  <p className="text-sm">Botswana's agricultural heritage feeding communities</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl h-64"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689268662792-05837295d9c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVycyUyMG1hcmtldCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MjQzMjk5MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Colorful market produce"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-green-600/70 to-transparent flex items-center justify-end">
                <div className="p-8 text-white text-right">
                  <h3 className="mb-2">Vibrant Markets</h3>
                  <p className="text-sm">Abundance of fresh, colorful produce to share</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats - Animated Counters */}
      <section className="py-20 bg-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: 'radial-gradient(circle, #f97316 2px, transparent 2px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Our Impact So Far</span>
            </motion.div>
            <h2 className="text-gray-800">Making a Difference Together</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { end: 12500, suffix: '+', label: t('stats.meals'), icon: '🍽️', color: 'from-orange-400 to-orange-600' },
              { end: 3200, suffix: '+', label: t('stats.families'), icon: '👨‍👩‍👧‍👦', color: 'from-green-400 to-green-600' },
              { end: 8400, suffix: '', label: t('stats.waste'), icon: '♻️', color: 'from-blue-400 to-blue-600' },
              { end: 48, suffix: '', label: t('stats.communities'), icon: '🏘️', color: 'from-purple-400 to-purple-600' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Scroll Animated */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-center mb-16 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('how.title')}
          </motion.h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '📱', title: t('how.step1.title'), desc: t('how.step1.desc'), color: 'bg-gradient-to-br from-orange-400 to-orange-600' },
              { icon: '🔍', title: t('how.step2.title'), desc: t('how.step2.desc'), color: 'bg-gradient-to-br from-green-400 to-green-600' },
              { icon: '🤝', title: t('how.step3.title'), desc: t('how.step3.desc'), color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
              { icon: '📍', title: t('how.step4.title'), desc: t('how.step4.desc'), color: 'bg-gradient-to-br from-purple-400 to-purple-600' },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <motion.div
                  className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-4xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                
                {index < 3 && (
                  <motion.div
                    className="hidden md:block absolute top-10 -right-4 text-orange-300 text-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Glass Morphism Cards */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-center mb-16 text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('values.title')}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: t('values.botho.title'), desc: t('values.botho.desc'), gradient: 'from-red-500 to-pink-500' },
              { icon: Users, title: t('values.trust.title'), desc: t('values.trust.desc'), gradient: 'from-orange-500 to-amber-500' },
              { icon: MapPin, title: t('values.local.title'), desc: t('values.local.desc'), gradient: 'from-green-500 to-emerald-500' },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="relative p-8 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-12 h-12 text-orange-600 mb-6" />
                  </motion.div>
                  <h3 className="mb-4 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Mega Animated */}
      <section className="relative py-24 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-700 to-emerald-600"
          animate={{
            background: [
              'linear-gradient(90deg, #16a34a 0%, #15803d 50%, #059669 100%)',
              'linear-gradient(90deg, #059669 0%, #16a34a 50%, #15803d 100%)',
              'linear-gradient(90deg, #15803d 0%, #059669 50%, #16a34a 100%)',
              'linear-gradient(90deg, #16a34a 0%, #15803d 50%, #059669 100%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-4 h-4" />
              <span>Join 3,200+ Community Members</span>
            </motion.div>

            <h2 className="mb-6 text-white">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-10 text-green-100">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => onNavigate('post')}
                className="bg-white text-green-600 px-10 py-5 rounded-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('cta.post')}
              </motion.button>
              <motion.button
                onClick={() => onNavigate('listings')}
                className="bg-green-800 text-white px-10 py-5 rounded-xl hover:bg-green-900 hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('cta.find')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.span
                className="text-4xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌾
              </motion.span>
              <span className="text-2xl text-white">Moraka</span>
            </div>
            <p className="text-sm mb-4">
              {t('app.tagline')}
            </p>
            <p className="text-xs text-gray-400">
              Built with the spirit of botho • Free forever • Community powered
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}