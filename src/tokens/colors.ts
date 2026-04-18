export type ColorState = {
  default: string;
  hover: string;
  active: string;
  disabled: string;
};

export type Colors = {
  brand: {
    primary: ColorState;
    secondary: ColorState;
    accent: ColorState;
  };
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  semantic: {
    success: ColorState;
    warning: ColorState;
    error: ColorState;
    info: ColorState;
  };
  surface: {
    background: string;
    foreground: string;
    border: string;
    overlay: string;
  };
  commerce: {
    price: string;
    discount: string;
    stock: string;
    rating: string;
  };
};

export const colors: Colors = {
  brand: {
    primary: {
      default: '#2563EB',
      hover: '#1D4ED8',
      active: '#1E40AF',
      disabled: '#93C5FD',
    },
    secondary: {
      default: '#4F46E5',
      hover: '#4338CA',
      active: '#3730A3',
      disabled: '#A5B4FC',
    },
    accent: {
      default: '#7C3AED',
      hover: '#6D28D9',
      active: '#5B21B6',
      disabled: '#C4B5FD',
    },
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  semantic: {
    success: {
      default: '#16A34A',
      hover: '#15803D',
      active: '#166534',
      disabled: '#86EFAC',
    },
    warning: {
      default: '#D97706',
      hover: '#B45309',
      active: '#92400E',
      disabled: '#FCD34D',
    },
    error: {
      default: '#DC2626',
      hover: '#B91C1C',
      active: '#991B1B',
      disabled: '#FCA5A5',
    },
    info: {
      default: '#0284C7',
      hover: '#0369A1',
      active: '#075985',
      disabled: '#7DD3FC',
    },
  },
  surface: {
    background: '#FFFFFF',
    foreground: '#0F172A',
    border: '#E2E8F0',
    overlay: 'rgba(15, 24, 41, 0.5)',
  },
  commerce: {
    price: '#0F172A',
    discount: '#DC2626',
    stock: '#16A34A',
    rating: '#D97706',
  },
};

// ── Named individual exports (46 total) ────────────────────────────────────
// Brand – Primary
export const brandPrimaryDefault = colors.brand.primary.default;
export const brandPrimaryHover = colors.brand.primary.hover;
export const brandPrimaryActive = colors.brand.primary.active;
export const brandPrimaryDisabled = colors.brand.primary.disabled;
// Brand – Secondary
export const brandSecondaryDefault = colors.brand.secondary.default;
export const brandSecondaryHover = colors.brand.secondary.hover;
export const brandSecondaryActive = colors.brand.secondary.active;
export const brandSecondaryDisabled = colors.brand.secondary.disabled;
// Brand – Accent
export const brandAccentDefault = colors.brand.accent.default;
export const brandAccentHover = colors.brand.accent.hover;
export const brandAccentActive = colors.brand.accent.active;
export const brandAccentDisabled = colors.brand.accent.disabled;
// Neutral
export const neutral50 = colors.neutral[50];
export const neutral100 = colors.neutral[100];
export const neutral200 = colors.neutral[200];
export const neutral300 = colors.neutral[300];
export const neutral400 = colors.neutral[400];
export const neutral500 = colors.neutral[500];
export const neutral600 = colors.neutral[600];
export const neutral700 = colors.neutral[700];
export const neutral800 = colors.neutral[800];
export const neutral900 = colors.neutral[900];
// Semantic – Success
export const semanticSuccessDefault = colors.semantic.success.default;
export const semanticSuccessHover = colors.semantic.success.hover;
export const semanticSuccessActive = colors.semantic.success.active;
export const semanticSuccessDisabled = colors.semantic.success.disabled;
// Semantic – Warning
export const semanticWarningDefault = colors.semantic.warning.default;
export const semanticWarningHover = colors.semantic.warning.hover;
export const semanticWarningActive = colors.semantic.warning.active;
export const semanticWarningDisabled = colors.semantic.warning.disabled;
// Semantic – Error
export const semanticErrorDefault = colors.semantic.error.default;
export const semanticErrorHover = colors.semantic.error.hover;
export const semanticErrorActive = colors.semantic.error.active;
export const semanticErrorDisabled = colors.semantic.error.disabled;
// Semantic – Info
export const semanticInfoDefault = colors.semantic.info.default;
export const semanticInfoHover = colors.semantic.info.hover;
export const semanticInfoActive = colors.semantic.info.active;
export const semanticInfoDisabled = colors.semantic.info.disabled;
// Surface
export const surfaceBackground = colors.surface.background;
export const surfaceForeground = colors.surface.foreground;
export const surfaceBorder = colors.surface.border;
export const surfaceOverlay = colors.surface.overlay;
// Commerce
export const commercePrice = colors.commerce.price;
export const commerceDiscount = colors.commerce.discount;
export const commerceStock = colors.commerce.stock;
export const commerceRating = colors.commerce.rating;
