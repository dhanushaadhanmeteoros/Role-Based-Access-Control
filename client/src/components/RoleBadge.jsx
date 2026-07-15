import { useState } from 'react';
import { ROLES } from '../utils/permissions';

function RoleBadge({ role, email }) {
  const [hovered, setHovered] = useState(false);
  const isAdmin = role === ROLES.ADMIN;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-sm border-l-2 bg-surface-container-high cursor-default ${isAdmin ? 'border-l-primary' : 'border-l-secondary'
          }`}
      >
        <span
          className={`font-mono text-[10px] font-semibold tracking-wider uppercase ${isAdmin ? 'text-primary' : 'text-secondary'
            }`}
        >
          {role}
        </span>
      </div>

      {hovered && (
        <div className="absolute right-0 top-full mt-1.5 whitespace-nowrap bg-surface-container-high border border-outline-variant rounded-sm px-3 py-2 shadow-lg z-50">
          <p className="text-sm text-on-surface">{email}</p>
        </div>
      )}
    </div>
  );
}

export default RoleBadge;