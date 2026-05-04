import React from 'react'
import { Button, Form, Input, Label, TextField } from 'react-aria-components';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { beginGoogleLogin, doLogin, resendVerificationEmail } from "../services/account";

const authWrapperClass = "flex min-h-screen items-center justify-center bg-[#f8efe8] bg-[radial-gradient(circle_at_top_left,rgba(255,111,60,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,177,66,0.2),transparent_30%)] p-6";
const authPageClass = "m-auto w-[90%] max-w-[560px] rounded-xl border border-black/15 bg-[#faebd7] p-6 text-[1.1rem] shadow-[0_18px_50px_rgba(92,47,19,0.15)]";
const fieldClass = "flex flex-col gap-1.5 [&_input]:rounded-lg [&_input]:border [&_input]:border-black/20 [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-[1rem]";
const primaryButtonClass = "ml-auto w-fit rounded-full border-0 bg-orange-600 px-4 py-2.5 text-[1rem] text-white disabled:cursor-progress disabled:opacity-75";
const secondaryButtonClass = "rounded-full border-0 bg-slate-500 px-4 py-2.5 text-[1rem] text-white disabled:cursor-progress disabled:opacity-75";

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
        <div className={authWrapperClass}>
            <div className={authPageClass}>
                <div className="mb-5">
                    <h1 className="mb-2">Welcome back</h1>
                    <p className="m-0 text-[#5a463a]">Sign in with your password or use Google.</p>
                </div>

                {errorMessage && (
                    <div className={`mb-4 rounded-[10px] px-3.5 py-3 ${errorCode === null ? 'bg-[#dff6df] text-[#205b2d]' : 'bg-[#ffe1db] text-[#84291a]'}`}>
                        {errorMessage}
                    </div>
                )}

                <Form className="flex flex-col gap-4" action={dispatchAction}>
                    <TextField className={fieldClass} name="identifier" type="text" isRequired>
                        <Label>Username/Email <span className="text-red-600">*</span></Label>
                        <Input
                            type="text"
                            id="identifier"
                            placeholder="tony@example.com"
                        />
                    </TextField>

                    <TextField className={fieldClass} name="password" type="password" isRequired>
                        <Label>Password <span className="text-red-600">*</span></Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="********"
                        />
                    </TextField>

                    <Button isDisabled={isPending} className={primaryButtonClass}>
                        {isPending ? 'Logging you in' : 'Login'}
                    </Button>
                </Form>

                <div className="my-[18px] flex items-center gap-3 text-[#8a7361] before:h-px before:flex-1 before:bg-black/15 before:content-[''] after:h-px after:flex-1 after:bg-black/15 after:content-['']">
                    <span>or</span>
                </div>

                <Button type="button" className="w-full rounded-full border border-black/20 bg-white px-4 py-2.5 text-[1rem] text-[#1f1f1f] disabled:cursor-progress disabled:opacity-75" onPress={beginGoogleLogin}>
                    Continue with Google
                </Button>

                {errorCode === 'email_unverified' && (
                    <Form className="mt-[18px] flex flex-col gap-3" onSubmit={handleResendVerification}>
                        <TextField
                            className={fieldClass}
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
                        <Button type="submit" className={secondaryButtonClass} isDisabled={isResending}>
                            {isResending ? 'Sending...' : 'Resend verification'}
                        </Button>
                        {resendMessage && <p className="m-0 text-[#5a463a]">{resendMessage}</p>}
                    </Form>
                )}
            </div>
        </div>
    )
}

export default Login;
