import {BrowserRouter, Routes, Route} from "react-router-dom"
import RegisterPage from '../src/pages/register page/RegisterPage'
import LoginPage from './pages/login page/LoginPage'
import AnalyticsPage from '../src/pages/analytics page/AnalyticsPage'
import SettingPage from './pages/setting page/SettingPage'
import BoardPage from '../src/pages/board page/BoardPage'
import SharePage from "./components/share page/SharePage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/Setting" element={<ProtectedRoute Component={SettingPage}/>} />
      <Route path="/Analytics" element={<ProtectedRoute Component={AnalyticsPage} />} />
      <Route path="/" element={<RegisterPage />} />
      <Route path="/Board" element={<ProtectedRoute Component={BoardPage} />} />
      <Route path="board/task/:id" element={<SharePage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
