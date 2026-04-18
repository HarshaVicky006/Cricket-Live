import { Ball } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Circle } from 'lucide-react';

interface CommentaryProps {
  balls: Ball[];
}

export default function Commentary({ balls }: CommentaryProps) {
  return (
    <div className="flex flex-col h-full bg-surface overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence initial={false}>
          {balls.map((ball, idx) => (
            <motion.div
              key={ball.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 border-b border-border-dim hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono font-bold text-accent text-sm shrink-0 mt-0.5">
                  {ball.over}.{ball.ballNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-relaxed text-slate-700">
                    <span className="font-bold mr-2 uppercase text-[10px] text-accent font-mono">
                      {ball.isWicket ? 'WICKET!' : ''}
                    </span>
                    {ball.commentary}
                  </p>
                  <div className="mt-1 text-[10px] font-mono text-slate-400 uppercase tracking-[0.1em] font-bold">
                    Score at ball: {ball.scoreAtBall}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
