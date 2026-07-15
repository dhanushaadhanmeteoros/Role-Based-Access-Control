import { useState } from 'react';
import Sidebar from './Sidebar';

function AppShell({ children, onAddDevice, role }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface text-on-surface font-sans">
      <Sidebar
        onAddDevice={onAddDevice}
        role={role}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 md:ml-0">
        {/* Mobile-only topbar — matches mobile view.png's hamburger + logo + quick-add pattern */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-outline-variant sticky top-0 bg-surface z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-on-surface p-1"
            aria-label="Open menu"
          >
            ☰
          </button>
          <h1 className="font-sans font-semibold text-primary">Nexus IoT</h1>
          {onAddDevice ? (
            <button onClick={onAddDevice} className="text-on-surface p-1" aria-label="Add device">
              +
            </button>
          ) : (
            <span className="w-6" />
          )}
        </div>

        <main className="flex-1 px-4 py-6 md:px-10 md:py-8 max-w-[1600px]">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;