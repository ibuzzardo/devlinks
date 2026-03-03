import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: '#334155',
        input: '#334155',
        ring: '#8B5CF6',
        background: '#0F172A',
        foreground: '#F1F5F9',
        primary: {
          DEFAULT: '#8B5CF6',
          foreground: '#F1F5F9',
        },
        secondary: {
          DEFAULT: '#3B82F6',
          foreground: '#F1F5F9',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#F1F5F9',
        },
        muted: {
          DEFAULT: '#1E293B',
          foreground: '#94A3B8',
        },
        accent: {
          DEFAULT: '#06B6D4',
          foreground: '#F1F5F9',
        },
        popover: {
          DEFAULT: '#1E293B',
          foreground: '#F1F5F9',
        },
        card: {
          DEFAULT: '#1E293B',
          foreground: '#F1F5F9',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: 'calc(0.75rem - 2px)',
        sm: 'calc(0.75rem - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-purple-blue': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config