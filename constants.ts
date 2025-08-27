import type { Question } from './types';
import { QuestionType } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'income',
    text: 'What is your total monthly take-home pay?',
    subtext: 'This helps us understand your savings capacity.',
    type: QuestionType.Number,
    placeholder: 'e.g., 3000',
  },
  {
    id: 'expenses',
    text: 'What are your essential monthly expenses?',
    subtext: 'Include rent/mortgage, utilities, groceries, transportation, and minimum debt payments.',
    type: QuestionType.Number,
    placeholder: 'e.g., 2000',
    milestone: 'Great! Knowing your expenses is the first big step.',
  },
  {
    id: 'jobStability',
    text: 'How stable is your primary source of income?',
    subtext: 'This determines how many months of expenses you should save.',
    type: QuestionType.Radio,
    options: ['Very Stable', 'Stable', 'Unstable'],
    milestone: 'Understanding your risk profile is key.',
  },
  {
    id: 'dependents',
    text: 'How many people depend on your income?',
    subtext: 'This includes children, spouses, or other family members.',
    type: QuestionType.Number,
    placeholder: 'e.g., 0',
  },
  {
    id: 'currentSavings',
    text: 'How much do you currently have in emergency savings?',
    subtext: "It's okay if this is zero. We're here to make a plan!",
    type: QuestionType.Number,
    placeholder: 'e.g., 1000',
  },
  {
    id: 'desiredFund',
    text: 'What is your personal emergency fund goal?',
    subtext: "If you're not sure, you can leave this blank. We'll suggest a target based on your finances.",
    type: QuestionType.Number,
    placeholder: 'e.g., 10000',
  },
  {
    id: 'debt',
    text: 'What is your current non-mortgage debt level?',
    subtext: 'Consider credit cards, personal loans, and student loans.',
    type: QuestionType.Radio,
    options: ['None', 'Low', 'Moderate', 'High'],
    milestone: 'Honesty about debt helps create a realistic plan.',
  },
  {
    id: 'timeline',
    text: 'In how many months would you like to reach your goal?',
    subtext: 'A realistic timeline is crucial for success.',
    type: QuestionType.Slider,
    min: 6,
    max: 36,
    step: 1,
  },
];
