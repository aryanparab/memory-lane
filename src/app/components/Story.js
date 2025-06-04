// 'use client'
// import { motion } from 'framer-motion';
// import React, { useState, useRef, useEffect } from 'react';
// import themes from './themes';


// // Floating animation component
// const ThemeAnimation = ({ theme }) => {
//   return (
//     <>
//       {[...Array(17)].map((_, i) => (
//         <motion.div
//           key={i}
//           initial={{ y: '100vh', opacity: 0 }}
//           animate={{ y: '-10vh', opacity: theme.animation?.opacity ?? 1 }}
//           transition={{
//             duration: theme.animation?.speed ?? 6,
//             repeat: Infinity,
//             delay: Math.random() * 5,
//           }}
//           className="absolute text-3xl select-none pointer-events-none"
//           style={{ left: `${Math.random() * 100}%` }}
//         >
//           {theme.emojis[Math.floor(Math.random() * theme.emojis.length)]}
//         </motion.div>
//       ))}
//     </>
//   );
// };

// // Photo frame component with vintage styling
// const PhotoFrame = ({ src, alt, index }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   return (
//     <div 
//       className="relative group"
//       style={{
//         animationDelay: `${index * 0.3}s`
//       }}
//     >
//       {/* Vintage photo frame */}
//       <div className="relative p-4 bg-white shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border-8 border-white" 
//            style={{
//              background: 'linear-gradient(145deg, #fefefe, #f0f0f0)',
//              boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff, inset 5px 5px 10px rgba(0,0,0,0.1)'
//            }}>
        
//         {/* Photo container */}
//         <div className="relative w-80 h-80 overflow-hidden bg-gray-100">
//           {!imageError ? (
//             <>
//               {!imageLoaded && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
//                   <div className="text-gray-400 text-lg">📸</div>
//                 </div>
//               )}
//               <img
//                 src={src}
//                 alt={alt}
//                 className={`w-full h-full object-cover transition-opacity duration-500 ${
//                   imageLoaded ? 'opacity-100' : 'opacity-0'
//                 } sepia-[0.2] contrast-110 brightness-95`}
//                 onLoad={() => setImageLoaded(true)}
//                 onError={() => setImageError(true)}
//                 loading="lazy"
//               />
//             </>
//           ) : (
//             <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
//               <div className="text-6xl mb-4">📷</div>
//               <div className="text-sm font-serif">Memory Loading...</div>
//             </div>
//           )}
//         </div>

//         {/* Vintage corner decorations */}
//         <div className="absolute top-1 left-1 w-6 h-6 border-l-2 border-t-2 border-amber-300 opacity-60"></div>
//         <div className="absolute top-1 right-1 w-6 h-6 border-r-2 border-t-2 border-amber-300 opacity-60"></div>
//         <div className="absolute bottom-1 left-1 w-6 h-6 border-l-2 border-b-2 border-amber-300 opacity-60"></div>
//         <div className="absolute bottom-1 right-1 w-6 h-6 border-r-2 border-b-2 border-amber-300 opacity-60"></div>
//       </div>

//       {/* Subtle shadow underneath */}
//       <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black opacity-10 blur-lg rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
//     </div>
//   );
// };

// // Enhanced description card
// const DescriptionCard = ({ description, theme }) => {
//   if (!description || description.length === 0) return null;
  
//   const text = Array.isArray(description) ? description[0] : description;
  
//   return (
//     <div className="mt-8 max-w-2xl mx-auto">
//       <div className={`relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-${theme.accent}-200`}>
//         {/* Decorative elements */}
//         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//           <div className="w-6 h-6 bg-white rounded-full border-2 border-amber-300 flex items-center justify-center">
//             <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
//           </div>
//         </div>
        
//         {/* Quote marks */}
//         <div className="absolute top-2 left-4 text-4xl text-amber-300 opacity-50 font-serif">"</div>
//         <div className="absolute bottom-2 right-4 text-4xl text-amber-300 opacity-50 font-serif">"</div>
        
//         <p className={`${theme.textColor} text-lg font-serif italic text-center leading-relaxed px-6 py-2`}>
//           {text}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Main component
// export default function Story( {
//   // Mock data based on your JSON structure
//   journey,
//   theme,
//   page,
//   setPage,
//   musicMuted,
//   toggleMute,
//   audioRef,
//   selectedMusic,
//   storyMode = false,
// }){
//  const slidesPerPage = 1;
//   const totalPages = Math.ceil(journey.slides.length / slidesPerPage);
//   const currentSlides = journey.slides.slice(page * slidesPerPage, (page + 1) * slidesPerPage);
  
//   const title = Array.isArray(journey.title) ? journey.title[0] : journey.title;


//   // Auto-play functionality
//   useEffect(() => {
//     if (audioRef.current) {
//       const audio = audioRef.current;
//       audio.volume = 0.3;
//       audio.muted = musicMuted;
//     }
//   }, [musicMuted]);
//   <audio ref={audioRef} src={`/music/${selectedMusic}.mp3`} loop preload="auto" />

//   return (
//     <div className={`min-h-screen ${theme.bgColor} relative overflow-hidden`}>
//       {/* Floating animations */}
//       <ThemeAnimation theme={theme} />
      
