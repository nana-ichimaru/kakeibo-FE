import { Route, Routes } from 'react-router-dom'
import { LoginBaseRoute } from './Login/Base'
import { HomeRootContainer } from '@/features/Home/Root/HomeRootContainer'
import { HomeMikanContainer } from '@/features/Home/Mikan/HomeMikanContainer'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomeRootContainer />} />
        <Route path='/mikan' element={<HomeMikanContainer />} />
        <Route path='/momo' element={<p>もも!!!</p>} />
        <Route path='/momo/abokado' element={<p>ももアボカド!!!</p>} />
        <Route path='/login/*' element={<LoginBaseRoute />} />
        <Route path='/*' element={<p>その他!!!</p>} />
      </Routes>
    </>
  )
}
