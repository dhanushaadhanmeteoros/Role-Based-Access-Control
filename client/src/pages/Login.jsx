import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import networkVisualization from '../../asstes/network-visualization.png';

import { decodeToken } from '../utils/tokenUtils';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      const decoded = decodeToken(res.data.token);
      navigate(decoded?.role === 'Admin' ? '/dashboard' : '/devices');
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="h-screen overflow-hidden flex bg-surface font-sans">
      {/* Brand panel — desktop only. Image fills the panel edge-to-edge, centered,
          no gaps, no crop distortion. Text overlays the bottom on a fading scrim. */}
      <div className="hidden md:block relative w-1/2 lg:w-3/5 shrink-0 bg-surface-container-low overflow-hidden">
        <img
          src={networkVisualization}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface/90 via-surface/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 lg:p-12 max-w-md">
          <h2 className="font-serif text-2xl lg:text-4xl font-semibold text-primary mb-3">
            METEOROS IOT
          </h2>
          <p className="text-on-surface-variant text-sm lg:text-lg leading-relaxed">
            Enterprise-grade infrastructure management. Monitor, analyze, and control your
            mission-critical network with unparalleled precision.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center px-6 py-10 md:py-12 overflow-y-auto">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-serif font-semibold text-on-surface mb-1">Welcome back</h1>
          <p className="text-on-surface-variant text-sm mb-6">Sign in to manage your enterprise network.</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="block font-mono text-[11px] tracking-wider uppercase text-on-surface-variant mb-1">
                Email or Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container placeholder:text-on-surface-variant/50"
                placeholder="admin@nexus.iot"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-mono text-[11px] tracking-wider uppercase text-on-surface-variant mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container placeholder:text-on-surface-variant/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p role="alert" className="text-error text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-container hover:bg-primary-container/90 disabled:opacity-50 text-on-primary-container font-medium py-2.5 rounded-md transition-colors"
            >
              {submitting ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          {/* Demo Credentials */}

          {/*      <div className="mt-6 border border-outline-variant rounded-md p-4 text-xs">
            <p className="font-mono text-[10px] tracking-wider uppercase text-on-surface-variant mb-2">
              Demo Credentials
            </p>
            <p className="text-on-surface-variant">
              Admin: <span className="font-mono text-primary">admin@gmail.com / admin123</span>
            </p>
            <p className="text-on-surface-variant">
              Operator: <span className="font-mono text-primary">operator@gmail.com / operator123</span>
            </p>
          </div> */}

        </div>
      </div>
    </div>
  );
}

export default Login;