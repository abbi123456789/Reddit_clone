import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CommunityModalProvider } from "./context/CommunityModalContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
const Registration = React.lazy(() => import('./pages/RegistrationPage'))
const Login = React.lazy(() => import('./pages/LoginPage'))
const VerifyEmailPage = React.lazy(() => import('./pages/VerifyEmailPage'))
const OAuthCallbackPage = React.lazy(() => import('./pages/OAuthCallbackPage'))
const HomePage = React.lazy(() => import('./pages/HomePage'))
const CommunityPage = React.lazy(() => import('./pages/CommunityPage'))
const CreatePost = React.lazy(() => import('./pages/CreatePost'))
const LookAndFeelPage = React.lazy(() => import('./pages/LookAndFeelPage'))
const PostFlairPage = React.lazy(() => import('./pages/PostFlairPage'))
const PostDetail = React.lazy(() => import('./pages/PostDetail'))
const ModeratorPostsAndComments = React.lazy(() => import('./pages/ModeratorPostsAndComments'))
const ModeratorGuides = React.lazy(() => import('./pages/ModeratorGuides'))
const ModeratorSettings = React.lazy(() => import('./pages/ModeratorSettings'))
const UserProfilePage = React.lazy(() => import('./pages/UserProfilePage'))

const App = () => {
  return (
    <AuthProvider>
      <CommunityModalProvider>
        <main>
          <React.Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/r/:communityName" element={<CommunityPage />} />
              <Route path="/submit" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
              <Route path="/r/:communityName/submit" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
              <Route path="/r/:communityName/comments/:postId/:postSlug" element={<PostDetail />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/auth/callback" element={<OAuthCallbackPage />} />
              <Route path="/r/:communityName/look-feel" element={<ProtectedRoute><LookAndFeelPage /></ProtectedRoute>} />
              <Route path="/r/mod/:communityName/post-flair" element={<ProtectedRoute><PostFlairPage /></ProtectedRoute>} />
              <Route path="/r/mod/:communityName/posts-and-comments" element={<ProtectedRoute><ModeratorPostsAndComments /></ProtectedRoute>} />
              <Route path='/r/mod/:communityName/look-and-feel' element={<ProtectedRoute><LookAndFeelPage /></ProtectedRoute>} />
              <Route path='/r/mod/:communityName/guides' element={<ProtectedRoute><ModeratorGuides /></ProtectedRoute>} />
              <Route path='/r/mod/:communityName/general-settings' element={<ProtectedRoute><ModeratorSettings /></ProtectedRoute>} />
              <Route path='/u/:username' element={<UserProfilePage />} />
            </Routes>
          </React.Suspense>
        </main>
      </CommunityModalProvider>
    </AuthProvider>
  )
}

export default App
