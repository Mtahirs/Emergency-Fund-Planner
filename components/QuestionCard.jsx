import React, { useState, useEffect, useRef } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import { CURRENCIES } from '../currencies';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const filteredCurrencies = CURRENCIES.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (code) => {
        onCurrencyChange(code);
        setIsOpen(false);
        setSearchTerm('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    const selectedCurrencyName = CURRENCIES.find(c => c.code === selectedCurrency)?.name || 'Select Currency';

    return (
        <div className="relative" ref={dropdownRef}>
            <label htmlFor="currency-selector" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Currency</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-left flex justify-between items-center"
            >
                <span>{selectedCurrencyName} ({selectedCurrency})</span>
                <ChevronRightIcon />
            </button>
            {isOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-800 rounded-md shadow-xl border dark:border-slate-600 max-h-60 flex flex-col">
                    <div className="p-2">
                         <input
                            type="text"
                            placeholder="Search currency..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-md border-transparent focus:ring-accent focus:border-accent"
                        />
                    </div>
                    <ul className="overflow-y-auto">
                        {filteredCurrencies.map(c => (
                            <li
                                key={c.code}
                                onClick={() => handleSelect(c.code)}
                                className="px-4 py-2 hover:bg-secondary dark:hover:bg-accent hover:text-white cursor-pointer"
                            >
                                {c.name} ({c.code})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


const QuestionCard = ({
  question,
  value,
  onAnswer,
  onNext,
  onBack,
  isFirst,
  isLast,
  isNextDisabled,
  currency,
  onCurrencyChange,
}) => {
  
  const currencySymbol = CURRENCIES.find(c => c.code === currency)?.symbol || '$';

  const formatNumberWithCommas = (numStr) => {
    if (numStr === '' || numStr === undefined || numStr === null) return '';
    const parts = String(numStr).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const handleNumberChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^0-9]/g, '');
    onAnswer(question.id, numericValue);
  };

  const renderInput = () => {
    switch (question.type) {
      case 'number':
        const isCurrencyInput = question.id !== 'dependents';
        return (
          <div className="mt-4">
            {isFirst && (
                <div className="mb-6">
                    <CurrencySelector selectedCurrency={currency} onCurrencyChange={onCurrencyChange} />
                </div>
            )}
            <div className="relative">
              {isCurrencyInput && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">{currencySymbol}</span>
              )}
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                id={question.id}
                value={formatNumberWithCommas(value)}
                onChange={handleNumberChange}
                placeholder={question.placeholder}
                className={`w-full ${isCurrencyInput ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-secondary dark:focus:border-accent focus:ring-0 rounded-lg transition`}
              />
            </div>
          </div>
        );
      case 'radio':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {question.options?.map((option) => (
              <button
                key={option}
                onClick={() => onAnswer(question.id, option)}
                className={`p-4 rounded-lg text-center font-semibold border-2 transition-all duration-200 ${
                  value === option
                    ? 'bg-secondary text-white border-secondary dark:bg-accent dark:border-accent shadow-lg scale-105'
                    : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-secondary dark:hover:border-accent'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'slider':
        return (
            <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500">{question.min} months</span>
                    <span className="text-2xl font-bold text-secondary dark:text-accent">{value || question.min}</span>
                     <span className="text-slate-500">{question.max} months</span>
                </div>
                 <input
                    type="range"
                    id={question.id}
                    min={question.min}
                    max={question.max}
                    step={question.step}
                    value={value || question.min}
                    onChange={(e) => onAnswer(question.id, e.target.value)}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-secondary dark:accent-accent"
                />
            </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="flex-grow">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">{question.text}</h2>
        {question.subtext && <p className="text-slate-500 dark:text-slate-400 mb-6">{question.subtext}</p>}
        {renderInput()}
      </div>
      
      <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={onBack}
          disabled={isFirst}
          aria-label="Go to previous question"
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeftIcon />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          aria-label={isLast ? 'Finish and calculate results' : 'Go to next question'}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-secondary dark:bg-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
        >
          {isLast ? 'Finish' : 'Next'}
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
