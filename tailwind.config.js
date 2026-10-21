'use strict';

/**
 * @type {import('tailwindcss').Config}
 **/
const tailwindConfig = {
  content: ['./src/components/**/*.{ts,tsx}', './src/pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: [require('tailwindcss-animated')]
};

module.exports = tailwindConfig;
