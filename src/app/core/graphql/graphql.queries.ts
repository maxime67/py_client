import { gql } from 'apollo-angular';

export const ANALYZE_MOVIE_QUERY = gql`
  query AnalyzeMovie($movieId: ID!) {
    analyzeMovie(movieId: $movieId) {
      id
      aiSummary
      aiOpinionSummary
      aiBestGenre
      aiTags
    }
  }
`;
