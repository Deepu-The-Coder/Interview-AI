import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import { Home } from 'lucide-react' // Import Home icon
import Loading from '../../others/components/Loading'

const Register = () => {
  const navigate = useNavigate()
  const { loading, handleRegister } = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !username.trim() || !password.trim()) {
      return toast.error("All fields are required.")
    }
    await handleRegister({ username, email, password })
    navigate("/")
  }

  if (loading) {
    return (
      <Loading/>
    )
  }

  return (
    <div className="auth-wrapper">
      {/* Home Navigation Button */}
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
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor='username'>Username</label>
              <input 
                onChange={(e) => setUsername(e.target.value)}
                type="text" 
                id="username" 
                name="username" 
                placeholder="Enter username" 
              />
            </div>
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
            <button type="submit" className='button primary-button'>Register</button>
          </form>
          
          <p className="auth-footer">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Register