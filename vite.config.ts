import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // https://vitejs.dev/config/
  return defineConfig({
    base: env.VITE_BASE_URL,
    plugins: [
      VueRouter({
        importMode: 'sync',
      }),
      vue(({
        script: {
          propsDestructure: true,
        },
      })),
      Layouts(),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'pinia', 'vue-i18n', VueRouterAutoImports],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/stores', 'src/composables', 'src/services'],
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
      Components({
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/breakpoints";
          `,
        },
      },
    },
  })
})