import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(environment.api + path);
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(environment.api + path, body);
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(environment.api + path, body);
  }

  patch<T>(path: string, body: any): Observable<T> {
    return this.http.patch<T>(environment.api + path, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(environment.api + path);
  }
}
