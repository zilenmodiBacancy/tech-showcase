import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--theme-background)',
        foreground: 'var(--theme-foreground)',
        card: 'var(--theme-card)',
        'card-foreground': 'var(--theme-card-foreground)',
        primary: 'var(--theme-primary)',
        'primary-foreground': 'var(--theme-primary-foreground)',
        muted: 'var(--theme-muted)',
        'muted-foreground': 'var(--theme-muted-foreground)',
        accent: 'var(--theme-accent)',
        'muted-border': 'var(--theme-border)',
        'muted-ring': 'var(--theme-ring)',
        radius: 'var(--theme-radius)',
      },
    },
  },
  plugins: [],
}
export default config
