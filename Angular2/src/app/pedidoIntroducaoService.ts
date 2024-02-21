import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Jogador } from './jogador';
import {Estadohumor} from "./estadohumor";
import {Pedidoligacao} from "./pedidoligacao";
import {Relacao} from "./relacao";
import {Pedidointroducao} from "./pedidointroducao";


@Injectable({
  providedIn:'root'
})
export class PedidoIntroducaoService{
  private url= "https://localhost:5001/api/introducoes";
  public jogadorObjetivoId:string= "";
  public jogadorIntermedioId:string= "";



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(
    private http : HttpClient,
  ) {
  }

  getPedidosIntroducao(id:String) :Observable<Pedidointroducao[]>{
    console.log("Pedidos Introducao");
    return this.http.get<Pedidointroducao[]>(this.url+"/"+id)
      .pipe(catchError(this.handleError<Pedidointroducao[]>('getPedidosIntroducao')));
  }

  aceitar(id:string){
    console.log("Aceitar");

    return this.http.delete(this.url+"/aprov1,"+id).subscribe(() => console.log('Delete successful'));
  }

  rejeitar(id:string){
    console.log("Rejeitar");
    return this.http.delete(this.url+"/aprov0,"+id).subscribe(() => console.log('Delete successful'));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  criarPedidoIntroducao(novaIntroducao: Pedidointroducao) {
    return this.http.post<Pedidointroducao>(this.url,novaIntroducao,this.httpOptions).pipe(catchError(this.handleError<Pedidointroducao>("criarPedidoIntroducao")))
  }
}
