'use client'
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import {themes, getThemeColors} from './themes';

const useSwipe = (onSwipeLeft, onSwipeRight) => {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) onSwipeLeft();
    else if (distance < -minSwipeDistance) onSwipeRight();
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};


// Floating animation component
const ThemeAnimation = ({ theme }) => {
  return (
    <>
      {[...Array(17)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: theme.animation?.opacity ?? 1 }}
          transition={{
            duration: theme.animation?.speed ?? 6,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute text-3xl select-none pointer-events-none"
          style={{ left: `${Math.random() * 100}%` }}
        >
          {theme.emojis[Math.floor(Math.random() * theme.emojis.length)]}
        </motion.div>
      ))}
    </>
  );
};

// Book cover component
const BookCover = ({ title, theme, isClosing = false }) => {
  const colors = getThemeColors(theme);
  
  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-lg"
      style={{
        background: `
          linear-gradient(135deg, 
            ${colors.primary} 0%, 
            ${colors.secondary} 25%,
            ${colors.tertiary} 50%,
            ${colors.quaternary} 75%,
            ${colors.accent} 100%
          )
        `,
        boxShadow: `
          0 25px 50px ${colors.shadow},
          0 15px 30px ${colors.shadow.replace('0.3', '0.2')},
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        border: '3px solid',
        borderColor: colors.border
      }}
    >
      {/* Decorative border */}
      <div 
        className="absolute inset-4 border-2 rounded"
        style={{ borderColor: colors.border + '80' }}
      />
      
      {/* Title */}
<div className="absolute inset-0 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Ethereal background glow */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, ${colors.accent}60 0%, transparent 40%),
              radial-gradient(circle at 70% 80%, ${colors.secondary}40 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, ${colors.tertiary}30 0%, transparent 60%)
            `
          }}
        />
        
        {/* Floating sparkles animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-60"
              style={{ 
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                color: colors.pageBackground + '80'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Main title with enhanced styling and backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 mb-12"
        >
          {/* Beautiful backdrop/box for title */}
          <div 
            className="relative px-12 py-8 rounded-3xl backdrop-blur-sm"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 182, 193, 0.7) 0%, 
                  rgba(147, 112, 219, 0.6) 25%, 
                  rgba(255, 105, 180, 0.65) 50%, 
                  rgba(138, 43, 226, 0.6) 75%, 
                  rgba(255, 20, 147, 0.7) 100%
                ),
                rgba(0, 0, 0, 0.4)
              `,
              border: `2px solid rgba(255, 255, 255, 0.5)`,
              boxShadow: `
                0 25px 50px rgba(0, 0, 0, 0.3),
                0 0 80px rgba(255, 182, 193, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `
            }}
          >
            <h1 
              className="text-4xl md:text-7xl lg:text-8xl font-serif text-center leading-tight relative"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#daa520',
                textShadow: `
                  2px 2px 8px ${colors.shadow}80,
                  0 0 30px ${colors.pageBackground}60,
                  0 0 60px ${colors.pageBackground}40,
                  1px 1px 0px ${colors.accent}40
                `,
                fontWeight: 'bold',
                letterSpacing: '0.02em'
              }}
            >
              {title}
            </h1>
            
            {/* Enhanced underline decoration */}
            <div 
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 opacity-80"
              style={{
                width: '70%',
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  ${colors.accent}80 20%, 
                  ${colors.pageBackground}90 50%, 
                  ${colors.secondary}80 80%, 
                  transparent 100%
                )`,
                borderRadius: '2px',
                boxShadow: `0 0 10px ${colors.pageBackground}60`
              }}
            />
            
            {/* Corner decorations */}
            <div 
              className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg opacity-80"
              style={{ borderColor: 'rgba(255, 255, 255, 0.8)' }}
            />
            <div 
              className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 rounded-tr-lg opacity-80"
              style={{ borderColor: 'rgba(255, 255, 255, 0.8)' }}
            />
            <div 
              className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 rounded-bl-lg opacity-80"
              style={{ borderColor: 'rgba(255, 255, 255, 0.8)' }}
            />
            <div 
              className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 rounded-br-lg opacity-80"
              style={{ borderColor: 'rgba(255, 255, 255, 0.8)' }}
            />
          </div>
        </motion.div>
        
        {/* Enhanced decorative heart with pulsing animation */}
        <motion.div 
          className="relative mb-12"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="text-8xl relative z-10"
            style={{
              filter: `drop-shadow(0 0 20px ${colors.pageBackground}60)`,
              textShadow: `0 0 30px ${colors.pageBackground}80`
            }}
          >
            {theme.emojis[0] || '💕'}
          </div>
          
          {/* Glowing ring around emoji */}
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, ${colors.pageBackground}20 30%, transparent 70%)`,
              transform: 'scale(1.5)'
            }}
          />
        </motion.div>
        
        {/* Enhanced subtitle with typewriter effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative"
        >
          <div 
            className="text-xl md:text-2xl font-serif italic text-center px-8 py-4 relative z-10"
            style={{ 
              color: colors.pageBackground,
              textShadow: `
                1px 1px 2px ${colors.shadow},
                0 0 15px ${colors.pageBackground}30
              `,
              fontFamily: '"Dancing Script", cursive',
              letterSpacing: '0.05em'
            }}
          >
            <span className="relative">
              {isClosing ? 'Our Beautiful Journey' : 'Click to Begin Our Story'}
              
              {/* Decorative flourishes */}
              <div 
                className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-lg opacity-70"
                style={{ color: colors.pageBackground }}
              >
                ✧
              </div>
              <div 
                className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-lg opacity-70"
                style={{ color: colors.pageBackground }}
              >
                ✧
              </div>
            </span>
          </div>
          
          {/* Soft glow background for subtitle */}
          <div 
            className="absolute inset-0 rounded-full opacity-30 blur-xl"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}40 0%, ${colors.secondary}30 100%)`
            }}
          />
        </motion.div>
        
        {/* Enhanced bottom decoration with floating animation */}
        <motion.div 
          className="absolute bottom-12 flex space-x-6 text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {theme.emojis.slice(1, 4).map((emoji, i) => (
            <motion.span 
              key={i}
              className="relative"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                filter: `drop-shadow(0 0 10px ${colors.pageBackground}40)`,
                textShadow: `0 0 15px ${colors.pageBackground}60`
              }}
            >
              {emoji}
              
              {/* Subtle glow behind each emoji */}
              <div 
                className="absolute inset-0 rounded-full opacity-40 blur-lg -z-10"
                style={{
                  background: `radial-gradient(circle, ${colors.pageBackground}30 0%, transparent 70%)`,
                  transform: 'scale(1.8)'
                }}
              />
            </motion.span>
          ))}
        </motion.div>

        {/* Ambient particles floating in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full opacity-30"
              style={{
                background: `linear-gradient(45deg, ${colors.pageBackground}80, ${colors.accent}60)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12">
        <div 
          className="w-full h-full border-2 transform rotate-45"
          style={{ 
            backgroundColor: colors.accent + '80',
            borderColor: colors.border
          }}
        />
      </div>
      <div className="absolute top-4 right-4 w-12 h-12">
        <div 
          className="w-full h-full border-2 transform rotate-45"
          style={{ 
            backgroundColor: colors.accent + '80',
            borderColor: colors.border
          }}
        />
      </div>
      <div className="absolute bottom-4 left-4 w-12 h-12">
        <div 
          className="w-full h-full border-2 transform rotate-45"
          style={{ 
            backgroundColor: colors.accent + '80',
            borderColor: colors.border
          }}
        />
      </div>
      <div className="absolute bottom-4 right-4 w-12 h-12">
        <div 
          className="w-full h-full border-2 transform rotate-45"
          style={{ 
            backgroundColor: colors.accent + '80',
            borderColor: colors.border
          }}
        />
      </div>
    </div>
  );
};

// Scrapbook page component
const ScrapbookPage = ({ slide, pageNumber, isLeft = true, title, theme }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const colors = getThemeColors(theme);

  const photo = slide.images?.[0];
  const description = Array.isArray(slide.description) ? slide.description[0] : slide.description;

  return (
    <div className={`w-full h-full relative ${isLeft ? 'pr-4' : 'pl-4'}`}>
      {/* Page background with theme colors */}
      <div 
        className="absolute inset-0 rounded-lg shadow-inner"
        style={{
          background: `
            linear-gradient(135deg, 
              ${colors.pageBackground} 0%, 
              rgba(255, 245, 238, 0.9) 25%,
              rgba(254, 243, 235, 0.85) 50%,
              rgba(255, 239, 230, 0.9) 75%,
              ${colors.pageBackground} 100%
            ),
            radial-gradient(circle at 20% 80%, ${colors.shadow.replace('0.3', '0.08')} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${colors.shadow.replace('0.3', '0.06')} 0%, transparent 50%)
          `,
          filter: 'sepia(0.15) brightness(1.02) contrast(1.05)'
        }}
      >
        {/* Vintage paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='${colors.border}' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Title at top of each page */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h2 
          className="text-lg font-serif opacity-80 tracking-wide"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            color: colors.text
          }}
        >
          {title}
        </h2>
      </div>

      {/* Hole punch effects for left side of right page */}
      {!isLeft && (
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 space-y-20">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-5 h-5 rounded-full bg-white shadow-inner border-2"
              style={{ borderColor: colors.border }}
            />
          ))}
        </div>
      )}

      {/* Content area */}
      <div className="relative z-10 p-8 pt-16 h-full flex flex-col">
        
        {/* Photo section */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="relative group">
            {/* Photo corners with theme colors */}
            <div className="absolute -top-3 -left-3 w-8 h-8 z-20">
              <div 
                className="w-full h-full border-2 transform rotate-45 shadow-lg"
                style={{ 
                  backgroundColor: colors.accent,
                  borderColor: colors.border
                }}
              />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 z-20">
              <div 
                className="w-full h-full border-2 transform rotate-45 shadow-lg"
                style={{ 
                  backgroundColor: colors.accent,
                  borderColor: colors.border
                }}
              />
            </div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 z-20">
              <div 
                className="w-full h-full border-2 transform rotate-45 shadow-lg"
                style={{ 
                  backgroundColor: colors.accent,
                  borderColor: colors.border
                }}
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 z-20">
              <div 
                className="w-full h-full border-2 transform rotate-45 shadow-lg"
                style={{ 
                  backgroundColor: colors.accent,
                  borderColor: colors.border
                }}
              />
            </div>

            {/* Photo frame with theme colors */}
            <div 
              className="relative p-3 shadow-2xl transform hover:scale-105 transition-all duration-500 border-2"
              style={{
                transform: `rotate(${Math.random() * 4 - 2}deg)`,
                boxShadow: `0 12px 35px ${colors.shadow}, 0 5px 15px ${colors.shadow.replace('0.3', '0.15')}`,
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)`,
                borderColor: colors.border
              }}
            >
              <div 
                className="relative w-110 h-110 overflow-hidden bg-gray-100 border"
                style={{ borderColor: colors.border }}
              >
                {photo && !imageError ? (
                  <>
                    {!imageLoaded && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center animate-pulse"
                        style={{ background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.tertiary} 100%)` }}
                      >
                        <div className="text-2xl" style={{ color: colors.border }}>📸</div>
                      </div>
                    )}
                    <img
                      src={`/uploads/${photo.filename || photo}`}
                      alt={`Memory ${pageNumber}`}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        filter: 'sepia(0.2) contrast(1.1) brightness(0.95) saturate(1.1)'
                      }}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      loading="lazy"
                    />
                  </>
                ) : (
                  <div 
                    className="w-full h-full flex flex-col items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.tertiary} 100%)`,
                      color: colors.text
                    }}
                  >
                    <div className="text-5xl mb-3">📷</div>
                    <div className="text-sm font-serif">Memory</div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced shadow with theme colors */}
            <div 
              className="absolute top-3 left-3 w-full h-full rounded transform group-hover:scale-105 transition-transform duration-500 -z-10"
              style={{ background: `linear-gradient(135deg, ${colors.shadow} 0%, ${colors.shadow.replace('0.3', '0.1')} 100%)` }}
            />
          </div>
        </div>

        {/* Description section */}
        {description && (
          <div className="relative">
            {/* Enhanced washi tape effect with theme colors */}
            <div 
              className="absolute -top-4 left-8 right-8 h-8 transform -rotate-1 z-10"
              style={{
                background: `
                  linear-gradient(45deg, 
                    ${colors.tertiary}80 0%, 
                    ${colors.secondary}99 25%,
                    ${colors.accent}cc 50%,
                    ${colors.secondary}99 75%,
                    ${colors.tertiary}80 100%
                  )
                `,
                clipPath: 'polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)',
                boxShadow: `0 2px 8px ${colors.tertiary}4d`
              }}
            />
            
            {/* Text content with enhanced styling */}
            <div 
              className="relative p-8 rounded-xl border-2 shadow-lg"
              style={{
                background: `
                  linear-gradient(135deg, 
                    ${colors.accent} 0%, 
                    ${colors.pageBackground} 50%,
                    ${colors.secondary} 100%
                  )
                `,
                borderColor: colors.border + '4d',
                backdropFilter: 'blur(8px)'
              }}
            >
              <p 
                className="text-lg leading-relaxed font-serif italic text-center"
                style={{
                  fontFamily: '"Inter", sans-serif, cursive',
                  fontSize: '1.2rem',
                  lineHeight: '1.7',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
                  color: colors.text
                }}
              >
                {description}
              </p>
              
              {/* Enhanced decorative flourish with theme emojis */}
              <div className="flex justify-center mt-6">
                <div className="text-lg opacity-80" style={{ color: colors.textSecondary }}>
                  {theme.emojis.slice(0, 3).join(' ✧ ')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page number */}
        <div 
          className="absolute bottom-6 right-8 text-base font-serif opacity-70"
          style={{ color: colors.text }}
        >
          {pageNumber}
        </div>
      </div>
    </div>
  );
};

