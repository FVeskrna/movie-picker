import React from 'react';
import { Question, Option } from '../types';

interface Props {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (option: Option) => void;
}

export const QuizScreen: React.FC<Props> = ({ question, questionIndex, totalQuestions, onAnswer }) => {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 animate-fade-in-up">
      {/* Progress Bar */}
      <div className="w-full bg-surface rounded-full h-2.5 mb-8">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mb-4 text-sm font-medium text-secondary uppercase tracking-widest">
        Question {questionIndex + 1} of {totalQuestions}
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option)}
            className="text-left p-6 rounded-xl bg-surface border border-slate-700 hover:border-primary hover:bg-slate-700/50 transition-all duration-200 group"
          >
            <span className="text-lg md:text-xl text-slate-200 group-hover:text-white transition-colors">
              {option.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
