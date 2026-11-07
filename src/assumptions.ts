/**
 * 発表用の仮定値です。大人1DAY DINO PASSの架空の通常価格を、全来場者の単価として単純化して使用します。
 * 年齢構成・券種・割引・需要・実際の収益を表すものではありません。
 * このファイルを編集すると収益シミュレーターの前提を変更できます。
 */
export const assumptions = {
  ticketPriceYen: 12800,
  localSpendYen: 2600,
  openDaysPerYear: 250,
  initialVisitorsPerDay: 450,
} as const;
