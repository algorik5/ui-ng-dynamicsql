import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';


export interface ErrorMessage {
    title: string; 
    message: string;
  }

export class ErrorUtil
{
    static printError(error: ErrorMessage)
    {
        console.error(`Client-side error: ${error.message}`);
    }
    static handleError(error: HttpErrorResponse) {
        let message = '';
      
        // ① 에러 유형 구분
        if (error.error instanceof ErrorEvent) {
          // 클라이언트 측의 에러
          console.error(`Client-side error: ${error.error.message}`);
          message = error.error.message;
        } else {
          // 백엔트 측의 에러
          console.error(`Server-side error: ${error.status}`);
          message = error.message;
        }
      
        // ② 사용자에게 전달할 메세지를 담은 옵저버블 반환
        return throwError({
          title: 'Something wrong! please try again later.',
          message
        });
      }
}