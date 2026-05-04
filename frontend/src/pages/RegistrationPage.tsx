import React from 'react'
import { Button, Form, Input, Label, TextField } from 'react-aria-components';
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
                        <Button className="btn-primary" onPress={() => navigate('/login')}>
                            Back to login
                        </Button>
                    </div>
                ) : (
                <>
                {errorMessage && <div className="auth-message auth-message-error">{errorMessage}</div>}
                <Form className="login-form" action={dispatchAction}>
                    <TextField className="form-field" name="username" type="text" isRequired>
                        <Label>Username <span className="required-field">*</span></Label>
                        <Input
                            type="text"
                            id="username"
                        />
                    </TextField>

                    <TextField className="form-field" name="email" type="email" isRequired>
                        <Label>Email <span className="required-field">*</span></Label>
                        <Input
                            type="email"
                            id="email"
                        />
                    </TextField>

                    <TextField className="form-field" name="password" type="password" isRequired>
                        <Label>Password <span className="required-filed">*</span></Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="********"
                        />
                    </TextField>

                    <TextField className="form-field" name="confirm-password" type="password" isRequired>
                        <Label>Confirm password <span className="required-filed">*</span></Label>
                        <Input
                            type="password"
                            id="confirm-password"
                            placeholder="********"
                        />
                    </TextField>

                    <Button isDisabled={isPending} className="btn-primary">
                        {isPending ? 'Registering...' : 'Register'}
                    </Button>
                </Form>
                </>
                )}
            </div>
        </div>
    )
}

export default Registration;
