import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { completeGoogleLogin } from '../services/account'

const authWrapperClass = "flex min-h-screen items-center justify-center bg-[#f8efe8] bg-[radial-gradient(circle_at_top_left,rgba(255,111,60,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,177,66,0.2),transparent_30%)] p-6";
const authPageClass = "m-auto w-[90%] max-w-[560px] rounded-xl border border-black/15 bg-[#faebd7] p-6 text-[1.1rem] shadow-[0_18px_50px_rgba(92,47,19,0.15)]";

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
                    <p className="m-0 text-[#5a463a]">Please wait while we finish your Google login.</p>
                </div>
            </div>
        </div>
    )
}

export default OAuthCallbackPage
