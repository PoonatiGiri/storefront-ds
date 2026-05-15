import { radius } from '../../src/tokens/radius';

export function RadiusScale() {
  const entries = Object.entries(radius) as Array<[string, string]>;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 16,
        marginTop: 16,
      }}
    >
      {entries.map(([key, value]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: 16,
            background: 'var(--storefront-color-surface-background)',
            border: '1px solid var(--storefront-color-surface-border)',
            borderRadius: 'var(--storefront-radius-md)',
          }}
        >
          <div
            aria-hidden
            style={{
              width: 64,
              height: 64,
              background:
                'linear-gradient(135deg, var(--storefront-color-brand-primary-default), var(--storefront-color-brand-accent-default))',
              borderRadius: value,
            }}
          />
          <code style={{ fontSize: 12, color: 'var(--storefront-color-neutral-600)' }}>
            radius-{key}
          </code>
          <code style={{ fontSize: 11, color: 'var(--storefront-color-neutral-400)' }}>
            {value}
          </code>
        </div>
      ))}
    </div>
  );
}
