import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Jogador } from './jogador';
import {Estadohumor} from "./estadohumor";
import {Pedidoligacao} from "./pedidoligacao";
import {Relacao} from "./relacao";
import {Tag} from "./tag";


@Injectable({
  providedIn:'root'
})
export class RelacaoService{
  private url= "https://localhost:5001/api/Relacoes";
  public relacaoSelecionada= new Relacao("","","","",0,0,"");


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(
    private http : HttpClient,
  ) {
  }

  getRelacoes(id:String) :Observable<Relacao[]>{
    console.log("Relacoes");
    console.log(id);
    return this.http.get<Relacao[]>(this.url+"/idJogador/"+id).pipe(catchError(this.handleError<Relacao[]>("getRelacoes")));

  }





  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTagById(id: string) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(id)
    return this.http.get<Tag>(this.url+ "/idTag/"+id).pipe(catchError(this.handleError<Tag>("getTagById")));
  }

  atualizarDados(relacaoSelecionada: Relacao) {
    return this.http.put<Relacao>(this.url+"/"+relacaoSelecionada.id,relacaoSelecionada,this.httpOptions).pipe(catchError(this.handleError<Relacao>("atualizarDados")));
  }


  getForcaPrimeiroN(jogadorID: string) {
    return this.http.get<string>(this.url+"/forcaPrimeiroN/"+jogadorID).pipe(catchError(this.handleError<string>("getForcaPrimeiroN")));
  }

  atualizarForcaRelacaoAcima(id1:string,id2:string) {
    return this.http.get<Relacao>(this.url+"/atualizarForcaRelacaoAcima/"+id1+"/"+id2).pipe(catchError(this.handleError<Relacao>("atualizarForcaRelacaoAcima")));
  }
  atualizarForcaRelacaoAbaixo(id1:string,id2:string) {
    return this.http.get<Relacao>(this.url+"/atualizarForcaRelacaoAbaixo/"+id1+"/"+id2).pipe(catchError(this.handleError<Relacao>("atualizarForcaRelacaoAbaixo")));
  }
}
