import { FielderPosition } from '../types';
import { motion } from 'motion/react';

interface StadiumViewProps {
  fielders: FielderPosition[];
}

export default function StadiumView({ fielders }: StadiumViewProps) {
  return (
    <div className="relative aspect-square w-full bg-[radial-gradient(circle,#D9F99D_0%,#84CC16_100%)] rounded-full border-4 border-accent/20 overflow-hidden shadow-xl">
      {/* Pitch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-[70px] bg-[#E9D5FF] rounded-sm border border-slate-300 shadow-md flex flex-col justify-between p-1">
          <div className="w-full h-0.5 bg-slate-300" />
          <div className="w-full h-0.5 bg-slate-300" />
      </div>
      
      {/* 30 Yard Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full border-2 border-white/40 border-dashed" />

      {/* Fielders */}
      {fielders.map((fielder, i) => {
        const rad = (fielder.angle - 90) * (Math.PI / 180);
        const x = 50 + fielder.distance * 45 * Math.cos(rad);
        const y = 50 + fielder.distance * 45 * Math.sin(rad);

        return (
            <motion.div
              key={fielder.name}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                x: [0, Math.random() * 4 - 2, 0],
                y: [0, Math.random() * 4 - 2, 0]
              }}
              transition={{
                scale: { duration: 0.5 },
                x: { repeat: Infinity, duration: 2 + Math.random(), ease: "easeInOut" },
                y: { repeat: Infinity, duration: 2 + Math.random(), ease: "easeInOut" }
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="w-1.5 h-1.5 bg-[#FF4444] rounded-full ring-1 ring-white shadow-sm" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-[6px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {fielder.name}
              </div>
            </motion.div>
        );
      })}

      {/* Batsman & Bowler Indicators */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full ring-1 ring-white/50" />
      <div className="absolute top-[58%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full ring-1 ring-accent/50" />
    </div>
  );
}
