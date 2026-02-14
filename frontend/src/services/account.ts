import api from "./auth";

interface LoginPaylod{
    identifier: string;
    password: string;
}

interface RegisterPayload{
    username: string;
    email: string;
    password: string;
}

const doLogin = async (data: LoginPaylod)=>{
    try{
        const response = await api.post('/accounts/login', data)
        return response.data
    }catch(error){
        console.log(error)
        return null
    }
}

const doRegister = async (data: RegisterPayload)=>{
    try{
        const response = await api.post('/accounts/register', data)
        return response.data
    }catch(error){
        console.log(error)
        return null
    }
}

export {doLogin, doRegister}