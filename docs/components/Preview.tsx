import type { ReactNode } from 'react';

export interface PreviewProps {
  children: ReactNode;
  /** Add extra vertical padding for tall components */
  padded?: boolean;
  /** Background variant */
  surface?: 'default' | 'dark' | 'gradient';
}

const surfaceStyle: Record<NonNullable<PreviewProps['surface']>, React.CSSProperties> = {
  default: { backgroundColor: 'var(--storefront-color-neutral-50)' },
  dark: { backgroundColor: 'var(--storefront-color-neutral-900)' },
  gradient: {
    background:
      'linear-gradient(135deg, var(--storefront-color-brand-primary-disabled) 0%, var(--storefront-color-brand-accent-disabled) 100%)',
  },
};

export function Preview({ children, padded = false, surface = 'default' }: PreviewProps) {
  return (
    <div
      className={padded ? 'ds-preview ds-preview--padded' : 'ds-preview'}
      style={surfaceStyle[surface]}
    >
      {children}
    </div>
  );
}
