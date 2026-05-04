import React from 'react'
import { Button, Form, Input, Label, TextField } from 'react-aria-components';
import { useNavigate } from "react-router-dom";
import { doRegister } from "../services/account";

const authWrapperClass = "flex min-h-screen items-center justify-center bg-[#f8efe8] bg-[radial-gradient(circle_at_top_left,rgba(255,111,60,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,177,66,0.2),transparent_30%)] p-6";
const authPageClass = "m-auto w-[90%] max-w-[560px] rounded-xl border border-black/15 bg-[#faebd7] p-6 text-[1.1rem] shadow-[0_18px_50px_rgba(92,47,19,0.15)]";
const fieldClass = "flex flex-col gap-1.5 [&_input]:rounded-lg [&_input]:border [&_input]:border-black/20 [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-[1rem]";
const primaryButtonClass = "ml-auto w-fit rounded-full border-0 bg-orange-600 px-4 py-2.5 text-[1rem] text-white disabled:cursor-progress disabled:opacity-75";

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
                    <p className="m-0 text-[#5a463a]">Register with email and password, then verify your email before logging in.</p>
                </div>

                {successEmail ? (
                    <div className="mt-[18px] flex flex-col gap-3">
                        <h2 className="mb-2">Check your email</h2>
                        <p className="m-0 text-[#5a463a]">We sent a verification link to <strong>{successEmail}</strong>.</p>
                        <Button className={primaryButtonClass} onPress={() => navigate('/login')}>
                            Back to login
                        </Button>
                    </div>
                ) : (
                <>
                {errorMessage && <div className="mb-4 rounded-[10px] bg-[#ffe1db] px-3.5 py-3 text-[#84291a]">{errorMessage}</div>}
                <Form className="flex flex-col gap-4" action={dispatchAction}>
                    <TextField className={fieldClass} name="username" type="text" isRequired>
                        <Label>Username <span className="text-red-600">*</span></Label>
                        <Input
                            type="text"
                            id="username"
                        />
                    </TextField>

                    <TextField className={fieldClass} name="email" type="email" isRequired>
                        <Label>Email <span className="text-red-600">*</span></Label>
                        <Input
                            type="email"
                            id="email"
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

                    <TextField className={fieldClass} name="confirm-password" type="password" isRequired>
                        <Label>Confirm password <span className="text-red-600">*</span></Label>
                        <Input
                            type="password"
                            id="confirm-password"
                            placeholder="********"
                        />
                    </TextField>

                    <Button isDisabled={isPending} className={primaryButtonClass}>
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
