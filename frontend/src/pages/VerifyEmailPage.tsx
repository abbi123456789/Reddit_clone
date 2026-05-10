import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { verifyEmailToken } from '../services/account'
import { authPageClass, authWrapperClass, primaryButtonClass } from '../styles/theme'

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
                    <Link className={`${primaryButtonClass} ml-auto w-fit text-center text-[1rem]`} to={status === 'success' ? '/login?verified=true' : '/login'}>
                        Go to login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage
