import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PersonInterface } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private http = inject(HttpClient);

  list() {
    return this.http.get('http://localhost:3000/api/person')
  }

  get(id: number) {
    return this.http.get<PersonInterface>(`http://localhost:3000/api/person/${id}`)
  }

  create(person: any) {
    return this.http.post('http://localhost:3000/api/person', person)
  }

  update(id: number, person: any) {
    return this.http.patch(`http://localhost:3000/api/person/${id}`, person)
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/api/person/${id}`)
  }
}
