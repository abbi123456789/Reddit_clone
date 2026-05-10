import React from 'react'
import { Button, Form, Input, Label, TextField } from 'react-aria-components';
import { useNavigate } from "react-router-dom";
import { doRegister } from "../services/account";
import { authFieldClass, authPageClass, authWrapperClass, primaryButtonClass } from "../styles/theme";

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
        <div className={authWrapperClass}>
            <div className={authPageClass}>
                <div className="mb-5">
                    <h1 className="mb-2">Create your account</h1>
                    <p className="m-0 text-slate-600">Register with email and password, then verify your email before logging in.</p>
                </div>

                {successEmail ? (
                    <div className="mt-[18px] flex flex-col gap-3">
                        <h2 className="mb-2">Check your email</h2>
                        <p className="m-0 text-slate-600">We sent a verification link to <strong>{successEmail}</strong>.</p>
                        <Button className={`${primaryButtonClass} ml-auto w-fit text-[1rem] disabled:cursor-progress disabled:opacity-75`} onPress={() => navigate('/login')}>
                            Back to login
                        </Button>
                    </div>
                ) : (
                <>
                {errorMessage && <div className="mb-4 rounded-[10px] bg-[#ffe1db] px-3.5 py-3 text-[#84291a]">{errorMessage}</div>}
                <Form className="flex flex-col gap-4" action={dispatchAction}>
                    <TextField className={authFieldClass} name="username" type="text" isRequired>
                        <Label>Username <span className="text-red-600">*</span></Label>
                        <Input
                            type="text"
                            id="username"
                        />
                    </TextField>

                    <TextField className={authFieldClass} name="email" type="email" isRequired>
                        <Label>Email <span className="text-red-600">*</span></Label>
                        <Input
                            type="email"
                            id="email"
                        />
                    </TextField>

                    <TextField className={authFieldClass} name="password" type="password" isRequired>
                        <Label>Password <span className="text-red-600">*</span></Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="********"
                        />
                    </TextField>

                    <TextField className={authFieldClass} name="confirm-password" type="password" isRequired>
                        <Label>Confirm password <span className="text-red-600">*</span></Label>
                        <Input
                            type="password"
                            id="confirm-password"
                            placeholder="********"
                        />
                    </TextField>

                    <Button type='submit' isDisabled={isPending} className={`${primaryButtonClass} ml-auto w-fit text-[1rem] disabled:cursor-progress disabled:opacity-75`}>
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
