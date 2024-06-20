import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './views/Signin'
import Signup from './views/Signup'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
