import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Target, BarChart3, Zap, LayoutDashboard, User, LogOut, ArrowRight } from 'lucide-react';
import '../style/LandingPage.scss';
import { useAuth } from '../../auth/hooks/useAuth';
import toast from 'react-hot-toast';

const LandingPage = () => {

  const { user, handleLogout } = useAuth(); 
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
        await handleLogout();
        toast.success("Logged out successfully");
        navigate("/");
    } catch (error) {
        toast.error("Logout failed");
    }
  };

  return (
    <div className="landing-wrapper">
      <nav className="landing-nav">
        <div className="logo">Interview<span>AI</span></div>
        
        {/* Centered Boxed Menu */}
        <div className="nav-center-container">
          <div className="nav-menu-box">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/reports" className="nav-link">Reports</Link>
            <Link to="/interview" className="nav-link">Generate Report</Link>
          </div>
        </div>

        <div className="nav-right">
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
              <Link to="/register" className="start-btn">Start Free</Link>
            </>
          )}
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <span className="badge">AI-Powered Career Intelligence</span>
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

      {/* Feature Section */}
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
        </div>
      </section>
    </div>
  );
};

export default LandingPage;