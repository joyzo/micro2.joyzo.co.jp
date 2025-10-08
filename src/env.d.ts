/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SERVICE_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
