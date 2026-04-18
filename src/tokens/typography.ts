export type TypographyScale = {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
};

export type Typography = {
  display: {
    lg: TypographyScale;
    md: TypographyScale;
    sm: TypographyScale;
  };
  heading: {
    h1: TypographyScale;
    h2: TypographyScale;
    h3: TypographyScale;
    h4: TypographyScale;
    h5: TypographyScale;
    h6: TypographyScale;
  };
  body: {
    lg: TypographyScale;
    md: TypographyScale;
    sm: TypographyScale;
    xs: TypographyScale;
  };
  label: {
    lg: TypographyScale;
    md: TypographyScale;
    sm: TypographyScale;
  };
  code: {
    lg: TypographyScale;
    md: TypographyScale;
    sm: TypographyScale;
  };
};

export const typography: Typography = {
  // Figma: typography/display/{lg,md,sm}/{size,weight,line-height}
  display: {
    lg: { fontSize: '60px', fontWeight: 700, lineHeight: '66px', letterSpacing: '-0.025em' },
    md: { fontSize: '48px', fontWeight: 700, lineHeight: '53px', letterSpacing: '-0.025em' },
    sm: { fontSize: '36px', fontWeight: 700, lineHeight: '41px', letterSpacing: '-0.02em' },
  },
  // Figma: typography/heading/h{1-6}/{size,weight,line-height}
  heading: {
    h1: { fontSize: '32px', fontWeight: 700, lineHeight: '40px', letterSpacing: '-0.02em' },
    h2: { fontSize: '28px', fontWeight: 600, lineHeight: '36px', letterSpacing: '-0.015em' },
    h3: { fontSize: '24px', fontWeight: 600, lineHeight: '32px', letterSpacing: '-0.01em' },
    h4: { fontSize: '20px', fontWeight: 600, lineHeight: '28px', letterSpacing: '0em' },
    h5: { fontSize: '18px', fontWeight: 500, lineHeight: '26px', letterSpacing: '0em' },
    h6: { fontSize: '16px', fontWeight: 500, lineHeight: '24px', letterSpacing: '0em' },
  },
  // Figma: typography/body/{lg,md,sm,xs}/{size,weight,line-height}
  body: {
    lg: { fontSize: '18px', fontWeight: 400, lineHeight: '28px', letterSpacing: '0em' },
    md: { fontSize: '16px', fontWeight: 400, lineHeight: '24px', letterSpacing: '0em' },
    sm: { fontSize: '14px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0em' },
    xs: { fontSize: '12px', fontWeight: 400, lineHeight: '18px', letterSpacing: '0em' },
  },
  // Figma: typography/label/{lg,md,sm}/{size,weight,line-height}
  label: {
    lg: { fontSize: '16px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.01em' },
    md: { fontSize: '14px', fontWeight: 500, lineHeight: '18px', letterSpacing: '0.01em' },
    sm: { fontSize: '12px', fontWeight: 500, lineHeight: '16px', letterSpacing: '0.01em' },
  },
  // Figma: typography/code/{lg,md,sm}/{size,weight,line-height}
  code: {
    lg: { fontSize: '16px', fontWeight: 400, lineHeight: '26px', letterSpacing: '0em' },
    md: { fontSize: '14px', fontWeight: 400, lineHeight: '22px', letterSpacing: '0em' },
    sm: { fontSize: '12px', fontWeight: 400, lineHeight: '19px', letterSpacing: '0em' },
  },
};

// CSS-in-JS compatible helper — converts a TypographyScale to React style props
export function toStyleProps(scale: TypographyScale): React.CSSProperties {
  return {
    fontSize: scale.fontSize,
    fontWeight: scale.fontWeight,
    lineHeight: scale.lineHeight,
    letterSpacing: scale.letterSpacing,
  };
}
