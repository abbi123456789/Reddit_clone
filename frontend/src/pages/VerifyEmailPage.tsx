import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { verifyEmailToken } from '../services/account'
import '../styles/login.css'

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
        <div className="login-wrapper">
            <div className="login-page">
                <div className="status-card">
                    <h1>Email verification</h1>
                    <div className={`auth-message ${status === 'success' ? 'auth-message-success' : status === 'error' ? 'auth-message-error' : ''}`}>
                        {message}
                    </div>
                    <Link className="btn-primary link-button" to={status === 'success' ? '/login?verified=true' : '/login'}>
                        Go to login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage
