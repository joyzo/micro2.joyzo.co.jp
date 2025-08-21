# Micro CMS テスト

このディレクトリには、Micro CMSとの接続をテストするためのコードが含まれています。

## ファイル構成

- `microcms-connection.test.ts` - Micro CMS接続テストのメイン関数
- `package.json` - テスト用のパッケージ設定
- `README.md` - このファイル

## 使用方法

### 1. ブラウザでのテスト

テストページにアクセスして、ブラウザのコンソールで結果を確認：

```
http://localhost:4321/test-microcms
```

### 2. コマンドラインでのテスト

```bash
# テストディレクトリに移動
cd tests

# 依存関係をインストール
npm install

# 接続テストを実行
npm run test:connection

# ウォッチモードでテスト実行
npm run test:watch
```

### 3. プログラムでの使用

```typescript
import { testMicroCMSConnection, runConnectionTests } from './tests/microcms-connection.test';

// 基本的な接続テスト（コンソール出力付き）
await testMicroCMSConnection();

// 自動化用のテスト（結果オブジェクトを返す）
const results = await runConnectionTests();
console.log('テスト結果:', results);
```

## テスト内容

### 環境変数チェック
- `PUBLIC_MICROCMS_SERVICE_DOMAIN` の設定確認
- `PUBLIC_MICROCMS_API_KEY` の設定確認

### エンドポイント接続テスト
- `news` エンドポイントの接続確認
- `pages` エンドポイントの接続確認

### データ取得テスト
- 各エンドポイントから1件のデータを取得
- 取得したデータの構造確認

## 自動化への対応

`runConnectionTests()` 関数は、CI/CDパイプラインや自動テストでの使用を想定して設計されています：

- 結果をオブジェクトとして返す
- エラーメッセージを配列で管理
- 成功/失敗の判定が明確

## 注意事項

- 環境変数（`.env`）が正しく設定されていることを確認してください
- Micro CMSの各エンドポイントが作成されていることを確認してください
- APIキーに適切な権限が設定されていることを確認してください
