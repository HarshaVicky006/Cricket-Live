import { useState, useEffect, useRef } from 'react';
import { MatchSimulator } from './services/matchSimulator';
import { Match, Ball, Player, PointsTableEntry } from './types';
import ScoreBoard from './components/ScoreBoard';
import StadiumView from './components/StadiumView';
import Commentary from './components/Commentary';
import ActivePlayers from './components/ActivePlayers';
import PlayerStats from './components/PlayerStats';
import PointsTable from './components/PointsTable';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, Users, Activity, PlayCircle, Trophy, Sparkles } from 'lucide-react';

export default function App() {
  const [match, setMatch] = useState<Match | null>(null);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [pointsTable, setPointsTable] = useState<PointsTableEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'match' | 'table' | 'stats'>('match');
  const [activeEvent, setActiveEvent] = useState<string | undefined>(undefined);
  const simulatorRef = useRef<MatchSimulator | null>(null);

  useEffect(() => {
    simulatorRef.current = new MatchSimulator((m, b, event) => {
      setMatch({ ...m });
      setBalls([...b]);
      if (event) {
        setActiveEvent(event);
        if (event !== 'FULL_TIME' && event !== 'CHANGE_INNING') {
            setTimeout(() => setActiveEvent(undefined), 3000); 
        }
      }
    });
    setPlayers(simulatorRef.current.getPlayers());
    setPointsTable(simulatorRef.current.getPointsTable());
    simulatorRef.current.start();
  }, []);

  if (!match) return <div className="min-h-screen bg-white flex items-center justify-center text-slate-400 font-mono italic">ESTABLISHING IPL_DATA_FEED...</div>;

  const isFinished = match.status === 'Finished';
  const isSecondInning = match.currentInning?.target! > 0;
  const isBreak = activeEvent?.includes('BREAK');

  return (
    <div className="h-screen w-full bg-transparent text-slate-900 font-sans overflow-hidden flex flex-col border border-border-dim selection:bg-accent/20">
      
      {/* Break Indicator */}
      <AnimatePresence>
        {isBreak && (
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="fixed bottom-24 right-12 z-[150] bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-accent/20"
             >
                <div className="w-3 h-3 bg-accent rounded-full animate-ping" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono tracking-widest opacity-50">Match Status</span>
                    <span className="text-sm font-black uppercase tracking-tighter italic">{activeEvent}</span>
                </div>
             </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Inning Transition Overlay */}
      <AnimatePresence>
        {activeEvent === 'CHANGE_INNING' && (
            <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onAnimationComplete={() => setTimeout(() => setActiveEvent(undefined), 4000)}
                className="fixed inset-0 z-[150] bg-slate-900 flex flex-col items-center justify-center text-white p-10"
            >
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                    <Activity className="w-20 h-20 text-accent mb-8" />
                </motion.div>
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">CSK Inning Complete</h3>
                <p className="text-xl font-mono text-accent">Target for RCB: {match.currentInning?.target}</p>
                <div className="mt-12 text-[10px] font-mono opacity-50 uppercase tracking-[0.4em]">Switching Data Stream...</div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Victory Pop-up */}
      <AnimatePresence>
        {isFinished && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="fixed inset-0 z-[200] bg-red-600/20 backdrop-blur-2xl flex items-center justify-center p-8"
           >
              <motion.div 
                initial={{ scale: 0.8, y: 100, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="bg-white p-16 rounded-[60px] shadow-[0_40px_120px_rgba(220,38,38,0.4)] border-4 border-accent flex flex-col items-center text-center max-w-3xl w-full relative overflow-hidden"
              >
                {/* Background Confetti/Sparkles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [-100, 1000],
                                rotate: [0, 360],
                                x: [Math.random() * -50, Math.random() * 50]
                            }}
                            transition={{ 
                                duration: Math.random() * 5 + 3, 
                                repeat: Infinity, 
                                ease: "linear",
                                delay: Math.random() * 2
                            }}
                            className={`absolute w-3 h-3 ${['bg-red-500', 'bg-accent', 'bg-slate-900'][i % 3]} rounded-sm`}
                            style={{ left: `${Math.random() * 100}%`, top: `-5%` }}
                        />
                    ))}
                </div>

                <div className="p-10 bg-accent/10 rounded-full mb-10 relative">
                    <motion.div
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Trophy className="w-40 h-40 text-accent" strokeWidth={1} />
                    </motion.div>
                </div>

                <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-4 text-slate-900 leading-[0.85]">
                    EE SALA NU CUP NAMDE
                </h2>
                <div className="h-2.5 w-60 bg-red-600 mb-8 rounded-full shadow-lg shadow-red-600/30" />
                <p className="text-slate-400 font-mono text-xl uppercase tracking-widest leading-relaxed">
                    Royal Challengers Bengaluru <br/>
                    <span className="text-accent font-black text-4xl mt-2 block shadow-sm">ESTD. CHAMPIONS 2026</span>
                </p>
                
                <div className="mt-12 flex gap-4">
                    <div className="px-6 py-2 bg-slate-50 border border-border-dim rounded-full text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        IPL FINALS 2026
                    </div>
                </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Header - Fixed 80px */}
      <header className="h-[80px] bg-white/90 backdrop-blur-md flex items-center justify-between px-8 border-b-4 border-red-600 shrink-0 shadow-sm z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-red-600 text-sm uppercase">
            <div className={`w-2 h-2 ${isFinished ? 'bg-slate-400' : 'bg-red-600'} rounded-full shadow-[0_0_8px_rgba(220,38,38,0.4)] ${!isFinished && 'animate-pulse'}`} />
            {isFinished ? 'Match Complete' : 'Live : Grand Finals'}
          </div>
          <div className="h-4 w-px bg-border-dim mx-2" />
          <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
            RCB <span className="text-slate-300 font-light mx-1">V/S</span> CSK <span className="text-accent text-[10px] font-mono tracking-[0.3em] ml-4 bg-accent/5 px-2 py-1 border border-accent/10">FINALS_IPL_26</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-xl font-mono text-slate-600 flex items-center gap-4">
            <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-text-dim font-bold">Session Mode</span>
                <span className={`leading-none ${isFinished ? 'text-slate-400' : 'text-accent'} font-bold uppercase tracking-tighter`}>{isSecondInning ? 'RCB CHASE' : 'CSK SETTING TOTAL'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid - Flexible height */}
      <main className="flex-1 grid grid-cols-[350px_1fr_80px] gap-px bg-border-dim overflow-hidden">
        {/* Tactical & Scoreboard Left Rail */}
        <section className="bg-surface p-6 flex flex-col overflow-y-auto border-r border-border-dim scrollbar-hide">
          <div className="font-mono text-[10px] text-text-dim uppercase tracking-wider mb-6 font-bold pb-2 border-b border-border-dim">Tactical Analysis & Field</div>
          <div className="w-full aspect-square mb-10 bg-slate-50/50 rounded-3xl p-6 border border-border-dim shadow-inner relative">
            <StadiumView fielders={simulatorRef.current!.getFielderPositions()} />
          </div>
          
          <div className="border-t border-border-dim pt-8 relative z-10">
            <div className="font-mono text-[10px] text-text-dim uppercase tracking-wider mb-6 font-bold">Live Score Dashboard</div>
             <div className="transform scale-[0.65] origin-top-left -mr-[55%] mb-[-140px] shadow-2xl rounded-3xl overflow-hidden bg-white/40 backdrop-blur-sm p-4 border border-white/20">
                <ScoreBoard match={match} inning={match.currentInning!} activeEvent={activeEvent} />
             </div>
          </div>

          <div className="space-y-3 mt-auto border-t border-border-dim pt-6">
            <button 
                onClick={() => setActiveTab('match')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${activeTab === 'match' ? 'bg-accent text-white border-accent shadow-md shadow-accent/20' : 'bg-white text-slate-600 border-border-dim hover:bg-slate-50'}`}
            >
                <PlayCircle className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-left text-inherit">Live Match View</span>
            </button>
            <button 
                onClick={() => setActiveTab('table')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${activeTab === 'table' ? 'bg-accent text-white border-accent shadow-md shadow-accent/20' : 'bg-white text-slate-600 border-border-dim hover:bg-slate-50'}`}
            >
                <ClipboardList className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-left text-inherit">Points Standing</span>
            </button>
            <button 
                onClick={() => setActiveTab('stats')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${activeTab === 'stats' ? 'bg-accent text-white border-accent shadow-md shadow-accent/20' : 'bg-white text-slate-600 border-border-dim hover:bg-slate-50'}`}
            >
                <Users className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-left text-inherit">Player Statistics</span>
            </button>
          </div>
        </section>

        {/* Center Canvas */}
        <section className="bg-white flex flex-col overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'match' ? (
              <motion.div 
                key="match-view"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                <div className="p-8 space-y-8 h-full flex flex-col overflow-hidden">
                   <div className="bg-slate-50 rounded-[40px] p-8 border border-border-dim shadow-sm">
                        <div className="font-mono text-[11px] text-accent uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                            <Activity className="w-4 h-4" /> BATTING & BOWLING LIVE STATS
                        </div>
                        <ActivePlayers match={match} balls={balls} />
                   </div>
                   
                   <div className="flex-1 bg-white rounded-[40px] p-8 border border-border-dim shadow-sm flex flex-col overflow-hidden">
                      <div className="font-mono text-[11px] text-text-dim uppercase tracking-widest mb-6 font-bold flex items-center gap-2 border-b border-slate-100 pb-4">
                        <Activity className="w-4 h-4" /> Live Commentary Stream
                      </div>
                      <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
                        <Commentary balls={balls} />
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : activeTab === 'table' ? (
              <motion.div 
                key="table-view"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="p-8 h-full overflow-y-auto"
              >
                <PointsTable data={pointsTable} />
              </motion.div>
            ) : (
              <motion.div 
                key="stats-view"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 1.05 }}
                className="p-8"
              >
                <div className="font-mono text-[11px] text-text-dim uppercase tracking-wider mb-6 font-bold pb-2 border-b border-border-dim">League Legend Registry</div>
                <PlayerStats players={players} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Right Sidebar - High Density Data Rail */}
        <section className="bg-surface flex flex-col items-center py-8 gap-10 border-l border-border-dim shrink-0">
            <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg text-accent">
                <Activity className="w-5 h-5" />
            </div>
            <div className="h-full flex flex-col justify-center items-center gap-12 font-mono text-[10px] text-slate-400 [writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.4em] font-bold">
                <span>Data Feed: Active</span>
                <span>Latency: 12ms</span>
                <span>Session: IPL_2026_OFFICIAL</span>
            </div>
        </section>
      </main>

      {/* Footer - Professional Ledger */}
      <footer className="h-[80px] bg-white border-t border-border-dim flex items-center px-8 justify-between shrink-0">
         <div className="flex gap-12">
            <div>
                <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest font-mono">Series Status</p>
                <p className="text-xs font-bold text-accent uppercase">Live: Quarter Finals • Game 2</p>
            </div>
            <div>
                <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest font-mono">Venue Conditions</p>
                <p className="text-xs font-bold text-slate-600 uppercase">Clear Sky • 28°C • Humidity 65%</p>
            </div>
         </div>
         <div className="text-[10px] font-mono text-text-dim bg-slate-100 px-3 py-1 rounded border border-border-dim">
            HORIZON_SYSTEM_v4.2 // IPL_UPGRADE_ACTIVE
         </div>
      </footer>
    </div>
  );
}
