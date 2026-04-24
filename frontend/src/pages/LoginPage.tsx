import React from 'react'
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { beginGoogleLogin, doLogin, resendVerificationEmail } from "../services/account";
import '../styles/login.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [errorCode, setErrorCode] = React.useState<string | null>(null);
    const [resendEmail, setResendEmail] = React.useState('');
    const [resendMessage, setResendMessage] = React.useState<string | null>(null);
    const [isResending, setIsResending] = React.useState(false);

    const [_, dispatchAction, isPending] = React.useActionState(asyncLogin, null)

    React.useEffect(() => {
        const oauthError = searchParams.get('oauth_error');
        const message = searchParams.get('message');
        const verified = searchParams.get('verified');

        if (verified === 'true') {
            setErrorCode(null);
            setErrorMessage('Your email is verified. You can log in now.');
            return;
        }

        if (oauthError) {
            setErrorCode(oauthError);
            setErrorMessage(message || 'Sign-in failed.');
        }
    }, [searchParams]);

    async function asyncLogin(_: any, formData: FormData){
        setErrorMessage(null)
        setErrorCode(null)
        setResendMessage(null)

        const identifier = formData.get('identifier') as string
        const body = {
            'identifier': identifier,
            'password': formData.get('password') as string,
        }
        const result = await doLogin(body)
        if(result.data){
            login(result.data.access_token, result.data.user)
            const from = location.state?.from?.pathname || '/'
            navigate(from, {replace: true})
            return
        }

        if (result.error) {
            setErrorCode(result.error.code)
            setErrorMessage(result.error.message)
            if (result.error.code === 'email_unverified' && identifier.includes('@')) {
                setResendEmail(identifier)
            }
        }
    }

    async function handleResendVerification(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsResending(true)
        setResendMessage(null)

        const result = await resendVerificationEmail({ email: resendEmail })
        setIsResending(false)

        if (result.data) {
            setResendMessage(result.data.message)
            return
        }

        setResendMessage(result.error?.message || 'Unable to resend verification email.')
    }

    return (
        <div className="login-wrapper">
            <div className="login-page">
                <div className="auth-header">
                    <h1>Welcome back</h1>
                    <p>Sign in with your password or use Google.</p>
                </div>

                {errorMessage && (
                    <div className={`auth-message ${errorCode === null ? 'auth-message-success' : 'auth-message-error'}`}>
                        {errorMessage}
                    </div>
                )}

                <form className="login-form" action={dispatchAction}>
                    <div className="form-field">
                        <label htmlFor="identifier">Username/Email <span className="required-field">*</span></label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            placeholder="tony@example.com"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Password <span className="required-field">*</span></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button disabled={isPending} className="btn-primary">
                        {isPending ? 'Logging you in' : 'Login'}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                <button type="button" className="btn-google" onClick={beginGoogleLogin}>
                    Continue with Google
                </button>

                {errorCode === 'email_unverified' && (
                    <form className="inline-form" onSubmit={handleResendVerification}>
                        <label htmlFor="resend-email">Resend verification email</label>
                        <input
                            type="email"
                            id="resend-email"
                            value={resendEmail}
                            onChange={(event) => setResendEmail(event.target.value)}
                            placeholder="tony@example.com"
                            required
                        />
                        <button type="submit" className="btn-secondary" disabled={isResending}>
                            {isResending ? 'Sending...' : 'Resend verification'}
                        </button>
                        {resendMessage && <p className="inline-feedback">{resendMessage}</p>}
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login;
