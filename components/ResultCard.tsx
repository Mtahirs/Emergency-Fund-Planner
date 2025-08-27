import React from 'react';
import type { Result } from '../types';
import { jsPDF } from 'jspdf';

interface ResultCardProps {
  result: Result | null;
  isLoading: boolean;
  error: string | null;
  onRestart: () => void;
  currentSavings: number;
}

const formatCurrency = (value: number, currency: string) => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    } catch (e) {
         return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    }
};

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 dark:text-slate-400">Generating your personalized plan...</p>
    </div>
);


const ResultCard: React.FC<ResultCardProps> = ({ result, isLoading, error, onRestart, currentSavings }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:opacity-90 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const { targetFund, monthlySavings, timeline, advice, currency } = result;
  const progressPercentage = targetFund > 0 ? (currentSavings / targetFund) * 100 : 100;

  const parsedAdvice = advice.split('[HEADER]').filter(part => part.trim() !== '');

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageMargin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = pageWidth - (pageMargin * 2);
    let y = 20;

    // Main Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Your Emergency Fund Plan', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Key Metrics Section
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

    // Personalized Advice Section
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

        // Estimate height of the upcoming block
        const splitContent = doc.splitTextToSize(content, textWidth);
        const blockHeight = 8 + (splitContent.length * 4.5) + 8; // Height for title + content + padding

        // Check if the entire block fits on the page. If not, create a new page.
        if (y + blockHeight > pageHeight - pageMargin) { 
            doc.addPage();
            y = pageMargin; // Reset y for the new page
        }

        // Render the block
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(title, pageMargin, y);
        y += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(splitContent, pageMargin, y);
        y += (splitContent.length * 4.5) + 8; // Adjust y position based on text lines
    });

    doc.save('My-Emergency-Fund-Plan.pdf');
  };

  return (
    <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-accent mb-2">Your Emergency Fund Plan</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Here's your roadmap to financial security.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-light dark:bg-slate-700 p-6 rounded-xl text-center">
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Target Fund</h3>
                <p className="text-4xl font-bold text-primary dark:text-accent">{formatCurrency(targetFund, currency)}</p>
            </div>
             <div className="bg-light dark:bg-slate-700 p-6 rounded-xl text-center">
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Monthly Savings Goal</h3>
                <p className="text-4xl font-bold text-primary dark:text-accent">{formatCurrency(monthlySavings, currency)}</p>
                <p className="text-sm text-slate-500">for {timeline} months</p>
            </div>
        </div>

        <div className="mb-6">
            <h4 className="font-semibold mb-2">Progress Towards Your Goal</h4>
            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-4 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-green-400 to-accent h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(progressPercentage, 100)}%`}}
                ></div>
            </div>
            <p className="text-sm text-right mt-1 text-slate-500">{formatCurrency(currentSavings, currency)} / {formatCurrency(targetFund, currency)}</p>
        </div>


        <div className="bg-slate-100 dark:bg-slate-900/50 p-4 sm:p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold text-primary dark:text-accent !mt-0">Your Personalized Advice from Gemini</h3>
             {parsedAdvice.map((part, index) => {
                const lines = part.trim().split('\n');
                const title = lines[0];
                const content = lines.slice(1).join('\n');
                if (!title) return null;
                return (
                    <div key={index}>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">{title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap mt-1">{content}</p>
                    </div>
                );
            })}
        </div>

        <div className="mt-8 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
                onClick={onRestart}
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white bg-primary hover:opacity-90 transition shadow-md"
            >
                Start Over
            </button>
            <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white bg-accent hover:opacity-90 transition shadow-md"
            >
                Download PDF Plan
            </button>
        </div>
    </div>
  );
};

export default ResultCard;