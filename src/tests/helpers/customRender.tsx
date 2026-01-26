import { render } from '@testing-library/react'
import { CustomRenderProvider } from '@/tests/providers/customRenderProvider'

export const customRender = (ui: React.ReactElement) => {
  // render表示して欲しいもの
  return render(<CustomRenderProvider>{ui}</CustomRenderProvider>)
}
