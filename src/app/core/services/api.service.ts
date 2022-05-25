import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path: string) {
    return this.http.get(environment.api + path);
  }

  post(path: string, body: any) {
    return this.http.post(environment.api + path, body);
  }

  put(path: string, body: any) {
    return this.http.put(environment.api + path, body);
  }

  patch(path: string, body: any) {
    return this.http.patch(environment.api + path, body);
  }

  delete(path: string) {
    return this.http.delete(environment.api + path);
  }
}
