import { useState } from "react";
import { doRegister } from "../services/account";
import '../styles/register.css'

const Registration = ()=>{
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const handleRegister = async (e:any)=>{
        e.preventDefault()
        const data = await doRegister({username, email, password})
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
                    <label htmlFor="username">Username <span className="required-field">*</span></label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        />
                </div>

                <div className="form-field">
                    <label htmlFor="email">Email <span className="required-field">*</span></label>
                    <input 
                        type="email"
                        id="username" 
                        name="identifier" 
                        required 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                </div>

                <button onClick={handleRegister} className="btn-primary">Register</button>
            </form>
        </div>
        </div>
    )
}

export default Registration;