export type SpacingScale = {
  0: string;
  '0.5': string;
  1: string;
  '1.5': string;
  2: string;
  3: string;
  '3.5': string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
};

// Figma: spacing/space-{0,1,2,3,4,5,6,8,10,12,16,20,24,32}
// Sub-scale tokens added to resolve off-scale pixel values in components
export const spacing: SpacingScale = {
  0:     '0px',
  '0.5': '2px',
  1:     '4px',
  '1.5': '6px',
  2:     '8px',
  3:     '12px',
  '3.5': '14px',
  4:     '16px',
  5:     '20px',
  6:     '24px',
  8:     '32px',
  10:    '40px',
  12:    '48px',
  16:    '64px',
  20:    '80px',
  24:    '96px',
  32:    '128px',
};

// Ordered array for reference
export const spacingScale = [
  '0px', '2px', '4px', '6px', '8px', '12px', '14px', '16px', '20px', '24px',
  '32px', '40px', '48px', '64px', '80px', '96px', '128px',
] as const;

// Named exports for convenient access
export const space0   = spacing[0];
export const space05  = spacing['0.5'];
export const space1   = spacing[1];
export const space15  = spacing['1.5'];
export const space2   = spacing[2];
export const space3   = spacing[3];
export const space35  = spacing['3.5'];
export const space4   = spacing[4];
export const space5   = spacing[5];
export const space6   = spacing[6];
export const space8   = spacing[8];
export const space10  = spacing[10];
export const space12  = spacing[12];
export const space16  = spacing[16];
export const space20  = spacing[20];
export const space24  = spacing[24];
export const space32  = spacing[32];

// Dimension tokens (widths, heights) for component-specific sizes
export const dimensions = {
  indicatorDot:   '6px',
  tableRowHeight: '52px',
  searchBarWidth: '280px',
  cardOrderWidth: '380px',
  metricSm:       '200px',
  metricMd:       '260px',
  metricLg:       '320px',
} as const;
