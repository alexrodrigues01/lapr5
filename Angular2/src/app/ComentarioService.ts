import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "./post";
import {Jogador} from "./jogador";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {PostCreate} from "./postCreate";
import {Comentario} from "./comentario";

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url= "http://localhost:3000/api/comentarios";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(
    private http : HttpClient,
  ) {
  }


  getById(id:string){
    return this.http.get<Comentario>(this.url+"/comentarioById/"+id).pipe(catchError(this.handleError<Comentario>("getById")));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  comentar(texto:string,postId:string,userId:string) {
    const body={texto:texto , utilizador:userId, post:postId}
    return this.http.post<Comentario>(this.url, body,this.httpOptions).pipe(catchError(this.handleError<Comentario>("getById")));
  }

}
