export const palette = {
  ink: '#22211f',
  mutedInk: '#898782',
  line: '#e8e6e1',
  soft: '#f6f5f1',
  paper: '#fdfcf9',
  accent: '#8d83c7',
  accentSoft: '#eeecfb',
} as const

export type PaletteKey = keyof typeof palette
