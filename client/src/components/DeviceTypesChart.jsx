import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getDeviceCategory } from '../utils/deviceCategories';

// Fixed order + colors so the legend always matches the mockup regardless of data
const CATEGORIES = [
  { name: 'Sensors', color: '#C2703D' },   // terracotta
  { name: 'Gateways', color: '#6B8F5A' },  // sage
  { name: 'Actuators', color: '#B0A08A' }, // warm taupe
];

function DeviceTypesChart({ devices }) {
  const data = useMemo(() => {
    const counts = { Sensors: 0, Gateways: 0, Actuators: 0 };
    devices.forEach((d) => {
      const category = getDeviceCategory(d.type);
      counts[category] = (counts[category] || 0) + 1;
    });
    return CATEGORIES.map((c) => ({ name: c.name, value: counts[c.name], color: c.color }));
  }, [devices]);

  const total = devices.length;

  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant p-5">
      <p className="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase mb-4">
        Device Types
      </p>

      <div className="relative h-45">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="65%"
              outerRadius="90%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-bold text-on-surface">{total}</p>
          <p className="font-mono text-[10px] tracking-wider text-on-surface-variant uppercase">
            Total
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {data.map((entry) => {
          const percent = total ? Math.round((entry.value / total) * 100) : 0;
          return (
            <li key={entry.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-on-surface-variant">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="text-on-surface font-medium">{percent}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DeviceTypesChart;