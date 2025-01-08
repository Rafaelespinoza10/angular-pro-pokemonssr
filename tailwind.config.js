/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,ts}"];
export const theme = {
  extend: {
    keyFrames:{
      fadeIn:{
        '0%': {opacity: 0},
        '100%': {opacity: 1}
      }
    },
    animation:{
      fadeIn: 'fadeIn .2s ease-in-out'
    }
  },
};
export const plugins = [];

