/**
 * Storefront DS — Tailwind Configuration
 *
 * This project uses Tailwind CSS v4 with @tailwindcss/vite.
 * In v4, the primary theme configuration is CSS-first via @theme in src/index.css.
 * This file is provided for tooling compatibility and plugin registration.
 *
 * Theme tokens are already wired up in src/index.css:
 *   :root  { --storefront-* }  ← raw token values
 *   @theme { --color-*, --spacing-*, --radius-*, --shadow-*, --font-size-* }
 *
 * Tailwind v4 utilities generated from src/index.css @theme:
 *   Colors   → bg-brand-primary, text-neutral-900, bg-success, border-surface-border
 *   Spacing  → p-4, m-6, gap-8, w-16
 *   Radius   → rounded-sm, rounded-md, rounded-xl, rounded-full
 *   Shadows  → shadow-sm, shadow-md, shadow-lg
 *   Fonts    → text-body-sm, text-h1, text-display-lg
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ── Colors ────────────────────────────────────────────────────────────
      // These CSS-variable references allow Tailwind JIT to generate utilities
      // while respecting runtime theming via :root custom properties.
      colors: {
        brand: {
          primary: {
            DEFAULT:  'var(--storefront-color-brand-primary-default)',
            hover:    'var(--storefront-color-brand-primary-hover)',
            active:   'var(--storefront-color-brand-primary-active)',
            disabled: 'var(--storefront-color-brand-primary-disabled)',
          },
          secondary: {
            DEFAULT:  'var(--storefront-color-brand-secondary-default)',
            hover:    'var(--storefront-color-brand-secondary-hover)',
            active:   'var(--storefront-color-brand-secondary-active)',
            disabled: 'var(--storefront-color-brand-secondary-disabled)',
          },
          accent: {
            DEFAULT:  'var(--storefront-color-brand-accent-default)',
            hover:    'var(--storefront-color-brand-accent-hover)',
            active:   'var(--storefront-color-brand-accent-active)',
            disabled: 'var(--storefront-color-brand-accent-disabled)',
          },
        },
        neutral: {
          50:  'var(--storefront-color-neutral-50)',
          100: 'var(--storefront-color-neutral-100)',
          200: 'var(--storefront-color-neutral-200)',
          300: 'var(--storefront-color-neutral-300)',
          400: 'var(--storefront-color-neutral-400)',
          500: 'var(--storefront-color-neutral-500)',
          600: 'var(--storefront-color-neutral-600)',
          700: 'var(--storefront-color-neutral-700)',
          800: 'var(--storefront-color-neutral-800)',
          900: 'var(--storefront-color-neutral-900)',
        },
        success: {
          DEFAULT:  'var(--storefront-color-semantic-success-default)',
          hover:    'var(--storefront-color-semantic-success-hover)',
          active:   'var(--storefront-color-semantic-success-active)',
          disabled: 'var(--storefront-color-semantic-success-disabled)',
        },
        warning: {
          DEFAULT:  'var(--storefront-color-semantic-warning-default)',
          hover:    'var(--storefront-color-semantic-warning-hover)',
          active:   'var(--storefront-color-semantic-warning-active)',
          disabled: 'var(--storefront-color-semantic-warning-disabled)',
        },
        error: {
          DEFAULT:  'var(--storefront-color-semantic-error-default)',
          hover:    'var(--storefront-color-semantic-error-hover)',
          active:   'var(--storefront-color-semantic-error-active)',
          disabled: 'var(--storefront-color-semantic-error-disabled)',
        },
        info: {
          DEFAULT:  'var(--storefront-color-semantic-info-default)',
          hover:    'var(--storefront-color-semantic-info-hover)',
          active:   'var(--storefront-color-semantic-info-active)',
          disabled: 'var(--storefront-color-semantic-info-disabled)',
        },
        surface: {
          bg:      'var(--storefront-color-surface-background)',
          fg:      'var(--storefront-color-surface-foreground)',
          border:  'var(--storefront-color-surface-border)',
          overlay: 'var(--storefront-color-surface-overlay)',
        },
        commerce: {
          price:    'var(--storefront-color-commerce-price)',
          discount: 'var(--storefront-color-commerce-discount)',
          stock:    'var(--storefront-color-commerce-stock)',
          rating:   'var(--storefront-color-commerce-rating)',
        },
      },

      // ── Spacing ────────────────────────────────────────────────────────────
      spacing: {
        0:  'var(--storefront-spacing-0)',
        1:  'var(--storefront-spacing-1)',
        2:  'var(--storefront-spacing-2)',
        3:  'var(--storefront-spacing-3)',
        4:  'var(--storefront-spacing-4)',
        5:  'var(--storefront-spacing-5)',
        6:  'var(--storefront-spacing-6)',
        8:  'var(--storefront-spacing-8)',
        10: 'var(--storefront-spacing-10)',
        12: 'var(--storefront-spacing-12)',
        16: 'var(--storefront-spacing-16)',
        20: 'var(--storefront-spacing-20)',
        24: 'var(--storefront-spacing-24)',
        32: 'var(--storefront-spacing-32)',
      },

      // ── Border Radius ──────────────────────────────────────────────────────
      borderRadius: {
        none: 'var(--storefront-radius-none)',
        sm:   'var(--storefront-radius-sm)',
        md:   'var(--storefront-radius-md)',
        lg:   'var(--storefront-radius-lg)',
        xl:   'var(--storefront-radius-xl)',
        full: 'var(--storefront-radius-full)',
      },

      // ── Box Shadow ─────────────────────────────────────────────────────────
      boxShadow: {
        none: 'var(--storefront-shadow-none)',
        sm:   'var(--storefront-shadow-sm)',
        md:   'var(--storefront-shadow-md)',
        lg:   'var(--storefront-shadow-lg)',
      },

      // ── Font Size ──────────────────────────────────────────────────────────
      fontSize: {
        'display-lg': ['var(--storefront-typography-display-lg-size)', { lineHeight: 'var(--storefront-typography-display-lg-line-height)' }],
        'display-md': ['var(--storefront-typography-display-md-size)', { lineHeight: 'var(--storefront-typography-display-md-line-height)' }],
        'display-sm': ['var(--storefront-typography-display-sm-size)', { lineHeight: 'var(--storefront-typography-display-sm-line-height)' }],
        'h1':         ['var(--storefront-typography-heading-h1-size)', { lineHeight: 'var(--storefront-typography-heading-h1-line-height)' }],
        'h2':         ['var(--storefront-typography-heading-h2-size)', { lineHeight: 'var(--storefront-typography-heading-h2-line-height)' }],
        'h3':         ['var(--storefront-typography-heading-h3-size)', { lineHeight: 'var(--storefront-typography-heading-h3-line-height)' }],
        'h4':         ['var(--storefront-typography-heading-h4-size)', { lineHeight: 'var(--storefront-typography-heading-h4-line-height)' }],
        'h5':         ['var(--storefront-typography-heading-h5-size)', { lineHeight: 'var(--storefront-typography-heading-h5-line-height)' }],
        'h6':         ['var(--storefront-typography-heading-h6-size)', { lineHeight: 'var(--storefront-typography-heading-h6-line-height)' }],
        'body-lg':    ['var(--storefront-typography-body-lg-size)',    { lineHeight: 'var(--storefront-typography-body-lg-line-height)' }],
        'body-md':    ['var(--storefront-typography-body-md-size)',    { lineHeight: 'var(--storefront-typography-body-md-line-height)' }],
        'body-sm':    ['var(--storefront-typography-body-sm-size)',    { lineHeight: 'var(--storefront-typography-body-sm-line-height)' }],
        'body-xs':    ['var(--storefront-typography-body-xs-size)',    { lineHeight: 'var(--storefront-typography-body-xs-line-height)' }],
        'label-lg':   ['var(--storefront-typography-label-lg-size)',   { lineHeight: 'var(--storefront-typography-label-lg-line-height)' }],
        'label-md':   ['var(--storefront-typography-label-md-size)',   { lineHeight: 'var(--storefront-typography-label-md-line-height)' }],
        'label-sm':   ['var(--storefront-typography-label-sm-size)',   { lineHeight: 'var(--storefront-typography-label-sm-line-height)' }],
        'code-lg':    ['var(--storefront-typography-code-lg-size)',    { lineHeight: 'var(--storefront-typography-code-lg-line-height)' }],
        'code-md':    ['var(--storefront-typography-code-md-size)',    { lineHeight: 'var(--storefront-typography-code-md-line-height)' }],
        'code-sm':    ['var(--storefront-typography-code-sm-size)',    { lineHeight: 'var(--storefront-typography-code-sm-line-height)' }],
      },
    },
  },

  plugins: [],
};

export default config;
