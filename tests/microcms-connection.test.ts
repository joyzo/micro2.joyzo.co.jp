import { client } from "../src/libs/microcms";

/**
 * Micro CMSとの接続をテストする
 * 各コンテンツタイプの基本的な取得を試行する
 */
export async function testMicroCMSConnection() {
  console.log("🔍 Micro CMS接続テストを開始します...");
  
  try {
    // 環境変数の確認
    const serviceDomain = import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN;
    const apiKey = import.meta.env.PUBLIC_MICROCMS_API_KEY;
    
    console.log("📋 環境変数確認:");
    console.log(`  - サービスドメイン: ${serviceDomain ? "✅ 設定済み" : "❌ 未設定"}`);
    console.log(`  - APIキー: ${apiKey ? "✅ 設定済み" : "❌ 未設定"}`);
    
    if (!serviceDomain || !apiKey) {
      throw new Error("環境変数が正しく設定されていません");
    }
    
    // 各コンテンツタイプの接続テスト
    console.log("\n📡 各コンテンツタイプの接続テスト:");
    
    // ニュースの接続テスト
    try {
      const newsTest = await client.getList({
        endpoint: "news",
        queries: { limit: 1 }
      });
      console.log("  - ニュース: ✅ 接続成功");
    } catch (error) {
      console.log("  - ニュース: ❌ 接続失敗", error);
    }
    

    
    // ページの接続テスト
    try {
      const pagesTest = await client.getList({
        endpoint: "pages",
        queries: { limit: 1 }
      });
      console.log("  - ページ: ✅ 接続成功");
    } catch (error) {
      console.log("  - ページ: ❌ 接続失敗", error);
    }
    
    console.log("\n🎉 接続テストが完了しました！");
    return true;
    
  } catch (error) {
    console.error("❌ 接続テストでエラーが発生しました:", error);
    return false;
  }
}

/**
 * 特定のエンドポイントの詳細情報を取得する
 */
export async function getEndpointInfo(endpoint: string) {
  try {
    const data = await client.getList({
      endpoint,
      queries: { limit: 5 }
    });
    
    console.log(`📊 ${endpoint}の情報:`);
    console.log(`  - 総件数: ${data.totalCount}`);
    console.log(`  - 取得件数: ${data.contents.length}`);
    
    if (data.contents.length > 0) {
      console.log(`  - 最初のアイテム:`, data.contents[0]);
    }
    
    return data;
  } catch (error) {
    console.error(`❌ ${endpoint}の取得に失敗:`, error);
    throw error;
  }
}

/**
 * 接続テストの結果をオブジェクトとして返す（自動化用）
 */
export async function runConnectionTests() {
  const results = {
    environment: {
      serviceDomain: !!import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN,
      apiKey: !!import.meta.env.PUBLIC_MICROCMS_API_KEY
    },
    endpoints: {
      news: false,
      pages: false
    },
    success: false,
    errors: [] as string[]
  };

  try {
    // 環境変数チェック
    if (!results.environment.serviceDomain || !results.environment.apiKey) {
      results.errors.push("環境変数が正しく設定されていません");
      return results;
    }

    // 各エンドポイントのテスト
    try {
      await client.getList({ endpoint: "news", queries: { limit: 1 } });
      results.endpoints.news = true;
    } catch (error) {
      results.errors.push(`ニュース接続エラー: ${error}`);
    }



    try {
      await client.getList({ endpoint: "pages", queries: { limit: 1 } });
      results.endpoints.pages = true;
    } catch (error) {
      results.errors.push(`ページ接続エラー: ${error}`);
    }

    // 全体の成功判定
    results.success = Object.values(results.endpoints).every(Boolean);
    
    return results;
  } catch (error) {
    results.errors.push(`予期しないエラー: ${error}`);
    return results;
  }
}
