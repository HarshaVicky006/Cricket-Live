import { Player } from '../types';

interface PlayerStatsProps {
  players: Player[];
}

export default function PlayerStats({ players }: PlayerStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {players.map(player => (
        <div key={player.id} className="bg-white p-6 rounded-[30px] border border-border-dim shadow-sm hover:shadow-xl hover:border-accent/40 transition-all group">
          <div className="flex flex-col mb-6">
            <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-mono text-accent uppercase tracking-[0.3em] font-black">{player.role}</span>
                <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-accent transition-colors" />
            </div>
            <h4 className="text-slate-900 text-xl font-black truncate uppercase tracking-tighter italic">{player.name}</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
            <div className="flex flex-col">
              <span className="text-[9px] text-text-dim uppercase font-bold tracking-widest font-mono mb-1">Career Runs</span>
              <span className="text-2xl font-mono font-black text-slate-900 tracking-tighter">{player.stats.runs}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-text-dim uppercase font-bold tracking-widest font-mono mb-1">Wickets</span>
              <span className="text-2xl font-mono font-black text-accent tracking-tighter">{player.stats.wickets}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-50 pt-4">
             <div className="flex flex-col">
                <span className="uppercase text-[8px] opacity-50">Average</span>
                <span className="font-bold text-slate-600 italic">{player.stats.average}</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="uppercase text-[8px] opacity-50">HS</span>
                <span className="font-bold text-slate-600 italic">{player.stats.highestScore}</span>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}
