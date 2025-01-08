import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { JsonDataProvider } from './context/JsonDataContext'
import Home from './pages/Home';
import DynamicPage from './pages/DynamicPage';
import './App.css'
import 'react-markdown-editor-lite/lib/index.css';

function App() {

  return (
    <JsonDataProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:title" element={<DynamicPage />} />
        </Routes>
      </Router>
    </JsonDataProvider>
  )
}

export default App
