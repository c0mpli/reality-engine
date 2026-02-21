import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import SpacetimePage from './pages/SpacetimePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/spacetime" element={<SpacetimePage />} />
      </Routes>
    </BrowserRouter>
  )
}
