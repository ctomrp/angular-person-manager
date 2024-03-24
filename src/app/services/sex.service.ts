import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SexInterface } from '../interfaces/sex.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SexService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<SexInterface[]>(environment.api_sex);
  }

  get(id: number) {
    return this.http.get<SexInterface>(`${environment.api_sex}/${id}`);
  }

  create(sex: SexInterface) {
    return this.http.post<SexInterface>(environment.api_sex, sex);
  }

  update(id: number, sex: SexInterface) {
    return this.http.patch<SexInterface>(
      `${environment.api_sex}/${id}`,
      sex
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`${environment.api_sex}/${id}`);
  }
}
