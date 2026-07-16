import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import RoleBadge from '../RoleBadge';
import { formatClockIST } from '../../utils/dateUtils';

function useIstClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return formatClockIST(time);
}

function PageHeader({ breadcrumb, title, trailing }) {
  const { user } = useAuth();
  const clock = useIstClock();

  return (
    <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-outline-variant">
      <div>
        <p className="font-mono text-xs tracking-wider text-on-surface-variant uppercase mb-1">
          {breadcrumb}
        </p>
        <div className="flex items-center gap-3">
          <h1 className="text-[32px] leading-10 font-serif font-semibold tracking-tight text-on-surface">
            {title}
          </h1>
          {trailing}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 pt-1">
        <span className="font-mono text-[11px] text-on-surface-variant/70 tabular-nums hidden sm:inline">
          {clock} IST
        </span>
        {user && <RoleBadge role={user.role} email={user.username} />}
      </div>
    </div>
  );
}

export default PageHeader;