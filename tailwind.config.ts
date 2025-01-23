import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: '#0b00ff',
          secondary: '#009d00',
          accent: '#007000',
          neutral: '#00201f',
          'base-100': '#fffcea',
          info: '#008af5',
          success: '#00fd73',
          warning: '#dfa500',
          error: '#ff5e79',
          body: {
            background: '#e3e6e6',
          },
        },
      },
    ],
  },
  plugins: [require('daisyui')],
} satisfies Config
