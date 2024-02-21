import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JogadorLeaderboard} from "./jogadorLeaderboard";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn:'root'
})
export class LeaderBoardService {
  private jogadoresUrl = "https://localhost:5001/api/Jogadores";


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http : HttpClient,
  ) {

  }

  getLeaderBoardDimensao(){
    return this.http.get<JogadorLeaderboard[]>(this.jogadoresUrl+"/leaderBoard/dimensao").pipe(catchError(this.handleError<JogadorLeaderboard[]>("getLeaderBoardDimensao")))
  }

  getLeaderBoardFortaleza(){
    return this.http.get<JogadorLeaderboard[]>(this.jogadoresUrl+"/leaderBoard/fortaleza").pipe(catchError(this.handleError<JogadorLeaderboard[]>("getLeaderBoardFortaleza")))
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
