import React, { useState } from 'react';
import { useAuthStore } from '@/app/authStore';
import { login, register } from '@/services/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user_id, token } = await login(username, password);
      setAuth({ userId: user_id, token });
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-white">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-indigo-500/40 bg-slate-900/40 text-white placeholder:text-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-indigo-500/40 bg-slate-900/40 text-white placeholder:text-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-linear-to-r from-indigo-500 to-purple-500 text-white py-2 rounded flex items-center justify-center font-bold shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
        disabled={loading}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        Login
      </button>
      <div className="text-center text-sm mt-2 text-gray-300">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-indigo-400 underline hover:text-purple-400 transition-colors"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user_id } = await register(username, password);
      // Auto-login after registration
      const { token } = await login(username, password);
      setAuth({ userId: user_id, token });
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold text-white">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-indigo-500/40 bg-slate-900/40 text-white placeholder:text-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-indigo-500/40 bg-slate-900/40 text-white placeholder:text-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-linear-to-r from-indigo-500 to-purple-500 text-white py-2 rounded flex items-center justify-center font-bold shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
        disabled={loading}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        Register
      </button>
      <div className="text-center text-sm mt-2 text-gray-300">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-indigo-400 underline hover:text-purple-400 transition-colors"
        >
          Login
        </Link>
      </div>
    </form>
  );
};
