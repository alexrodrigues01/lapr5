import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Estadohumor } from './estadohumor';
import {Jogador} from'./jogador'

@Injectable({
  providedIn: 'root'
})
export class EstadohumorService {

    private estadosUrl = 'https://localhost:5001/api/EstadosHumor'; // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http : HttpClient,
  ) { }

  getEstadoHumorById(id : string):Observable<Estadohumor>{
    console.log("Estou no EstadohumorService")
    return this.http.get<Estadohumor>(this.estadosUrl+"/"+id).pipe(catchError(this.handleError<Estadohumor>('getEstadoHumorById')));
  }

  atualizarEstadoHumor(estado:Estadohumor):Observable<Estadohumor>{
    console.log("Estou no EstadohumorService")
    return this.http.put<Estadohumor>(this.estadosUrl+"/"+estado.id,estado,this.httpOptions).pipe(catchError( this.handleError<Estadohumor>('getEstadoHumorById')));
  }

  // /** GET heroes from the server */
  // getSugestoesJogador(jogador : Jogador): Observable<Jogador[]> {
  //   return this.http.get<Jogador[]>(this.jogadoresUrl + "/fc44a5e1-5ced-4f0e-a875-a1e91e68394e/jogadoresPorTagComuns")
  //     .pipe(
  //       catchError(this.handleError<Jogador[]>('addJogador'))
  //     );
  // }
  //
  // /** POST: adiciona um jogador */
  // addJogador(jogador : Jogador) : Observable<Jogador>{
  //   return this.http.post<Jogador>(this.jogadoresUrl, jogador, this.httpOptions).pipe(
  //     catchError(this.handleError<Jogador>('addJogador'))
  //   );
  // }
  //
  // /** GET: obtem todas as relações do jogador */
  // GetJogador(id : string) : Observable<Array<Jogador>>{
  //   return this.http.get<Array<Jogador>>(this.jogadoresUrl + "/" + id).pipe(
  //     catchError(this.handleError<Array<Jogador>>('getRelacoesJog'))
  //   );
  // }
  //
  // /** GET: obtem todas as relações do jogador */
  // GetAllRelacoesJogador(id : string) : Observable<Array<Relacao>>{
  //   return this.http.get<Array<Relacao>>(this.jogadoresUrl + "/" + id + "/relacoes").pipe(
  //     catchError(this.handleError<Array<Relacao>>('getRelacoesJog'))
  //   );
  // }
  //
  // /** GET: obtem todas as relações do jogador */
  // GetEstadoHumorByJogadorId(id : string) : Observable<Array<EstadoEmocional>>{
  //   return this.http.get<Array<EstadoEmocional>>(this.jogadoresUrl + "/" + id + "/estadosEmocionais").pipe(
  //     catchError(this.handleError<Array<EstadoEmocional>>('getEstado'))
  //   );
  // }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
