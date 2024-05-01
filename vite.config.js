import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      include: ["src/components/**"],
      exclude: [
        "**/*.stories.[jt]sx",
        "**/*.helper.[jt]sx",
        "**/*.helpers.[jt]sx",
        "**/*.types.ts",
        "src/components/accordion/**",
        "src/components/dialog/**",
        "src/components/navbar/**",
        "src/components/button/**",
      ],
    },
    global: true,
    environment: "jsdom",
    setupFiles: "./setupTest",
    css: true,
  },
  plugins: [react()],
});
