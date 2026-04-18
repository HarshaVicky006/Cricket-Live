import { Ball, Match, Player, FielderPosition, PointsTableEntry } from '../types';

const TEAMS = [
  { id: 'RCB', name: 'Royal Challengers Bengaluru', shortName: 'RCB' },
  { id: 'CSK', name: 'Chennai Super Kings', shortName: 'CSK' },
];

const PLAYERS: Player[] = [
  // RCB Players
  { id: 'v-kohli', name: 'Virat Kohli', role: 'Batsman', stats: { matches: 250, runs: 8000, wickets: 4, highestScore: 113, average: 38.6 } },
  { id: 'p-salt', name: 'Phil Salt', role: 'Batsman', stats: { matches: 45, runs: 1200, wickets: 0, highestScore: 103, average: 32.2 } },
  { id: 'j-hazlewood', name: 'Josh Hazlewood', role: 'Bowler', stats: { matches: 80, runs: 100, wickets: 120, highestScore: 20, average: 8.5 } },
  { id: 'k-pandya', name: 'Krunal Pandya', role: 'All-rounder', stats: { matches: 120, runs: 1800, wickets: 90, highestScore: 55, average: 22.8 } },
  // CSK Players
  { id: 'r-gaikwad', name: 'Ruturaj Gaikwad', role: 'Batsman', stats: { matches: 65, runs: 2200, wickets: 0, highestScore: 101, average: 40.5 } },
  { id: 'ms-dhoni', name: 'MS Dhoni', role: 'Wicketkeeper', stats: { matches: 260, runs: 5200, wickets: 0, highestScore: 84, average: 39.2 } },
  { id: 's-samson', name: 'Sanju Samson', role: 'Batsman', stats: { matches: 160, runs: 4000, wickets: 0, highestScore: 119, average: 30.8 } },
  { id: 'u-patel', name: 'Urvil Patel', role: 'Batsman', stats: { matches: 10, runs: 150, wickets: 0, highestScore: 45, average: 18.2 } },
];

const IPL_POINTS_TABLE: PointsTableEntry[] = [
  { teamName: 'RCB', played: 14, won: 10, lost: 4, nrr: '+0.950', points: 20, nextMatch: 'COMPLETED' },
  { teamName: 'CSK', played: 14, won: 9, lost: 5, nrr: '+0.750', points: 18, nextMatch: 'COMPLETED' },
  { teamName: 'RR', played: 14, won: 9, lost: 5, nrr: '+0.550', points: 18, nextMatch: 'COMPLETED' },
  { teamName: 'KKR', played: 14, won: 8, lost: 6, nrr: '+0.450', points: 16, nextMatch: 'COMPLETED' },
];

const FIELDER_POSITIONS: FielderPosition[] = [
  { name: 'Slip', angle: 10, distance: 0.2 },
  { name: 'Point', angle: 90, distance: 0.8 },
  { name: 'Cover', angle: 130, distance: 0.7 },
  { name: 'Mid-off', angle: 170, distance: 0.6 },
  { name: 'Mid-on', angle: 190, distance: 0.6 },
  { name: 'Mid-wicket', angle: 230, distance: 0.7 },
  { name: 'Square Leg', angle: 270, distance: 0.8 },
  { name: 'Fine Leg', angle: 330, distance: 0.9 },
  { name: 'Third Man', angle: 60, distance: 0.85 },
];

export class MatchSimulator {
  private match: Match;
  private balls: Ball[] = [];
  private currentInningNum = 1;
  private currentOver = 0;
  private currentBallNum = 0;
  private runs = 0;
  private wickets = 0;
  private target = 0;
  private firstInningScore = 0;
  private freeHit = false;
  private onUpdate: (match: Match, balls: Ball[], event?: string) => void;

  private nextSimulationTime = 2000;
  private isPaused = false;

  constructor(onUpdate: (match: Match, balls: Ball[], event?: string) => void) {
    this.onUpdate = onUpdate;
    this.match = {
      id: 'ipl-2026-finals',
      teamA: TEAMS[1], // Inning 1 batting: CSK
      teamB: TEAMS[0], // Inning 1 bowling: RCB
      status: 'Live',
      venue: 'Narendra Modi Stadium, Ahmedabad',
      toss: 'CSK won the toss and elected to bat',
      currentInning: {
        battingTeamId: 'CSK',
        bowlingTeamId: 'RCB',
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        target: 0
      }
    };
  }

  start() {
    this.setNextSimulation();
  }

  private setNextSimulation() {
    setTimeout(() => {
        this.simulateBall();
        if (this.match.status !== 'Finished') {
            this.setNextSimulation();
        }
    }, this.nextSimulationTime);
  }

