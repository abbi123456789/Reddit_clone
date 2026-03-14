import { Routes, Route } from "react-router-dom"
import Registration from "./pages/RegistrationPage"
import Login from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import CommunityPage from "./pages/CommunityPage"
import CreatePost from "./pages/CreatePost"
import LookAndFeelPage from "./pages/LookAndFeelPage"
import PostFlairPage from "./pages/PostFlairPage"
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
        <Route path="/r/:communityName" element={<CommunityPage handleModalToggle={handleModalToggle} showModal={showModal} />} />
        <Route path="/create/post" element={<CreatePost handleModalToggle={handleModalToggle} showModal={showModal} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/r/:communityName/look-feel" element={<LookAndFeelPage />} />
        <Route path="/r/:communityName/post-flair" element={<PostFlairPage />} />
      </Routes>
    </main>
  )
}

export default App