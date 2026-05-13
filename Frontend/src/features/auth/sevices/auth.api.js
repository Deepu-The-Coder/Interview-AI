import axios from "axios"
import toast from 'react-hot-toast'
//create instance of axios
const api = axios.create({
    // baseURL:"http://localhost:3000",
    baseURL:import.meta.env.VITE_API_URL,
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
        if(response.status===200){
            toast.success("Successfully Registered")
        }
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return toast.error('User Already exists with these credentials');
        }
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
        if(response.status===200){
            toast.success("Successfully Logged in")
        }
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return toast.error('Invalid email or password');
        }
        console.log(error)
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
        return null; // Explicitly return null so the UI knows no one is logged in
    }
}