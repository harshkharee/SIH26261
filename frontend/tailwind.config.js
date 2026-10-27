/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        trust: {
          navy: '#0B132B',
          midnight: '#1C2541',
          slate: '#3A506B',
          blue: '#3A86FF',
          teal: '#00F0FF',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444',
          darkBg: '#070D1E',
          cardDark: '#0F1A34',
          borderDark: '#1E293B',
          cardLight: '#FFFFFF',
          borderLight: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(58, 134, 255, 0.4)',
        'glow-teal': '0 0 25px -5px rgba(0, 240, 255, 0.35)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'scan-line': 'scan 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.8' },
          '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.6))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 2px rgba(0,240,255,0.2))' },
        }
      }
    },
  },
  plugins: [],
}
