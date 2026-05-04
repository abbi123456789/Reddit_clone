import React from 'react'
import { Button, Form, Input, Label, TextField } from 'react-aria-components';
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

                <Form className="login-form" action={dispatchAction}>
                    <TextField className="form-field" name="identifier" type="text" isRequired>
                        <Label>Username/Email <span className="required-field">*</span></Label>
                        <Input
                            type="text"
                            id="identifier"
                            placeholder="tony@example.com"
                        />
                    </TextField>

                    <TextField className="form-field" name="password" type="password" isRequired>
                        <Label>Password <span className="required-field">*</span></Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="********"
                        />
                    </TextField>

                    <Button isDisabled={isPending} className="btn-primary">
                        {isPending ? 'Logging you in' : 'Login'}
                    </Button>
                </Form>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                <Button type="button" className="btn-google" onPress={beginGoogleLogin}>
                    Continue with Google
                </Button>

                {errorCode === 'email_unverified' && (
                    <Form className="inline-form" onSubmit={handleResendVerification}>
                        <TextField
                            name="resend-email"
                            type="email"
                            value={resendEmail}
                            onChange={setResendEmail}
                            isRequired
                        >
                        <Label>Resend verification email</Label>
                        <Input
                            type="email"
                            id="resend-email"
                            placeholder="tony@example.com"
                        />
                        </TextField>
                        <Button type="submit" className="btn-secondary" isDisabled={isResending}>
                            {isResending ? 'Sending...' : 'Resend verification'}
                        </Button>
                        {resendMessage && <p className="inline-feedback">{resendMessage}</p>}
                    </Form>
                )}
            </div>
        </div>
    )
}

export default Login;
