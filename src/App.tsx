import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import SpacetimePage from './pages/SpacetimePage'
import LorentzPage from './pages/LorentzPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/spacetime" element={<SpacetimePage />} />
        <Route path="/lorentz" element={<LorentzPage />} />
      </Routes>
    </BrowserRouter>
  )
}
