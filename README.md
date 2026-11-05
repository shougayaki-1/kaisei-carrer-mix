# FUKUI DINO CITY — 福井県まるごと恐竜の都市に

市立札幌開成中等教育学校の授業「キャリコミックス」向けの架空ビジネスアイデア発表サイト。

**観光・経済 × 地学**。福井県の街・山・海・交通を丸ごと恐竜のテーマパークに置き換えます。小松空港（石川県）から恐竜の背中に乗って福井へ、福井駅で恐竜の体内探検・翼竜での飛行、若狭湾の海洋施設、勝山の化石発掘、越前海岸の地形学習を構想しています。

## 2つのWebサイト

- `/` — プレゼンテーション用のビジネス構想ランディングページ
- `/park/` — 架空のテーマパーク公式サイト風トップページ
- `/park/attractions.html` — アトラクション検索、カテゴリ別絞り込み、詳細表示
- `/park/tickets.html` — 料金表、日時・券種・年齢・人数の**デモ計算**と確認ダイアログ
- `/park/access.html` — 架空のエリアマップ・アクセスルート
- `/park/guide.html` — 仮の営業時間・サービス・よくある質問

チケットは購入できません。決済・予約・個人情報送信はありません。営業時間・価格・利用条件・運行情報は架空で、既存の自治体・映画作品・現実のテーマパークとの提携はありません。

**地学的な補足：** 福井県の海は若狭湾・越前海岸などです（玄界灘は福井県にはありません）。翼竜・首長竜・モササウルスは恐竜とは別の爬虫類です。恐竜化石が発見された地域として勝山を取り上げています。

## 技術構成と開発

Vite + TypeScript + Cloudflare Workers Static Assets。

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run deploy
```

- `index.html` + `src/style.css`：発表用ランディングページ
- `src/main.ts` + `src/assumptions.ts`：収益シミュレーター（仮の値）
- `park/*.html` + `park/styles.css`：架空の公式パークサイト
- `park/attractions-data.ts`：アトラクション編集用データ
- `park/app.ts`：検索・詳細モーダル・チケット・アクセスの操作
- `park/assets/scene.svg`：オリジナルの恐竜パノラマ
- `vite.config.ts`：6つのHTMLエントリを同時ビルド
- `cloudflare.config.ts`：Cloudflare Workersの設定

実在の大型パークのWebサイトにおける、チケット情報・利用条件・アクセス・営業時間の案内構成を参考に、完全に架空のコンテンツとして実装しています。写真にはUnsplashの外部画像を利用しています。
