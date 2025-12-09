export interface GenreMap {
  [key: string]: number;
}

export interface KeywordMap {
  [key: string]: string;
}

export interface VibeScore {
  [genre: string]: number;
}

export interface StrictFilter {
  with_genres?: string;
  without_genres?: string;
  with_keywords?: string;
  include_adult?: boolean;
}

export interface Option {
  text: string;
  vibe_score: VibeScore;
  strict_filter: StrictFilter;
}

export interface Question {
  id: string;
  question: string;
  options: Option[];
}

export interface QuizPools {
  genre_anchors: Question[];
  setting: Question[];
  tone: Question[];
  keywords: Question[];
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface TmdbResponse {
  results: Movie[];
}
