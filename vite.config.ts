import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        // API Key is no longer exposed to the client.
        // The 'define' block is removed for security.
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3001', // Your backend server address
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});