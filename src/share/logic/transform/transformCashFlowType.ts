import { type CashFlow } from "@/share/types/cashFlow"

// income → 収入、 expense → 支出 に変換する関数 
//　それ以外はから文字とかにしてエラーは出したくない
// if文は使わずに

//　奈良さんに聞きたいこと
// わからないことがあった時に上手な調べ方が分からないのでその方法のコツを質問する
//　例えば、<Input type='date' defaultValue={new Date().toLocaleDateString('sv-SE')} /> 
// この方法について調べたい時にどういうキーワードで調べたら良いか分からないなど

const CashFlowTypeToJaMap: Record<CashFlow, string> = {
  income: "収入",
  expense: "支出",
}

const isCashFlow = (type: string): type is CashFlow =>
  type in CashFlowTypeToJaMap

export const transformCashFlowTypeToJa = (type: string): string =>
  isCashFlow(type) ? CashFlowTypeToJaMap[type] : ""
