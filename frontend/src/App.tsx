import React from "react"
import { Routes, Route } from "react-router-dom"
const Registration = React.lazy(()=>import('./pages/RegistrationPage'))
const Login = React.lazy(()=>import('./pages/LoginPage'))
const HomePage = React.lazy(()=>import('./pages/HomePage'))
const CommunityPage = React.lazy(()=>import('./pages/CommunityPage'))
const CreatePost = React.lazy(()=>import('./pages/CreatePost'))
const LookAndFeelPage = React.lazy(()=>import('./pages/LookAndFeelPage'))
const PostFlairPage = React.lazy(()=>import('./pages/PostFlairPage'))
const PostDetail = React.lazy(()=>import('./pages/PostDetail'))
const ModeratorPostsAndComments = React.lazy(()=>import('./pages/ModeratorPostsAndComments'))
const ModeratorGuides = React.lazy(()=>import('./pages/ModeratorGuides'))
const ModeratorSettings = React.lazy(()=>import('./pages/ModeratorSettings'))
const UserProfilePage = React.lazy(()=>import('./pages/UserProfilePage'))

const App = ()=>{
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const handleModalToggle = () => {
    console.log(showModal)
    setShowModal((prev)=>!prev)
  }

  return (
    <main>
      <React.Suspense>
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
      </React.Suspense>
    </main>
  )
}

export default App