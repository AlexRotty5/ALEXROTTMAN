import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DraggableStickerProps {
  skill: string;
  index: number;
  onDragEnd?: (x: number, y: number, skill: string) => void;
}

// Define different colors for rounded rectangle stickers
const stickerConfigs = [
  { bgColor: '#fef3c7', textColor: '#92400e' }, // Light yellow background, dark brown text
  { bgColor: '#fecaca', textColor: '#991b1b' }, // Light red background, dark red text
  { bgColor: '#dbeafe', textColor: '#1e40af' }, // Light blue background, dark blue text
  { bgColor: '#d1fae5', textColor: '#065f46' }, // Light green background, dark green text
  { bgColor: '#fce7f3', textColor: '#be185d' }, // Light pink background, dark pink text
  { bgColor: '#e9d5ff', textColor: '#6b21a8' }, // Light purple background, dark purple text
  { bgColor: '#fed7aa', textColor: '#c2410c' }, // Light orange background, dark orange text
  { bgColor: '#cffafe', textColor: '#0e7490' }, // Light cyan background, dark cyan text
];

export const DraggableSticker: React.FC<DraggableStickerProps> = ({ 
  skill, 
  index, 
  onDragEnd 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(Math.random() * 20 - 10);
  const config = stickerConfigs[index % stickerConfigs.length];

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    if (onDragEnd) {
      onDragEnd(info.point.x, info.point.y, skill);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{ 
        opacity: 0, 
        scale: 0.3,
        x: 0,
        y: 0
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: 0,
        y: 0,
        zIndex: isDragging ? 1000 : index + 1
      }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1, // Rapid succession - 0.1s between each
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed cursor-grab active:cursor-grabbing select-none"
      style={{
        fontFamily: "'Inter', sans-serif",
        filter: isDragging ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
        left: `calc(40% + ${index * 40}px)`, // Final position
        top: `calc(68% + ${index * 2}px)`, // Moved up a tiny bit more from 70% to 68%
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        rotate: rotation,
      }}
    >
      <div
        className="relative flex items-center justify-center rounded-lg px-3 py-2"
        style={{
          background: config.bgColor,
          color: config.textColor,
          border: `1px solid ${config.textColor}20`,
          width: 'auto',
          minWidth: '80px',
          height: '40px',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        <span 
          className="relative z-10 text-xs font-medium uppercase tracking-wide text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            lineHeight: '1.2',
            wordBreak: 'break-word',
            whiteSpace: 'nowrap'
          }}
        >
          {skill}
        </span>
      </div>
    </motion.div>
  );
};
