export const SITE_CONFIG = {
  name: 'LouArt',
  description: 'Portfolio y tienda de arte — ilustración digital y arte mixto',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const NAV_ITEMS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Encargos', href: '/encargos' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Contacto', href: '/contacto' },
];

export const CATEGORIES = [
  { value: 'todas', label: 'Todas' },
  { value: 'digital', label: 'Digital' },
  { value: 'mixto', label: 'Mixto' },
  { value: 'otro', label: 'Otro' },
];

export const PRINT_SIZES = [
  { label: 'A4 (21×29.7 cm)', value: 'a4', multiplier: 1 },
  { label: 'A3 (29.7×42 cm)', value: 'a3', multiplier: 1.5 },
  { label: 'A2 (42×59.4 cm)', value: 'a2', multiplier: 2.2 },
];

export const COMMISSION_STYLES = [
  { value: 'realista', label: 'Realista' },
  { value: 'semi-realista', label: 'Semi-realista' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: 'abstracto', label: 'Abstracto' },
  { value: 'otro', label: 'Otro' },
];

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com',
  behance: 'https://behance.net',
  email: 'mailto:contacto@example.com',
};
