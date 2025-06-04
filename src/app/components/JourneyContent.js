'use client';

import { motion } from 'framer-motion';

const ThemeAnimation = ({ theme }) => {
  return (
    <>
      {[...Array(12)].map((_, i) => (
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

export default function JourneyContent({
  journey,
  theme,
  page,
  setPage,
  musicMuted,
  toggleMute,
  audioRef,
  selectedMusic,
  storyMode = false,
}) {
  const slidesPerPage = 2;
  const totalPages = Math.ceil(journey.slides.length / slidesPerPage);
  const currentSlides = journey.slides.slice(page * slidesPerPage, (page + 1) * slidesPerPage);

  return (
    <div className={`relative w-screen h-screen ${theme.bgColor} overflow-hidden`}>
      <ThemeAnimation theme={theme} />

      {/* Music Toggle */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-white text-3xl p-3 rounded-full shadow-lg hover:bg-rose-300 transition"
        title={musicMuted ? 'Unmute' : 'Mute'}
      >
        {musicMuted ? '🔇' : '🔊'}
      </button>

      <audio ref={audioRef} src={`/music/${selectedMusic}.mp3`} loop preload="auto" />

      <div className={`z-10 flex flex-col items-center justify-center h-full mx-auto px-4 ${!storyMode ? 'pt-10' : ''}`}>
        {/* Journey Title */}
        <h1
          onClick={() => setPage(0)}
          className="text-6xl font-serif font-bold text-center mb-4 drop-shadow-lg cursor-pointer text-amber-800"
        >
          {journey.title || 'Your Journey'}
        </h1>

        {/* Flipbook */}
        <motion.div
          key={page}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ perspective: '2000px' }}
          className="w-full max-w-[94%] h-[75vh] mx-auto flex flex-col sm:flex-row justify-center items-center overflow-hidden bg-transparent border-[10px] border-rose-300 rounded-3xl shadow-2xl relative"
        >
          {currentSlides.map((slide, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-center p-4">
              {(slide.images || []).map((img, index) => {
                const filename = img.filename || img;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.3 }}
                    className="w-[440px] h-[440px] border-4 border-white rounded-3xl overflow-hidden shadow-xl"
                  >
                    <img
                      src={`/uploads/${filename}`}
                      alt={`Journey Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                );
              })}

              {slide.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 border-2 border-rose-500 text-blue-950 rounded-2xl px-6 py-4 text-xl italic max-w-[85%] text-center font-serif shadow-inner bg-transparent backdrop-blur-md"
                  style={{ textShadow: '0 0 10px rgba(255,100,100,0.8)' }}
                >
                  {slide.description}
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Arrows */}
        {page > 0 && (
          <button
            onClick={() => setPage(page - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-[100px] text-white hover:drop-shadow-[0_0_20px_white] transition z-50 select-none"
          >
            &#60;
          </button>
        )}
        {page < totalPages - 1 && (
          <button
            onClick={() => setPage(page + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[100px] text-white hover:drop-shadow-[0_0_20px_white] transition z-50 select-none"
          >
            &#62;
          </button>
        )}
      </div>
    </div>
  );
}
