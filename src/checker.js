import { enhanceDescription } from './enhancer.js';

(async () => {
  const enhanced = await enhanceDescription("Diwali celebration.", "romantic");
  console.log("Test enhanced description:", enhanced);
})();