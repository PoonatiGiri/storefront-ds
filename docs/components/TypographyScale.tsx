import { typography } from '../../src/tokens/typography';

type GroupKey = keyof typeof typography;

const sampleText: Record<GroupKey, string> = {
  display: 'Designed for B2B commerce',
  heading: 'A design system that scales',
  body: 'Storefront DS gives teams a shared vocabulary of components, tokens, and patterns to build commerce experiences faster.',
  label: 'BUTTON LABEL',
  code: 'const cart = useCart();',
};

export function TypographyScale() {
  const groups = Object.keys(typography) as GroupKey[];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 16 }}>
      {groups.map((group) => {
        const sizes = typography[group] as Record<string, {
          fontSize: string;
          fontWeight: number;
          lineHeight: string;
          letterSpacing: string;
        }>;
        return (
          <section key={group}>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                textTransform: 'capitalize',
                margin: '0 0 12px',
                color: 'var(--storefront-color-surface-foreground)',
              }}
            >
              {group}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.entries(sizes).map(([size, value]) => (
                <div
                  key={size}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: 16,
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'var(--storefront-color-surface-background)',
                    border: '1px solid var(--storefront-color-surface-border)',
                    borderRadius: 'var(--storefront-radius-md)',
                  }}
                >
                  <code style={{ fontSize: 12, color: 'var(--storefront-color-neutral-500)' }}>
                    {group}-{size}
                  </code>
                  <div
                    style={{
                      fontSize: value.fontSize,
                      fontWeight: value.fontWeight,
                      lineHeight: value.lineHeight,
                      letterSpacing: value.letterSpacing,
                      color: 'var(--storefront-color-surface-foreground)',
                      fontFamily: group === 'code' ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
                    }}
                  >
                    {sampleText[group]}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
