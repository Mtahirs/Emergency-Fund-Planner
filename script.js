import { GoogleGenAI } from "@google/genai";
import { jsPDF } from 'jspdf';

// --- DATA & CONSTANTS ---

const QUESTIONS = [
  { id: 'income', text: 'What is your total monthly take-home pay?', subtext: 'This helps us understand your savings capacity.', type: 'number', placeholder: 'e.g., 3000' },
  { id: 'expenses', text: 'What are your essential monthly expenses?', subtext: 'Include rent/mortgage, utilities, groceries, transportation, and minimum debt payments.', type: 'number', placeholder: 'e.g., 2000', milestone: 'Great! Knowing your expenses is the first big step.' },
  { id: 'jobStability', text: 'How stable is your primary source of income?', subtext: 'This determines how many months of expenses you should save.', type: 'radio', options: ['Very Stable', 'Stable', 'Unstable'], milestone: 'Understanding your risk profile is key.' },
  { id: 'dependents', text: 'How many people depend on your income?', subtext: 'This includes children, spouses, or other family members.', type: 'number', placeholder: 'e.g., 0' },
  { id: 'currentSavings', text: 'How much do you currently have in emergency savings?', subtext: "It's okay if this is zero. We're here to make a plan!", type: 'number', placeholder: 'e.g., 1000' },
  { id: 'desiredFund', text: 'What is your personal emergency fund goal?', subtext: "If you're not sure, you can leave this blank. We'll suggest a target based on your finances.", type: 'number', placeholder: 'e.g., 10000' },
  { id: 'debt', text: 'What is your current non-mortgage debt level?', subtext: 'Consider credit cards, personal loans, and student loans.', type: 'radio', options: ['None', 'Low', 'Moderate', 'High'], milestone: 'Honesty about debt helps create a realistic plan.' },
  { id: 'timeline', text: 'In how many months would you like to reach your goal?', subtext: 'A realistic timeline is crucial for success.', type: 'slider', min: 6, max: 36, step: 1 }
];

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' }, { code: 'EUR', name: 'Euro', symbol: '€' }, { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }, { code: 'GBP', name: 'Pound Sterling', symbol: '£' }, { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }, { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' }, { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' }, { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }, { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' }, { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' }, { code: 'MXN', name: 'Mexican Peso', symbol: '$' }, { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' }, { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' }, { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' }, { code: 'KRW', name: 'South Korean Won', symbol: '₩' }, { code: 'TRY', name: 'Turkish Lira', symbol: '₺' }, { code: 'RUB', name: 'Russian Ruble', symbol: '₽' }, { code: 'INR', name: 'Indian Rupee', symbol: '₹' }, { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }, { code: 'ZAR', name: 'South African Rand', symbol: 'R' }, { code: 'AED', name: 'United Arab Emirates Dirham', symbol: 'د.إ' }, { code: 'AFN', name: 'Afghan Afghani', symbol: '؋' }, { code: 'ALL', name: 'Albanian Lek', symbol: 'L' }, { code: 'AMD', name: 'Armenian Dram', symbol: '֏' }, { code: 'ANG', name: 'Netherlands Antillean Guilder', symbol: 'ƒ' }, { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz' }, { code: 'ARS', name: 'Argentine Peso', symbol: '$' }, { code: 'AWG', name: 'Aruban Florin', symbol: 'ƒ' }, { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼' }, { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' }, { code: 'BBD', name: 'Barbadian Dollar', symbol: '$' }, { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' }, { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' }, { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' }, { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu' }, { code: 'BMD', name: 'Bermudan Dollar', symbol: '$' }, { code: 'BND', name: 'Brunei Dollar', symbol: '$' }, { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs.' }, { code: 'BSD', name: 'Bahamian Dollar', symbol: '$' }, { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.' }, { code: 'BWP', name: 'Botswanan Pula', symbol: 'P' }, { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' }, { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$' }, { code: 'CDF', name: 'Congolese Franc', symbol: 'FC' }, { code: 'CLP', name: 'Chilean Peso', symbol: '$' }, { code: 'COP', name: 'Colombian Peso', symbol: '$' }, { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡' }, { code: 'CUP', name: 'Cuban Peso', symbol: '$' }, { code: 'CVE', name: 'Cape Verdean Escudo', symbol: '$' }, { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' }, { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj' }, { code: 'DKK', name: 'Danish Krone', symbol: 'kr' }, { code:-
    <file>script.js</file>
    <description>Created a single, comprehensive JavaScript file that contains all application logic. This file replaces all previous React components and services. It handles state, renders questions, calls the Gemini API, displays results, and manages all user interactions using plain JavaScript and DOM manipulation.</description>
    <content><![CDATA[import { GoogleGenAI } from "@google/genai";
import { jsPDF } from 'jspdf';

// --- DATA & CONSTANTS ---

const QUESTIONS = [
  { id: 'income', text: 'What is your total monthly take-home pay?', subtext: 'This helps us understand your savings capacity.', type: 'number', placeholder: 'e.g., 3000' },
  { id: 'expenses', text: 'What are your essential monthly expenses?', subtext: 'Include rent/mortgage, utilities, groceries, transportation, and minimum debt payments.', type: 'number', placeholder: 'e.g., 2000', milestone: 'Great! Knowing your expenses is the first big step.' },
  { id: 'jobStability', text: 'How stable is your primary source of income?', subtext: 'This determines how many months of expenses you should save.', type: 'radio', options: ['Very Stable', 'Stable', 'Unstable'], milestone: 'Understanding your risk profile is key.' },
  { id: 'dependents', text: 'How many people depend on your income?', subtext: 'This includes children, spouses, or other family members.', type: 'number', placeholder: 'e.g., 0' },
  { id: 'currentSavings', text: 'How much do you currently have in emergency savings?', subtext: "It's okay if this is zero. We're here to make a plan!", type: 'number', placeholder: 'e.g., 1000' },
  { id: 'desiredFund', text: 'What is your personal emergency fund goal?', subtext: "If you're not sure, you can leave this blank. We'll suggest a target based on your finances.", type: 'number', placeholder: 'e.g., 10000' },
  { id: 'debt', text: 'What is your current non-mortgage debt level?', subtext: 'Consider credit cards, personal loans, and student loans.', type: 'radio', options: ['None', 'Low', 'Moderate', 'High'], milestone: 'Honesty about debt helps create a realistic plan.' },
  { id: 'timeline', text: 'In how many months would you like to reach your goal?', subtext: 'A realistic timeline is crucial for success.', type: 'slider', min: 6, max: 36, step: 1 }
];

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' }, { code: 'EUR', name: 'Euro', symbol: '€' }, { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }, { code: 'GBP', name: 'Pound Sterling', symbol: '£' }, { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }, { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' }, { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' }, { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }, { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' }, { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' }, { code: 'MXN', name: 'Mexican Peso', symbol: '$' }, { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' }, { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' }, { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' }, { code: 'KRW', name: 'South Korean Won', symbol: '₩' }, { code: 'TRY', name: 'Turkish Lira', symbol: '₺' }, { code: 'RUB', name: 'Russian Ruble', symbol: '₽' }, { code: 'INR', name: 'Indian Rupee', symbol: '₹' }, { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }, { code: 'ZAR', name: 'South African Rand', symbol: 'R' }, { code: 'AED', name: 'United Arab Emirates Dirham', symbol: 'د.إ' }, { code: 'AFN', name: 'Afghan Afghani', symbol: '؋' }, { code: 'ALL', name: 'Albanian Lek', symbol: 'L' }, { code: 'AMD', name: 'Armenian Dram', symbol: '֏' }, { code: 'ANG', name: 'Netherlands Antillean Guilder', symbol: 'ƒ' }, { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz' }, { code: 'ARS', name: 'Argentine Peso', symbol: '$' }, { code: 'AWG', name: 'Aruban Florin', symbol: 'ƒ' }, { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼' }, { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' }, { code: 'BBD', name: 'Barbadian Dollar', symbol: '$' }, { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' }, { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' }, { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' }, { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu' }, { code: 'BMD', name: 'Bermudan Dollar', symbol: '$' }, { code: 'BND', name: 'Brunei Dollar', symbol: '$' }, { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs.' }, { code: 'BSD', name: 'Bahamian Dollar', symbol: '$' }, { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.' }, { code: 'BWP', name: 'Botswanan Pula', symbol: 'P' }, { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' }, { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$' }, { code: 'CDF', name: 'Congolese Franc', symbol: 'FC' }, { code: 'CLP', name: 'Chilean Peso', symbol: '$' }, { code: 'COP', name: 'Colombian Peso', symbol: '$' }, { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡' }, { code: 'CUP', name: 'Cuban Peso', symbol: '$' }, { code: 'CVE', name: 'Cape Verdean Escudo', symbol: '$' }, { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' }, { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj' }, { code: 'DKK', name: 'Danish Krone', symbol: 'kr' }, { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$' }, { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج' }, { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' }, { code: 'ERN', name: 'Eritrean Nakfa', symbol: 'Nfk' }, { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br' }, { code: 'FJD', name: 'Fijian Dollar', symbol: '$' }, { code: 'FKP', name: 'Falkland Islands Pound', symbol: '£' }, { code: 'FOK', name: 'Faroese Króna', symbol: 'kr' }, { code: 'GEL', name: 'Georgian Lari', symbol: '₾' }, { code: 'GGP', name: 'Guernsey Pound', symbol: '£' }, { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵' }, { code: 'GIP', name: 'Gibraltar Pound', symbol: '£' }, { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D' }, { code: 'GNF', name: 'Guinean Franc', symbol: 'FG' }, { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q' }, { code: 'GYD', name: 'Guyanaese Dollar', symbol: '$' }, { code: 'HNL', name: 'Honduran Lempira', symbol: 'L' }, { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn' }, { code: 'HTG', name: 'Haitian Gourde', symbol: 'G' }, { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' }, { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' }, { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪' }, { code: 'IMP', name: 'Isle of Man Pound', symbol: '£' }, { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د' }, { code: 'IRR', name: 'Iranian Rial', symbol: '﷼' }, { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr' }, { code: 'JEP', name: 'Jersey Pound', symbol: '£' }, { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$' }, { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا' }, { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' }, { code: 'KGS', name: 'Kyrgystani Som', symbol: 'с' }, { code: 'KHR', name: 'Cambodian Riel', symbol: '៛' }, { code: 'KID', name: 'Kiribati Dollar', symbol: '$' }, { code: 'KMF', name: 'Comorian Franc', symbol: 'CF' }, { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' }, { code: 'KYD', name: 'Cayman Islands Dollar', symbol: '$' }, { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸' }, { code: 'LAK', name: 'Laotian Kip', symbol: '₭' }, { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل' }, { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs' }, { code: 'LRD', name: 'Liberian Dollar', symbol: '$' }, { code: 'LSL', name: 'Lesotho Loti', symbol: 'L' }, { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د' }, { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.' }, { code: 'MDL', name: 'Moldovan Leu', symbol: 'L' }, { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar' }, { code: 'MKD', name: 'Macedonian Denar', symbol: 'ден' }, { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K' }, { code: 'MNT', name: 'Mongolian Tugrik', symbol: '₮' }, { code: 'MOP', name: 'Macanese Pataca', symbol: 'MOP$' }, { code: 'MRU', name: 'Mauritanian Ouguiya', symbol: 'UM' }, { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨' }, { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf' }, { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK' }, { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' }, { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT' }, { code: 'NAD', name: 'Namibian Dollar', symbol: '$' }, { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' }, { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$' }, { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨' }, { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.' }, { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.' }, { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.' }, { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K' }, { code: 'PHP', name: 'Philippine Peso', symbol: '₱' }, { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' }, { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' }, { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲' }, { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق' }, { code: 'RON', name: 'Romanian Leu', symbol: 'lei' }, { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин.' }, { code: 'RWF', name: 'Rwandan Franc', symbol: 'RF' }, { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' }, { code: 'SBD', name: 'Solomon Islands Dollar', symbol: '$' }, { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨' }, { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س.' }, { code: 'SHP', name: 'Saint Helena Pound', symbol: '£' }, { code: 'SLE', name: 'Sierra Leonean Leone', symbol: 'Le' }, { code: 'SLL', name: 'Sierra Leonean Leone (Old)', symbol: 'Le' }, { code: 'SOS', name: 'Somali Shilling', symbol: 'S' }, { code: 'SRD', name: 'Surinamese Dollar', symbol: '$' }, { code: 'SSP', name: 'South Sudanese Pound', symbol: '£' }, { code: 'STN', name: 'São Tomé & Príncipe Dobra', symbol: 'Db' }, { code: 'SYP', name: 'Syrian Pound', symbol: '£' }, { code: 'SZL', name: 'Eswatini Lilangeni', symbol: 'L' }, { code: 'THB', name: 'Thai Baht', symbol: '฿' }, { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'ЅМ' }, { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'm' }, { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت' }, { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$' }, { code: 'TTD', name: 'Trinidad & Tobago Dollar', symbol: 'TT$' }, { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$' }, { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' }, { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' }, { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' }, { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U' }, { code: 'UZS', name: 'Uzbekistani Som', symbol: 'сўм' }, { code: 'VES', name: 'Venezuelan Bolívar Soberano', symbol: 'Bs.' }, { code: 'VND', name: 'Vietnamese Đồng', symbol: '₫' }, { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT' }, { code: 'WST', name: 'Samoan Tālā', symbol: 'T' }, { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA' }, { code: 'XCD', name: 'East Caribbean Dollar', symbol: '$' }, { code: 'XDR', name: 'Special Drawing Rights', symbol: 'SDR' }, { code: 'XOF', name: 'West African CFA franc', symbol: 'CFA' }, { code: 'XPF', name: 'CFP Franc', symbol: '₣' }, { code: 'YER', name: 'Yemeni Rial', symbol: '﷼' }, { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK' }, { code: 'ZWL', name: 'Zimbabwean Dollar', symbol: '$' }
];

// --- APPLICATION STATE ---

let state = {
  currentQuestionIndex: 0,
  answers: { currency: 'USD' },
  theme: 'light',
  isAnimatingOut: false,
};

// --- DOM ELEMENT REFERENCES ---

const questionnaireView = document.getElementById('questionnaire-view');
const resultView = document.getElementById('result-view');
const questionCardContainer = document.getElementById('question-card-container');
const progressBarContainer = document.getElementById('progress-bar-container');
const milestoneContainer = document.getElementById('milestone-container');
const celebrationContainer = document.getElementById('celebration-container');
const themeToggleContainer = document.getElementById('theme-toggle-container');
const root = document.documentElement;

// --- GEMINI SERVICE ---

const API_KEY = process.env.API_KEY;
let ai;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

async function generateAdvice(answers, calculatedTarget) {
    if (!ai) {
        return "[HEADER]AI Service Not Available\nPersonalized advice could not be generated because the connection to the AI service is not configured. Your financial calculations are still correct and provide a great starting point.";
    }
    const { income, expenses, jobStability, dependents, currentSavings, debt, timeline, desiredFund, currency } = answers;
    const incomeNum = Number(income);
    const expensesNum = Number(expenses);
    const currentSavingsNum = Number(currentSavings) || 0;
    const surplus = incomeNum - expensesNum;
    
    let warningIndicator = '';
    if (surplus < 0) {
      warningIndicator = "An early warning indicator shows your expenses are higher than your income. This is a critical situation that needs immediate attention. You must focus on either increasing income or decreasing expenses to get on a stable financial path.";
    } else if (surplus > 0 && surplus < expensesNum * 0.2) {
      warningIndicator = "An early warning indicator suggests your monthly surplus is quite tight compared to your expenses. This could make saving for your goal challenging. It's important to review your budget for potential savings to accelerate your progress.";
    }
    
    const targetComparisonPrompt = desiredFund && Number(desiredFund) > 0
      ? `The user has a personal savings goal of ${currency} ${desiredFund}. Our calculation suggests an ideal target of ${currency} ${calculatedTarget} based on their expenses and job stability. Please analyze their personal goal. Is it appropriate (close to our calculation), too low (potentially risky), or perhaps ambitiously high (a great conservative goal)? Explain your reasoning gently and supportively. If their goal is fine, affirm their choice.`
      : "The user hasn't set a personal goal, so our main focus is on the calculated target. You can omit the 'Analyzing Your Goal' section.";
  
    let nextStepsPrompt = '';
    if (currentSavingsNum >= calculatedTarget && calculatedTarget > 0) {
        if (debt === 'High' || debt === 'Moderate') {
            nextStepsPrompt = `[HEADER]Congratulations & What's Next\nYou've already met or exceeded your emergency fund target! This is a huge accomplishment and a cornerstone of financial stability. Since you have a '${debt}' debt level, your next powerful move is to focus on paying down high-interest debts. Now that your safety net is secure, you can tackle debt more aggressively without worry. Suggest creating a debt repayment plan (like the avalanche or snowball method) to accelerate your journey to being debt-free.`;
        } else {
            nextStepsPrompt = `[HEADER]Congratulations & What's Next\nYou've already met or exceeded your emergency fund target! This is a huge accomplishment and a cornerstone of financial stability. With little to no debt, you are in an excellent position to start building wealth. Now is the perfect time to explore investing. Suggest looking into beginner-friendly investment options like low-cost index funds or ETFs to make your money work for you.`;
        }
    }
  
    const prompt = `
      Act as a friendly, encouraging, and empathetic financial advisor.
      Based on the following user data, provide personalized advice for building an emergency fund.
      The tone should be supportive, non-judgmental, and actionable.
      
      IMPORTANT: Structure your response as plain text. Use "[HEADER]" before each section title. Do NOT use any markdown like '**' or '* '.
  
      User's Financial Profile:
      - Currency: ${currency}
      - Monthly Take-Home Pay: ${income}
      - Essential Monthly Expenses: ${expenses}
      - Monthly Surplus/Deficit: ${surplus}
      - Job Stability: ${jobStability}
      - Number of Dependents: ${dependents}
      - Current Emergency Savings: ${currentSavings}
      - Desired Emergency Fund Goal: ${desiredFund || 'Not specified'}
      - Non-Mortgage Debt Level: ${debt}
      - Desired Timeline to Reach Goal: ${timeline} months
  
      Crucial Instruction: When providing advice, directly address how their debt level of '${debt}' impacts their overall financial stability and the urgency of building an emergency fund. For example, if debt is 'High', emphasize that an emergency fund is a critical buffer to prevent taking on more high-interest debt during a crisis.
  
      Your response must include the following sections, using the "[HEADER]" format:
      1.  [HEADER]A Quick, Positive Opening
          Start by congratulating them for taking this important step.
      
      2.  [HEADER]Your Financial Snapshot
          Briefly and gently summarize their situation, highlighting strengths. Mention their debt level here as part of the overview.
      
      3.  [HEADER]Analyzing Your Goal
          ${targetComparisonPrompt}
      
      4.  [HEADER]Why This Goal Matters for You
          Briefly explain why an emergency fund is particularly important for someone in their specific situation (considering job stability, dependents, and especially their debt level of '${debt}').
      
      5.  [HEADER]Your Actionable Tips to Succeed
          Provide 3-4 concrete, personalized tips to help them reach their monthly savings goal. These tips should be tailored to their situation (e.g., if debt is 'High' or 'Moderate', suggest strategies for balancing debt repayment and savings).
      
      ${nextStepsPrompt}
  
      [HEADER]Staying on Track
          If applicable, incorporate this warning: "${warningIndicator}". Frame it constructively. If there is no warning, just provide a highly encouraging and motivational closing statement about consistency and celebrating small wins.
  
      Keep the entire response concise and easy to read.
      `;
      
      try {
          const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
          return response.text;
      } catch (error) {
          console.error("Gemini API call failed:", error);
          return "[HEADER]Apologies\nWe couldn't generate personalized advice at this time. However, the calculated savings plan is a great starting point. Focus on consistency, and you'll build a strong financial safety net.";
      }
}

// --- UTILITY FUNCTIONS ---

function formatCurrency(value, currencyCode) {
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    } catch (e) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    }
}

