// src/themes/themes.js

export const themes = {
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
    emojis: ['💍', '🥂', '🌹', '💐', '💕', '✨', '🕊️', '💖', '🌸', '💫', '🎊', '💗'],
    animation: {
      type: 'twinkle',
      speed: 11,
      opacity: 0.8,
    },
  },
  memories: {
    bgColor: 'bg-blue-50',
    emojis: ['📸', '💌', '🕰️', '📜', '💕', '🌹', '✨', '💖', '🎭', '📚', '🖼️', '💝'],
    animation: {
      type: 'drift',
      speed: 12,
      opacity: 0.8,
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

// Helper function to get theme colors
export const getThemeColors = (theme) => {
  const themeColorMap = {
    romantic: {
      primary: '#fdf2e9',
      secondary: '#faf0e6', 
      tertiary: '#f5deb3',
      quaternary: '#faebd7',
      accent: '#fff8dc',
      text: '#8b4513',
      textSecondary: '#a0522d',
      border: '#cd853f',
      shadow: 'rgba(139, 69, 19, 0.3)',
      pageBackground: 'rgba(255, 248, 240, 0.95)',
      bindingGradient: 'linear-gradient(to right, #8b4513 0%, #a0522d 20%, #cd853f 40%, #daa520 50%, #cd853f 60%, #a0522d 80%, #8b4513 100%)'
    },
    veryblue: {
      primary: '#f0f8ff',
      secondary: '#e6f3ff',
      tertiary: '#b3d9ff',
      quaternary: '#e0f0ff',
      accent: '#f5f9ff',
      text: '#2c5530',
      textSecondary: '#3d6b40',
      border: '#4a7c59',
      shadow: 'rgba(44, 85, 48, 0.3)',
      pageBackground: 'rgba(240, 248, 255, 0.95)',
      bindingGradient: 'linear-gradient(to right, #2c5530 0%, #3d6b40 20%, #4a7c59 40%, #5f8a5f 50%, #4a7c59 60%, #3d6b40 80%, #2c5530 100%)'
    },
    nature: {
      primary: '#f0fff0',
      secondary: '#e6ffe6',
      tertiary: '#ccffcc',
      quaternary: '#e0ffe0',
      accent: '#f5fff5',
      text: '#2d5016',
      textSecondary: '#3f6b23',
      border: '#5d8b3a',
      shadow: 'rgba(45, 80, 22, 0.3)',
      pageBackground: 'rgba(240, 255, 240, 0.95)',
      bindingGradient: 'linear-gradient(to right, #2d5016 0%, #3f6b23 20%, #5d8b3a 40%, #7ba05b 50%, #5d8b3a 60%, #3f6b23 80%, #2d5016 100%)'
    },
    yellow: {
      primary: '#fffaf0',
      secondary: '#fff8dc',
      tertiary: '#ffd700',
      quaternary: '#ffebcd',
      accent: '#fffff0',
      text: '#b8860b',
      textSecondary: '#daa520',
      border: '#ffd700',
      shadow: 'rgba(184, 134, 11, 0.3)',
      pageBackground: 'rgba(255, 250, 240, 0.95)',
      bindingGradient: 'linear-gradient(to right, #b8860b 0%, #daa520 20%, #ffd700 40%, #ffdf00 50%, #ffd700 60%, #daa520 80%, #b8860b 100%)'
    },
    anniversary: {
      primary: '#f0f8ff',
      secondary: '#e6f3ff',
      tertiary: '#87ceeb',
      quaternary: '#b0e0e6',
      accent: '#f0ffff',
      text: '#1e3a8a',
      textSecondary: '#2563eb',
      border: '#3b82f6',
      shadow: 'rgba(30, 58, 138, 0.3)',
      pageBackground: 'rgba(240, 248, 255, 0.95)',
      bindingGradient: 'linear-gradient(to right, #1e3a8a 0%, #2563eb 20%, #3b82f6 40%, #60a5fa 50%, #3b82f6 60%, #2563eb 80%, #1e3a8a 100%)'
    }
  };

  return themeColorMap[theme.name] || themeColorMap.romantic;
};

//export default themes;