import { useState, useMemo, useRef } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

const RANGES = ['1H', '24H', '7D'];

// MOCK DATA — there's no real telemetry/throughput API in this project yet.
// Generated once per range and cached (see cacheRef below) so switching
// between ranges doesn't re-randomize values you've already seen.
function generateMockData(range) {
    const config = {
        '1H': { points: 12, labelFn: (i) => `${i * 5}m` },
        '24H': { points: 9, labelFn: (i) => `${String(i * 3).padStart(2, '0')}:00` },
        '7D': { points: 7, labelFn: (i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] },
    }[range];

    return Array.from({ length: config.points }, (_, i) => ({
        label: config.labelFn(i),
        value: Math.round(30 + Math.random() * 70),
    }));
}

function ThroughputChart() {
    const [range, setRange] = useState('24H');
    const cacheRef = useRef({});

    const data = useMemo(() => {
        if (!cacheRef.current[range]) {
            cacheRef.current[range] = generateMockData(range);
        }
        return cacheRef.current[range];
    }, [range]);

    // Highlight the tallest bar as the "peak" — matches the single green bar in the mockup
    const peakIndex = useMemo(
        () => data.reduce((maxIdx, d, i) => (d.value > data[maxIdx].value ? i : maxIdx), 0),
        [data]
    );

    return (
        <div className="bg-surface-container rounded-xl border border-outline-variant p-5">
            <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">
                    Network Throughput
                </p>
                <div className="flex gap-1">
                    {RANGES.map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${range === r
                                ? 'bg-surface-container-high text-on-surface'
                                : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-55">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap="30%">
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B6259', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                        />
                        <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={entry.label} fill={index === peakIndex ? '#6B8F5A' : '#E2D9C9'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ThroughputChart;