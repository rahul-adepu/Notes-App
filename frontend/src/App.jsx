import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import Content from './components/Content'

function App() {

  return (
    <>
      <Navbar />
      {/* <Content/> */}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

      </Routes>
    </>
  )
}

export default App
