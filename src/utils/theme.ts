// テーマカラーの定義
export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  hover: string;
}

export const themes: Record<string, ThemeColors> = {
  // デフォルト（現在のモノクロ）
  default: {
    primary: '#000000',
    primaryDark: '#1A1A1A',
    secondary: '#374151',
    accent: '#E63946',
    background: '#fafafa',
    backgroundSecondary: '#ffffff',
    text: '#000000',
    textSecondary: '#374151',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    hover: '#F3F4F6',
  },
  
  // 青ベース
  blue: {
    primary: '#1E40AF',
    primaryDark: '#1E3A8A',
    secondary: '#3B82F6',
    accent: '#F59E0B',
    background: '#F8FAFC',
    backgroundSecondary: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#475569',
    textMuted: '#64748B',
    border: '#E2E8F0',
    hover: '#F1F5F9',
  },
  
  // ピンクベース
  pink: {
    primary: '#BE185D',
    primaryDark: '#9D174D',
    secondary: '#EC4899',
    accent: '#10B981',
    background: '#FDF2F8',
    backgroundSecondary: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#4B5563',
    textMuted: '#6B7280',
    border: '#F3E8FF',
    hover: '#FCE7F3',
  },
  
  // オレンジベース
  orange: {
    primary: '#EA580C',
    primaryDark: '#C2410C',
    secondary: '#F97316',
    accent: '#3B82F6',
    background: '#FFF7ED',
    backgroundSecondary: '#FFFFFF',
    text: '#1C1917',
    textSecondary: '#44403C',
    textMuted: '#78716C',
    border: '#FED7AA',
    hover: '#FFEDD5',
  },
  
  // グリーンベース
  green: {
    primary: '#059669',
    primaryDark: '#047857',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#F0FDF4',
    backgroundSecondary: '#FFFFFF',
    text: '#064E3B',
    textSecondary: '#065F46',
    textMuted: '#047857',
    border: '#BBF7D0',
    hover: '#DCFCE7',
  },
  
  // パープルベース
  purple: {
    primary: '#7C3AED',
    primaryDark: '#6D28D9',
    secondary: '#A855F7',
    accent: '#F59E0B',
    background: '#FAF5FF',
    backgroundSecondary: '#FFFFFF',
    text: '#1E1B4B',
    textSecondary: '#3730A3',
    textMuted: '#5B21B6',
    border: '#E9D5FF',
    hover: '#F3E8FF',
  },
};

// URLパラメータからテーマを取得
export function getThemeFromURL(): string {
  if (typeof window === 'undefined') return 'default';
  
  const urlParams = new URLSearchParams(window.location.search);
  const themeParam = urlParams.get('color');
  
  if (themeParam && themes[themeParam]) {
    return themeParam;
  }
  
  return 'default';
}

// CSS変数を設定
export function applyTheme(themeName: string): void {
  if (typeof document === 'undefined') return;
  
  const theme = themes[themeName];
  const root = document.documentElement;
  
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-primary-dark', theme.primaryDark);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-background-secondary', theme.backgroundSecondary);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-text-secondary', theme.textSecondary);
  root.style.setProperty('--color-text-muted', theme.textMuted);
  root.style.setProperty('--color-border', theme.border);
  root.style.setProperty('--color-hover', theme.hover);
  
  // テーマクラスをbodyに追加
  document.body.className = document.body.className.replace(/theme-\w+/g, '');
  document.body.classList.add(`theme-${themeName}`);
}

// テーマを初期化
export function initializeTheme(): void {
  const currentTheme = getThemeFromURL();
  applyTheme(currentTheme);
  
  // URLパラメータの変更を監視
  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
      const newTheme = getThemeFromURL();
      applyTheme(newTheme);
    });
  }
}
