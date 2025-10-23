import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Schema } from '../new-request.types';
import { SCHEMAS } from '../data/schemas-mock';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  // private readonly http = inject(HttpClient);

  constructor() { }

  getSchemas(): Observable<Schema[]> {
    return of(SCHEMAS).pipe(delay(300))
  }

}
