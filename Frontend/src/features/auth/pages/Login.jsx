import React, { useState } from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import toast from 'react-hot-toast'
import { Home } from 'lucide-react' // Import Home icon
import Loading from '../../others/components/Loading.jsx'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            return toast.error("All fields are required");
        }
        await handleLogin({ email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <div className="auth-wrapper">
            {/* New Styled Home Button */}
            <button 
                onClick={() => navigate("/")} 
                className="home-nav-btn"
                aria-label="Go to Home"
            >
                <Home size={20} />
                <span>Home</span>
            </button>

            <main className="auth-main">
                <div className="form-container">
                    <h1>Login</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor='email'>Email</label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter email address" 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor='password'>Password</label>
                            <input 
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Enter password" 
                            />
                        </div>
                        <button type="submit" className='button primary-button'>Login</button>
                    </form>
                    <p className="auth-footer">
                        Don't have an account? <Link to={"/register"}>Register</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Login