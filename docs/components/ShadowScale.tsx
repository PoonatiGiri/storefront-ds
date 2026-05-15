import { shadows } from '../../src/tokens/shadows';

export function ShadowScale() {
  const entries = Object.entries(shadows) as Array<[string, string]>;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 24,
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
            gap: 12,
            padding: 16,
          }}
        >
          <div
            aria-hidden
            style={{
              width: 96,
              height: 64,
              background: 'var(--storefront-color-surface-background)',
              borderRadius: 'var(--storefront-radius-md)',
              boxShadow: value,
            }}
          />
          <code style={{ fontSize: 12, color: 'var(--storefront-color-neutral-600)' }}>
            shadow-{key}
          </code>
        </div>
      ))}
    </div>
  );
}
