export default function MatchHistory() {
  const history = [
    { teams: 'IND vs PAK', result: 'IND WON', date: '21 Mar' },
    { teams: 'AUS vs RSA', result: 'AUS WON', date: '19 Mar' },
    { teams: 'ENG vs IND', result: 'IND WON', date: '15 Mar' },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {history.map((item, i) => (
        <div key={i} className="flex justify-between items-center text-[12px] border-b border-border-dim/20 pb-1">
          <div className="flex flex-col">
            <span className="text-white font-medium">{item.teams}</span>
            <span className="text-[9px] text-text-dim/60 font-mono tracking-tighter uppercase">{item.date}</span>
          </div>
          <span className="text-accent font-mono font-bold text-[10px]">{item.result}</span>
        </div>
      ))}
    </div>
  );
}
