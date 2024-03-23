import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PersonInterface } from '../interfaces/person.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private http = inject(HttpClient);

  list() {
    return this.http.get(environment.api_person);
  }

  get(id: number) {
    return this.http.get<PersonInterface>(
      `${environment.api_person}${id}`
    );
  }

  create(person: any) {
    return this.http.post(environment.api_person, person);
  }

  update(id: number, person: any) {
    return this.http.patch(`${environment.api_person}${id}`, person);
  }

  delete(id: number) {
    return this.http.delete(`${environment.api_person}${id}`);
  }
}
