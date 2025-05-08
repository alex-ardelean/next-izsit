const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        dmSans: ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
        rajdhani: ["Rajdhani", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#10B981"
        }
      },
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(500%)' },
        },
      },
      animation: {
        'bounce-y': 'bounceY 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
