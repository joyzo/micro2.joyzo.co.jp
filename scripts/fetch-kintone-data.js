#!/usr/bin/env node

import { config } from 'dotenv';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';

// .env.localファイルを読み込み
config({ path: '.env.local' });

// 環境変数の取得
const KINTONE_BASE_URL = process.env.KINTONE_BASE_URL;
const KINTONE_API_TOKEN = process.env.KINTONE_API_TOKEN;
const KINTONE_NEWS_APP_ID = process.env.KINTONE_NEWS_APP_ID;
const KINTONE_PAGES_APP_ID = process.env.KINTONE_PAGES_APP_ID;
const KINTONE_ENV = process.env.KINTONE_ENV || 'development';

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL;

// 環境変数の検証
const requiredEnvVars = {
  KINTONE_BASE_URL,
  KINTONE_API_TOKEN,
  KINTONE_NEWS_APP_ID,
  KINTONE_PAGES_APP_ID,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  S3_BUCKET_NAME,
  S3_PUBLIC_URL,
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('❌ エラー: 以下の環境変数が設定されていません:');
  missingVars.forEach(v => console.error(`   - ${v}`));
  process.exit(1);
}

// kintoneクライアントの初期化
const client = new KintoneRestAPIClient({
  baseUrl: KINTONE_BASE_URL,
  auth: {
    apiToken: KINTONE_API_TOKEN,
  },
});

// S3クライアントの初期化
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// 環境に応じた公開フィールドの値
const publishValue = KINTONE_ENV === 'production' ? '本番' : '開発';

// 画像をダウンロードしてS3にアップロード
async function uploadImageToS3(fileKey, fileName) {
  if (!fileKey) return null;

  try {
    // kintoneから画像をダウンロード
    const fileUrl = `${KINTONE_BASE_URL}/k/v1/file.json?fileKey=${fileKey}`;
    const response = await axios.get(fileUrl, {
      headers: {
        'X-Cybozu-API-Token': KINTONE_API_TOKEN,
      },
      responseType: 'arraybuffer',
    });

    // S3にアップロード
    const s3Key = `images/${Date.now()}-${fileName || fileKey}`;
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: s3Key,
      Body: Buffer.from(response.data),
      ContentType: response.headers['content-type'] || 'image/jpeg',
      ACL: 'public-read',
    });

    await s3Client.send(command);
    const imageUrl = `${S3_PUBLIC_URL}/${s3Key}`;

    return {
      url: imageUrl,
      name: fileName,
    };
  } catch (error) {
    console.error(`Failed to upload image ${fileKey}:`, error.message);
    return null;
  }
}

// ファイルフィールドを処理
async function processFileField(fileField) {
  if (!fileField || !Array.isArray(fileField) || fileField.length === 0) {
    return null;
  }

  const file = fileField[0];
  if (!file.fileKey) {
    return null;
  }

  return await uploadImageToS3(file.fileKey, file.name);
}

// ニュースデータを取得して処理
async function fetchNewsData() {
  console.log('📰 ニュースデータを取得中...');
  
  try {
    const records = await client.record.getAllRecords({
      app: KINTONE_NEWS_APP_ID,
    });

    console.log(`   ${records.length}件のレコードを取得`);

    const processedNews = await Promise.all(
      records.map(async (record) => {
        // kintone APIのレスポンス形式に合わせてフィールドを取得
        const publish = Array.isArray(record.publish?.value) 
          ? record.publish.value 
          : record.publish?.value 
            ? [record.publish.value] 
            : [];
        
        // 公開フィールドでフィルタリング
        if (!publish.includes(publishValue)) {
          return null;
        }

        // 画像を処理
        const thumbnail = await processFileField(record.thumbnail?.value);
        const eyecatch = await processFileField(record.eyecatch?.value);
        const image = await processFileField(record.image?.value);

        return {
          id: record.id?.value || record.$id?.value || '',
          microcms_id: record.microcms_id?.value || '',
          title: record.title?.value || '',
          content: record.content?.value || '',
          overview: record.overview?.value || '',
          publishedAt: record.publishedAt?.value || '',
          release_date: record.release_date?.value || '',
          thumbnail,
          eyecatch,
          image,
          tags: Array.isArray(record.tags?.value) ? record.tags.value : [],
          tag: record.tag?.value || null,
          publish,
          createdAt: record.$id?.value || record.$revision?.value || '',
          updatedAt: record.$revision?.value || record.更新日時?.value || '',
        };
      })
    );

    // nullを除外
    const filteredNews = processedNews.filter(news => news !== null);
    console.log(`   ${filteredNews.length}件のレコードを処理完了`);

    return filteredNews;
  } catch (error) {
    console.error('❌ ニュースデータの取得に失敗:', error);
    throw error;
  }
}

// 固定ページデータを取得して処理
async function fetchPagesData() {
  console.log('📄 固定ページデータを取得中...');
  
  try {
    const records = await client.record.getAllRecords({
      app: KINTONE_PAGES_APP_ID,
    });

    console.log(`   ${records.length}件のレコードを取得`);

    const pages = {};
    
    for (const record of records) {
      const publish = record.publish?.value || [];
      
      // 公開フィールドでフィルタリング
      if (!publish.includes(publishValue)) {
        continue;
      }

      const pageId = record.page_id?.value;
      if (!pageId) {
        continue;
      }

      pages[pageId] = {
        id: record.id?.value || record.$id?.value || '',
        microcms_id: record.microcms_id?.value || '',
        page_id: pageId,
        page_name: record.page_name?.value || '',
        title: record.title?.value || '',
        subtitle: record.subtitle?.value || '',
        content1: record.content1?.value || '',
        content2: record.content2?.value || '',
        content3: record.content3?.value || '',
        publish,
        updatedAt: record.updatedAt?.value || record.更新日時?.value || '',
      };
    }

    console.log(`   ${Object.keys(pages).length}件のページを処理完了`);
    return pages;
  } catch (error) {
    console.error('❌ 固定ページデータの取得に失敗:', error);
    throw error;
  }
}

// メイン処理
async function main() {
  console.log('🚀 kintoneデータ取得を開始します...');
  console.log(`📋 環境: ${KINTONE_ENV}`);
  console.log('');

  try {
    // データディレクトリの作成
    const dataDir = join(process.cwd(), 'src/data/kintone');
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    // ニュースデータを取得
    const newsData = await fetchNewsData();
    
    // 固定ページデータを取得
    const pagesData = await fetchPagesData();

    // JSONファイルに書き込み
    const newsPath = join(dataDir, 'news.json');
    const pagesPath = join(dataDir, 'pages.json');

    writeFileSync(newsPath, JSON.stringify(newsData, null, 2), 'utf-8');
    writeFileSync(pagesPath, JSON.stringify(pagesData, null, 2), 'utf-8');

    console.log('');
    console.log('✅ データ取得完了！');
    console.log(`   - ${newsPath}`);
    console.log(`   - ${pagesPath}`);
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

main();

