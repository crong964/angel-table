import react from '@vitejs/plugin-react';
//import babel from '@rolldown/plugin-babel';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'unplugin-dts/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //babel({ presets: [reactCompilerPreset()] }),
    dts({ tsconfigPath: './tsconfig.app.json' }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'lib/main.js'),
      name: 'angel-table',
      // the proper extensions will be added
      fileName: 'angel-table',
    },

    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
