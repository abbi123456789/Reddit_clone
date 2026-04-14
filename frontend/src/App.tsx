import { Routes, Route } from "react-router-dom"
import Registration from "./pages/RegistrationPage"
import Login from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import CommunityPage from "./pages/CommunityPage"
import CreatePost from "./pages/CreatePost"
import LookAndFeelPage from "./pages/LookAndFeelPage"
import PostFlairPage from "./pages/PostFlairPage"
import PostDetail from "./pages/PostDetail"
import ModeratorPostsAndComments from "./pages/ModeratorPostsAndComments"
import ModeratorGuides from "./pages/ModeratorGuides"
import ModeratorSettings from "./pages/ModeratorSettings"
import UserProfilePage from "./pages/UserProfilePage"
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
        <Route path="/submit" element={<CreatePost handleModalToggle={handleModalToggle} showModal={showModal} />} />
        <Route path="/r/:communityName/submit" element={<CreatePost handleModalToggle={handleModalToggle} showModal={showModal} />} />
        <Route path="/r/:communityName/comments/:postId/:postSlug" element={<PostDetail handleModalToggle={handleModalToggle} showModal={showModal} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/r/:communityName/look-feel" element={<LookAndFeelPage />} />
        <Route path="/r/:communityName/post-flair" element={<PostFlairPage />} />
        <Route path="/r/:communityName/posts-and-comments" element={<ModeratorPostsAndComments />} />
        <Route path='/r/:communityName/guides' element={<ModeratorGuides />} />
        <Route path='/r/:communityName/general-settings' element={<ModeratorSettings />} />
        <Route path='/u/:username' element={<UserProfilePage handleModalToggle={handleModalToggle} showModal={showModal}/>} />
      </Routes>
    </main>
  )
}

export default App