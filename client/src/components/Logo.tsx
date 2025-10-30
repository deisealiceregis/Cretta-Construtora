export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background - optional light background */}
      {/* <rect width="100" height="100" fill="#F5F5F5" rx="8" /> */}
      
      {/* Top left dark gray square */}
      <rect x="30" y="25" width="18" height="18" fill="#3d3d3d" />
      
      {/* Top middle dark gray square */}
      <rect x="50" y="25" width="18" height="18" fill="#3d3d3d" />
      
      {/* Top right dark gray rounded square */}
      <rect x="70" y="25" width="18" height="18" fill="#3d3d3d" rx="4" />
      
      {/* Middle left green rectangle */}
      <rect x="30" y="45" width="18" height="20" fill="#2D7A5F" />
      
      {/* Middle center dark gray rectangle */}
      <rect x="50" y="45" width="18" height="20" fill="#3d3d3d" />
      
      {/* Right side - curved green shape */}
      <path 
        d="M 70 45 L 88 45 Q 92 45 92 49 L 92 61 Q 92 65 88 65 L 70 65 Q 70 65 70 65 C 70 60 70 50 70 45"
        fill="#2D7A5F"
      />
      
      {/* White accent curve on the right */}
      <path 
        d="M 70 55 Q 75 58 80 58"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Bottom left green curve */}
      <path 
        d="M 30 65 Q 30 75 40 75 L 70 75 Q 75 75 75 70 L 75 65 L 30 65"
        fill="#2D7A5F"
      />
    </svg>
  );
}
