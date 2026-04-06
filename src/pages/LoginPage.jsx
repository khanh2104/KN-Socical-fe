import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, saveToken } from '../api/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('defaultuser');
  const [password, setPassword] = useState('defaultpass');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login({ username, password });
      saveToken(data.token);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p>Sign in to continue to KN Social.</p>
        <p className="form-note">Mặc định user: <strong>defaultuser</strong> / <strong>defaultpass</strong></p>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="primary-button">
            Sign In
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
