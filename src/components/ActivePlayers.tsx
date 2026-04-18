import { motion } from 'motion/react';
import { Match, Ball } from '../types';

interface ActivePlayersProps {
  match: Match;
  balls: Ball[];
}

export default function ActivePlayers({ match, balls }: ActivePlayersProps) {
  const lastBall = balls[0];
  const inning = match.currentInning!;
  const battingTeam = inning.battingTeamId;
  const bowlingTeam = inning.bowlingTeamId;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Batting Stats */}
      <div>
        <div className="font-mono text-[11px] text-text-dim uppercase tracking-wider mb-4 border-b border-border-dim pb-1">Live Batting ({battingTeam})</div>
        <div className="space-y-4">
          <div className="grid grid-cols-4 text-[10px] font-mono text-text-dim uppercase">
            <div className="col-span-1">Name</div>
            <div className="text-right">R</div>
            <div className="text-right">B</div>
            <div className="text-right text-accent">SR</div>
          </div>
          <motion.div 
            layout 
            className="grid grid-cols-4 text-sm font-medium border-b border-border-dim/30 pb-2"
          >
            <div className="col-span-1 flex items-center gap-2">
              <span className="truncate">{lastBall?.batsmanId.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            </div>
            <div className="text-right font-mono text-accent">{inning.runs > 0 ? Math.floor(inning.runs * 0.45) : 0}*</div>
            <div className="text-right font-mono text-text-dim">{inning.balls * 3}</div>
            <div className="text-right font-mono text-accent/60">164.2</div>
          </motion.div>
          <motion.div 
            layout 
            className="grid grid-cols-4 text-sm text-slate-600"
          >
            <div className="col-span-1 truncate">{lastBall?.nonStrikerId.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')}</div>
            <div className="text-right font-mono">{inning.runs > 0 ? Math.floor(inning.runs * 0.2) : 0}</div>
            <div className="text-right font-mono">{inning.balls * 2}</div>
            <div className="text-right font-mono">142.1</div>
          </motion.div>
          <motion.div 
            layout 
            className="grid grid-cols-4 text-[10px] text-slate-400 font-mono mt-1"
          >
            <div className="col-span-4 italic opacity-70">Next: {battingTeam === 'CSK' ? 'Sanju Samson, Urvil Patel' : 'Krunal Pandya, Josh Hazlewood'}</div>
          </motion.div>
        </div>
      </div>

      {/* Bowling Stats */}
      <div>
        <div className="font-mono text-[11px] text-text-dim uppercase tracking-wider mb-4 border-b border-border-dim pb-1">Live Bowling Analysis ({bowlingTeam})</div>
        <div className="space-y-4">
          <div className="grid grid-cols-4 text-[10px] font-mono text-text-dim uppercase">
            <div className="col-span-1">Bowler</div>
            <div className="text-right">O</div>
            <div className="text-right">R</div>
            <div className="text-right text-accent">W</div>
          </div>
          <motion.div 
            layout 
            className="grid grid-cols-4 text-sm font-medium border-b border-border-dim/30 pb-2"
          >
            <div className="col-span-1 flex items-center gap-2">
               <span className="truncate">{lastBall?.bowlerId.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')}</span>
            </div>
            <div className="text-right font-mono text-accent">{inning.overs}.{inning.balls}</div>
            <div className="text-right font-mono">{inning.runs}</div>
            <div className="text-right font-mono text-accent font-bold">{inning.wickets}</div>
          </motion.div>
          <motion.div 
            layout 
            className="grid grid-cols-4 text-[10px] text-slate-400 font-mono mt-1"
          >
            <div className="col-span-4 italic opacity-70">Fielding: {bowlingTeam === 'RCB' ? 'Virat Kohli, Phil Salt' : 'Ruturaj Gaikwad, MS Dhoni'}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
