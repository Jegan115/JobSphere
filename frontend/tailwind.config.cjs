module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent: '#F97316'
      },
      boxShadow: {
        card: '0 6px 18px rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: []
};
