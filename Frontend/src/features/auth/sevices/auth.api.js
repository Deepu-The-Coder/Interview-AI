import axios from "axios"

//create instance of axios
const api = axios.create({
    baseURL:"https://interview-ai-backend-4c8b.onrender.com",
    withCredentials:true
})

export async function register({username,email,password}){
    try {
        const response = await api.post('/api/auth/register',{
            username,email,password
        },{
            // by default axios dont give access to cookies
            withCredentials:true  //now server has access to read cookies data and set it
           // Needed for session-based auth / cookie-based JWT
        })

        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export async function login({email, password}){
    try {
        const response = await api.post('/api/auth/login',{
            email,password
        },{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(erro)
    }
}

export async function logout(){
    try {
        const response= await api.get("/api/auth/logout",{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getMe(){
    try {
        const response = await api.get("/api/auth/get-me",{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}