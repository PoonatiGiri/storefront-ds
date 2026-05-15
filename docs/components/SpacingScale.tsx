import { spacing } from '../../src/tokens/spacing';

export function SpacingScale() {
  const entries = Object.entries(spacing) as Array<[string, string]>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
      {entries.map(([key, value]) => {
        const px = parseInt(value, 10);
        return (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '8px 12px',
              background: 'var(--storefront-color-surface-background)',
              border: '1px solid var(--storefront-color-surface-border)',
              borderRadius: 'var(--storefront-radius-md)',
            }}
          >
            <code
              style={{
                width: 100,
                fontSize: 12,
                color: 'var(--storefront-color-neutral-600)',
              }}
            >
              spacing-{key}
            </code>
            <code
              style={{
                width: 56,
                fontSize: 12,
                color: 'var(--storefront-color-neutral-500)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {value}
            </code>
            <div
              aria-hidden
              style={{
                height: 12,
                width: px === 0 ? 1 : px,
                background: 'var(--storefront-color-brand-primary-default)',
                borderRadius: 2,
                maxWidth: '60%',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
