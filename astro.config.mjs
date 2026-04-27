// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    // `astro check` can see different Vite type paths here; runtime compatibility is fine.
    // @ts-expect-error Vite plugin type identity differs under Astro's checker
    plugins: [tailwindcss()]
  }
});
