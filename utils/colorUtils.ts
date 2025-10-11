// file: utils/colorUtils.ts

/**
 * Color manipulation utilities for dynamic vibrance modulation
 * Provides safe, performance-optimized color adjustments
 */

/**
 * Converts hex color to RGB object
 * @param hex - Hex color string (e.g., "#FF5733")
 * @returns RGB object with r, g, b values (0-255)
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

/**
 * Converts RGB to hex color string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Converts RGB to HSL
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HSL object with h (0-360), s (0-100), l (0-100)
 */
export const rgbToHsl = (
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

/**
 * Converts HSL to RGB
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns RGB object with r, g, b values (0-255)
 */
export const hslToRgb = (
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

/**
 * Applies subtle vibrance modulation to a color
 * Uses time-based sine wave for smooth, organic variation
 * 
 * @param hex - Original hex color
 * @param time - Time in milliseconds for sine wave calculation
 * @param saturationRange - Max saturation adjustment (+/- %)
 * @param lightnessRange - Max lightness adjustment (+/- %)
 * @returns Modulated hex color
 */
export const modulateVibrance = (
  hex: string,
  time: number,
  saturationRange: number = 5,
  lightnessRange: number = 3
): string => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Use sine waves with different periods for organic variation
  const saturationMod = Math.sin(time / 3000) * saturationRange;
  const lightnessMod = Math.sin(time / 4000) * lightnessRange;

  // Apply modulation while keeping within safe bounds
  const newS = Math.max(0, Math.min(100, hsl.s + saturationMod));
  const newL = Math.max(20, Math.min(80, hsl.l + lightnessMod)); // Keep between 20-80% for contrast

  const newRgb = hslToRgb(hsl.h, newS, newL);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
};

/**
 * Applies vibrance modulation to an array of colors
 * @param colors - Array of hex color strings
 * @param time - Time in milliseconds
 * @returns Array of modulated hex colors
 */
export const modulateGradientColors = (
  colors: readonly string[],
  time: number
): string[] => {
  return colors.map((color) => modulateVibrance(color, time));
};

