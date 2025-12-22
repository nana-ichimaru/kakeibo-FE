import { Route, Routes } from 'react-router-dom'

export const TestBaseRoute = () => {
  return (
    <>
      <Routes>
        <Route path='/iwashi' element={<p>いわし</p>} />
      </Routes>
    </>
  )
}
