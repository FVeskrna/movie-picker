import { Question, Option, Movie, TmdbResponse } from '../types';
import { QUIZ_POOLS, TMDB_GENRES } from '../constants';

// Safely access environment variable. 
// We use optional chaining to prevent crashes if import.meta.env is undefined (non-Vite environments).
const API_KEY = (import.meta as any).env?.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

// Helper: Fisher-Yates Shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate the 7-question quiz
export const generateQuiz = (): Question[] => {
  const anchors = shuffle(QUIZ_POOLS.genre_anchors).slice(0, 3);
  const settings = shuffle(QUIZ_POOLS.setting).slice(0, 2);
  const tone = shuffle(QUIZ_POOLS.tone).slice(0, 1);
  const keywords = shuffle(QUIZ_POOLS.keywords).slice(0, 1);

  return [...anchors, ...settings, ...tone, ...keywords];
};

// Helper function to execute a fetch request
const executeFetch = async (params: URLSearchParams): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) return [];
    const data: TmdbResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("API fetch failed:", error);
    return [];
  }
};

// Calculate result and fetch movies with fallback logic
export const fetchRecommendations = async (userAnswers: Option[]): Promise<Movie[]> => {
  // 1. Calculate Scores
  const scores: { [key: string]: number } = {};
  
  // Initialize scores
  Object.keys(TMDB_GENRES).forEach(genre => scores[genre] = 0);

  // Sum up scores
  userAnswers.forEach(ans => {
    Object.entries(ans.vibe_score).forEach(([genre, score]) => {
      if (scores[genre] !== undefined) {
        scores[genre] += score;
      }
    });
  });

  // 2. Determine Top Genres based on score
  const sortedGenres = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([genre]) => TMDB_GENRES[genre]);

  const topGenre = sortedGenres[0];
  const secondGenre = sortedGenres[1];

  // 3. Collect Strict Filters from answers
  const strictKeywords: string[] = [];
  const strictWithGenres: string[] = [];
  const strictWithoutGenres: string[] = [];
  let includeAdult: boolean | undefined = undefined;

  userAnswers.forEach(ans => {
    if (ans.strict_filter.with_keywords) strictKeywords.push(ans.strict_filter.with_keywords);
    if (ans.strict_filter.without_genres) strictWithoutGenres.push(ans.strict_filter.without_genres);
    if (ans.strict_filter.with_genres) strictWithGenres.push(ans.strict_filter.with_genres);
    if (ans.strict_filter.include_adult !== undefined) includeAdult = ans.strict_filter.include_adult;
  });

  // Helper to create base params
  const getBaseParams = () => new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    sort_by: 'popularity.desc',
    'vote_count.gte': '100',
    page: '1',
  });

  let movies: Movie[] = [];

  // --- ATTEMPT 1: STRICT ---
  // Top 2 Genres + All specific filters (keywords, strict included genres, etc.)
  const params1 = getBaseParams();
  
  // Combine calculated genres with strict forced genres
  const genres1 = [...new Set([topGenre, secondGenre, ...strictWithGenres])].filter(Boolean).map(String);
  
  if (genres1.length > 0) params1.append('with_genres', genres1.join(','));
  if (strictKeywords.length > 0) params1.append('with_keywords', strictKeywords.join(','));
  if (strictWithoutGenres.length > 0) params1.append('without_genres', strictWithoutGenres.join(','));
  if (includeAdult !== undefined) params1.append('include_adult', String(includeAdult));

  console.log("Attempt 1 (Strict): Fetching...");
  movies = await executeFetch(params1);
  if (movies.length > 0) return movies.slice(0, 5);

  // --- ATTEMPT 2: RELAXED ---
  // Top 2 Genres ONLY. Remove keywords and strict extra constraints.
  console.log("Attempt 1 failed. Attempt 2 (Relaxed): Dropping keywords/strict filters...");
  const params2 = getBaseParams();
  const genres2 = [topGenre, secondGenre].filter(Boolean).map(String);
  
  if (genres2.length > 0) params2.append('with_genres', genres2.join(','));
  
  movies = await executeFetch(params2);
  if (movies.length > 0) return movies.slice(0, 5);

  // --- ATTEMPT 3: LOOSE ---
  // Top 1 Genre ONLY.
  console.log("Attempt 2 failed. Attempt 3 (Loose): Top 1 Genre only...");
  const params3 = getBaseParams();
  if (topGenre) params3.append('with_genres', String(topGenre));

  movies = await executeFetch(params3);
  if (movies.length > 0) return movies.slice(0, 5);

  // --- ATTEMPT 4: FALLBACK ---
  // Just popular movies.
  console.log("All attempts failed. Showing generic popular movies.");
  const params4 = getBaseParams();
  movies = await executeFetch(params4);
  
  return movies.slice(0, 5);
};