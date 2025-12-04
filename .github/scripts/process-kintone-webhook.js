#!/usr/bin/env node

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';

// 環境変数の取得
const KINTONE_BASE_URL = process.env.KINTONE_BASE_URL;
const KINTONE_API_TOKEN = process.env.KINTONE_API_TOKEN;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL;

// S3クライアントの初期化
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

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

// Webhookで受け取ったレコードを処理
async function processRecord(record, appId) {
  // kintone Webhookのレスポンス形式に合わせてフィールドを取得
  const publish = Array.isArray(record.publish?.value) 
    ? record.publish.value 
    : record.publish?.value 
      ? [record.publish.value] 
      : [];
  
  // 画像を処理
  const thumbnail = await processFileField(record.thumbnail?.value);
  const eyecatch = await processFileField(record.eyecatch?.value);
  const image = await processFileField(record.image?.value);

  if (appId === process.env.KINTONE_NEWS_APP_ID) {
    // ニュースレコード
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
  } else if (appId === process.env.KINTONE_PAGES_APP_ID) {
    // 固定ページレコード
    return {
      id: record.id?.value || record.$id?.value || '',
      microcms_id: record.microcms_id?.value || '',
      page_id: record.page_id?.value || '',
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

  return null;
}

// メイン処理
async function main() {
  // Webhookのペイロードを取得（環境変数または標準入力から）
  const webhookPayload = process.env.WEBHOOK_PAYLOAD 
    ? JSON.parse(process.env.WEBHOOK_PAYLOAD)
    : JSON.parse(process.argv[2] || '{}');

  const type = webhookPayload.type; // 'CREATE', 'EDIT', 'DELETE'
  const appId = webhookPayload.app?.id;
  const record = webhookPayload.record;

  if (!appId || !record) {
    console.error('❌ エラー: 必要な情報が不足しています');
    process.exit(1);
  }

  console.log(`📝 レコード処理: ${type}, アプリID: ${appId}`);

  const dataDir = join(process.cwd(), 'src/data/kintone');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (appId === process.env.KINTONE_NEWS_APP_ID) {
    // ニュースデータの処理
    const newsPath = join(dataDir, 'news.json');
    let newsData = [];

    if (existsSync(newsPath)) {
      newsData = JSON.parse(readFileSync(newsPath, 'utf-8'));
    }

    if (type === 'DELETE') {
      // レコード削除
      const recordId = record.id?.value || record.$id?.value;
      newsData = newsData.filter(item => item.id !== recordId);
      console.log(`   ✅ レコード ${recordId} を削除`);
    } else {
      // レコード追加/更新
      const processedRecord = await processRecord(record, appId);
      if (processedRecord) {
        const existingIndex = newsData.findIndex(item => item.id === processedRecord.id);
        if (existingIndex >= 0) {
          newsData[existingIndex] = processedRecord;
          console.log(`   ✅ レコード ${processedRecord.id} を更新`);
        } else {
          newsData.push(processedRecord);
          console.log(`   ✅ レコード ${processedRecord.id} を追加`);
        }
      }
    }

    writeFileSync(newsPath, JSON.stringify(newsData, null, 2), 'utf-8');
  } else if (appId === process.env.KINTONE_PAGES_APP_ID) {
    // 固定ページデータの処理
    const pagesPath = join(dataDir, 'pages.json');
    let pagesData = {};

    if (existsSync(pagesPath)) {
      pagesData = JSON.parse(readFileSync(pagesPath, 'utf-8'));
    }

    if (type === 'DELETE') {
      // レコード削除
      const pageId = record.page_id?.value;
      if (pageId) {
        delete pagesData[pageId];
        console.log(`   ✅ ページ ${pageId} を削除`);
      }
    } else {
      // レコード追加/更新
      const processedRecord = await processRecord(record, appId);
      if (processedRecord && processedRecord.page_id) {
        pagesData[processedRecord.page_id] = processedRecord;
        console.log(`   ✅ ページ ${processedRecord.page_id} を${type === 'CREATE' ? '追加' : '更新'}`);
      }
    }

    writeFileSync(pagesPath, JSON.stringify(pagesData, null, 2), 'utf-8');
  }

  console.log('✅ 処理完了');
}

main().catch(error => {
  console.error('❌ エラーが発生しました:', error);
  process.exit(1);
});

