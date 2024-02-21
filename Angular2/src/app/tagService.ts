import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Tag} from "./tag";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn:'root'
})
export class TagService{
  private tagsUrl="https://localhost:5001/api/Tags"


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  getTagsUtilizadores(): Observable<Tag[]>{
    return this.http.get<Tag[]>(this.tagsUrl+"/tJogadores").pipe(catchError(this.handleError<Tag[]>("getTagsUtilizadores")));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTagsRelacoes() {
    return this.http.get<Tag[]>(this.tagsUrl+"/tRelacoes").pipe(catchError(this.handleError<Tag[]>("getTagsRelacoes")));
  }

  getTagsUtilizador(jogadorId: String) {
    return this.http.get<Tag[]>(this.tagsUrl+"/tJogador/"+ jogadorId ).pipe(catchError(this.handleError<Tag[]>("getTagsUtilizador")))
  }

  getTagsRelacoesJog(jogadorId: String) {
    return this.http.get<Tag[]>(this.tagsUrl+"/tRelacoesJog/"+jogadorId).pipe(catchError(this.handleError<Tag[]>("getTagsRelacoesJog")))

  }
}
