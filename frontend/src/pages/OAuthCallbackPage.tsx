import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { completeGoogleLogin } from '../services/account'
import { authPageClass, authWrapperClass } from '../styles/theme'

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
        <div className={authWrapperClass}>
            <div className={authPageClass}>
                <div className="mt-[18px] flex flex-col gap-3">
                    <h1>Completing sign-in</h1>
                    <p className="m-0 text-slate-600">Please wait while we finish your Google login.</p>
                </div>
            </div>
        </div>
    )
}

export default OAuthCallbackPage
