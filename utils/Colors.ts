import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const hexToRgb = (hex: string): [number, number, number] => {
  const shorthandRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = shorthandRegex.exec(hex);

  if (!result) {
    return [0, 0, 0];
  }

  const [, r, g, b] = result;
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
};

export const getColorLuminance = (r: number, g: number, b: number) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;
export const getHexColorLuminance = (color: string) => getColorLuminance(...hexToRgb(color));
export const needsContrast = (color: string): boolean => getHexColorLuminance(color) > 0.64;
export const getContrastingTextColor = (color: string): string =>
  needsContrast(color) ? DefaultTheme.colors.text : DarkTheme.colors.text;
