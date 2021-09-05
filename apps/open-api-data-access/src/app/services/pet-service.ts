import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PetService {
  public constructor(private readonly httpClient: HttpClient) {}

  getPet$(petId: any): Observable<any> {
    const headers = new HttpHeaders();
    const url = environment.apiUrl + '/pet' + `${petId}`;
    return this.httpClient.get(url, { headers });
  }
}
