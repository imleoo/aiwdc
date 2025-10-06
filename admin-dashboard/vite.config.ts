import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'suppress-warnings',
      configureServer(server) {
        server.middlewares.use('/@fs/', (req, res, next) => {
          next()
        })
      },
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>
          <script>
            // Suppress findDOMNode deprecation warnings from Semi UI
            const originalWarn = console.warn;
            console.warn = function(...args) {
              if (typeof args[0] === 'string' && args[0].includes('findDOMNode is deprecated')) {
                return;
              }
              originalWarn.apply(console, args);
            };

            const originalError = console.error;
            console.error = function(...args) {
              if (typeof args[0] === 'string' && args[0].includes('findDOMNode is deprecated')) {
                return;
              }
              originalError.apply(console, args);
            };
          </script>`
        )
      }
    },
    react()
  ],
  optimizeDeps: {
    exclude: ['@douyinfe/semi-ui/dist/css/semi.css']
  }
})
