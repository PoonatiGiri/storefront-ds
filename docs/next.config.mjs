import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nextra from 'nextra';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
});

export default withNextra({
  reactStrictMode: true,
  // Allow importing files from outside the docs/ directory (i.e. ../src/**)
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    // Force every `react` / `react-dom` import — including those from imported
    // ../src/components/**/*.tsx files — to resolve to the single docs/ install.
    // Prevents the "two Reacts" mismatch where src/* would otherwise pick up
    // the root project's React 19 via node_modules walk-up, while docs/ uses 18.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(
        __dirname,
        'node_modules/react/jsx-dev-runtime',
      ),
    };
    return config;
  },
});
