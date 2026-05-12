import React, { useState } from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import toast from 'react-hot-toast'

const Login = () => {

    const {loading, handleLogin} = useAuth()
    const navigate = useNavigate()

    //two way binding
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     if(email===""){
    //         return toast.error("Email or password is missing")
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if either field is empty after removing whitespace
        if (!email.trim() || !password.trim()) {
            return toast.error("All fields are required");
        }
        await handleLogin({email,password})
        navigate("/")
        }

    if(loading){
        return (<main><h1>Loading...........</h1></main>)
    }
  return (
    <>
        <div onClick={()=>navigate("/")}
        className="retreat">Go to Home page</div>
    <main>
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='email'>Email: </label>
                    <input onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" id="email" name="email" placeholder="Enter email address"/>
                </div>
                <div className="input-group">
                    <label htmlFor='password'>Password: </label>
                    <input onChange={(e)=>{setPassword(e.target.value)}}
                    type="password" id="password" name="password" placeholder="Enter password"/>
                </div>
                <button className='button primary-button'>Login</button>
            </form>
            <p>Don't have an account? <Link to={"/register"} >Register</Link></p>
        </div>
    </main>
    </>
  )
}

export default Login