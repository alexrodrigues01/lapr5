import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Jogador } from './jogador';
import {Estadohumor} from "./estadohumor";
import {Pedidoligacao} from "./pedidoligacao";
import {Relacao} from "./relacao";


@Injectable({
  providedIn:'root'
})
export class PedidoligacaoService{
  private url= "https://localhost:5001/api/PedidosLigacao";
  private data=new Date();


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(
    private http : HttpClient,
  ) {
  }

  getPedidosLigacaoPendentes(id:String) :Observable<Pedidoligacao[]>{
    console.log("Pedidos Ligacao");
    return this.http.get<Pedidoligacao[]>(this.url+"/idjogador,"+id)
      .pipe(catchError(this.handleError<Pedidoligacao[]>('getPedidosLigacaoPendentes')));
  }

  aceitar(id:string){
    console.log("Aceitar");
    this.data = new Date();
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        TagsRelacao:'empty',
        ForcaLigacao: 1,
        DataRelacao:this.data.getDay()+1+"/"+this.data.getMonth()+1+"/"+this.data.getFullYear()
      },
    };

      return this.http.delete(this.url+"/"+id+",decis1",options).subscribe(() => console.log('Delete successful'));
  }

  rejeitar(id:string){
    console.log("Aceitar");
    this.data = new Date();
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        TagsRelacao:'empty',
        ForcaLigacao: 1,
        DataRelacao:this.data.getDay()+"/"+this.data.getMonth()+"/"+this.data.getFullYear()
      },
    };

    return this.http.delete(this.url+"/"+id+",decis0",options).subscribe(() => console.log('Delete successful'));
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
