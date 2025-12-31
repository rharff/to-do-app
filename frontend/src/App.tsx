import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./LandingPage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import DashboardPage from "./pages/dashboard/DashboardPage"
import AllTasksPage from "./pages/dashboard/AllTasksPage"
import BoardPage from "./pages/board/BoardPage"
import { KanbanProvider } from "@/context/KanbanContext"

function App() {
  return (
    <KanbanProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<AllTasksPage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </BrowserRouter>
    </KanbanProvider>
  )
}

export default App