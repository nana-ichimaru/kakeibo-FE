import { Route, Routes } from 'react-router-dom'
import { LoginBaseRoute } from './Login/Base'
import { RootContainer } from '@/features/Root/RootContainer'
import { BaseLayout } from '@/components/templates/BaseLayout'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* この中に書かれた Route はすべて BaseLayout の <Outlet /> の場所に表示される */}
        {/* つまり「Header + 各ページの中身」の形になる */}
        <Route element={<BaseLayout />}>
          <Route path='/' element={<RootContainer />} />
          <Route path='/maguro' element={<p>マグロ</p>} />
          <Route path='/maguro/simezi' element={<p>マグロしめじ</p>} />
          <Route path='/maguro/saba' element={<p>マグロサバ</p>} />
          <Route path='/maguro/saba/tuna' element={<p>マグロサバツナ</p>} />
          <Route path='/azi' element={<p>アジ</p>} />
          <Route path='/azi/ebi' element={<p>アジエビ</p>} />
          <Route path='/login/*' element={<LoginBaseRoute />} />
          <Route path='/*' element={<p>その他!!!</p>} />
        </Route>
      </Routes>
    </>
  )
}
