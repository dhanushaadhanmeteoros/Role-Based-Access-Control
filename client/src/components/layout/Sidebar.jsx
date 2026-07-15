import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', enabled: true },
  { label: 'Devices', path: '/devices', enabled: true },
  { label: 'Alerts', path: '/alerts', enabled: true },
  { label: 'Analytics', path: '#', enabled: false },
  { label: 'Users', path: '#', enabled: false },
];

function Sidebar({ onAddDevice, role, mobileOpen, onMobileClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const canAdd = hasPermission(role, 'canAdd');

  return (
    <>
      {/* Backdrop — only shown on mobile when drawer is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`w-60 shrink-0 bg-surface-container-low border-r border-outline-variant flex flex-col h-screen fixed md:sticky top-0 z-50 transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="px-6 py-5 border-b border-outline-variant">
          <h1 className="font-serif text-lg font-semibold text-on-surface">Nexus IoT</h1>
          <p className="font-mono text-[10px] tracking-wider text-on-surface-variant mt-0.5">
            ENTERPRISE CONTROL
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) =>
            item.enabled ? (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? 'bg-surface-container-high text-on-surface'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <span
                key={item.label}
                className="block px-3 py-2 rounded-md text-sm font-medium text-on-surface-variant/40 cursor-not-allowed"
              >
                {item.label}
              </span>
            )
          )}
        </nav>

        <div className="px-3 pb-4 space-y-2">
          {onAddDevice && canAdd && (
            <button
              onClick={onAddDevice}
              className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-medium text-sm py-2.5 rounded-md transition-colors"
            >
              <span className="text-base leading-none">+</span> Add Device
            </button>
          )}

          <button
            onClick={handleLogout}
            className="group relative flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium bg-transparent border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors"
          >
            <span>Logout</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-3 opacity-0 -translate-x-1 transition-all duration-300 motion-reduce:transition-none group-hover:opacity-100 group-hover:translate-x-0 group-focus:opacity-100 group-focus:translate-x-0"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;