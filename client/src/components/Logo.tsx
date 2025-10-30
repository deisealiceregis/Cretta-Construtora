export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Black top left square */}
      <rect x="35" y="20" width="20" height="20" fill="#1a1a1a" />
      
      {/* Black top middle square */}
      <rect x="55" y="20" width="20" height="20" fill="#1a1a1a" />
      
      {/* Black top right rounded */}
      <path d="M 75 20 L 85 20 Q 90 20 90 25 L 90 40 Q 90 45 85 45 L 75 45 Q 75 20 75 20" fill="#1a1a1a" />
      
      {/* Green left rectangle */}
      <rect x="35" y="40" width="20" height="35" fill="#2D5F4F" />
      
      {/* Black middle rectangle */}
      <path d="M 55 40 L 75 40 Q 80 40 80 45 L 80 65 Q 80 70 75 70 L 55 70 L 55 40" fill="#1a1a1a" />
      
      {/* Green bottom curve */}
      <path d="M 35 75 Q 35 85 45 85 L 75 85 Q 80 85 80 80 L 80 70 L 35 70 Q 35 70 35 75" fill="#2D5F4F" />
    </svg>
  );
}
