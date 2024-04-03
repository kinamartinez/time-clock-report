import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

const mockCssFiles = {
  'vuetify/lib/components/VAvatar/VAvatar.css': '/* CSS for VAvatar component */',
};
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      include: '**/*.spec.js',
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
    },
    vite: {
      define: {
        'import.meta.globEager("vuetify/lib/components/**/*.css")': JSON.stringify(mockCssFiles),
      },
    }
  })
)
