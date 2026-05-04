import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { verifyEmailToken } from '../services/account'

const authWrapperClass = "flex min-h-screen items-center justify-center bg-[#f8efe8] bg-[radial-gradient(circle_at_top_left,rgba(255,111,60,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,177,66,0.2),transparent_30%)] p-6";
const authPageClass = "m-auto w-[90%] max-w-[560px] rounded-xl border border-black/15 bg-[#faebd7] p-6 text-[1.1rem] shadow-[0_18px_50px_rgba(92,47,19,0.15)]";

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams()
    const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = React.useState('Verifying your email...')

    React.useEffect(() => {
        const token = searchParams.get('token')
        if (!token) {
            setStatus('error')
            setMessage('Verification token not found.')
            return
        }

        let isMounted = true

        const runVerification = async () => {
            const result = await verifyEmailToken(token)
            if (!isMounted) {
                return
            }

            if (result.data?.verified) {
                setStatus('success')
                setMessage(result.data.message)
                return
            }

            setStatus('error')
            setMessage(result.error?.message || 'Unable to verify email.')
        }

        runVerification()

        return () => {
            isMounted = false
        }
    }, [searchParams])

    return (
        <div className={authWrapperClass}>
            <div className={authPageClass}>
                <div className="mt-[18px] flex flex-col gap-3">
                    <h1>Email verification</h1>
                    <div className={`mb-4 rounded-[10px] px-3.5 py-3 ${status === 'success' ? 'bg-[#dff6df] text-[#205b2d]' : status === 'error' ? 'bg-[#ffe1db] text-[#84291a]' : ''}`}>
                        {message}
                    </div>
                    <Link className="ml-auto w-fit rounded-full border-0 bg-orange-600 px-4 py-2.5 text-center text-[1rem] text-white" to={status === 'success' ? '/login?verified=true' : '/login'}>
                        Go to login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage
