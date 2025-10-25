import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, mergeMap, Observable, of, throwError } from 'rxjs';
import { Schema } from '../new-request.types';
import { SCHEMAS } from '../data/schemas-mock';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
 
  updateQuestion(
    requestId: string,
    questionId: string,
    payload: { value: string }
  ): Observable<{ success: boolean; data?: any }> {
    const delayMs = this.randomDelay(600, 1000);
    const shouldFail = Math.random() < 0.2;
    const url = `/api/requests/${requestId}/question/${questionId}`;
    console.log('MOCK: PUT REQUEST', url)
    return of({
      success: true,
      data: { requestId, questionId, ...payload },
    }).pipe(
      delay(delayMs),
      mergeMap((result) =>{
        if (shouldFail) {
          console.log('FAILED REQUEST');
          return throwError(
              () => new Error('Failed to save answer. Try again later.')
            )
        } else { 
          return of(result)
        }
      }
    ));
  }

  private randomDelay(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}