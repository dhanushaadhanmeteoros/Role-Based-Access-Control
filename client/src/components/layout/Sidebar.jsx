import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    enabled: true,
    icon: (
      <>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </>
    ),
  },
  {
    label: 'Devices',
    path: '/devices',
    enabled: true,
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
      </>
    ),
  },
  {
    label: 'Alerts',
    path: '/alerts',
    enabled: true,
    icon: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
  },
  {
    label: 'Analytics',
    path: '#',
    enabled: false,
    icon: (
      <>
        <line x1="4" y1="20" x2="20" y2="20" />
        <rect x="6" y="13" width="3" height="7" />
        <rect x="14.5" y="9" width="3" height="11" />
        <rect x="10.25" y="4" width="3" height="16" />
      </>
    ),
  },
  {
    label: 'Users',
    path: '#',
    enabled: false,
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </>
    ),
  },
];

function NavIcon({ children }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

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
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-sm border border-primary text-primary font-mono text-[11px] font-semibold shrink-0">
              N
            </span>
            <h1 className="font-serif text-lg font-semibold text-on-surface leading-none">Nexus IoT</h1>
          </div>
          <p className="font-mono text-[10px] tracking-wider text-on-surface-variant mt-2">
            ENTERPRISE CONTROL
          </p>
{/*           <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            <p className="font-mono text-[10px] tracking-wider text-on-surface-variant/70">
              ALL SYSTEMS NOMINAL
            </p>
          </div> */}
        </div>

        <nav className="flex-1 px-3 py-4">
          <p className="px-3 mb-2 font-mono text-[10px] tracking-wider text-on-surface-variant/60 uppercase">
            Modules
          </p>
          <div className="space-y-0.5">
            {navItems.map((item) =>
              item.enabled ? (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 pl-2.5 pr-3 py-2 border-l-2 text-sm font-medium transition-colors ${isActive
                      ? 'border-primary bg-surface-container-high text-on-surface'
                      : 'border-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`
                  }
                >
                  <NavIcon>{item.icon}</NavIcon>
                  {item.label}
                </NavLink>
              ) : (
                <span
                  key={item.label}
                  className="flex items-center gap-2.5 pl-2.5 pr-3 py-2 border-l-2 border-transparent text-sm font-medium text-on-surface-variant/40 cursor-not-allowed"
                >
                  <NavIcon>{item.icon}</NavIcon>
                  {item.label}
                </span>
              )
            )}
          </div>
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