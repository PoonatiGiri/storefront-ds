import { useEffect, useState } from 'react';
import { Button } from '../../src/components/atoms/Button/Button';
import { Tag } from '../../src/components/atoms/Tag/Tag';
import { Badge } from '../../src/components/atoms/Badge/Badge';
import { StatusBadge } from '../../src/components/molecules/StatusBadge/StatusBadge';
import { PriceDisplay } from '../../src/components/molecules/PriceDisplay/PriceDisplay';
import { ProductCard } from '../../src/components/organisms/ProductCard/ProductCard';

interface Theme {
  brandPrimary: string;
  brandPrimaryHover: string;
  brandPrimaryActive: string;
  brandPrimaryDisabled: string;
  brandAccent: string;
  radius: number;
  fontScale: number;
}

const DEFAULT_THEME: Theme = {
  brandPrimary: '#2563EB',
  brandPrimaryHover: '#1D4ED8',
  brandPrimaryActive: '#1E40AF',
  brandPrimaryDisabled: '#93C5FD',
  brandAccent: '#7C3AED',
  radius: 6,
  fontScale: 1,
};

const PRESETS: Array<{ name: string; theme: Partial<Theme> }> = [
  { name: 'Default · Blue', theme: DEFAULT_THEME },
  {
    name: 'Razorpay teal',
    theme: {
      brandPrimary: '#0E7C7B',
      brandPrimaryHover: '#0A5A59',
      brandPrimaryActive: '#074847',
      brandPrimaryDisabled: '#A7DBDA',
      brandAccent: '#16A34A',
    },
  },
  {
    name: 'Stripe purple',
    theme: {
      brandPrimary: '#635BFF',
      brandPrimaryHover: '#4F46E5',
      brandPrimaryActive: '#4338CA',
      brandPrimaryDisabled: '#C4B5FD',
      brandAccent: '#A855F7',
    },
  },
  {
    name: 'Linear graphite',
    theme: {
      brandPrimary: '#1E293B',
      brandPrimaryHover: '#0F172A',
      brandPrimaryActive: '#020617',
      brandPrimaryDisabled: '#CBD5E1',
      brandAccent: '#64748B',
    },
  },
  {
    name: 'Sunset coral',
    theme: {
      brandPrimary: '#E11D48',
      brandPrimaryHover: '#BE123C',
      brandPrimaryActive: '#9F1239',
      brandPrimaryDisabled: '#FECDD3',
      brandAccent: '#F97316',
    },
  },
];

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--storefront-color-brand-primary-default', theme.brandPrimary);
  root.style.setProperty('--storefront-color-brand-primary-hover', theme.brandPrimaryHover);
  root.style.setProperty('--storefront-color-brand-primary-active', theme.brandPrimaryActive);
  root.style.setProperty('--storefront-color-brand-primary-disabled', theme.brandPrimaryDisabled);
  root.style.setProperty('--storefront-color-brand-accent-default', theme.brandAccent);
  root.style.setProperty('--storefront-radius-md', `${theme.radius}px`);
  root.style.setProperty('--storefront-radius-lg', `${theme.radius + 2}px`);
  root.style.setProperty('--storefront-radius-xl', `${theme.radius + 6}px`);
}

function resetTheme() {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  [
    '--storefront-color-brand-primary-default',
    '--storefront-color-brand-primary-hover',
    '--storefront-color-brand-primary-active',
    '--storefront-color-brand-primary-disabled',
    '--storefront-color-brand-accent-default',
    '--storefront-radius-md',
    '--storefront-radius-lg',
    '--storefront-radius-xl',
  ].forEach((prop) => root.style.removeProperty(prop));
}

