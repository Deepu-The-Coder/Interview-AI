import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../sevices/auth.api";

export const useAuth = () =>{
    const context = useContext(AuthContext)
    const {user , setUser, loading, setLoading} = context

    
     const handleLogin= async ({email,password}) =>{
        setLoading(true)
        try {
            const data = await login({email,password})
            //user is also in data
            setUser(data.user)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    
    const handleRegister = async ({username, email, password}) =>{
        setLoading(true)
        try {
            const data = await register({username, email, password})
            setUser(data.user)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogout = async () =>{
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const getAndSet =  async()=>{
            const data = await getMe()   //getMe() function depends only on token
            setUser(data.user)
            setLoading(false)
        }

        getAndSet()
    },[])
    return {user,loading,handleLogin,handleLogout, handleRegister}
}
