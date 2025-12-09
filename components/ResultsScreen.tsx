import React from 'react';
import { Movie } from '../types';

interface Props {
  movies: Movie[];
  onRestart: () => void;
  loading: boolean;
}

export const ResultsScreen: React.FC<Props> = ({ movies, onRestart, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-300 animate-pulse">Consulting the oracle...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-3xl font-bold text-white mb-4">No Matches Found</h2>
        <p className="text-gray-400 mb-8">Your vibe is too unique for this timeline.</p>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-cyan-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary mb-4">
          Your Vibe Matched
        </h2>
        <p className="text-gray-400">Here are 5 movies that fit your mood perfectly.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
        {movies.map((movie) => (
          <a 
            key={movie.id} 
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-surface rounded-xl overflow-hidden shadow-xl border border-slate-700 hover:border-primary/50 transition-all hover:-translate-y-2 duration-300 group"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <span className="text-slate-500">No Image</span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-yellow-400 font-bold flex items-center">
                <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {movie.vote_average.toFixed(1)}
              </div>
              
              {/* Overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  View Details
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{movie.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{new Date(movie.release_date).getFullYear()}</p>
              <p className="text-gray-400 text-sm line-clamp-4">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-slate-700 rounded-full overflow-hidden transition-all hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          <span className="mr-2">Start Over</span>
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};