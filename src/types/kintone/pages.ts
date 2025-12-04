// kintone固定ページの型定義
export type KintonePageImage = {
  url: string; // S3のURL
  name?: string;
  size?: number;
};

export type KintonePage = {
  id: string; // ページID（自動採番プラグインで生成）
  microcms_id?: string; // microCMSのID（移行時の互換性のため）
  page_id: string; // ページ識別子（例：company, aboutjoyzo, story等）
  page_name: string; // ページ名
  title: string; // タイトル
  subtitle?: string; // サブタイトル
  content1?: string; // 本文1（HTML形式）
  content2?: string; // 本文2（HTML形式）
  content3?: string; // 本文3（HTML形式）
  publish: string[]; // 公開環境（配列：["開発", "本番"]）
  updatedAt?: string; // 更新日時
};

