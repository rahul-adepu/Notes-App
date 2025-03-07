import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import Content from './components/Content'
import PrivateRoute from './components/PrivateRoute'
import NoteDetail from './pages/NoteDetail'

function App() {

  return (
    <>
      <Navbar />
      {/* <Content/> */}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Content />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/notes/:id" element={<NoteDetail />} />

      </Routes>
    </>
  )
}

export default App