// Main scrapbook component

// Main scrapbook component
export default function Story({
  journey,
  theme = themes.romantic,
  page = 0,
  setPage = () => {},
  musicMuted = false,
  toggleMute = () => {},
  audioRef = { current: null },
  selectedMusic,
  storyMode = false,
}) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalSlides = journey.slides.length;
  const totalPages = typeof window !== 'undefined' && window.innerWidth < 768
    ? totalSlides + 2
    : Math.ceil(totalSlides / 2) + 2;

  const title = Array.isArray(journey.title) ? journey.title[0] : journey.title;
  const colors = getThemeColors(theme);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0.3;
      audio.muted = musicMuted;
    }
  }, [musicMuted]);

  const handlePageTurn = (direction) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      if (direction === 'next' && page < totalPages - 1) {
        const newPage = page + 1;
        setPage(newPage);
        if (page === 0) setIsBookOpen(true);
        if (newPage === totalPages - 1) setIsBookOpen(false);
      } else if (direction === 'prev' && page > 0) {
        const newPage = page - 1;
        setPage(newPage);
        if (newPage === 0) setIsBookOpen(false);
        else setIsBookOpen(true);
      }
      setIsFlipping(false);
    }, 300);
  };

  const renderCurrentPage = () => {
    if (page === 0 || page === totalPages - 1) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full max-w-2xl aspect-[3/4]">
            <BookCover
              title={title}
              theme={theme}
              isClosing={page === totalPages - 1}
            />
          </div>
        </div>
      );
    }

    if (isMobile) {
      const slideIndex = page - 1;
      const slide = journey.slides[slideIndex];
      return (
        <div className="flex h-full">
          <div className="w-full">
            {slide ? (
              <ScrapbookPage
                slide={slide}
                pageNumber={slideIndex + 1}
                isLeft={true}
                title={title}
                theme={theme}
              />
            ) : null}
          </div>
        </div>
      );
    }

    const contentPageIndex = page - 1;
    const leftSlideIndex = contentPageIndex * 2;
    const rightSlideIndex = leftSlideIndex + 1;

    return (
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 border-b-2 md:border-b-0 md:border-r-2" style={{ borderColor: colors.border + '4d' }}>
          {journey.slides[leftSlideIndex] ? (
            <ScrapbookPage 
              slide={journey.slides[leftSlideIndex]} 
              pageNumber={leftSlideIndex + 1}
              isLeft={true}
              title={title}
              theme={theme}
            />
          ) : null}
        </div>
        <div className="w-full md:w-1/2">
          {journey.slides[rightSlideIndex] ? (
            <ScrapbookPage 
              slide={journey.slides[rightSlideIndex]}
              pageNumber={rightSlideIndex + 1}
              isLeft={false}
              title={title}
              theme={theme}
            />
          ) : null}
        </div>
      </div>
    );
  };

  const swipeHandlers = useSwipe(
    () => handlePageTurn('next'),
    () => handlePageTurn('prev')
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 md:px-8" {...swipeHandlers}>
      <div className="relative w-full max-w-[1400px] md:aspect-[16/10] h-[90vh] md:h-auto mx-auto">
        {isBookOpen && (
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 transform -translate-x-1/2 z-30" style={{ background: colors.bindingGradient }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} className="absolute w-3 h-3 rounded-full left-1/2 transform -translate-x-1/2 border"
                style={{ top: `${15 + i * 12}%`, backgroundColor: colors.text, borderColor: colors.textSecondary }} />
            ))}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ rotateY: isFlipping ? -90 : 0 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={toggleMute}
        className="fixed top-8 right-8 z-50 text-3xl p-5 rounded-full shadow-2xl hover:scale-110 border-3"
        style={{
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.pageBackground})`,
          borderColor: colors.border + '66',
          backdropFilter: 'blur(12px)'
        }}
        title={musicMuted ? 'Play Music' : 'Pause Music'}
      >
        {musicMuted ? '🔇' : '🎶'}
      </button>

      {page > 0 && (
        <button
          onClick={() => handlePageTurn('prev')}
          disabled={isFlipping}
          className="fixed left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-40 text-2xl md:text-4xl p-3 md:p-6 rounded-full"
          style={{ background: colors.accent }}
        >←</button>
      )}

      {page < totalPages - 1 && (
        <button
          onClick={() => handlePageTurn('next')}
          disabled={isFlipping}
          className="fixed right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-40 text-2xl md:text-4xl p-3 md:p-6 rounded-full"
          style={{ background: colors.accent }}
        >→</button>
      )}

      <audio ref={audioRef} loop preload="auto">
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}