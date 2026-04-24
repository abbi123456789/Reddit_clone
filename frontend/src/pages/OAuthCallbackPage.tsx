import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { completeGoogleLogin } from '../services/account'
import '../styles/login.css'

const OAuthCallbackPage = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    React.useEffect(() => {
        let isMounted = true

        const finishLogin = async () => {
            const result = await completeGoogleLogin()
            if (!isMounted) {
                return
            }

            if (result.data) {
                login(result.data.access_token, result.data.user)
                navigate('/', { replace: true })
                return
            }

            const message = encodeURIComponent(result.error?.message || 'Google sign-in failed.')
            navigate(`/login?oauth_error=google_callback_failed&message=${message}`, { replace: true })
        }

        finishLogin()

        return () => {
            isMounted = false
        }
    }, [login, navigate])

    return (
        <div className="login-wrapper">
            <div className="login-page">
                <div className="status-card">
                    <h1>Completing sign-in</h1>
                    <p>Please wait while we finish your Google login.</p>
                </div>
            </div>
        </div>
    )
}

export default OAuthCallbackPage