export function ThemePlayground() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    applyTheme(theme);
    return () => resetTheme();
  }, [theme]);

  const update = <K extends keyof Theme>(key: K, value: Theme[K]) =>
    setTheme((t) => ({ ...t, [key]: value }));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: 24,
        marginTop: 24,
        marginBottom: 48,
      }}
    >
      {/* Controls */}
      <aside
        style={{
          background: 'var(--storefront-color-neutral-50)',
          border: '1px solid var(--storefront-color-surface-border)',
          borderRadius: 'var(--storefront-radius-lg)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'sticky',
          top: 80,
          alignSelf: 'flex-start',
        }}
      >
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Presets
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setTheme({ ...DEFAULT_THEME, ...p.theme })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  background: 'white',
                  border: '1px solid var(--storefront-color-surface-border)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: p.theme.brandPrimary,
                    flexShrink: 0,
                  }}
                />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Brand color
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="color"
              value={theme.brandPrimary}
              onChange={(e) => update('brandPrimary', e.target.value)}
              style={{ width: 40, height: 40, border: 'none', borderRadius: 6, padding: 0, cursor: 'pointer' }}
            />
            <code style={{ fontSize: 12, color: 'var(--storefront-color-neutral-600)' }}>
              {theme.brandPrimary}
            </code>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Accent color
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="color"
              value={theme.brandAccent}
              onChange={(e) => update('brandAccent', e.target.value)}
              style={{ width: 40, height: 40, border: 'none', borderRadius: 6, padding: 0, cursor: 'pointer' }}
            />
            <code style={{ fontSize: 12, color: 'var(--storefront-color-neutral-600)' }}>
              {theme.brandAccent}
            </code>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Radius — {theme.radius}px
          </h3>
          <input
            type="range"
            min={0}
            max={16}
            step={1}
            value={theme.radius}
            onChange={(e) => update('radius', Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <button
          onClick={() => setTheme(DEFAULT_THEME)}
          style={{
            padding: '8px 12px',
            background: 'white',
            border: '1px solid var(--storefront-color-surface-border)',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'inherit',
          }}
        >
          Reset to defaults
        </button>

        <div
          style={{
            fontSize: 11,
            color: 'var(--storefront-color-neutral-500)',
            lineHeight: 1.5,
            padding: 12,
            background: 'white',
            borderRadius: 6,
            border: '1px solid var(--storefront-color-surface-border)',
          }}
        >
          Changes are scoped to this page. Navigate away to revert. To apply
          system-wide, override <code>--storefront-*</code> variables in your
          app's CSS.
        </div>
      </aside>

      {/* Live preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <section>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>Buttons</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>Tags + badges + status</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag variant="brand">Brand tag</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Badge type="info" label="42" />
            <StatusBadge status="processing" />
            <StatusBadge status="completed" />
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>Price</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <PriceDisplay amount={79} originalAmount={129} currency="USD" showDiscount size="lg" />
            <PriceDisplay amount={124999} originalAmount={199999} currency="INR" locale="en-IN" showDiscount size="lg" />
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>Product cards</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            <ProductCard
              name="Linen Tailored Shirt"
              meta="Apparel"
              price={79}
              originalPrice={129}
              currency="USD"
              stockStatus="in-stock"
              action={<Button size="sm" className="w-full">Add to cart</Button>}
            />
            <ProductCard
              name="Premium Leather Belt"
              meta="Accessories"
              price={49.5}
              currency="USD"
              stockStatus="low"
            />
          </div>
        </section>

        <section
          style={{
            background: 'var(--storefront-color-neutral-50)',
            border: '1px solid var(--storefront-color-surface-border)',
            borderRadius: 'var(--storefront-radius-lg)',
            padding: 20,
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            CSS to apply in your app
          </h3>
          <pre
            style={{
              margin: 0,
              fontSize: 12,
              lineHeight: 1.6,
              fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace',
              color: 'var(--storefront-color-surface-foreground)',
              whiteSpace: 'pre-wrap',
            }}
          >
{`:root {
  --storefront-color-brand-primary-default:  ${theme.brandPrimary};
  --storefront-color-brand-primary-hover:    ${theme.brandPrimaryHover};
  --storefront-color-brand-primary-active:   ${theme.brandPrimaryActive};
  --storefront-color-brand-primary-disabled: ${theme.brandPrimaryDisabled};
  --storefront-color-brand-accent-default:   ${theme.brandAccent};
  --storefront-radius-md: ${theme.radius}px;
}`}
          </pre>
        </section>
      </div>
    </div>
  );
}
