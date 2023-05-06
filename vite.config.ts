import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import mkcert from "vite-plugin-mkcert";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "dev.adjarabet.com",
    port: 443,
    https: true,
  },
  plugins: [
    mkcert(),
    solid({
      ssr: true,
      adapter: vercel(),
    }),
  ],
});
