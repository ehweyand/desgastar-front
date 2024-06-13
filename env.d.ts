/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

// types.d.ts
declare module 'virtual:generated-layouts' {
    import { RouteRecordRaw } from 'vue-router'
    export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}