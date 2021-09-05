import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { GetPetResponseDto } from './interfaces/get-pet-response-dto';
import { catchError, distinctUntilChanged, tap } from 'rxjs/operators';

/**
 *  MOCK Interfaces for the sake of Example
 * */
const LOGGER = new InjectionToken('crazyLogger');
export interface UrlPrefix {
  prefix(fragment: string): string;
}
const URL_PREFIX = new InjectionToken('urlHelper');
const CACHE = new InjectionToken('cacheProvider');

@Injectable({ providedIn: 'root' })
export class PetService {
  public isLoading$: Observable<boolean>;
  private isLoadingState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public constructor(
    private readonly httpClient: HttpClient,
    @Inject(LOGGER) private readonly logger: any,
    @Inject(URL_PREFIX) private readonly urlHelper: UrlPrefix,
    @Inject(CACHE) private readonly cache: any
  ) {
    this.isLoading$ = this.isLoadingState$.pipe(distinctUntilChanged());
  }

  public getPet$(petId: number): Observable<GetPetResponseDto> {
    // <-- lots of logic is getting inside this method (error, logging, loading)
    // let's add also some caching

    const headers = new HttpHeaders(); // net block with auth

    const url = this.urlHelper.prefix('/pet' + `${petId}`);

    if (this.cache.isCached(url)) {
      if (this.cache.isExpired(url) === false) {
        return this.cache.result(url);
      }
    }

    this.isLoadingState$.next(true);

    return this.httpClient.get<GetPetResponseDto>(url, { headers }).pipe(
      /** loading */
      tap((response) => {
        this.isLoadingState$.next(false); // stop loading
      }),
      /** logging */
      tap((response) => {
        this.logger.log(response);
      }),
      /** cache*/
      tap((response) => {
        this.cache.cache(url, response);
      }),
      catchError((error) => {
        this.isLoadingState$.next(false); // stop loading on error
        /** error handling */
        // ....
        // ...
        return throwError(error);
      })
    );
  }
}
