export type Shadows = {
  none: string;
  sm: string;
  md: string;
  lg: string;
};

// Figma effect styles: shadow/{none,sm,md,lg}
// Values extracted from Figma DROP_SHADOW effects:
//   sm: y=1 blur=3, y=1 blur=2
//   md: y=4 blur=6, y=2 blur=4
//   lg: y=10 blur=15 spread=-3, y=4 blur=6 spread=-2
export const shadows: Shadows = {
  none: 'none',
  sm: '0px 1px 3px 0px rgba(0,0,0,0.06), 0px 1px 2px 0px rgba(0,0,0,0.04)',
  md: '0px 4px 6px 0px rgba(0,0,0,0.07), 0px 2px 4px 0px rgba(0,0,0,0.05)',
  lg: '0px 10px 15px -3px rgba(0,0,0,0.10), 0px 4px 6px -2px rgba(0,0,0,0.05)',
};
