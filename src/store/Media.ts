import { defineStore } from 'pinia';
import axios from 'axios';
import { MovieCast, ContentResult } from '@/interfaces/Movie';
import { TvCast, ContentRating } from '@/interfaces/Tv';
import { MediaItems, Crew, Media, ProductionNetwork } from '@/interfaces/Root';
import { pagination } from './PageInfo';

interface MediaPayload {
  id: number;
  type: string;
}

export const MediaStore = defineStore('MediaStore', {
  state: () =>
    ({
      Movie: null,
      tvSeries: null,
    } as MediaItems),
  getters: {
    // get the certificate for movie or tv series
    certification(): string {
      const certMovie: ContentResult[] = this.Movie?.release_dates.results;
      const certTv: ContentRating[] = this.tvSeries?.content_ratings.results;

      let certificate = '';
      if (certMovie) {
        certificate = certMovie.filter((cer: ContentResult) => cer.iso_3166_1 === 'US')[0]
          .release_dates[0].certification;
      } else {
        certificate = certTv.filter((cer: ContentRating) => cer.iso_3166_1 === 'US')[0]
          .rating;
      }
      return certificate;
      /* const certificate: (ContentRating | ContentResult)[] =
        this.Movie?.release_dates.results ?? this.tvSeries.content_ratings.results;
      const filteredCertificate: (ContentResult | ContentRating)[] = certificate.filter(
        (cert) => cert.iso_3166_1 === 'US'
      );
      //NOTE TS gives error not sure why cannot type it!!!
      return filteredCertificate.release_dates[0].certification ?? certificate.reting; */
    },
    // return release date of the movie/tv series in dd-mm-yyyy format
    releaseDate(): string {
      const newDate = new Date(this.Movie?.release_date ?? this.tvSeries?.first_air_date);
      return `${newDate.getDay() + 1} - ${newDate.getMonth()} - ${newDate.getFullYear()}`;
    },
    // return media run time in hh:mm format
    runTime(): string {
      const time = this.Movie?.runtime ?? this.tvSeries?.episode_run_time[0];
      return `${Math.floor(time / 60)}h : ${time % 60}m`;
    },
    // return array of joined directors & writers of the movie/tv series
    getCrew(): Crew[] {
      const crew = this.Movie?.credits.crew ?? this.tvSeries?.credits.crew;

      const directors = crew?.filter((person) => person.job === 'Director');
      const writers = crew?.filter(
        (person) => person.job === 'Screenplay' || person.job === 'Novel'
      );
      return [...directors, ...writers];
    },
    // return first 9 persons from media cast
    getCast(): MovieCast[] | TvCast[] {
      const cast = this.Movie?.credits.cast ?? this.tvSeries?.credits.cast;
      return cast?.slice(0, 9);
    },
    // get media status
    getStatus: (state): string => state.Movie?.status ?? state.tvSeries.status,
    // get media language
    getLanguage: (state): string =>
      new Intl.DisplayNames(['en'], { type: 'language' }).of(
        state.Movie?.original_language ?? state.tvSeries?.original_language
      ),
    // get media images
    getImages: (state): Media[] =>
      state.Movie?.images.backdrops.slice(0, 20) ??
      state.tvSeries.images.backdrops.slice(0, 20),
    // nnetwork
    getNetwork: (state): ProductionNetwork =>
      state.Movie?.production_companies[0] ?? state.tvSeries.networks[0],
    firstAir(): string {
      const air = new Date(this.tvSeries.first_air_date);
      return `${air.getDay() + 1}-${air.getMonth()}-${air.getFullYear()}`;
    },
    lastAir(): string {
      const air = new Date(this.tvSeries.last_air_date);
      return `${air.getDay() + 1}-${air.getMonth()}-${air.getFullYear()}`;
    },
    ratingAverage(): number {
      return this.tvSeries?.vote_average ?? this.Movie.vote_average;
    },
    budget: (state): string =>
      Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        state.Movie?.budget
      ),
    revenue: (state): string =>
      Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        state.Movie?.revenue
      ),
  },
  actions: {
    async loadMediaInfo(payload: MediaPayload) {
      const pageInfo = pagination();
      pageInfo.loading = true;

      const { id, type } = payload;
      const certificateQuery = type === 'movie' ? 'release_dates' : 'content_ratings';
      await axios
        .get(
          import.meta.env.VITE_API_BASE_URL +
            type +
            '/' +
            id +
            '?' +
            import.meta.env.VITE_API_KEY +
            '&append_to_response=' +
            certificateQuery +
            ',credits,images'
        )
        .then((result) => {
          type === 'movie' ? (this.Movie = result.data) : (this.tvSeries = result.data);
          pageInfo.loading = false;
        });
    },
  },
});
