import { BaseTv, TvSeriesItem } from './Tv';
import { BaseMovie, MovieItem } from './Movie';

// shared interface
export interface ProductionNetwork {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}
export interface Media {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface Images {
  backdrops: Media[];
  logos: Media[];
  posters: Media[];
}

/* Defining the shape of the GenreList data that will be returned from the API. */
export interface Genre {
  id: number;
  name: string;
}
export interface GenreList {
  genres: Genre[];
}

export interface Slide {
  id: number;
  overview: string;
  vote_average: number;
  title: string;
  backdrop_path: string;
}

export interface SearchResult {
  movies: BaseMovie[] | null;
  tv: BaseTv[] | null;
}
export interface MovieList {
  genres: Genre[];
  movies: BaseMovie[];
}
export interface TvList {
  genres: Genre[];
  series: BaseTv[];
}
export interface pageInfo {
  page: number;
  total_pages: number;
  total_results: number;
  loading: boolean;
}
export interface MediaItems {
  Movie: MovieItem;
  tvSeries: TvSeriesItem;
}
