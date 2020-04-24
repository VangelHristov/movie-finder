import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {DbResponse} from '../models/db-response';
import {Movie} from '../models/movie';
import {debounceTime, distinctUntilChanged, map, pluck, reduce, switchMap} from 'rxjs/operators';
import {MovieDetails} from '../models/movie-details';
import {DbMovieDetails} from '../models/db-movie-details';
import {MapperService} from './mapper.service';
import {MovieTrailer} from '../models/movie-trailer';
import {SearchResult} from '../models/search-result';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    baseUrl = 'https://api.themoviedb.org/3';
    moviesUrl = 'https://api.themoviedb.org/3/discover/movie';
    detailBaseUrl = 'https://api.themoviedb.org/3/movie';
    apiKey = '9b596ab93d9942d804c33df2b224c4b6';
    sortOrder = 'popularity.desc';
    language = 'en-US';

    constructor(private http: HttpClient, private mapper: MapperService) {
    }

    private static getDateStr(value: Date): string {
        return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
    }

    private static dateNow(): Date {
        return new Date();
    }

    private static dateTwoMonthsAgo(): Date {
        const now = MoviesService.dateNow();
        return new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
    }

    getPopular(pageNumber = 1): Observable<Movie[]> {
        return this.http.get<DbResponse>(
            this.moviesUrl,
            {
                params: {
                    api_key: this.apiKey,
                    sort_by: this.sortOrder,
                    language: this.language,
                    page: String(pageNumber)
                }
            }).pipe(pluck('results'), map(this.mapper.mapToMovieSummary));
    }

    getInTheaters(pageNumber = 1): Observable<Movie[]> {
        return this.http.get<DbResponse>(
            this.moviesUrl,
            {
                params: {
                    api_key: this.apiKey,
                    language: this.language,
                    'primary_release_date.gte': MoviesService.getDateStr(MoviesService.dateTwoMonthsAgo()),
                    'primary_release_date.lte': MoviesService.getDateStr(MoviesService.dateNow()),
                    page: String(pageNumber)
                }
            }).pipe(pluck('results'), map(this.mapper.mapToMovieSummary));
    }

    getById(id): Observable<MovieDetails> {
        return this.http.get<DbMovieDetails>(
            `${this.detailBaseUrl}/${id}`,
            {
                params: {
                    api_key: this.apiKey,
                    language: this.language
                }
            }).pipe(map(this.mapper.mapToMovieDetails)
        );
    }

    getTrailers(movieId: number): Observable<MovieTrailer[]> {
        return this.http
            .get<MovieTrailer[]>(
                `${this.detailBaseUrl}/${movieId}/videos`,
                {
                    params: {
                        api_key: this.apiKey,
                        language: this.language
                    }
                }
            )
            .pipe(
                pluck('results'),
                reduce((trailers: MovieTrailer[], videos: MovieTrailer[]): MovieTrailer[] =>
                    videos.filter(v => v.type === 'Trailer'), []),
                map(this.mapper.mapToMovieTrailers)
            );
    }

    search(terms: Observable<string>) {
        return terms.pipe(
            debounceTime(500),
            switchMap(term => this.searchEntries(term)));
    }

    searchEntries(term): Observable<SearchResult[]> {
        if (!term) {
            return from([]);
        }
        return this.http.get<DbResponse>(
            `${this.baseUrl}/search/movie`,
            {
                params: {
                    api_key: this.apiKey,
                    language: this.language,
                    include_adult: 'false',
                    query: term
                }
            })
            .pipe(pluck('results'), map(this.mapper.mapToSearchResults));
    }
}
