export interface LabTask {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  commandTrigger?: string;
  isCompleted?: boolean;
}

export interface LabScenario {
  id: string;
  title: string;
  category: 'Stealth Launch' | 'Memory Security' | 'P2P Sync' | 'Browser Extension';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpPoints: number;
  description: string;
  tasks: LabTask[];
}

