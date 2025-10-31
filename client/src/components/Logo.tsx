export default function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Top left black square */}
      <rect x="60" y="40" width="45" height="45" fill="#000000" />
      
      {/* Top middle black square */}
      <rect x="110" y="40" width="45" height="45" fill="#000000" />
      
      {/* Top right black rounded section */}
      <path
        d="M 160 40 L 190 40 Q 205 40 205 55 L 205 100 Q 205 115 190 115 L 160 115 Q 150 115 150 105 L 150 50 Q 150 40 160 40 Z"
        fill="#000000"
      />
      
      {/* Left green rectangle */}
      <rect x="60" y="90" width="45" height="60" fill="#1B7D4F" />
      
      {/* Middle black vertical bar */}
      <rect x="110" y="90" width="45" height="100" fill="#000000" rx="10" />
      
      {/* Bottom green curved section */}
      <path
        d="M 60 150 L 110 150 Q 155 150 155 195 Q 155 210 135 210 L 60 210 Q 60 210 60 190 Z"
        fill="#1B7D4F"
      />
      
      {/* White curve detail between black and green */}
      <path
        d="M 150 105 Q 155 105 155 115 L 155 155 Q 155 170 140 170 L 150 170 Q 165 170 165 155 L 165 115 Q 165 105 150 105 Z"
        fill="white"
      />
    </svg>
  );
}
