# Issue #14 実装・検証メモ

- 横断検索: `park/search.html`, `park/search.ts`, `park/search-data.ts`, `park/search.css`。既存のアトラクション、エリア、店舗、コース、イベント、サービス、FAQのデータを参照。
- お気に入り: `park/favorites.ts` とアトラクション・飲食・コースのカード。ブラウザ内に保存。
- 条件検索: `park/attractions.html`, `park/app.ts`。既存の検索と種類フィルタを維持し、エリア、屋内外、年齢・身長、体験傾向を追加。未設定の条件は適合として扱わない。
- 導線: `park/navigation.ts`, `park/navigation-entry.ts`。新規 HTML は既存の Vite 設定で自動収集。
- 検証: `npm run build`（型チェック・リンクチェック含む）、既存のエリア・スケジュール・チケット・サービス・イベント・交通テストに成功。ローカルブラウザで検索結果とお気に入り追加、一覧、再読み込み後の保持を確認。
- 未検証: 375/390/430px、タブレットの実画面、スクリーンリーダー、公開 Worker の新バージョン。公開デプロイは行っていない。ビルド時に既存 CSS の未解決 SVG 2件の警告あり。
