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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">facebook</h1>
          <p className="text-gray-600">Connect with friends and the world around you.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-600 text-sm hover:underline">Forgot password?</a>
          </div>
          <hr className="my-6" />
          <div className="text-center">
            <Link
              to="/register"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold"
            >
              Create New Account
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Default: <strong>defaultuser</strong> / <strong>defaultpass</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
