import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-surface font-sans">
      {/* Brand panel */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-linear-to-br from-surface-container-low via-surface to-surface-container-lowest">
        <div />
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-serif font-semibold text-primary">Nexus IoT</h2>
          <p className="text-on-surface-variant mt-2 max-w-sm">
            Enterprise-grade infrastructure management. Monitor, analyze, and control your
            mission-critical network with unparalleled precision.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 border-l border-outline-variant">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-serif font-semibold text-on-surface mb-1">Welcome back</h1>
          <p className="text-on-surface-variant text-sm mb-6">Sign in to manage your enterprise network.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] tracking-wider uppercase text-on-surface-variant mb-1">
                Email or Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container placeholder:text-on-surface-variant/50"
                placeholder="admin@nexus.iot"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] tracking-wider uppercase text-on-surface-variant mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container placeholder:text-on-surface-variant/50"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-container hover:bg-primary-container/90 disabled:opacity-50 text-on-primary-container font-medium py-2.5 rounded-md transition-colors"
            >
              {submitting ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="mt-6 border border-outline-variant rounded-md p-4 text-xs">
            <p className="font-mono text-[10px] tracking-wider uppercase text-on-surface-variant mb-2">
              Demo Credentials
            </p>
            <p className="text-on-surface-variant">
              Admin: <span className="font-mono text-primary">admin@gmail.com / admin123</span>
            </p>
            <p className="text-on-surface-variant">
              Operator: <span className="font-mono text-primary">operator@gmail.com / operator123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;