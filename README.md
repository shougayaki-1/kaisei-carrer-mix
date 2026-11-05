# LOST ERA — 観光・経済 × 地学

市立札幌開成中等教育学校の「キャリコミックス」向けに作成した、架空のビジネスアイデア発表用Webサイトのプロトタイプです。

**テーマ：** 「ジュラシック・パーク」のような没入体験 × 地学 × 観光ビジネス。実際に恐竜を復活させるのではなく、動く模型・AR・模擬発掘を組み合わせた体験施設を想定しています。映画作品や権利者との提携はありません。

## 収録内容

- コンセプトと「観光・経済 × 地学」の掛け合わせ
- 3つの体験エリア（恐竜の谷 / 化石発掘ラボ / 地球史トレイル）
- 地層・化石・地質時代に関する学習の設計
- 収益源と地域経済への波及の説明
- 来場者数を動かせる簡易収益シミュレーター
- 小規模イベントから展開するロードマップ

文章・数値・エリア構成はすべて**仮案**です。収益シミュレーションは、事業費・運営費・季節変動などを考慮した収支計画ではありません。

## 技術構成

- Vite + TypeScript（フレームワークなし）
- Cloudflare Workers Static Assets
- Cloudflare CLI \`cf\` と Vite plugin

## ローカルでの実行

Node.js 22.18 以降を使用してください。

\`\`\`bash
npm install
npm run dev
\`\`\`

型チェック：

\`\`\`bash
npm run typecheck
\`\`\`

## Cloudflare Workers への公開

Cloudflare 側の Git 連携でこのリポジトリが設定済みの場合は、その接続先とビルド設定を確認してください。

- ビルドコマンド：\`npm run build\`
- デプロイコマンド：\`npm run deploy\`
- Worker 名：\`cloudflare.config.ts\` の \`worker.name\`（暫定 \`kaisei-carrer-mix\`）

自分の環境からデプロイする場合：

\`\`\`bash
npm install
npm run deploy
\`\`\`

Cloudflare への認証が必要です。すでに稼働中の Worker と \`worker.name\` が異なる場合、別 Worker として作成される可能性があるため、名前は必ず確認してください。

## 変更しやすい場所

| ファイル | 内容 |
| --- | --- |
| \`index.html\` | 全セクションの文章・構成 |
| \`src/style.css\` | 配色・レイアウト・写真 |
| \`src/assumptions.ts\` | シミュレーターの仮定 |
| \`src/main.ts\` | UI操作・計算ロジック |
| \`cloudflare.config.ts\` | Cloudflare Worker 設定 |

ヒーローなどの背景には Unsplash 画像を使用しています。表示環境によっては画像が読み込めない場合があります。公表・本番利用前に使用許諾と画像クレジット・内容の正確性を確認してください。