function formatNumberWithCommas(numStr) {
    if (numStr === '' || numStr === undefined || numStr === null) return '';
    const parts = String(numStr).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// --- RENDERING FUNCTIONS ---

function renderProgressBar() {
    const progress = (state.currentQuestionIndex / QUESTIONS.length) * 100;
    progressBarContainer.innerHTML = `
        <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-8">
            <div class="bg-accent h-2.5 rounded-full transition-all duration-500 ease-out" style="width: ${progress}%"></div>
        </div>
    `;
}

function renderQuestion() {
    const question = QUESTIONS[state.currentQuestionIndex];
    const value = state.answers[question.id] || '';
    const isFirst = state.currentQuestionIndex === 0;
    const isLast = state.currentQuestionIndex === QUESTIONS.length - 1;
    const isNextDisabled = (question.id !== 'desiredFund' && (value === undefined || value === ''));
    
    let inputHtml = '';
    const currencySymbol = CURRENCIES.find(c => c.code === state.answers.currency)?.symbol || '$';

    switch (question.type) {
        case 'number':
            const isCurrencyInput = question.id !== 'dependents';
            const currencySelectorHtml = isFirst ? `
                <div class="mb-6">
                    <div class="relative" id="currency-selector-wrapper">
                        <label for="currency-selector" class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Currency</label>
                        <button type="button" id="currency-dropdown-button" class="w-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-left flex justify-between items-center">
                            <span>${CURRENCIES.find(c => c.code === state.answers.currency)?.name || 'Select'} (${state.answers.currency})</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        <div id="currency-dropdown" class="hidden absolute z-20 w-full mt-1 bg-white dark:bg-slate-800 rounded-md shadow-xl border dark:border-slate-600 max-h-60 flex flex-col">
                           <div class="p-2">
                                <input type="text" id="currency-search" placeholder="Search currency..." class="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-md border-transparent focus:ring-accent focus:border-accent">
                           </div>
                           <ul class="overflow-y-auto" id="currency-list">
                                <!-- Currency list will be populated here -->
                           </ul>
                        </div>
                    </div>
                </div>` : '';

            inputHtml = `
                <div class="mt-4">
                    ${currencySelectorHtml}
                    <div class="relative">
                        ${isCurrencyInput ? `<span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">${currencySymbol}</span>` : ''}
                        <input type="text" inputMode="numeric" pattern="[0-9,]*" id="${question.id}" value="${formatNumberWithCommas(value)}" placeholder="${question.placeholder}"
                            class="w-full ${isCurrencyInput ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-secondary dark:focus:border-accent focus:ring-0 rounded-lg transition"
                        />
                    </div>
                </div>`;
            break;
        case 'radio':
            inputHtml = `<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                ${question.options.map(option => `
                    <button data-value="${option}" class="radio-option p-4 rounded-lg text-center font-semibold border-2 transition-all duration-200 
                        ${value === option ? 'bg-secondary text-white border-secondary dark:bg-accent dark:border-accent shadow-lg scale-105' : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-secondary dark:hover:border-accent'}">
                        ${option}
                    </button>
                `).join('')}
            </div>`;
            break;
        case 'slider':
            inputHtml = `
                <div class="mt-6">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-slate-500">${question.min} months</span>
                        <span id="slider-value" class="text-2xl font-bold text-secondary dark:text-accent">${value || question.min}</span>
                        <span class="text-slate-500">${question.max} months</span>
                    </div>
                    <input type="range" id="${question.id}" min="${question.min}" max="${question.max}" step="${question.step}" value="${value || question.min}"
                        class="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-secondary dark:accent-accent"
                    />
                </div>`;
            break;
    }

    questionCardContainer.innerHTML = `
        <div class="flex flex-col h-full min-h-[400px]">
            <div class="flex-grow">
                <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">${question.text}</h2>
                ${question.subtext ? `<p class="text-slate-500 dark:text-slate-400 mb-6">${question.subtext}</p>` : ''}
                ${inputHtml}
            </div>
            <div class="mt-8 flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-700">
                <button id="back-button" ${isFirst ? 'disabled' : ''} class="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                    Back
                </button>
                <button id="next-button" ${isNextDisabled ? 'disabled' : ''} class="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-secondary dark:bg-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md">
                    ${isLast ? 'Finish' : 'Next'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>`;
    addQuestionEventListeners();
}

function renderResult(result, error) {
    questionnaireView.classList.add('hidden');
    resultView.classList.remove('hidden');

    if (error) {
        resultView.innerHTML = `
            <div class="text-center p-8 animate-fade-in">
                <h2 class="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h2>
                <p class="text-slate-600 dark:text-slate-400 mb-6">${error}</p>
                <button id="restart-button" class="px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:opacity-90 transition">Try Again</button>
            </div>`;
        document.getElementById('restart-button').addEventListener('click', handleRestart);
        return;
    }
    
    if (!result) {
         resultView.innerHTML = `<div class="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div class="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-4 text-slate-500 dark:text-slate-400">Generating your personalized plan...</p>
        </div>`;
        return;
    }

    const { targetFund, monthlySavings, timeline, advice, currency } = result;
    const currentSavings = Number(state.answers.currentSavings) || 0;
    const progressPercentage = targetFund > 0 ? (currentSavings / targetFund) * 100 : 100;
    const parsedAdvice = advice.split('[HEADER]').filter(part => part.trim() !== '');

    resultView.innerHTML = `
    <div class="animate-fade-in">
        <h2 class="text-3xl font-bold text-center text-primary dark:text-accent mb-2">Your Emergency Fund Plan</h2>
        <p class="text-center text-slate-500 dark:text-slate-400 mb-6">Here's your roadmap to financial security.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-light dark:bg-slate-700 p-6 rounded-xl text-center">
                <h3 class="text-lg font-semibold text-slate-600 dark:text-slate-300">Target Fund</h3>
                <p class="text-4xl font-bold text-primary dark:text-accent">${formatCurrency(targetFund, currency)}</p>
            </div>
             <div class="bg-light dark:bg-slate-700 p-6 rounded-xl text-center">
                <h3 class="text-lg font-semibold text-slate-600 dark:text-slate-300">Monthly Savings Goal</h3>
                <p class="text-4xl font-bold text-primary dark:text-accent">${formatCurrency(monthlySavings, currency)}</p>
                <p class="text-sm text-slate-500">for ${timeline} months</p>
            </div>
        </div>

        <div class="mb-6">
            <h4 class="font-semibold mb-2">Progress Towards Your Goal</h4>
            <div class="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-4 overflow-hidden">
                <div class="bg-gradient-to-r from-green-400 to-accent h-4 rounded-full transition-all duration-1000 ease-out"
                    style="width: ${Math.min(progressPercentage, 100)}%"></div>
            </div>
            <p class="text-sm text-right mt-1 text-slate-500">${formatCurrency(currentSavings, currency)} / ${formatCurrency(targetFund, currency)}</p>
        </div>

        <div class="bg-slate-100 dark:bg-slate-900/50 p-4 sm:p-6 rounded-lg space-y-4">
            <h3 class="text-xl font-bold text-primary dark:text-accent !mt-0">Your Personalized Advice from Gemini</h3>
             ${parsedAdvice.map(part => {
                const lines = part.trim().split('\n');
                const title = lines[0];
                const content = lines.slice(1).join('\n');
                if (!title) return '';
                return `<div>
                    <h4 class="font-bold text-lg text-slate-800 dark:text-slate-200">${title}</h4>
                    <p class="text-slate-600 dark:text-slate-400 whitespace-pre-wrap mt-1">${content}</p>
                </div>`;
            }).join('')}
        </div>

        <div class="mt-8 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
            <button id="restart-button" class="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white bg-primary hover:opacity-90 transition shadow-md">Start Over</button>
            <button id="download-button" class="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white bg-accent hover:opacity-90 transition shadow-md">Download PDF Plan</button>
        </div>
    </div>`;

    document.getElementById('restart-button').addEventListener('click', handleRestart);
    document.getElementById('download-button').addEventListener('click', () => handleDownload(result));
}

function renderThemeToggle() {
    themeToggleContainer.innerHTML = `
        <button id="theme-toggle-button" class="absolute top-0 right-0 z-30 p-2 rounded-full text-slate-500 dark:text-yellow-400 bg-slate-200/50 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light dark:focus:ring-offset-dark focus:ring-primary dark:focus:ring-accent transition-colors"
                aria-label="Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode">
            ${state.theme === 'light' ? 
                `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>` : 
                `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
            }
        </button>`;
    document.getElementById('theme-toggle-button').addEventListener('click', handleThemeToggle);
}


// --- EVENT HANDLERS & LOGIC ---

function handleNext() {
    if (state.isAnimatingOut) return;
    const question = QUESTIONS[state.currentQuestionIndex];
    const value = state.answers[question.id];

    if (question.id !== 'desiredFund' && (value === undefined || value === '')) {
        return; // Basic validation
    }

    if (question.milestone) {
        milestoneContainer.innerHTML = `<div class="bg-accent text-white text-sm font-semibold py-2 px-4 rounded-full animate-pop-in">${question.milestone}</div>`;
        setTimeout(() => { milestoneContainer.innerHTML = ''; }, 2500);
    }

    state.isAnimatingOut = true;
    questionCardContainer.classList.add('animate-slide-out-left');

    setTimeout(() => {
        if (state.currentQuestionIndex < QUESTIONS.length - 1) {
            state.currentQuestionIndex++;
            updateApp();
        } else {
            calculateResult();
        }
        questionCardContainer.classList.remove('animate-slide-out-left');
        questionCardContainer.classList.add('animate-slide-in-left');
        state.isAnimatingOut = false;
        // Remove animation class after it finishes
        setTimeout(() => questionCardContainer.classList.remove('animate-slide-in-left'), 500);
    }, 500);
}

function handleBack() {
    if (state.isAnimatingOut || state.currentQuestionIndex === 0) return;

    state.isAnimatingOut = true;
    questionCardContainer.classList.add('animate-slide-out-left');

    setTimeout(() => {
        state.currentQuestionIndex--;
        updateApp();
        questionCardContainer.classList.remove('animate-slide-out-left');
        questionCardContainer.classList.add('animate-slide-in-left');
        state.isAnimatingOut = false;
        setTimeout(() => questionCardContainer.classList.remove('animate-slide-in-left'), 500);
    }, 500);
}

function handleAnswerChange(id, value) {
    state.answers[id] = value;
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
        const question = QUESTIONS[state.currentQuestionIndex];
        const isDisabled = question.id !== 'desiredFund' && (value === undefined || value === '');
        nextButton.disabled = isDisabled;
    }
}

function handleCurrencyChange(code) {
    state.answers.currency = code;
    updateApp();
}

async function calculateResult() {
    renderResult(null, null); // Show loading spinner
    
    try {
        const stabilityMultipliers = { 'Very Stable': 3, 'Stable': 6, 'Unstable': 9 };
        const expenses = Number(state.answers.expenses) || 0;
        const stability = state.answers.jobStability;
        const timeline = Number(state.answers.timeline);
        const currentSavings = Number(state.answers.currentSavings) || 0;
        const desiredFund = Number(state.answers.desiredFund) || 0;

        const multiplier = stabilityMultipliers[stability] || 6;
        const calculatedTargetFund = expenses * multiplier;
        const targetFund = desiredFund > 0 ? desiredFund : calculatedTargetFund;

        const amountToSave = Math.max(0, targetFund - currentSavings);
        const monthlySavings = timeline > 0 ? Math.round(amountToSave / timeline) : 0;
        
        const advice = await generateAdvice(state.answers, calculatedTargetFund);
        
        const resultData = {
            targetFund,
            monthlySavings,
            timeline,
            advice,
            currency: state.answers.currency || 'USD'
        };
        
        renderResult(resultData, null);
        showCelebration();

    } catch (e) {
        console.error(e);
        renderResult(null, 'Failed to generate AI advice. Please check your API key and try again.');
    }
}

function handleRestart() {
    state.currentQuestionIndex = 0;
    state.answers = { currency: 'USD' };
    resultView.classList.add('hidden');
    questionnaireView.classList.remove('hidden');
    updateApp();
}

function handleDownload(result) {
    const doc = new jsPDF();
    const { targetFund, monthlySavings, timeline, advice, currency } = result;
    const currentSavings = Number(state.answers.currentSavings) || 0;
    const parsedAdvice = advice.split('[HEADER]').filter(part => part.trim() !== '');
    
    const pageMargin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = pageWidth - (pageMargin * 2);
    let y = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Your Emergency Fund Plan', pageWidth / 2, y, { align: 'center' });
    y += 15;

    doc.setFontSize(16);
    doc.text('Your Key Metrics', pageMargin, y);
    y += 6;
    doc.setLineWidth(0.5);
    doc.line(pageMargin, y - 2, pageWidth - pageMargin, y - 2);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Target Fund: ${formatCurrency(targetFund, currency)}`, pageMargin, y + 4);
    doc.text(`Monthly Savings Goal: ${formatCurrency(monthlySavings, currency)}`, pageMargin, y + 11);
    doc.text(`Timeline: ${timeline} months`, pageMargin, y + 18);
    doc.text(`Current Savings: ${formatCurrency(currentSavings, currency)}`, pageMargin, y + 25);
    y += 35;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Your Personalized Advice from Gemini', pageMargin, y);
    y += 6;
    doc.setLineWidth(0.5);
    doc.line(pageMargin, y - 2, pageWidth - pageMargin, y - 2);
    y += 4;
    
    parsedAdvice.forEach(part => {
        const lines = part.trim().split('\n');
        const title = lines[0];
        const content = lines.slice(1).join('\n').trim();
        if (!title) return;

        const splitContent = doc.splitTextToSize(content, textWidth);
        const blockHeight = 8 + (splitContent.length * 4.5) + 8;

        if (y + blockHeight > pageHeight - pageMargin) { 
            doc.addPage();
            y = pageMargin;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(title, pageMargin, y);
        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(splitContent, pageMargin, y);
        y += (splitContent.length * 4.5) + 8;
    });

    doc.save('My-Emergency-Fund-Plan.pdf');
}

function showCelebration() {
    let confettiHtml = '';
    const colors = ['#34d399', '#60a5fa', '#fbbf24', '#f87171'];
    for (let i = 0; i < 50; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const style = `left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 2}s; transform: rotate(${Math.random() * 360}deg); background-color: ${color};`;
        confettiHtml += `<div class="absolute w-2 h-4 animate-confetti-fall" style="${style}"></div>`;
    }
    celebrationContainer.innerHTML = confettiHtml;
    setTimeout(() => { celebrationContainer.innerHTML = ''; }, 4000);
}

function handleThemeToggle() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    updateTheme();
}

function updateTheme() {
    root.classList.remove('light', 'dark');
    root.classList.add(state.theme);
    renderThemeToggle();
}

function addQuestionEventListeners() {
    document.getElementById('next-button').addEventListener('click', handleNext);
    document.getElementById('back-button').addEventListener('click', handleBack);
    
    const question = QUESTIONS[state.currentQuestionIndex];
    
    if (question.type === 'number') {
        const input = document.getElementById(question.id);
        input.addEventListener('input', (e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, '');
            handleAnswerChange(question.id, numericValue);
            // Re-format with commas while typing
            e.target.value = formatNumberWithCommas(numericValue);
        });
    } else if (question.type === 'radio') {
        document.querySelectorAll('.radio-option').forEach(btn => {
            btn.addEventListener('click', () => {
                handleAnswerChange(question.id, btn.dataset.value);
                updateApp(); // Re-render to show selection
            });
        });
    } else if (question.type === 'slider') {
        const slider = document.getElementById(question.id);
        const sliderValue = document.getElementById('slider-value');
        slider.addEventListener('input', (e) => {
            handleAnswerChange(question.id, e.target.value);
            sliderValue.textContent = e.target.value;
        });
    }

    if (state.currentQuestionIndex === 0) {
        addCurrencySelectorListeners();
    }
}

function addCurrencySelectorListeners() {
    const button = document.getElementById('currency-dropdown-button');
    const dropdown = document.getElementById('currency-dropdown');
    const searchInput = document.getElementById('currency-search');
    const list = document.getElementById('currency-list');
    const wrapper = document.getElementById('currency-selector-wrapper');

    const renderCurrencyList = (filter = '') => {
        const filtered = CURRENCIES.filter(c => 
            c.name.toLowerCase().includes(filter.toLowerCase()) || 
            c.code.toLowerCase().includes(filter.toLowerCase())
        );
        list.innerHTML = filtered.map(c => `
            <li data-code="${c.code}" class="currency-item px-4 py-2 hover:bg-secondary dark:hover:bg-accent hover:text-white cursor-pointer">
                ${c.name} (${c.code})
            </li>`).join('');
        
        document.querySelectorAll('.currency-item').forEach(item => {
            item.addEventListener('click', () => {
                handleCurrencyChange(item.dataset.code);
                dropdown.classList.add('hidden');
            });
        });
    };

    button.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
        if (!dropdown.classList.contains('hidden')) {
            renderCurrencyList('');
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', (e) => renderCurrencyList(e.target.value));

    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    renderCurrencyList('');
}


// --- INITIALIZATION ---

function updateApp() {
    renderProgressBar();
    renderQuestion();
}

function init() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    state.theme = savedTheme || (prefersDark ? 'dark' : 'light');
    updateTheme();
    updateApp();
}

// Start the application
init();
]]></content>
  </change>
  <change>
    <file>index.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>App.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>types.ts</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>constants.ts</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>services/geminiService.ts</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/ProgressBar.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/QuestionCard.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/ResultCard.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/Celebration.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/icons/ChevronLeftIcon.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/icons/ChevronRightIcon.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>currencies.ts</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/ThemeToggle.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/icons/SunIcon.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/icons/MoonIcon.tsx</file>
    <description>This file is no longer needed and has been removed, as the application has been converted to plain JavaScript.</description>
    <content><![CDATA[]]></content>
  </change>
   <change>
    <file>index.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>App.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>types.js</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>constants.js</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>services/geminiService.js</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/ProgressBar.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/QuestionCard.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/ResultCard.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/Celebration.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/icons/ChevronLeftIcon.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/icons/ChevronRightIcon.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>currencies.js</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/ThemeToggle.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/icons/SunIcon.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
  <change>
    <file>components/icons/MoonIcon.jsx</file>
    <description>This file is no longer needed and has been replaced by `script.js`.</description>
    <content><![CDATA[]]></content>
  </change>
</changes>