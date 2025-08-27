export enum QuestionType {
  Number = 'number',
  Radio = 'radio',
  Slider = 'slider',
}

export interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  milestone?: string;
}

export type Answers = {
  [key: string]: string | number;
  currency?: string;
  desiredFund?: string | number;
};

export interface Result {
  targetFund: number;
  monthlySavings: number;
  timeline: number;
  advice: string;
  currency: string;
}
