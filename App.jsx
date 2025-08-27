import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { QUESTIONS } from './constants';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultCard from './components/ResultCard';
import { generateAdvice } from './services/geminiService';
import Celebration from './components/Celebration';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({ currency: 'USD' });
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMilestone, setShowMilestone] = useState(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = useMemo(() => ((currentQuestionIndex) / QUESTIONS.length) * 100, [currentQuestionIndex]);
  const currentAnswer = answers[currentQuestion.id] || '';

  const handleNext = () => {
    if (isAnimatingOut) return;

    // Allow skipping the optional desiredFund question
    if (currentQuestion.id !== 'desiredFund') {
       const currentAnswerValue = answers[currentQuestion.id];
        if (currentAnswerValue === undefined || currentAnswerValue === '') {
            return; // Basic validation
        }
    }

    if (currentQuestion.milestone) {
        setShowMilestone(currentQuestion.milestone);
        setTimeout(() => setShowMilestone(null), 2500);
    }

    setIsAnimatingOut(true);
    setTimeout(() => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            calculateResult();
        }
        setIsAnimatingOut(false);
    }, 500);
  };

  const handleBack = () => {
    if (isAnimatingOut) return;
    if (currentQuestionIndex > 0) {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setCurrentQuestionIndex(prev => prev - 1);
            setIsAnimatingOut(false);
        }, 500);
    }
  };

  const handleAnswerChange = useCallback((id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleCurrencyChange = useCallback((currencyCode) => {
    setAnswers(prev => ({...prev, currency: currencyCode}));
  }, [])

  const calculateResult = async () => {
    setIsFinished(true);
    setIsLoading(true);
    setError(null);
    try {
        const stabilityMultipliers = {
            'Very Stable': 3,
            'Stable': 6,
            'Unstable': 9,
        };
        const expenses = Number(answers.expenses) || 0;
        const stability = answers.jobStability;
        const timeline = Number(answers.timeline);
        const currentSavings = Number(answers.currentSavings) || 0;
        const desiredFund = Number(answers.desiredFund) || 0;

        const multiplier = stabilityMultipliers[stability] || 6;
        const calculatedTargetFund = expenses * multiplier;
        const targetFund = desiredFund > 0 ? desiredFund : calculatedTargetFund;

        const amountToSave = Math.max(0, targetFund - currentSavings);
        const monthlySavings = timeline > 0 ? Math.round(amountToSave / timeline) : 0;
        
        const advice = await generateAdvice(answers, calculatedTargetFund);
        
        setResult({
            targetFund,
            monthlySavings,
            timeline,
            advice,
            currency: answers.currency || 'USD'
        });
        
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 4000);

    } catch (e) {
        console.error(e);
        setError('Failed to generate AI advice. Please check your API key and try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const restart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({ currency: 'USD' });
    setIsFinished(false);
    setResult(null);
    setError(null);
    setShowCelebration(false);
  };

  const isNextDisabled = useMemo(() => {
    if (currentQuestion?.id === 'desiredFund') return false; // This question is optional
    const value = answers[currentQuestion?.id];
    return value === undefined || value === '';
  }, [answers, currentQuestion]);

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 font-sans transition-colors duration-300">
      {showCelebration && <Celebration />}
      <div className="w-full max-w-2xl mx-auto relative">
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        <header className="text-center mb-6 animate-fade-in pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-accent">Emergency Fund Planner</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Secure your future, one step at a time.</p>
        </header>
        
        <main className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden min-h-[500px]">
          {showMilestone && (
            <div className="absolute top-4 right-4 bg-accent text-white text-sm font-semibold py-2 px-4 rounded-full animate-pop-in z-20">
              {showMilestone}
            </div>
          )}
          
          {!isFinished ? (
            <>
              <ProgressBar progress={progress} />
              <div className={`transition-all duration-500 ${isAnimatingOut ? 'animate-slide-out-left' : 'animate-slide-in-left'}`}>
                 <QuestionCard
                    key={currentQuestionIndex}
                    question={currentQuestion}
                    value={currentAnswer}
                    onAnswer={handleAnswerChange}
                    onNext={handleNext}
                    onBack={handleBack}
                    isFirst={currentQuestionIndex === 0}
                    isLast={currentQuestionIndex === QUESTIONS.length - 1}
                    isNextDisabled={isNextDisabled}
                    currency={answers.currency || 'USD'}
                    onCurrencyChange={handleCurrencyChange}
                 />
              </div>
            </>
          ) : (
            <ResultCard result={result} isLoading={isLoading} error={error} onRestart={restart} currentSavings={Number(answers.currentSavings) || 0} />
          )}
        </main>
         <footer className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
            <p>Powered by Gemini and React</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
