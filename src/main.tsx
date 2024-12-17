import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Single } from './Single.tsx'
import { Multiple } from './Multiple.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/single' element={<Single />} />
      <Route path='/multiple' element={<Multiple />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
