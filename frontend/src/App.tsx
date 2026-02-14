import { Routes, Route } from "react-router-dom"
import Registration from "./pages/RegistrationPage"
import Login from "./pages/LoginPage"

const App = ()=>{
  return (
    <main>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App