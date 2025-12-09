import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { generateQuiz, fetchRecommendations } from './services/tmdbService';
import { Question, Option, Movie } from './types';

type ViewState = 'start' | 'quiz' | 'results';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize quiz only when needed to keep it random every time
  const handleStart = () => {
    const newQuiz = generateQuiz();
    setQuestions(newQuiz);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setView('quiz');
  };

  const handleAnswer = (option: Option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      // Small delay for UX transition feel could go here, but prompt asked for smooth transition. 
      // Instant switch is usually smoother than delayed.
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = async (finalAnswers: Option[]) => {
    setView('results');
    setLoading(true);
    try {
      const results = await fetchRecommendations(finalAnswers);
      setMovies(results);
    } catch (error) {
      console.error("Failed to load results", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 font-sans selection:bg-primary selection:text-white">
      {/* Background Gradient Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header / Logo Area */}
        <header className="flex justify-between items-center mb-6">
          <div 
            className="font-bold text-xl tracking-tight cursor-pointer hover:text-white transition-colors"
            onClick={() => setView('start')}
          >
            VIBE<span className="text-primary">CHECK</span>
          </div>
          <div className="text-sm text-gray-500">
            Powered by TMDB
          </div>
        </header>

        <main className="flex flex-col min-h-[80vh] justify-center">
          {view === 'start' && (
            <WelcomeScreen onStart={handleStart} />
          )}

          {view === 'quiz' && questions.length > 0 && (
            <QuizScreen 
              question={questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          )}

          {view === 'results' && (
            <ResultsScreen 
              movies={movies}
              onRestart={handleStart}
              loading={loading}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
