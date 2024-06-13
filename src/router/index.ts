import type { RouteRecordRaw } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    displayName?: string
  }
}

/**
 * unplugin-vue-route does not work properly with vite-plugin-vue-layouts,
 * workaround to make it works. Read more: https://github.com/posva/unplugin-vue-router/issues/29#issuecomment-1263134455
 */
const recursiveLayouts = (route: RouteRecordRaw): RouteRecordRaw => {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])
    return route
  }
  return setupLayouts([route])[0]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => routes.map(route => recursiveLayouts(route)),
  routes,
})

export default router