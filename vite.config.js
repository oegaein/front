import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const path = require('path');

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
  })],
  test: {
    // ... Specify options here.
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
			'@components': path.resolve(__dirname, 'src/components/'),
			'@common': path.resolve(__dirname, 'src/components/common/'),
			'@assets': path.resolve(__dirname, 'src/assets/'),
			'@pages': path.resolve(__dirname, 'src/pages/'),
			'@services': path.resolve(__dirname, 'src/services/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@store': path.resolve(__dirname, 'src/store/'),
			'@constants': path.resolve(__dirname, 'src/constants/'),
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@hooks': path.resolve(__dirname, 'src/hooks/'),
    }
  }
})