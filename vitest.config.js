import { defineConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import viteConfig from './vite.config.js'

console.log('Loaded vitest config');

export default mergeConfig(viteConfig, defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        //include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
        globals: true,
        setupFiles: './test/setupTest.js'}
}))
