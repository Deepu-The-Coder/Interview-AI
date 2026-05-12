import React from 'react';
import { useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview.js'
import { FileText, Calendar, ChevronRight, PlusCircle } from 'lucide-react';
import '../style/reports.scss';

const Reports = () => {
    const navigate = useNavigate();
    const { reports } = useInterview()

    return (
        <div className="reports-page-wrapper">
            <header className="reports-header">
                <div>
                    <h1>My Interview <span className="highlight">Reports</span></h1>
                    <p>Review your previous analysis and preparation tracks.</p>
                </div>
                <button className="new-report-btn" onClick={() => navigate('/interview')}>
                    <PlusCircle size={18} /> New Analysis
                </button>
            </header>

            {reports.length > 0 ? (
                <section className='recent-reports'>
                    <div className='reports-grid'>
                        {reports.map(report => (
                            <div 
                                key={report._id} 
                                className='report-card' 
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <div className="card-top">
                                    <div className="icon-circle">
                                        <FileText size={20} />
                                    </div>
                                    <div className={`status-pill ${report.matchScore >= 80 ? 'high' : report.matchScore >= 60 ? 'mid' : 'low'}`}>
                                        {report.matchScore}% Match
                                    </div>
                                </div>

                                <div className="card-body">
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <div className="meta">
                                        <Calendar size={14} />
                                        <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <span className="view-link">View Detailed Plan</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">📂</div>
                    <h2>No reports found</h2>
                    <p>Analyze your first job description to see your interview plan here.</p>
                    <button onClick={() => navigate('/interview')}>Get Started</button>
                </div>
            )}
        </div>
    );
};

export default Reports;