import { Route, Routes } from 'react-router-dom'
import { TestBaseRoute } from './Test/Base'

export const LoginBaseRoute = () => {
  return (
    <>
      <Routes>
        <Route path='*' element={<p>りんご</p>} />
        <Route path='/momo' element={<p>ももりんご!!!</p>} />
        <Route path='/mikan' element={<p>みかんりんご!!!</p>} />
        <Route path='/test/*' element={< TestBaseRoute/>} />
      </Routes>
    </>
  )
}
