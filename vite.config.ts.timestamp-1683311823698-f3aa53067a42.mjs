// vite.config.ts
import solid from "file:///Users/givi.g/Development/adjarabet-solid/node_modules/solid-start/vite/plugin.js";
import vercel from "file:///Users/givi.g/Development/adjarabet-solid/node_modules/solid-start-vercel/index.js";
import mkcert from "file:///Users/givi.g/Development/adjarabet-solid/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { defineConfig } from "file:///Users/givi.g/Development/adjarabet-solid/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  server: {
    host: "dev.adjarabet.com",
    port: 443,
    https: true
  },
  plugins: [
    mkcert(),
    solid({
      ssr: true,
      adapter: vercel({
        prerender: {
          expiration: 60
        }
      })
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ2l2aS5nL0RldmVsb3BtZW50L2FkamFyYWJldC1zb2xpZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2dpdmkuZy9EZXZlbG9wbWVudC9hZGphcmFiZXQtc29saWQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2dpdmkuZy9EZXZlbG9wbWVudC9hZGphcmFiZXQtc29saWQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgc29saWQgZnJvbSBcInNvbGlkLXN0YXJ0L3ZpdGVcIjtcbmltcG9ydCB2ZXJjZWwgZnJvbSBcInNvbGlkLXN0YXJ0LXZlcmNlbFwiO1xuaW1wb3J0IG1rY2VydCBmcm9tIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcImRldi5hZGphcmFiZXQuY29tXCIsXG4gICAgcG9ydDogNDQzLFxuICAgIGh0dHBzOiB0cnVlLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgbWtjZXJ0KCksXG4gICAgc29saWQoe1xuICAgICAgc3NyOiB0cnVlLFxuICAgICAgYWRhcHRlcjogdmVyY2VsKHtcbiAgICAgICAgcHJlcmVuZGVyOiB7XG4gICAgICAgICAgZXhwaXJhdGlvbjogNjAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxPQUFPLFdBQVc7QUFDL1QsT0FBTyxZQUFZO0FBQ25CLE9BQU8sWUFBWTtBQUNuQixTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osS0FBSztBQUFBLE1BQ0wsU0FBUyxPQUFPO0FBQUEsUUFDZCxXQUFXO0FBQUEsVUFDVCxZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
