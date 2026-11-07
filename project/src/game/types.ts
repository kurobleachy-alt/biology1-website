export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

export const DIFFICULTY_META: Record<Difficulty, { label: string; blurb: string }> = {
  easy: { label: 'Easy', blurb: 'A gentle warm-up with fewer choices.' },
  medium: { label: 'Medium', blurb: 'More options and deeper ideas to weigh.' },
  hard: { label: 'Hard', blurb: 'Close answers that reward careful thinking.' },
};

export interface Question {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
}

export type ActivityKind = 'choice' | 'sort';

export interface ActivityDefinition {
  id: string;
  week: number;
  title: string;
  summary: string;
  kind: ActivityKind;
  levels: Record<Difficulty, Question[]>;
}
