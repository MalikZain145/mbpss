import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow]       = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login }             = useAdminAuth();
  const navigate              = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="al-login-page">
      <div className="al-login-card">
        <div className="al-login-logo">MBPSS</div>
        <h1>Admin Panel</h1>
        <p>Sign in to manage your website</p>

        {error && <div className="al-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="al-login-form">
          <div className="al-lf-group">
            <Mail size={15} />
            <input
              type="email" value={email} required autoFocus
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@mbpss.co.uk"
            />
          </div>
          <div className="al-lf-group">
            <Lock size={15} />
            <input
              type={show ? 'text' : 'password'} value={password} required
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="button" className="al-eye" onClick={() => setShow(s => !s)}>
              {show ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <button type="submit" className="al-login-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <a href="/" className="al-back-link">← Back to website</a>
      </div>
    </div>
  );
}
