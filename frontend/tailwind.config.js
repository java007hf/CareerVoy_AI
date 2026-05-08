/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'voy-bg': '#fff8f2',
        'voy-bg-trans': 'rgba(255, 250, 245, 0.95)',
        'voy-surface': '#ffffff',
        'voy-text': '#2f2a26',
        'voy-sub': '#7e7268',
        'voy-primary': '#ff8a3d',
        'voy-primary-dark': '#e56f1f',
        'voy-primary-weak': '#ffe0cc',
        'voy-line': '#f1dfd1',
        'voy-menu-active-text': '#b85513',
        'voy-menu-text': '#655a50',
        'voy-tag-bg': '#fff4ea',
        'voy-tag-border': '#ffd3b4',
        'voy-tag-text': '#bc5b18',
        'voy-capsule-bg': '#fff2e8',
        'voy-capsule-border': '#ffc9a5',
        'voy-capsule-text': '#b75a19',
      },
      borderRadius: {
        'voy': '14px',
      },
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'voy': '0 8px 24px rgba(217, 126, 57, 0.12)',
      }
    },
  },
  plugins: [],
}