//       {/* Music control */}
//       <button
//         onClick={toggleMute}
//         className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm text-2xl p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-amber-200"
//         title={musicMuted ? 'Play Music' : 'Pause Music'}
//       >
//         {musicMuted ? 'X' : '🎶'}
//       </button>

//       {/* Hidden audio element */}
//       <audio ref={audioRef} loop preload="auto">
//         <source src="/music/romantic.mp3" type="audio/mpeg" />
//       </audio>

//       {/* Main content */}
//       <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        
//         {/* Title */}
//         <div className="text-center mb-12">
//           <h1 
//             onClick={() => setPage(0)}
//             className={`text-5xl md:text-7xl font-serif font-bold ${theme.textColor} cursor-pointer hover:scale-105 transition-transform duration-300 mb-4`}
//             style={{
//               textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
//               fontFamily: 'Georgia, serif'
//             }}
//           >
//             {title}
//           </h1>
//           <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto opacity-60"></div>
//         </div>

//         {/* Content area */}
//         <div className="w-full max-w-6xl mx-auto">
//           {/* Photo and description */}
//           {currentSlides.map((slide, slideIdx) => (
//             <div key={slideIdx} className="text-center">
//               {/* Photos */}
//               <div className="flex justify-center items-center mb-8">
//                 {(slide.images || []).map((img, imgIdx) => {
//                   const filename = img.filename || img;
//                   return (
//                     <PhotoFrame
//                       key={imgIdx}
//                       src={`/uploads/${filename}`}
//                       alt={`Memory ${page + 1}`}
//                       index={imgIdx}
//                     />
//                   );
//                 })}
//               </div>

//               {/* Description */}
//               <DescriptionCard description={slide.description} theme={theme} />
//             </div>
//           ))}
//         </div>

//         {/* Navigation */}
//         <div className="flex items-center justify-center mt-12 space-x-8">
//           {/* Previous button */}
//           {page > 0 && (
//             <button
//               onClick={() => setPage(page - 1)}
//               className="group flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-200 hover:scale-105"
//             >
//               <span className="text-2xl group-hover:scale-110 transition-transform">←</span>
//               <span className="font-serif text-amber-800">Previous</span>
//             </button>
//           )}

//           {/* Page indicator */}
//           <div className="flex space-x-2">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   i === page 
//                     ? 'bg-amber-500 scale-125 shadow-lg' 
//                     : 'bg-white/60 hover:bg-amber-300'
//                 }`}
//               />
//             ))}
//           </div>

//           {/* Next button */}
//           {page < totalPages - 1 && (
//             <button
//               onClick={() => setPage(page + 1)}
//               className="group flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-200 hover:scale-105"
//             >
//               <span className="font-serif text-amber-800">Next</span>
//               <span className="text-2xl group-hover:scale-110 transition-transform">→</span>
//             </button>
//           )}
//         </div>

//         {/* Progress bar */}
//         <div className="mt-8 w-64 h-2 bg-white/30 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-500 ease-out"
//             style={{ width: `${((page + 1) / totalPages) * 100}%` }}
//           />
//         </div>
//       </div>

//       {/* Decorative elements */}
//       <div className="fixed bottom-4 left-4 opacity-20">
//         <div className="text-6xl">💕</div>
//       </div>
//       <div className="fixed top-20 left-8 opacity-20">
//         <div className="text-4xl">✨</div>
//       </div>
//       <div className="fixed bottom-20 right-12 opacity-20">
//         <div className="text-5xl">🌹</div>
//       </div>
//     </div>
//   );
// }

'use client'
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import {themes, getThemeColors} from './themes';

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

  const totalSlides = journey.slides.length;
  const contentPages = Math.ceil(totalSlides / 2);
  const totalPages = contentPages + 2;

  const title = Array.isArray(journey.title) ? journey.title[0] : journey.title;
  const colors = getThemeColors(theme);

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

    const contentPageIndex = page - 1;
    const leftSlideIndex = contentPageIndex * 2;
    const rightSlideIndex = leftSlideIndex + 1;

    return (
      <div className="flex h-full">
        <div className="w-1/2 border-r-2" style={{ borderColor: colors.border + '4d' }}>
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
        <div className="w-1/2">
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

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`
      }}
    >
      <ThemeAnimation theme={theme} />

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

      <audio ref={audioRef} loop preload="auto">
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>

      <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 md:px-8">
        <div className="relative w-full max-w-[1400px] aspect-[16/10] mx-auto">
          {isBookOpen && (
            <div className="absolute left-1/2 top-0 bottom-0 w-12 transform -translate-x-1/2 z-30" style={{ background: colors.bindingGradient }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} className="absolute w-3 h-3 rounded-full left-1/2 transform -translate-x-1/2 border"
                  style={{ top: `${15 + i * 12}%`, backgroundColor: colors.text, borderColor: colors.textSecondary }} />
              ))}
            </div>
          )}

          <div className="relative overflow-hidden w-full h-full">
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
        </div>
      </div>

      {page > 0 && (
        <button
          onClick={() => handlePageTurn('prev')}
          disabled={isFlipping}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 text-4xl p-6 rounded-full"
          style={{ background: colors.accent }}
        >←</button>
      )}

      {page < totalPages - 1 && (
        <button
          onClick={() => handlePageTurn('next')}
          disabled={isFlipping}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 text-4xl p-6 rounded-full"
          style={{ background: colors.accent }}
        >→</button>
      )}
    </div>
  );
}