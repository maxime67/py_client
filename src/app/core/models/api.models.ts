// Interfaces pour l'API REST

export interface Genre {
  id: number;
  label: string;
}

export interface Person {
  id: number;
  last_name: string;
  first_name: string | null;
}

export interface Member {
  id: number;
  login: string;
}

export interface Opinion {
  id: number;
  note: number;
  comment: string;
  movie_id: number;
  member: Member;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  duration: number | null;
  synopsis: string | null;
  genre: Genre;
  director: Person;
  actors: Person[];
  opinions: Opinion[];
}

export interface MovieCreate {
  title: string;
  year: number;
  duration: number | null;
  synopsis: string | null;
  genre_id: number;
  director_id: number;
  actors_ids: number[];
}

// Interface pour l'API GraphQL
export interface MovieAnalysis {
  id: string;
  aiSummary: string | null;
  aiOpinionSummary: string | null;
  aiBestGenre: string | null;
  aiTags: string[] | null;
}

// Interface pour les réponses GraphQL
export interface AnalyzeMovieResponse {
  analyzeMovie: MovieAnalysis;
}
