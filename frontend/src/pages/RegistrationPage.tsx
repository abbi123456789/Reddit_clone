import React from 'react'
import { useNavigate } from "react-router-dom";
import { doRegister } from "../services/account";
import '../styles/login.css';

const Registration = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [successEmail, setSuccessEmail] = React.useState<string | null>(null);
    const [_, dispatchAction, isPending] = React.useActionState(asyncRegister, null)

    async function asyncRegister(_: any, formData: FormData){
        setErrorMessage(null)

        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirm-password') as string
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
            return null
        }

        const body = {
            'username': formData.get('username') as string,
            'email': formData.get('email') as string,
            'password': password,
        }
        const result = await doRegister(body)
        if(result.data){
            setSuccessEmail(result.data.email)
            return null
        }

        setErrorMessage(result.error?.message || 'Registration failed.')
        return null
    }

    return (
        <div className="login-wrapper">
            <div className="login-page">
                <div className="auth-header">
                    <h1>Create your account</h1>
                    <p>Register with email and password, then verify your email before logging in.</p>
                </div>

                {successEmail ? (
                    <div className="status-card">
                        <h2>Check your email</h2>
                        <p>We sent a verification link to <strong>{successEmail}</strong>.</p>
                        <button className="btn-primary" onClick={() => navigate('/login')}>
                            Back to login
                        </button>
                    </div>
                ) : (
                <>
                {errorMessage && <div className="auth-message auth-message-error">{errorMessage}</div>}
                <form className="login-form" action={dispatchAction}>
                    <div className="form-field">
                        <label htmlFor="username">Username <span className="required-field">*</span></label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email <span className="required-field">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Password <span className="required-filed">*</span></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="confrim-password">Password <span className="required-filed">*</span></label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button disabled={isPending} className="btn-primary">
                        {isPending ? 'Registering...' : 'Register'}
                    </button>
                </form>
                </>
                )}
            </div>
        </div>
    )
}

export default Registration;
