import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
let ai;

if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

export const generateAdvice = async (answers, calculatedTarget) => {
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
  } else if (surplus > 0 && surplus < expensesNum * 0.2) { // Saving less than 20% of expenses is a potential flag
    warningIndicator = "An early warning indicator suggests your monthly surplus is quite tight compared to your expenses. This could make saving for your goal challenging. It's important to review your budget for potential savings to accelerate your progress.";
  }
  
  const targetComparisonPrompt = desiredFund && Number(desiredFund) > 0
    ? `The user has a personal savings goal of ${currency} ${desiredFund}. Our calculation suggests an ideal target of ${currency} ${calculatedTarget} based on their expenses and job stability. Please analyze their personal goal. Is it appropriate (close to our calculation), too low (potentially risky), or perhaps ambitiously high (a great conservative goal)? Explain your reasoning gently and supportively. If their goal is fine, affirm their choice.`
    : "The user hasn't set a personal goal, so our main focus is on the calculated target. You can omit the 'Analyzing Your Goal' section.";

  let nextStepsPrompt = '';
  if (currentSavingsNum >= calculatedTarget && calculatedTarget > 0) {
      if (debt === 'High' || debt === 'Moderate') {
          nextStepsPrompt = `
[HEADER]Congratulations & What's Next
You've already met or exceeded your emergency fund target! This is a huge accomplishment and a cornerstone of financial stability. Since you have a '${debt}' debt level, your next powerful move is to focus on paying down high-interest debts. Now that your safety net is secure, you can tackle debt more aggressively without worry. Suggest creating a debt repayment plan (like the avalanche or snowball method) to accelerate your journey to being debt-free.`;
      } else {
          nextStepsPrompt = `
[HEADER]Congratulations & What's Next
You've already met or exceeded your emergency fund target! This is a huge accomplishment and a cornerstone of financial stability. With little to no debt, you are in an excellent position to start building wealth. Now is the perfect time to explore investing. Suggest looking into beginner-friendly investment options like low-cost index funds or ETFs to make your money work for you.`;
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
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return "[HEADER]Apologies\nWe couldn't generate personalized advice at this time. However, the calculated savings plan is a great starting point. Focus on consistency, and you'll build a strong financial safety net.";
    }
};