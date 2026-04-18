export interface Player {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    highestScore: number;
    average: number;
  };
}

export interface BatsmanScore {
  playerId: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  outDescription?: string;
}

export interface BowlerScore {
  playerId: string;
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface Ball {
  id: string;
  over: number;
  ballNumber: number; // 1-6
  bowlerId: string;
  batsmanId: string;
  nonStrikerId: string;
  runs: number;
  isWicket: boolean;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'runout' | 'stumped';
  isExtra: boolean;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye';
  commentary: string;
  scoreAtBall: string;
}

export interface Inning {
  battingTeamId: string;
  bowlingTeamId: string;
  runs: number;
  wickets: number;
  overs: number;
  balls: number;
  target?: number;
}

export interface Match {
  id: string;
  teamA: {
    id: string;
    name: string;
    shortName: string;
    score?: string;
  };
  teamB: {
    id: string;
    name: string;
    shortName: string;
    score?: string;
  };
  status: 'Live' | 'Upcoming' | 'Finished';
  venue: string;
  toss: string;
  currentInning?: Inning;
  summary?: string;
}

export interface FielderPosition {
  name: string;
  angle: number; // 0-360
  distance: number; // 0-1 (0 center, 1 boundary)
}

export interface PointsTableEntry {
  teamName: string;
  played: number;
  won: number;
  lost: number;
  nrr: string;
  points: number;
  nextMatch: string;
}
