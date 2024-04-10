import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(viteConfig, defineConfig({
    babel: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-modules-commonjs']
    },
    test: {
        environment: 'jsdom',
        include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']}
}))