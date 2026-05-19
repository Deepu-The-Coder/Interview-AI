import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Target, BarChart3, Zap, User, LogOut, ArrowRight, RouteIcon, Menu, X } from 'lucide-react';
import '../style/LandingPage.scss';
import { useAuth } from '../../auth/hooks/useAuth';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth(); 
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const onLogout = async () => {
    try {
        await handleLogout();
        toast.success("Logged out successfully");
        setIsMenuOpen(false);
        navigate("/");
    } catch (error) {
        toast.error("Logout failed");
    }
  };

  return (
    <div className="landing-wrapper">
      <nav className="landing-nav">
        <div className="logo">Interview<span>AI</span></div>

        {/* The ONLY thing visible on mobile besides the logo */}
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
        {/* Menu Overlay */}
        <div className={`nav-center-container ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-menu-box">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/reports" className="nav-link" onClick={() => setIsMenuOpen(false)}>Reports</Link>
            <Link to="/interview" className="nav-link" onClick={() => setIsMenuOpen(false)}>Generate Report</Link>
            
            {/* Auth links moved INSIDE the menu for mobile */}
            <div className="mobile-auth-wrapper">
              {user ? (
                <button onClick={onLogout} className="mobile-logout-btn">
                  Logout ({user.username || "Profile"})
                </button>
              ) : (
                <>
                  <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="mobile-start-btn" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Visible ONLY on Laptop/Desktop */}
        <div className="nav-right desktop-auth">
          {user ? (
            <div className="user-profile-box">
              <div className="user-info">
                <User size={16} />
                <span>{user.username || "Profile"}</span>
              </div>
              <button onClick={onLogout} className="logout-btn" title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="start-btn">Register</Link>
            </>
          )}
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <span className="heading">AI-Powered Career Intelligence</span>
          <h1>Master Your Next <span className="highlight">Interview</span></h1>
          <p>
            Don't apply blindly. Get a deep-dive analysis of your resume against any 
            Job Description. Identify skill gaps and master your interview prep.
          </p>
          <Link to="/interview" className="hero-cta">
            Get Your Report <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <Target className="icon" />
            <h3>Match Score</h3>
            <p>Know exactly how you rank against the JD requirements.</p>
          </div>
          <div className="feature-card">
            <BarChart3 className="icon" />
            <h3>Skill Gaps</h3>
            <p>Identifies missing keywords and tech stacks instantly.</p>
          </div>
          <div className="feature-card">
            <Zap className="icon" />
            <h3>AI Q&A</h3>
            <p>Personalized behavioral and technical question bank.</p>
          </div>
          <div className="feature-card">
            <RouteIcon className="icon" />
            <h3>Phase-wise Planning</h3>
            <p>Deep analysed plan to land your dream job.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;