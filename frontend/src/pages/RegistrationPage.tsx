import React from 'react'
import { useNavigate } from "react-router-dom";
import { doRegister } from "../services/account";
import '../styles/login.css';

const Registration = () => {
    const navigate = useNavigate();
    const [_, dispatchAction, isPending] = React.useActionState(asyncRegister, null)

    async function asyncRegister(_: any, formData: FormData){
        const body = {
            'username': formData.get('username') as string,
            'email': formData.get('email') as string,
            'password': formData.get('password') as string,
        }
        const result = await doRegister(body)
        if(result){
            navigate('/login')
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-page">
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
            </div>
        </div>
    )
}

export default Registration;