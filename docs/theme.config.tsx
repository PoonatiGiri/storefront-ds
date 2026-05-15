import type { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
      <span
        aria-hidden
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background:
            'linear-gradient(135deg, var(--storefront-color-brand-primary-default), var(--storefront-color-brand-accent-default))',
        }}
      />
      <span>Storefront DS</span>
    </span>
  ),
  project: {
    link: 'https://github.com/PoonatiGiri/storefront-ds',
  },
  docsRepositoryBase:
    'https://github.com/PoonatiGiri/storefront-ds/tree/main/docs',
  footer: {
    content: (
      <span style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <span>© 2026 Storefront DS · MIT License</span>
        <span aria-hidden style={{ opacity: 0.4 }}>·</span>
        <span>
          Designed and built by{' '}
          <a
            href="https://www.linkedin.com/in/giri-poonati/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'var(--storefront-color-brand-primary-default)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Giri Poonati
          </a>
        </span>
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Storefront DS — a B2B SaaS / commerce design system built with React, TypeScript, Tailwind, and Figma."
      />
      <meta property="og:title" content="Storefront DS" />
      <meta
        property="og:description"
        content="A B2B commerce design system: 36 components, 123 tokens, React + Tailwind + Figma."
      />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    content: 'Edit this page on GitHub →',
  },
};

export default config;
