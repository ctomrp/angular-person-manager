import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SexInterface } from '../interfaces/sex.interface';

@Injectable({
  providedIn: 'root'
})
export class SexService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<SexInterface[]>('http://localhost:3000/api/sex')
  }

  get(id: number) {
    return this.http.get<SexInterface>(`http://localhost:3000/api/sex/${id}`)
  }

  create(sex: SexInterface) {
    return this.http.post<SexInterface>('http://localhost:3000/api/sex', sex)
  }

  update(id: number, sex: SexInterface) {
    return this.http.patch<SexInterface>(`http://localhost:3000/api/sex/${id}`, sex)
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:3000/api/sex/${id}`)
  }
}
