import { Routes, Route } from "react-router-dom"
import Registration from "./pages/RegistrationPage"
import Login from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { useState } from "react"

const App = ()=>{
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleModalToggle = () => {
    console.log(showModal)
    setShowModal((prev)=>!prev)
  }

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage handleModalToggle = {handleModalToggle} showModal={showModal}/>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App