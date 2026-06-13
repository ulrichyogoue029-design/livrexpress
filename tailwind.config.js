/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E4036",
        accent: "#CC5833",
        background: "#F2F0E9",
        dark: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        dramatic: ["Cormorant Garamond", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'scan': 'scan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'dash': 'dash 3s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(800%)' },
        },
        dash: {
          '0%': { strokeDasharray: '0, 150', strokeDashoffset: '0' },
          '50%': { strokeDasharray: '100, 150', strokeDashoffset: '-20' },
          '100%': { strokeDasharray: '100, 150', strokeDashoffset: '-150' },
        }
      }
    },
  },
  plugins: [],
}
