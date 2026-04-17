"use client";

export default function ReactLogo3D({ size = 300 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        viewBox="-200 -200 400 400"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
       
      >
        <defs>
          <radialGradient id="atomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="10%" stopColor="#61DAFB" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#61DAFB" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softglow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>{`
            @keyframes spin1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes spin2 { from { transform: rotate(60deg); } to { transform: rotate(420deg); } }
            @keyframes spin3 { from { transform: rotate(-60deg); } to { transform: rotate(300deg); } }
            @keyframes spin4 { from { transform: rotate(0deg); } to { transform: rotate(120deg); } }
            @keyframes pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }

            .orbit1 { transform-origin: 0 0; animation: spin1 3s linear infinite; }
            .orbit2 { transform-origin: 0 0; animation: spin2 3s linear infinite; }
            .orbit3 { transform-origin: 0 0; animation: spin3 3s linear infinite; }
            .nucleus { animation: pulse 2s ease-in-out infinite; }

            .circle { transform-origin: 0 0; animation: spin4 10s linear infinite; }
          `}</style>
        </defs>

        {/* Ambient glow */}
        <ellipse cx="0" cy="0" rx="120" ry="120" fill="url(#atomGlow)" />

        {/* Orbit 1 - horizontal */}
        <g className="orbit1">
          <ellipse
            cx="0" cy="0"
            rx="140" ry="45"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="1.5"
            strokeOpacity="1"
          />
          {/* Electron 1 */}
          <circle cx="140" cy="0" r="7" fill="#61DAFB" filter="url(#glow)" />
        </g>

        {/* Orbit 2 - 60deg tilt */}
        <g className="orbit2">
          <ellipse
            cx="0" cy="0"
            rx="140" ry="45"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="1.5"
            strokeOpacity="1"
          />
          {/* Electron 2 */}
          <circle cx="140" cy="0" r="7" fill="#61DAFB" filter="url(#glow)" />
        </g>

        {/* Orbit 3 - -60deg tilt */}
        <g className="orbit3">
          <ellipse
            cx="0" cy="0"
            rx="140" ry="45"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="1.5"
            strokeOpacity="1"
          />
          {/* Electron 3 */}
          <circle cx="140" cy="0" r="7" fill="#61DAFB" filter="url(#glow)" />
        </g>

        {/* Nucleus */}
        <g className="nucleus">
          <circle cx="0" cy="0" r="22" fill="#61DAFB" filter="url(#softglow)" />
          <circle cx="0" cy="0" r="14" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
