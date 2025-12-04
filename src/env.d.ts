// /// <reference types="@astrojs/image/client" /> // 非推奨のためコメントアウト

interface ImportMetaEnv {
  readonly PUBLIC_SERVICE_SITE_URL: string;
  readonly KINTONE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
