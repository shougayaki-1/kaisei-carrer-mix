# 5エリアの統合メモ

`areas-data.ts` の `AreaId` と `parkAreas` / `areaById` を地理エリアの共通参照とする。識別子は `komatsu`, `fukui`, `katsuyama`, `wakasa`, `echizen`。表示名はそれぞれ「小松空港」「福井駅周辺」「勝山」「若狭湾」「越前海岸」。架空のゾーン名は別の表示上の補足として扱う。

未マージの各PRを統合するときの作業（現時点では他PRのコードを取り込まない）:

- #15: `attractions-data.ts` の7つのIDを `attractionAreaId` と照合し、文字列の `zone` に依存したエリア識別を避ける。`skyport`→`komatsu`、`inside/flight/night`→`fukui`、`fossil`→`katsuyama`、`ocean`→`wakasa`、`coast`→`echizen`。
- #16: `FoodArea` の `fukui/katsuyama/wakasa` は共通IDの部分集合。`AreaId` を参照し、`areaLabel` の地理名を `areaById` から取得する。ゾーン名は別途保持する。店舗名とエリアは一致。
- #17: `schedule-data.ts` の5 IDは一致するが、`AreaId` と名称を独自定義している。型と地理名を `areas-data.ts` から参照し、営業時間・番組・独自のゾーン名はスケジュール側に残す。`PARK_AREAS` の行は共通IDをキーとして組み立て、重複・欠落の検査を追加する。
- #15/#16 のページが統合された後にのみ詳細リンクを追加する。#18の共通ナビを維持し、新しいページは `NAVIGATION.md` のマーカーとリンク検査に従う。
