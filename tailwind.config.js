/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* App theme colors (match Markury app) */
        markury: {
          lime: '#A3F635',
          purple: '#C084FC',
          cyan: '#22D3EE',
          yellow: '#FACC15',
          pink: '#FB7185',
          orange: '#FB923C',
          gray: '#6B7280',
        },
        primary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        brand: {
          dark: '#4a4a4a',
          darker: '#3a3a3a',
          light: '#f8f9fa',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
