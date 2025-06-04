import { enhanceDescription } from './app/api/journeys/enhancer.js';

(async () => {
  const enhanced = await enhanceDescription("Diwali celebration.", "romantic");
  console.log("Test enhanced description:", enhanced);
})();