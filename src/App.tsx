import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'

function App() {

  return (
    <Router>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/second-page' element={<List />} />
      </Routes>
    </Router>
  )
}

export default App
