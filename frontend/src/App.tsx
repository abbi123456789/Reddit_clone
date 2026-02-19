import { Routes, Route } from "react-router-dom"
import Registration from "./pages/RegistrationPage"
import Login from "./pages/LoginPage"
import HomePage from "./pages/HomePage"

const App = ()=>{
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App