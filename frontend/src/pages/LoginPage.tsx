import { useState } from "react";

import { doLogin } from "../services/account";
import '../styles/login.css'

const Login = ()=>{
    const [identifier, setIdentifier] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async (e:any)=>{
        e.preventDefault()
        
        const data = await doLogin({identifier, password})
        if(data){
            localStorage.setItem('accessToken', data.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
        }
    }

    return (
        <div className="login-wrapper">
        <div className="login-page">
            <form className="login-form">
                <div className="form-field">
                    <label htmlFor="identifier">Username/Email <span className="required-field">*</span></label>
                    <input 
                        type="text" 
                        id="identifier" 
                        name="identifier" 
                        placeholder="tony@example.com" 
                        required 
                        value={identifier}
                        onChange={(e)=>setIdentifier(e.target.value)}
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
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                </div>

                <button onClick={handleLogin} className="btn-primary">Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login;