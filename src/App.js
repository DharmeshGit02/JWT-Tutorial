import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './views/Signin'
import Signup from './views/Signup'
import Homepage from './views/Homepage'
import _404Page from './views/404Page'
import Cart from './views/Cart'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="*" element={<_404Page />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
