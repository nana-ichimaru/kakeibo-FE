import { type CashFlow } from '@/share/types/cashFlow'

// income → 収入、 expense → 支出 に変換する関数
//　それ以外はから文字とかにしてエラーは出したくない
// if文は使わずに

//　奈良さんに聞きたいこと
// わからないことがあった時に上手な調べ方が分からないのでその方法のコツを質問する
//　例えば、<Input type='date' defaultValue={new Date().toLocaleDateString('sv-SE')} />
// この方法について調べたい時にどういうキーワードで調べたら良いか分からないなど

// Record<A, B> は
// 「キーがAで、値がBのオブジェクト」
// CashFlowを日本語表示に変換するための対応表
const CashFlowTypeJaMap: Record<CashFlow, string> = {
  income: '収入',
  expense: '支出',
}

// オブジェクトに該当のキーがあるか確認する。(type in CashFlowTypeJaMap)
// この関数が true を返したら、引数 type は CashFlow 型として扱える。（(type: string): type is CashFlow）
// CashFlow 型かを判定する関数。
const isCashFlow = (type: string): type is CashFlow => type in CashFlowTypeJaMap

// type が CashFlow 型の場合は対応する日本語を返し、そうでなければ空文字を返す関数
export const transformCashFlowTypeJa = (type: string): string =>
  isCashFlow(type) ? CashFlowTypeJaMap[type] : ''

// export const transformCashFlowJa = (type: CashFlow): string => {
//   switch (type) {
//     case 'income':
//       return '収入'
//     case 'expense':
//       return '支出'
//     default:
//       return ''
//   }
// }