  private simulateBall() {
    if (this.match.status === 'Finished') return;
    this.nextSimulationTime = 2000; // Default

    let event: string | undefined = undefined;
    
    // Mixed outcomes: 0, 1, 2, 3, 4, 6, W, Wd, Nb
    const outcomes = [0, 0, 1, 1, 1, 1, 1, 2, 2, 3, 4, 6, 'W', 'Wd', 'Nb'];
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    
    let isWicket = false;
    let ballRuns = 0;
    let commentary = '';

    // Check for inning completion
    if (this.currentOver >= 20 || this.wickets >= 10 || (this.currentInningNum === 2 && this.target > 0 && this.runs >= this.target)) {
        if (this.currentInningNum === 1) {
            this.firstInningScore = this.runs;
            this.target = this.runs + 1;
            this.currentInningNum = 2;
            this.currentOver = 0;
            this.currentBallNum = 0;
            this.runs = 0;
            this.wickets = 0;
            this.match.teamA = TEAMS[0]; // RCB bat
            this.match.teamB = TEAMS[1]; // CSK bowl
            this.match.currentInning = {
                battingTeamId: 'RCB',
                bowlingTeamId: 'CSK',
                runs: 0,
                wickets: 0,
                overs: 0,
                balls: 0,
                target: this.target
            };
            this.balls = [];
            this.onUpdate(this.match, this.balls, 'CHANGE_INNING');
            return;
        } else {
            // RCB Wins (Target chased)
            this.match.status = 'Finished';
            this.onUpdate(this.match, this.balls, 'FULL_TIME');
            return;
        }
    }

    this.currentBallNum++;
    if (this.currentBallNum > 6) {
      this.currentBallNum = 1;
      this.currentOver++;
    }

    if (randomOutcome === 'W') {
      if (this.freeHit) {
        ballRuns = Math.floor(Math.random() * 2) + 1;
        this.runs += ballRuns;
        commentary = `Direct hit but free hit! They scramble for ${ballRuns}.`;
        this.freeHit = false;
      } else {
        // Limit wickets in 2nd inning to ensure RCB wins decently
        if (this.currentInningNum === 2 && this.wickets > 5 && Math.random() > 0.3) {
            ballRuns = 1;
            this.runs += ballRuns;
            commentary = 'Missed the edge, taken for a single.';
        } else {
            isWicket = true;
            this.wickets++;
            commentary = `OUT! ${this.match.teamA.shortName} losing control here!`;
        }
      }
    } else if (randomOutcome === 'Wd') {
      ballRuns = 1;
      this.runs += ballRuns;
      this.currentBallNum--;
      commentary = 'Wide ball down leg.';
      event = 'wide';
    } else if (randomOutcome === 'Nb') {
      ballRuns = 1;
      this.runs += ballRuns;
      this.currentBallNum--;
      commentary = 'No ball! Free Hit signal.';
      this.freeHit = true;
      event = 'no ball';
    } else {
      ballRuns = randomOutcome as number;
      // In 2nd inning, if RCB is close, boost scoring to ensure win
      if (this.currentInningNum === 2 && (this.target - this.runs) < 20 && this.currentOver > 15) {
          if (ballRuns < 2 && Math.random() > 0.5) ballRuns = 4;
      }

      this.runs += ballRuns;
      if (ballRuns === 4) event = '4';
      if (ballRuns === 6) event = '6';
      
      commentary = ballRuns === 6 ? 'SIX! Clean hit over the sight screen!' : 
                   ballRuns === 4 ? 'FOUR! Classy boundary through the covers.' : 
                   ballRuns === 0 ? 'Dot ball. Tense atmosphere.' : 
                   `Tucked away for ${ballRuns}.`;
      
      if (this.freeHit) {
        event = event ? `${event} + Free Hit` : 'Free Hit';
        this.freeHit = false;
      }
    }

    const newBall: Ball = {
      id: Math.random().toString(36).substr(2, 9),
      over: this.currentOver,
      ballNumber: this.currentBallNum,
      bowlerId: this.currentInningNum === 1 ? 'j-hazlewood' : 'jj-bumrah',
      batsmanId: this.currentInningNum === 1 ? 'r-gaikwad' : 'v-kohli',
      nonStrikerId: this.currentInningNum === 1 ? 'ms-dhoni' : 'p-salt',
      runs: ballRuns,
      isWicket,
      isExtra: typeof randomOutcome === 'string' && randomOutcome !== 'W',
      commentary,
      scoreAtBall: `${this.runs}/${this.wickets}`
    };

    this.balls = [newBall, ...this.balls].slice(0, 50);
    this.match.currentInning = {
      ...this.match.currentInning!,
      runs: this.runs,
      wickets: this.wickets,
      overs: this.currentOver,
      balls: this.currentBallNum,
      target: this.target
    };

    // Break logic
    if (isWicket) {
        this.nextSimulationTime = 6000;
        event = event ? `${event} + WICKET BREAK` : 'WICKET BREAK';
    } else if (this.currentBallNum === 6) {
        this.nextSimulationTime = 8000;
        event = event ? `${event} + OVER BREAK` : 'OVER BREAK';
    }

    this.onUpdate(this.match, this.balls, event);
  }

  getPlayers() { return PLAYERS; }
  getFielderPositions() { return FIELDER_POSITIONS; }
  getPointsTable() { return IPL_POINTS_TABLE; }
}
