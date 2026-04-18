import { Match, Inning } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ScoreBoardProps {
  match: Match;
  inning: Inning;
  activeEvent?: string;
}

export default function ScoreBoard({ match, inning, activeEvent }: ScoreBoardProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center border-b border-border-dim relative overflow-hidden">
      {/* Event Overlay */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1.2, opacity: 1, y: 0 }}
            exit={{ scale: 2, opacity: 0, y: -50 }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
             <div className="bg-accent/90 backdrop-blur-md text-white px-12 py-6 rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.4)] border-4 border-white/20">
                <span className="text-6xl font-black uppercase tracking-tighter italic">
                    {activeEvent}
                </span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-3xl font-light text-slate-400 uppercase tracking-widest mb-1 font-sans">
        {match.teamA.name} <span className="text-accent font-bold">BATTING PHASE</span>
      </div>
      
      <div className="text-[140px] font-black leading-none text-slate-900 tracking-tighter font-sans flex items-baseline justify-center select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={inning.runs}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {inning.runs}
          </motion.span>
        </AnimatePresence>
        <span className="text-slate-200 mx-2 text-9xl font-light">/</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={inning.wickets}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl text-slate-400"
          >
            {inning.wickets}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="text-3xl font-mono text-slate-500 font-bold tracking-widest mt-0">
        OVER {inning.overs}.{inning.balls} <span className="text-slate-300">/ 20.0</span>
      </div>

      <div className="mt-12 w-full max-w-3xl px-10">
        <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-red-200 shadow-sm">
          <div className="text-left">
            <p className="text-[11px] text-text-dim uppercase font-bold tracking-[0.2em] mb-1">Target Score</p>
            <p className="text-4xl font-mono font-black text-slate-900 italic">{inning.target || 'TBD'}</p>
          </div>
          <div className="h-16 w-px bg-red-200" />
          <div className="text-center">
            <p className="text-[11px] text-text-dim uppercase font-bold tracking-[0.2em] mb-1">Req. Rate</p>
            <p className="text-4xl font-mono font-black text-accent italic">
                {inning.target ? ((inning.target - inning.runs) / (20 - inning.overs - inning.balls/6) || 0).toFixed(1) : '—'}
            </p>
          </div>
          <div className="h-16 w-px bg-red-200" />
          <div className="text-right">
            <p className="text-[11px] text-text-dim uppercase font-bold tracking-[0.2em] mb-1">Status</p>
            <p className="text-4xl font-mono font-black text-red-600 italic">
                {inning.target ? `${inning.target - inning.runs} To Win` : 'Setting Total'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
