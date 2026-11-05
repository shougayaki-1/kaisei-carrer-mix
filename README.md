# FUKUI DINO CITY — 福井県まるごと恐竜の都市に

市立札幌開成中等教育学校の授業「キャリコミックス」向けの架空ビジネスアイデア発表サイト。

**観光・経済 × 地学**。福井県の街・山・海・交通を丸ごと恐竜のテーマパークに置き換えます。小松空港（石川県）から恐竜の背中に乗って福井へ、福井駅で恐竜の体内探検・翼竜での飛行、若狭湾の海洋施設、勝山の化石発掘、越前海岸の地形学習を構想しています。

## 2つのWebサイト

- `/` — プレゼンテーション用のビジネス構想ランディングページ
- `/park/` — 架空のテーマパーク公式サイト風トップページ
- `/park/attractions.html` — アトラクション検索、カテゴリ別絞り込み、詳細表示
- `/park/tickets.html` — 料金表、日時・券種・年齢・人数の**デモ計算**と確認ダイアログ
- `/park/access.html` — **実際の位置関係を示すSVG地理マップ**＋5エリアの選択式ガイドと、架空の世界観マップ・ルート演出
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

## エリアガイド・地理マップ（Issue #5）

`park/areas-data.ts` に5地域の共通ID（`komatsu`, `fukui`, `katsuyama`, `wakasa`, `echizen`）、代表地点の緯度経度、アトラクションID、フード・ショップ構想、サービス・周遊案、移動上の注意を定義しました。

- `park/area-map.ts` / `park/area-map.css` — 地図ピン、テキストのエリア一覧、写真付き選択パネル、各エリアカードを連動させる表示・操作。
- `park/assets/fukui-geography.svg` — 実際の福井県・石川県の行政界をもとに描画した位置図。出典は [JapanPrefGeoJson](https://github.com/amay077/JapanPrefGeoJson)（Public Domain）の県コード17（石川県）・18（福井県）で、地形の輪郭を図案化しローカル配信。
- `park/assets/world-map-ai.webp` — 既存の**架空パークの演出用概念図**として引き続き使用。地理精度・移動経路を示さない。
- 小松空港は**石川県**です。若狭湾・越前海岸のピンは実在地点を基準とする代表位置であり、架空施設の確定建設地ではありません。

動作確認: `npm run test:areas`、`npm run typecheck`、`npm run build`。
ブラウザは375 / 390 / 430px、タブレット、PCの幅でピン・代替リスト・画像とカード・アンカー遷移を確認してください。

### 他Issueとのデータ連携

- **#2 アトラクション**: `attractionIds` は既存の `park/attractions-data.ts` と同じID。#2の詳細ページがmainに統合されるまでは未作成URLへリンクしません。
- **#3 フード＆ショップ**: `fukui` / `katsuyama` / `wakasa` は #3 の `FoodArea` と一致。未マージの店舗詳細ページはリンクせず、現時点では構想として名称のみ表示します。
- **#4 モデルコース / #6 交通**: 共通エリアIDと代表位置を利用できます。現在の「周遊アイデア」はモデルコースの代替ではありません。交通時刻・所要時間・運賃の確定情報は掲載していません。


## Dining & retail pages

- `/park/dining.html`: three fictional restaurants with menu concepts, tax-inclusive planning prices, and area filters.
- `/park/shops.html`: two fictional shops and merchandise concepts.
- `park/food-data.ts`, `park/food-pages.ts`, `park/food.css`: common venue content and UI.
- `park/assets/dining-*.jpg`, `park/assets/shop-*.jpg`: original photorealistic AI-generated concept images (1536×1024 JPEG). These depict fictional venues, meals and goods, not actual photographs or products.
- Displayed food and merchandise cannot be bought. There is no reservation, real payment, or personal information collection.

## Image assets (2026-11-05)

- Issue #3: 10 photorealistic, original AI-generated 1536×1024 JPEG assets now cover three dining interiors, three featured menu photos, two retail interiors and two featured merchandise photos. No brand text, prices, or labels are baked into the imagery.
- All venues, dishes, products and hours remain fictional concepts; the renderings are not real facility or product photographs.
- Legacy park `.webp` imagery is still awaiting replacement with higher-resolution originals; see `docs/image-quality-audit.md` for the remaining image inventory and acceptance criteria.
