import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PetService {
  public constructor(private readonly httpClient: HttpClient) {}

  // no request types, no serializing
  getPet$(petId: any): Observable<any> {
    // No response types
    const headers = new HttpHeaders(); // <-- could be handled by interceptors
    const url = environment.apiUrl + '/pet' + `${petId}`; // <-- could be handled by interceptors
    return this.httpClient.get(url, { headers }); // <-- no error handling, no serializing, no deserializing
  }
}
