import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doLogin } from "../services/account";
import '../styles/login.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [_, dispatchAction, isPending] = React.useActionState(asyncLogin, null)

    async function asyncLogin(_: any, formData: FormData){
        const body = {
            'identifier': formData.get('identifier') as string,
            'password': formData.get('password') as string,
        }
        const data = await doLogin(body)
        if(data){
            login(data.access_token, data.user)
            const from = location.state?.from?.pathname || '/'
            navigate(from, {replace: true})
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-page">
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
            </div>
        </div>
    )
}

export default Login;