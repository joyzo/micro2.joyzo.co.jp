#!/usr/bin/env node

/**
 * kintoneアプリを作成するスクリプト
 * 
 * 使用方法:
 *   node scripts/create-kintone-apps.js
 * 
 * 環境変数:
 *   KINTONE_BASE_URL: kintoneのベースURL
 *   KINTONE_API_TOKEN: kintone APIトークン
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

// .env.localファイルを読み込み
config({ path: '.env.local' });

// 環境変数の取得
const KINTONE_BASE_URL = process.env.KINTONE_BASE_URL;
const KINTONE_API_TOKEN = process.env.KINTONE_API_TOKEN;

if (!KINTONE_BASE_URL || !KINTONE_API_TOKEN) {
  console.error('❌ エラー: KINTONE_BASE_URL と KINTONE_API_TOKEN を設定してください');
  process.exit(1);
}

// kintoneクライアントの初期化
const client = new KintoneRestAPIClient({
  baseUrl: KINTONE_BASE_URL,
  auth: {
    apiToken: KINTONE_API_TOKEN,
  },
});

// アプリを作成
async function createApp(appDefinition) {
  try {
    console.log(`📱 アプリ「${appDefinition.app.name}」を作成中...`);
    
    // アプリの作成
    const app = await client.app.createApp({
      name: appDefinition.app.name,
      description: appDefinition.app.description,
      space: null,
      thread: null,
    });

    console.log(`   ✅ アプリID: ${app.id}`);

    // フィールドの追加
    console.log(`   📝 フィールドを追加中...`);
    const properties = {};
    for (const [code, field] of Object.entries(appDefinition.fields)) {
      const fieldDef = {
        type: field.type,
        label: field.label,
        required: field.required || false,
        noLabel: field.noLabel || false,
      };
      
      // フィールドタイプに応じたオプションを追加
      if ((field.type === 'DROP_DOWN' || field.type === 'CHECK_BOX') && field.options) {
        // optionsがオブジェクト形式の場合、labelとindexを持つオブジェクトからlabelを抽出
        // indexでソートしてからlabelの配列を作成
        const choices = Object.entries(field.options)
          .map(([key, value]) => ({
            key,
            label: typeof value === 'string' ? value : value.label,
            index: typeof value === 'object' && value.index !== undefined ? value.index : 0,
          }))
          .sort((a, b) => a.index - b.index)
          .map(item => item.label);
        
        fieldDef.options = {
          choices: choices,
        };
      } else if (field.type === 'SINGLE_LINE_TEXT' && field.unique) {
        fieldDef.unique = true;
      }
      
      properties[code] = fieldDef;
    }
    
    await client.app.addFormFields({
      app: app.id,
      properties,
    });

    console.log(`   ✅ フィールドを追加完了`);

    // ビューの追加
    if (appDefinition.views && appDefinition.views.length > 0) {
      console.log(`   👁️ ビューを追加中...`);
      await client.app.addViews({
        app: app.id,
        views: appDefinition.views.reduce((acc, view) => {
          acc[view.id] = {
            name: view.name,
            index: view.index,
            type: view.type,
            fields: view.fields,
            filterCond: view.filterCond || '',
            sort: view.sort || '',
          };
          return acc;
        }, {}),
      });
      console.log(`   ✅ ビューを追加完了`);
    }

    // アプリの公開
    console.log(`   🚀 アプリを公開中...`);
    await client.app.deployApp({
      apps: [{ app: app.id }],
    });
    console.log(`   ✅ アプリを公開完了`);

    console.log(`\n✅ アプリ「${appDefinition.app.name}」の作成が完了しました！`);
    console.log(`   📋 アプリID: ${app.id}`);
    console.log(`   🔗 URL: ${KINTONE_BASE_URL}/k/${app.id}\n`);

    return app.id;
  } catch (error) {
    console.error(`❌ アプリ作成エラー:`, error.message);
    throw error;
  }
}

// メイン処理
async function main() {
  console.log('🚀 kintoneアプリ作成を開始します...\n');

  try {
    // ニュース管理アプリの定義を読み込み
    const newsAppDef = JSON.parse(
      readFileSync(join(process.cwd(), 'docs/kintone-fields-news.json'), 'utf-8')
    );

    // 固定ページ管理アプリの定義を読み込み
    const pagesAppDef = JSON.parse(
      readFileSync(join(process.cwd(), 'docs/kintone-fields-pages.json'), 'utf-8')
    );

    // アプリを作成
    const newsAppId = await createApp(newsAppDef);
    const pagesAppId = await createApp(pagesAppDef);

    console.log('🎉 すべてのアプリの作成が完了しました！\n');
    console.log('📝 次のステップ:');
    console.log(`   1. アプリIDを .env.local に設定してください:`);
    console.log(`      KINTONE_NEWS_APP_ID=${newsAppId}`);
    console.log(`      KINTONE_PAGES_APP_ID=${pagesAppId}`);
    console.log(`   2. 自動採番プラグインを各アプリにインストールして設定してください`);
    console.log(`   3. アプリの権限を設定してください`);
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

main();

