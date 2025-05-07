// 16進数カラーコードのバリデーション
export const isValidHexColor = (color) => {
  return /^#([A-Fa-f0-9]{6})$/.test(color);
};

// 16進数カラーコードをRGBに変換
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// 相対輝度の計算
export const calculateRelativeLuminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// コントラスト比の計算
export const calculateContrastRatio = (l1, l2) => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

// 色の明るさを計算
export const getLuminance = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
};

// ボーダーの色を決定
export const getBorderColor = (color) => {
  const luminance = getLuminance(color);
  return luminance > 0.5 ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)";
};
