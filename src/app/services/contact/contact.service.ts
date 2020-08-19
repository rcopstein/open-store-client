import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private static readonly URL = `${environment.server_url}/other/contact`;

  public contact(
    name: string,
    email: string,
    order: string,
    message: string
  ): Observable<any> {
    return this.http.post(
      ContactService.URL,
      {
        name,
        email,
        order,
        message,
      },
      {responseType: 'text'}
    );
  }

  constructor(private http: HttpClient) {}
}
