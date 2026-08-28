const cities = [
  { name: 'دمشق', x: '45', y: '35', pop: 38 },
  { name: 'حلب', x: '42', y: '18', pop: 25 },
  { name: 'حمص', x: '48', y: '42', pop: 14 },
  { name: 'اللاذقية', x: '35', y: '28', pop: 12 },
  { name: 'طرطوس', x: '32', y: '38', pop: 8 },
];

export default function SyriaMap() {
  return (
    <div className="w-full h-48 sm:h-56 bg-[#0d1520] rounded-2xl border border-[#1f2d3d] p-4 flex items-center justify-center relative overflow-hidden group">
      <svg viewBox="0 0 100 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Syria background shape (simplified) */}
        <path
          d="M 30 20 L 55 15 L 60 20 L 65 25 L 62 35 L 70 40 L 68 50 L 75 55 L 72 65 L 65 70 L 55 75 L 40 80 L 30 75 L 25 65 L 20 55 L 22 40 L 20 30 L 25 20 Z"
          fill="none"
          stroke="#00C2CB"
          strokeWidth="0.8"
          opacity="0.4"
        />

        {/* Governorate borders (simplified) */}
        <g opacity="0.2" stroke="#00C2CB" strokeWidth="0.6">
          <path d="M 45 20 L 45 50" /> {/* Damascus area */}
          <path d="M 40 25 L 55 25" />
          <path d="M 50 30 L 65 45" /> {/* Homs area */}
          <path d="M 30 25 L 45 35" /> {/* Coastal area */}
        </g>

        {/* City dots with glow */}
        {cities.map((city, i) => (
          <g key={city.name} className="group/city cursor-pointer">
            {/* Glow circle */}
            <circle
              cx={city.x}
              cy={city.y}
              r={String(city.pop / 8)}
              fill="#00C2CB"
              opacity="0.15"
              className="transition-all duration-300 group-hover/city:opacity-30"
            />
            {/* Main dot */}
            <circle
              cx={city.x}
              cy={city.y}
              r="1.5"
              fill="#00C2CB"
              className="transition-all duration-300 group-hover/city:r-2 group-hover/city:fill-white"
            />
            {/* Label on hover */}
            <text
              x={city.x}
              y={String(Number(city.y) - 3)}
              fontSize="2"
              fill="#00C2CB"
              textAnchor="middle"
              opacity="0"
              className="transition-opacity duration-300 group-hover/city:opacity-100"
              fontWeight="600"
            >
              {city.name}
            </text>
            <text
              x={city.x}
              y={String(Number(city.y) + 3)}
              fontSize="1.5"
              fill="#94a3b8"
              textAnchor="middle"
              opacity="0"
              className="transition-opacity duration-300 group-hover/city:opacity-100"
            >
              {city.pop}%
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 text-[10px] text-slate-600 space-y-1 pointer-events-none">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#00C2CB]" />
          حجم الدائرة = المبيعات
        </div>
      </div>
    </div>
  );
}
