import { colors } from '../../src/tokens/colors';

interface SwatchProps {
  name: string;
  value: string;
  cssVar: string;
}

function Swatch({ name, value, cssVar }: SwatchProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        background: 'var(--storefront-color-surface-background)',
        border: '1px solid var(--storefront-color-surface-border)',
        borderRadius: 'var(--storefront-radius-md)',
      }}
    >
      <div
        aria-hidden
        style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: 'var(--storefront-radius-md)',
          backgroundColor: value,
          border: '1px solid var(--storefront-color-surface-border)',
        }}
      />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--storefront-color-surface-foreground)' }}>
          {name}
        </div>
        <code
          style={{
            fontSize: 12,
            color: 'var(--storefront-color-neutral-500)',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {cssVar}
        </code>
        <code
          style={{
            fontSize: 11,
            color: 'var(--storefront-color-neutral-400)',
          }}
        >
          {value}
        </code>
      </div>
    </div>
  );
}

function Group({ title, swatches }: { title: string; swatches: SwatchProps[] }) {
  return (
    <section style={{ marginTop: 32 }}>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          margin: '0 0 12px',
          color: 'var(--storefront-color-surface-foreground)',
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        {swatches.map((s) => (
          <Swatch key={s.cssVar} {...s} />
        ))}
      </div>
    </section>
  );
}

function brandStateSwatches(
  brand: 'primary' | 'secondary' | 'accent',
): SwatchProps[] {
  const states: Array<keyof typeof colors.brand.primary> = ['default', 'hover', 'active', 'disabled'];
  return states.map((state) => ({
    name: `${brand}/${state}`,
    value: colors.brand[brand][state],
    cssVar: `--storefront-color-brand-${brand}-${state}`,
  }));
}

function semanticSwatches(
  tone: 'success' | 'warning' | 'error' | 'info',
): SwatchProps[] {
  const states: Array<keyof typeof colors.semantic.success> = ['default', 'hover', 'active', 'disabled'];
  return states.map((state) => ({
    name: `${tone}/${state}`,
    value: colors.semantic[tone][state],
    cssVar: `--storefront-color-semantic-${tone}-${state}`,
  }));
}

export function ColorTokenGrid() {
  const neutralSwatches: SwatchProps[] = (
    Object.keys(colors.neutral) as unknown as Array<keyof typeof colors.neutral>
  ).map((shade) => ({
    name: `neutral/${shade}`,
    value: colors.neutral[shade],
    cssVar: `--storefront-color-neutral-${shade}`,
  }));

  const commerceSwatches: SwatchProps[] = (
    Object.keys(colors.commerce) as Array<keyof typeof colors.commerce>
  ).map((k) => ({
    name: `commerce/${k}`,
    value: colors.commerce[k],
    cssVar: `--storefront-color-commerce-${k}`,
  }));

  return (
    <div>
      <Group title="Brand · Primary" swatches={brandStateSwatches('primary')} />
      <Group title="Brand · Secondary" swatches={brandStateSwatches('secondary')} />
      <Group title="Brand · Accent" swatches={brandStateSwatches('accent')} />
      <Group title="Neutral scale" swatches={neutralSwatches} />
      <Group title="Semantic · Success" swatches={semanticSwatches('success')} />
      <Group title="Semantic · Warning" swatches={semanticSwatches('warning')} />
      <Group title="Semantic · Error" swatches={semanticSwatches('error')} />
      <Group title="Semantic · Info" swatches={semanticSwatches('info')} />
      <Group title="Commerce" swatches={commerceSwatches} />
    </div>
  );
}
