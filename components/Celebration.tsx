
import React from 'react';

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  const colors = ['#34d399', '#60a5fa', '#fbbf24', '#f87171'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      className="absolute w-2 h-4 animate-confetti-fall"
      style={{ ...style, backgroundColor: color }}
    />
  );
};

const Celebration: React.FC = () => {
  const confettiCount = 50;
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-50">
      {Array.from({ length: confettiCount }).map((_, i) => (
        <ConfettiPiece
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default Celebration;
