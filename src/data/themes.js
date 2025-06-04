// src/themes/themes.js

const themes = {
  romantic: {
    bgColor: 'bg-pink-50',
    emojis: ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '❤️', '🌹', '💐', '🕊️', '✨'],
    animation: {
      type: 'float', // could be used to trigger framer-motion float
      speed: 10,
      opacity: 0.8,
    },
  },
  anniversary: {
    bgColor: 'bg-yellow-50',
    emojis: ['🎉', '💑', '🎂'],
    animation: {
      type: 'twinkle',
      speed: 8,
      opacity: 0.15,
    },
  },
  memories: {
    bgColor: 'bg-blue-50',
    emojis: ['📷', '🕰️', '🌄'],
    animation: {
      type: 'drift',
      speed: 12,
      opacity: 0.1,
    },
  },
  funny: {
    bgColor: 'bg-green-50',
    emojis: ['😂', '🤣', '🎈'],
    animation: {
      type: 'bounce',
      speed: 6,
      opacity: 0.25,
    },
  },
};

export default themes;
