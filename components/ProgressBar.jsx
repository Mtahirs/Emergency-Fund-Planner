import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-8">
      <div
        className="bg-accent h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
