/**
 * 発表用の仮定値です。実際の販売価格・需要予測ではありません。
 * このファイルを編集すると収益シミュレーターの前提を変更できます。
 */
export const assumptions = {
  ticketPriceYen: 3800,
  localSpendYen: 2600,
  openDaysPerYear: 250,
  initialVisitorsPerDay: 450,
} as const;
