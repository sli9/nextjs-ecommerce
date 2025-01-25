import type { Config } from 'tailwindcss'

import daisyui from 'daisyui'

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
          accent: '#007000',
          'base-100': '#fffcea',
          body: {
            background: '#e3e6e6',
          },
          error: '#ff5e79',
          info: '#2db0fa',
          neutral: '#00201f',
          primary: '#0051ff',
          secondary: '#009d00',
          success: '#00fd73',
          warning: '#dfa500',
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config
