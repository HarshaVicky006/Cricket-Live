import { PointsTableEntry } from '../types';

interface PointsTableProps {
  data: PointsTableEntry[];
}

export default function PointsTable({ data }: PointsTableProps) {
  return (
    <div className="bg-surface rounded-xl border border-border-dim overflow-hidden shadow-sm">
      <div className="bg-slate-50 px-5 py-3 border-b border-border-dim flex justify-between items-center">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">IPL 2026 Points Table</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-slate-100/50 text-slate-400 uppercase tracking-tighter">
              <th className="px-4 py-2 border-b border-border-dim">Pos</th>
              <th className="px-4 py-2 border-b border-border-dim">Team</th>
              <th className="px-4 py-2 border-b border-border-dim text-right font-bold text-slate-900">P</th>
              <th className="px-4 py-2 border-b border-border-dim text-right">W</th>
              <th className="px-4 py-2 border-b border-border-dim text-right">L</th>
              <th className="px-4 py-2 border-b border-border-dim text-right">NRR</th>
              <th className="px-4 py-2 border-b border-border-dim text-right font-bold text-accent">Pts</th>
              <th className="px-4 py-2 border-b border-border-dim">Next Match</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => (
              <tr key={entry.teamName} className="hover:bg-slate-50 transition-colors border-b border-border-dim/50 last:border-0">
                <td className="px-4 py-2 font-bold text-slate-400">{idx + 1}</td>
                <td className="px-4 py-2 font-bold text-slate-900">{entry.teamName}</td>
                <td className="px-4 py-2 text-right">{entry.played}</td>
                <td className="px-4 py-2 text-right">{entry.won}</td>
                <td className="px-4 py-2 text-right">{entry.lost}</td>
                <td className="px-4 py-2 text-right text-slate-400">{entry.nrr}</td>
                <td className="px-4 py-2 text-right font-bold text-accent">{entry.points}</td>
                <td className="px-4 py-2 text-slate-500 italic">{entry.nextMatch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
