import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // For React and SWC support
import tailwindcss from "tailwindcss"; // Tailwind CSS plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
